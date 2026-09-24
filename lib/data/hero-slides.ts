export interface HeroSlide {
  image: string
  alt: string
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  /** Which side of the image has real negative space for copy overlay. */
  safeSide: "left" | "right"
}

export const heroSlides: HeroSlide[] = [
  {
    image: "/images/hero/hero-1.jpg",
    alt: "Robotic arms operating on an automated production line beside a modern factory facade at dawn",
    eyebrow: "Custom Automation Systems",
    title: "Engineered automation for demanding production lines",
    description:
      "Hangzhou Jianxin Automation designs and builds custom equipment for automotive, medical and electronics manufacturers who need reliable, repeatable process control.",
    ctaLabel: "Request a Quote",
    ctaHref: "/contact",
    safeSide: "left",
  },
  {
    image: "/images/hero/hero-2.jpg",
    alt: "Robotic arm placing an electronic component onto a conveyor during an automated assembly process",
    eyebrow: "Vision Inspection & Assembly",
    title: "Vision-guided assembly and traceability for critical components",
    description:
      "Machine vision inspection integrated with assembly and testing lines helps automotive, medical device and electronics teams catch defects before they leave the line.",
    ctaLabel: "View Products",
    ctaHref: "/products",
    safeSide: "right",
  },
  {
    image: "/images/hero/hero-3.jpg",
    alt: "A complete non-standard automation module with vision cameras, actuators and control cabinet on a workshop floor",
    eyebrow: "End-to-End Engineering",
    title: "From concept and design to build, test and commissioning",
    description:
      "Our engineering team carries every project from requirement analysis through on-site commissioning, so equipment performs as specified from day one.",
    ctaLabel: "Explore Capabilities",
    ctaHref: "/capabilities",
    safeSide: "left",
  },
]
