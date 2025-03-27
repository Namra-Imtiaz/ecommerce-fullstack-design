import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AuthProvider from "@/components/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EcoShop - Your Online Store",
  description: "Find the best products at the best prices",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'