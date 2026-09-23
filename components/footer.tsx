import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"
import { navigation, siteConfig } from "@/lib/site-config"

export function Footer() {
  const year = new Date().getFullYear()
  const copyrightOwner = siteConfig.legalNameEn.replace(/[.;:!?；。：！？\s]+$/u, "")
  const copyrightText = `© ${year} ${copyrightOwner}. All rights reserved.`

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" aria-label="Jianxin Automation home">
              <Image
                src="/images/logo/jx-logo.png"
                alt="Jianxin Automation logo"
                width={140}
                height={72}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{siteConfig.legalNameEn}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Navigate</h3>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Products</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                  Custom Automation Equipment
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                  Standard Automation Equipment
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="text-sm text-muted-foreground hover:text-foreground">
                  Engineering Capabilities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-3">
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
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  )
}
