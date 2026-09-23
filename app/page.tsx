import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Cpu, Eye, Layers, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HeroCarousel } from "@/components/hero-carousel"
import { ProductGrid } from "@/components/product-grid"
import { ApplicationGrid } from "@/components/application-grid"
import { SectionReveal } from "@/components/section-reveal"
import { getAllProducts, productCategories } from "@/lib/data/products"
import { industries } from "@/lib/data/industries"
import { capabilities, processSteps } from "@/lib/data/capabilities"
import { faqItems } from "@/lib/data/faq"
import { siteConfig } from "@/lib/site-config"

const capabilityIcons = [Layers, Eye, Cpu, ShieldCheck, Cpu]

export default function HomePage() {
  const products = getAllProducts()
  const featuredProducts = products.slice(0, 6)

  return (
    <>
      <HeroCarousel />

      {/* Product systems */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionReveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">What We Build</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              Custom and standard automation systems
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              From fixed-format vision inspection machines to fully non-standard assembly and testing lines, every
              system is engineered around your part and process requirement.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-sm">
            <Link href="/products">
              View All Products
              <ArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </SectionReveal>

        <div className="mt-8">
          <ProductGrid productList={featuredProducts} />
        </div>

        <SectionReveal className="mt-6 flex flex-wrap gap-2">
          {productCategories.map((category) => (
            <span
              key={category}
              className="rounded-sm border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {category}
            </span>
          ))}
        </SectionReveal>
      </section>

      {/* Industry applications */}
      <section className="border-y border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Industry Applications</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              Built for demanding industrial processes
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Our equipment supports automotive, medical device, electronics and general industrial manufacturers
              across {siteConfig.industries.length} core industries.
            </p>
          </SectionReveal>
          <div className="mt-8">
            <ApplicationGrid industryList={industries.slice(0, 6)} />
          </div>
          <SectionReveal className="mt-6 text-center">
            <Link href="/applications" className="text-sm font-medium text-primary hover:underline">
              See all industry applications
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* Engineering capabilities */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Engineering Capabilities</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
            Machine vision, robotics, software and testing under one roof
          </h2>
        </SectionReveal>

        <div className="mt-10 space-y-14">
          {capabilities.map((capability, index) => {
            const Icon = capabilityIcons[index % capabilityIcons.length]
            const imageFirst = index % 2 === 1
            return (
              <SectionReveal key={capability.title}>
                <div
                  className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 ${
                    imageFirst ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">{capability.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
                    <ul className="mt-4 space-y-2">
                      {capability.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted">
                    <Image
                      src={capability.image || "/placeholder.svg"}
                      alt={capability.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </SectionReveal>
            )
          })}
        </div>
      </section>

      {/* Manufacturing and quality evidence */}
      <section className="border-y border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Manufacturing & Quality</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              A dedicated workshop backing every build
            </h2>
          </SectionReveal>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <SectionReveal className="lg:col-span-2">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted">
                <Image
                  src="/images/company/jx-branded-production-line.jpg"
                  alt="Jianxin Automation branded production line equipment on the workshop floor"
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>
            </SectionReveal>

            <SectionReveal className="grid grid-cols-2 gap-4">
              <div className="rounded-sm border border-border bg-card p-5">
                <p className="text-2xl font-bold text-foreground">{siteConfig.workshop.area}</p>
                <p className="mt-1 text-xs text-muted-foreground">workshop floor area</p>
              </div>
              <div className="rounded-sm border border-border bg-card p-5">
                <p className="text-2xl font-bold text-foreground">{siteConfig.workshop.capacity}</p>
                <p className="mt-1 text-xs text-muted-foreground">production capacity</p>
              </div>
              <div className="col-span-2 rounded-sm border border-border bg-card p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  In-house equipment
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {siteConfig.workshop.equipment.join(" · ")}
                </p>
              </div>
              <div className="col-span-2 rounded-sm border border-border bg-card p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Qualifications</p>
                <ul className="mt-2 space-y-1.5">
                  {siteConfig.qualifications.map((qualification) => (
                    <li key={qualification} className="text-sm text-foreground">
                      {qualification}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Our Process</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
            From requirement to commissioning
          </h2>
        </SectionReveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {processSteps.map((step, index) => (
            <SectionReveal key={step.step} delay={index * 60}>
              <div className="flex h-full flex-col rounded-sm border border-border bg-card p-5">
                <span className="text-2xl font-bold text-primary/70">{step.step}</span>
                <h3 className="mt-2 text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Procurement Notes</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Frequently asked questions</h2>
          </SectionReveal>

          <SectionReveal className="mt-8">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base font-medium">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SectionReveal>
        </div>
      </section>

      {/* Final RFQ band */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
              Ready to discuss your automation requirement?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/85">
              Share your part drawings, target volume and process requirements. Our engineering team will follow up
              with a technical response.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-sm">
                <Link href="/contact">Request a Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-sm border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
