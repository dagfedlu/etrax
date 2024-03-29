"use client"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import { ChakraProvider, extendTheme } from "@chakra-ui/react"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

import { usePathname } from "next/navigation"
import { Providers } from "./providers"
import PlayerLayout from "../components/playerLayout"
import "reset-css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = usePathname()
  const isAuthPage = router.includes("/signup") || router.includes("/signin")
  return (
    <Providers>
      {isAuthPage ? <>{children}</> : <PlayerLayout>{children}</PlayerLayout>}
    </Providers>
  )
}
