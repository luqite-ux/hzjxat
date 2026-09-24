"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { heroSlides } from "@/lib/data/hero-slides"
import { cn } from "@/lib/utils"

const AUTO_PLAY_MS = 7000

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const listener = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }, [])

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + heroSlides.length) % heroSlides.length)
  }, [])

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length)
    }, AUTO_PLAY_MS)
    return () => clearInterval(timer)
  }, [isPaused, prefersReducedMotion])

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      goNext()
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      goPrev()
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return
    const deltaX = event.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  const slide = heroSlides[activeIndex]

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured capabilities"
      className="relative isolate w-full overflow-hidden bg-secondary"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[560px] w-full sm:h-[620px] lg:h-[680px]">
        {heroSlides.map((item, index) => (
          <div
            key={item.image}
            aria-hidden={index !== activeIndex}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              index === activeIndex ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Scrim confined to the real negative-space side of the photo */}
            <div
              className={cn(
                "absolute inset-y-0 w-full sm:w-[58%]",
                index < 2
                  ? item.safeSide === "left"
                    ? "left-0 bg-background/78 sm:bg-transparent sm:bg-gradient-to-r sm:from-background/80 sm:via-background/40 sm:to-transparent"
                    : "right-0 bg-background/78 sm:bg-transparent sm:bg-gradient-to-l sm:from-background/92 sm:via-background/62 sm:to-transparent"
                  : item.safeSide === "left"
                    ? "left-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent"
                    : "right-0 bg-gradient-to-l from-background/92 via-background/62 to-transparent",
              )}
            />
          </div>
        ))}

        {/* Copy layer: render only the active slide to avoid ghost text during image crossfades. */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div
            key={slide.image}
            className={cn(
              activeIndex === 2
                ? "absolute inset-x-4 top-1/2 w-auto max-w-[calc(100%-2rem)] -translate-y-1/2 text-left sm:left-6 sm:right-auto sm:max-w-xl lg:left-8"
                : "relative z-10 w-full max-w-[18rem] sm:max-w-lg lg:max-w-xl",
              activeIndex !== 2 &&
                (slide.safeSide === "left" ? "mr-auto text-left" : "ml-auto text-left"),
            )}
          >
            <span className="inline-flex items-center rounded-sm bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {slide.eyebrow}
            </span>
            <h1 className="mt-4 max-w-[18rem] text-[1.65rem] font-bold leading-[1.12] text-foreground sm:max-w-none sm:text-4xl lg:text-5xl">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-[18rem] text-sm leading-relaxed text-foreground/80 sm:max-w-sm sm:text-lg lg:max-w-md">
              {slide.description}
            </p>
            <div className="mt-7 flex w-full max-w-[18rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="w-full rounded-sm sm:w-auto">
                <Link href={slide.ctaHref}>{slide.ctaLabel}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-sm bg-background/60 sm:w-auto">
                <Link href="/contact">Talk to Engineering</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-4 sm:bottom-7">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="hidden rounded-sm bg-background/70 p-2 text-foreground backdrop-blur transition-colors hover:bg-background sm:inline-flex"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2 rounded-sm bg-background/70 px-3 py-2 backdrop-blur">
          {heroSlides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}: ${item.title}`}
              aria-current={index === activeIndex}
              className={cn(
                "h-2 rounded-full transition-all",
                index === activeIndex ? "w-6 bg-primary" : "w-2 bg-foreground/30",
              )}
            />
          ))}
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            className="ml-1 rounded-sm p-1 text-foreground/70 hover:text-foreground"
          >
            {isPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="hidden rounded-sm bg-background/70 p-2 text-foreground backdrop-blur transition-colors hover:bg-background sm:inline-flex"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
