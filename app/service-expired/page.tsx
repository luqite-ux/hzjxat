import Link from 'next/link'

export const metadata = {
  title: 'Website Service Notice | Hangzhou Jianxin Automation Technology Co., Ltd.',
  robots: { index: false, follow: false },
}

export default function ServiceExpiredPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="w-full max-w-2xl rounded-3xl border border-white/15 bg-white/5 p-8 text-center shadow-2xl md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Service notice</p>
        <h1 className="mt-4 text-3xl font-bold md:text-5xl">Website service is temporarily unavailable</h1>
        <p className="mt-5 text-base leading-7 text-white/75">
          Please contact the site administrator for service assistance. The administration portal remains available.
        </p>
        <Link
          href="/admin/login"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-300 px-6 font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        >
          Administrator login
        </Link>
      </section>
    </main>
  )
}
