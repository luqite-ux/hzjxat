"use client"

import { useState, type FormEvent } from "react"
import { useSearchParams } from "next/navigation"
import { AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { InquiryCaptchaField } from "@/components/inquiry-captcha-field"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { getProductBySlug } from "@/lib/data/products"
import { getIndustryBySlug } from "@/lib/data/industries"

type FormStatus = "idle" | "submitting" | "success" | "error"

export function ContactForm() {
  const searchParams = useSearchParams()
  const productSlug = searchParams.get("product")
  const applicationSlug = searchParams.get("application")
  const prefillInterest =
    (productSlug && getProductBySlug(productSlug)?.name) ||
    (applicationSlug && getIndustryBySlug(applicationSlug)?.name) ||
    ""

  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [captchaRefreshKey, setCaptchaRefreshKey] = useState(0)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    setErrorMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: formData.get("name")?.toString() ?? "",
      company: formData.get("company")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
      interest: formData.get("interest")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
      captchaScope: formData.get("captchaScope")?.toString() ?? "",
      captchaToken: formData.get("captchaToken")?.toString() ?? "",
      captchaAnswer: formData.get("captchaAnswer")?.toString() ?? "",
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error ?? "Something went wrong. Please try again.")
      }

      setStatus("success")
      form.reset()
      setCaptchaRefreshKey((value) => value + 1)
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      setCaptchaRefreshKey((value) => value + 1)
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-sm border border-border bg-secondary/40 p-10 text-center">
        <CheckCircle2 className="h-9 w-9 text-primary" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-foreground">Inquiry received</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thank you for reaching out. Our engineering team will review your requirements and follow up by email or
          phone.
        </p>
        <Button variant="outline" className="mt-2 rounded-sm" onClick={() => setStatus("idle")}>
          Submit Another Inquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup>
        <Field orientation="responsive">
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <FieldContent>
            <Input id="name" name="name" required autoComplete="name" placeholder="Jane Doe" />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="company">Company</FieldLabel>
          <FieldContent>
            <Input id="company" name="company" required autoComplete="organization" placeholder="Your company name" />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <FieldContent>
            <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="phone">Phone / WhatsApp</FieldLabel>
          <FieldContent>
            <Input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+1 234 567 8900" />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="interest">Target Product / Application</FieldLabel>
          <FieldContent>
            <Input
              id="interest"
              name="interest"
              defaultValue={prefillInterest}
              placeholder="e.g. Oil Seal Vision Inspection Machine, or your industry"
            />
            <FieldDescription>Let us know which equipment or application you&apos;re inquiring about.</FieldDescription>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Requirements & Message</FieldLabel>
          <FieldContent>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Describe your part, target volume, inspection or test criteria, and any other requirements."
            />
          </FieldContent>
        </Field>

        <Field className="rounded-sm border border-dashed border-border bg-secondary/30 p-4">
          <FieldContent>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              Image verification
            </div>
            <InquiryCaptchaField refreshKey={captchaRefreshKey} className="mt-3" />
            <FieldDescription>Enter the 4-character code shown in the image before sending your inquiry.</FieldDescription>
          </FieldContent>
        </Field>

        {status === "error" && errorMessage && (
          <FieldError>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {errorMessage}
            </div>
          </FieldError>
        )}

        <Field orientation="responsive">
          <FieldContent>
            <Button type="submit" size="lg" className="rounded-sm" disabled={status === "submitting"}>
              {status === "submitting" && <Spinner className="mr-2" />}
              {status === "submitting" ? "Sending Inquiry..." : "Request a Quote"}
            </Button>
            <FieldDescription>
              We respond to technical inquiries directly by email or phone, with commercial terms discussed after the
              engineering requirements are reviewed.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </form>
  )
}
