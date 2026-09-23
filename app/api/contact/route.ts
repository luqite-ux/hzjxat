import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from "@/lib/inquiry-captcha"

interface ContactPayload {
  name: string
  company: string
  email: string
  phone: string
  interest?: string
  message: string
  captchaScope?: string
  captchaToken?: string
  captchaAnswer?: string
}

export const dynamic = "force-dynamic"

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" }
const text = (value: unknown, maxLength: number) => (typeof value === "string" ? value.trim().slice(0, maxLength) : "")

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400, headers: NO_STORE_HEADERS })
  }

  const requiredFields: (keyof ContactPayload)[] = ["name", "company", "email", "phone", "message"]
  const missingFields = requiredFields.filter((field) => !payload[field]?.toString().trim())

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missingFields.join(", ")}` },
      { status: 400, headers: NO_STORE_HEADERS },
    )
  }

  const secret = process.env.CAPTCHA_SECRET?.trim()
  if (!secret) {
    return NextResponse.json({ error: "Verification service is temporarily unavailable." }, { status: 503, headers: NO_STORE_HEADERS })
  }

  try {
    const { tenantId, siteScope, store } = createSupabaseCaptchaContextFromEnv()
    const captcha = await verifyCaptchaSubmission({
      secret,
      tenantId,
      siteScope,
      store,
      scope: text(payload.captchaScope, 160),
      token: text(payload.captchaToken, 4096),
      answer: text(payload.captchaAnswer, 16),
    })
    if (!captcha.ok) {
      return NextResponse.json({ error: "The verification code is incorrect or expired. Please try again." }, { status: 400, headers: NO_STORE_HEADERS })
    }
  } catch {
    return NextResponse.json({ error: "Verification service is temporarily unavailable." }, { status: 503, headers: NO_STORE_HEADERS })
  }

  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim() ?? ""
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? ""
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? ""
  if (!tenantId || !supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: "Inquiry service is temporarily unavailable." }, { status: 503, headers: NO_STORE_HEADERS })
  }

  const email = text(payload.email, 320)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400, headers: NO_STORE_HEADERS })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })

  const inquiry = {
    tenant_id: tenantId,
    name: text(payload.name, 200),
    email,
    phone: text(payload.phone, 80),
    company: text(payload.company, 200),
    subject: text(payload.interest, 300) || "Website inquiry",
    message: text(payload.message, 10_000),
    status: "unread",
  }

  const { error } = await supabase.from("inquiries").insert(inquiry).select("id").single()
  if (error) {
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 503, headers: NO_STORE_HEADERS })
  }

  return NextResponse.json({ ok: true }, { status: 201, headers: NO_STORE_HEADERS })
}
