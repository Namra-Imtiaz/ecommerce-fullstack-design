import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">Shop the Latest Trends</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Discover our curated collection of high-quality products at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="rounded-full">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full">
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://i.pinimg.com/474x/6b/48/d8/6b48d8d00175e526864753a2d8b9315c.jpg"
              alt="Featured Products"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

