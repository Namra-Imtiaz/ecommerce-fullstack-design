import ProductGrid from "@/components/ProductGrid"
import ProductFilter from "@/components/ProductFilter"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <ProductFilter />
        </div>

        <div className="w-full md:w-3/4">
          <ProductGrid />
        </div>
      </div>
    </div>
  )
}

