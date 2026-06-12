import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Palm Leather 3D Simulator",
  description: "Interactive 3D comparison of date-palm-waste leather alternative methodologies."
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
