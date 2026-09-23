"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "section"
}

/**
 * Reveals content once when it enters the viewport. Content is always
 * present in the DOM (no permanent hidden state) and reduced-motion users
 * see the final state immediately via the global CSS override.
 */
export function SectionReveal({ children, className, delay = 0, as = "div" }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Comp = as

  return (
    <Comp
      ref={ref as never}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  )
}

interface StaggerGroupProps {
  children: ReactNode[]
  className?: string
  itemClassName?: string
  staggerMs?: number
}

export function StaggerGroup({ children, className, itemClassName, staggerMs = 80 }: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-[opacity,transform] duration-500 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            itemClassName,
          )}
          style={{ transitionDelay: `${index * staggerMs}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
