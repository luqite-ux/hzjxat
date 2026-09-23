"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "section"
}

export function SectionReveal({ children, className, delay = 0, as = "div" }: SectionRevealProps) {
  const Comp = as

  return (
    <Comp
      className={cn(
        "opacity-100 translate-y-0 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-700",
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
  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "opacity-100 translate-y-0 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-500",
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
