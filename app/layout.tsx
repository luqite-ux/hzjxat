import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: {
    default: 'Hangzhou Jianxin Automation Technology Co., Ltd. | Custom Automation & Machine Vision',
    template: '%s | Jianxin Automation',
  },
  description:
    'Hangzhou Jianxin Automation Technology Co., Ltd. engineers custom automation equipment, machine vision inspection, robotics applications and assembly/testing lines for automotive, medical, electronics and industrial manufacturers.',
  metadataBase: new URL(`https://${siteConfig.domain}`),
  keywords: [
    'custom automation equipment',
    'machine vision inspection',
    'assembly and testing line',
    'non-standard automation China',
    'Hangzhou automation manufacturer',
  ],
  openGraph: {
    title: 'Hangzhou Jianxin Automation Technology Co., Ltd.',
    description:
      'Custom automation equipment, machine vision inspection and robotics applications engineered in Hangzhou, China.',
    url: `https://${siteConfig.domain}`,
    siteName: 'Jianxin Automation',
    locale: 'en_US',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#f7f5f1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
