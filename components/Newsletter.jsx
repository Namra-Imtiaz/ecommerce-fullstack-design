"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In Week 2, we'll connect this to the backend
    setIsSubmitted(true)
  }

  return (
    <section className="py-12 my-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
      <div className="text-center max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-muted-foreground mb-6">
          Stay updated with our latest products, exclusive offers, and promotions.
        </p>

        {isSubmitted ? (
          <div className="bg-primary/10 text-primary p-4 rounded-lg">
            <p>Thank you for subscribing! Check your email for confirmation.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" className="rounded-full">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}

