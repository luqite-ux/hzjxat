import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 6,
        }}
      >
        <svg width="26" height="26" viewBox="0 0 100 100">
          <path
            d="M20 8 L38 8 L38 62 Q38 84 16 84 L10 84 L10 70 L14 70 Q24 70 24 60 L24 8 Z M24 8"
            fill="#E0071B"
          />
          <path d="M46 8 L64 8 L78 34 L92 8 L100 8 L82 44 L100 84 L82 84 L67 56 L52 84 L44 84 L64 44 Z" fill="#E0071B" />
        </svg>
      </div>
    ),
    { ...size },
  )
}
