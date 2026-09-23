import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"
import { Suspense } from "react"
import { ContactForm } from "@/components/contact-form"
import { SectionReveal } from "@/components/section-reveal"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contact / Request a Quote",
  description:
    "Request a quote or discuss a custom automation project with Hangzhou Jianxin Automation Technology Co., Ltd.",
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <SectionReveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Contact</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Request a Quote</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Tell us about your part, target production volume and process requirements. Our engineering team reviews
          every inquiry and follows up directly.
        </p>
      </SectionReveal>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <SectionReveal className="rounded-sm border border-border bg-card p-6 lg:col-span-2 lg:order-2">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </SectionReveal>

        <SectionReveal className="space-y-6 lg:order-1">
          <div className="rounded-sm border border-border bg-secondary/40 p-6">
            <h2 className="text-sm font-semibold text-foreground">Contact Details</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{siteConfig.addressEn}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={siteConfig.phoneHref} className="hover:text-foreground">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="text-sm font-semibold text-foreground">What to include</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Part drawings or samples</li>
              <li>Target production volume</li>
              <li>Inspection or test criteria</li>
              <li>Line interface constraints, if any</li>
            </ul>
          </div>
        </SectionReveal>
      </div>
    </div>
  )
}
