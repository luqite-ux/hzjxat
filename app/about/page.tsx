import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionReveal, StaggerGroup } from "@/components/section-reveal"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Hangzhou Jianxin Automation Technology Co., Ltd. is a high-tech automation builder in Hangzhou, China, specializing in custom automation equipment, machine vision and robotics applications.",
}

const galleryImages = [
  { src: "/images/company/jx-branded-production-line.jpg", alt: "Jianxin branded automation production line" },
  { src: "/images/company/assembly-line-wide.jpg", alt: "Wide view of an automated assembly line with robotic arms" },
  { src: "/images/company/jx-control-cabinet.jpg", alt: "JX control cabinet on an automation test equipment unit" },
  { src: "/images/company/equipment-enclosure.jpg", alt: "Enclosed automation equipment module in the workshop" },
]

export default function AboutPage() {
  return (
    <div>
      <div className="border-b border-border bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">About Us</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{siteConfig.legalNameEn}</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A high-tech automation builder based in Hangzhou, China, specializing in custom automation equipment,
              machine vision, robotics applications, software development and assembly/testing lines.
            </p>
          </SectionReveal>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-foreground">Who we are</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.legalNameEn} designs and builds automation equipment for manufacturers who need reliable,
              repeatable process control. Our work spans non-standard automation systems, machine vision inspection,
              robot applications, control software and standard automation equipment.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We serve manufacturers across automotive, medical device, electronics, new energy, hardware, adhesive,
              rubber, machining, water meter and household appliance production, engineering each system around each
              customer&apos;s specific part and process requirement.
            </p>
            <div className="mt-6 flex items-start gap-2.5 rounded-sm border border-border bg-secondary/40 p-4">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{siteConfig.addressEn}</p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="rounded-sm border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Confirmed Qualifications</h2>
            <ul className="mt-4 space-y-3">
              {siteConfig.qualifications.map((qualification) => (
                <li key={qualification} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {qualification}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-border pt-5">
              <h3 className="text-sm font-semibold text-foreground">Workshop</h3>
              <dl className="mt-3 space-y-2.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Floor area</dt>
                  <dd className="font-medium text-foreground">{siteConfig.workshop.area}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Layout</dt>
                  <dd className="font-medium text-foreground">{siteConfig.workshop.layout}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Capacity</dt>
                  <dd className="font-medium text-foreground">{siteConfig.workshop.capacity}</dd>
                </div>
              </dl>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Inside the workshop</h2>
          </SectionReveal>
          <StaggerGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerMs={80}>
            {galleryImages.map((image) => (
              <div key={image.src} className="relative aspect-square overflow-hidden rounded-sm bg-muted">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-primary py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
              Let&apos;s discuss your automation project
            </h2>
            <Button asChild size="lg" variant="secondary" className="mt-6 rounded-sm">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}
