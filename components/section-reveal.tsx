"use client"

import { Children, type ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "section"
}

export function SectionReveal({ children, className, delay = 0, as = "div" }: SectionRevealProps) {
  const Comp = as
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Comp
      ref={ref}
      className={cn(
        "transform-gpu transition-all duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  )
}

interface StaggerGroupProps {
  children: ReactNode
  className?: string
  itemClassName?: string
  staggerMs?: number
}

export function StaggerGroup({ children, className, itemClassName, staggerMs = 80 }: StaggerGroupProps) {
  const items = useMemo(() => Children.toArray(children), [children])

  return (
    <div className={className}>
      {items.map((child, index) => (
        <RevealItem key={index} className={itemClassName} delay={index * staggerMs}>
          {child}
        </RevealItem>
      ))}
    </div>
  )
}

interface RevealItemProps {
  children: ReactNode
  className?: string
  delay: number
}

function RevealItem({ children, className, delay }: RevealItemProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "transform-gpu transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className,
      )}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  )
}
