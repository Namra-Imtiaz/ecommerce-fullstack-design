import Hero from "@/components/Hero"
import FeaturedProducts from "@/components/FeaturedProducts"
import CategorySection from "@/components/CategorySection"
import Newsletter from "@/components/Newsletter"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <Newsletter />
    </div>
  )
}

