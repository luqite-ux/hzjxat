/**
 * Locale-ready data helper. The first release ships English-only UI, but every
 * translatable string is stored as a { en: string } record so additional
 * languages can be added later without restructuring page or data code.
 */
export type Locale = "en"

export const defaultLocale: Locale = "en"

export type LocalizedText = Record<Locale, string>

export function t(text: LocalizedText, locale: Locale = defaultLocale): string {
  return text[locale] ?? text.en
}

export function localized(en: string): LocalizedText {
  return { en }
}
