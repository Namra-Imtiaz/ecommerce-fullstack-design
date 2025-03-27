import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">EcoShop</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your one-stop shop for high-quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories/clothing" className="text-sm text-muted-foreground hover:text-primary">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/categories/electronics" className="text-sm text-muted-foreground hover:text-primary">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/categories/home" className="text-sm text-muted-foreground hover:text-primary">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link href="/categories/beauty" className="text-sm text-muted-foreground hover:text-primary">
                  Beauty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-muted-foreground hover:text-primary">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EcoShop. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <img src="/payment-visa.svg" alt="Visa" className="h-6" />
            <img src="/payment-mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="/payment-paypal.svg" alt="PayPal" className="h-6" />
            <img src="/payment-apple.svg" alt="Apple Pay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  )
}

