export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ reason?: string; error?: string }> }) {
  const { reason, error } = await searchParams
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">杭州剑欣自动化科技有限公司</h1>
          <p className="mt-2 text-sm text-slate-500">网站管理后台登录</p>
        </div>
        {reason === 'unauthorized' && <p className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">请先登录后再访问管理后台</p>}
        <form action="/api/auth/login" method="post" className="space-y-4">
          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          <div className="space-y-2"><label htmlFor="email" className="text-sm font-medium text-slate-700">邮箱</label><input id="email" name="email" type="email" autoComplete="email" required className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" /></div>
          <div className="space-y-2"><label htmlFor="password" className="text-sm font-medium text-slate-700">密码</label><input id="password" name="password" type="password" autoComplete="current-password" required className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" /></div>
          <button type="submit" className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800">登录</button>
        </form>
      </div>
    </div>
  )
}
