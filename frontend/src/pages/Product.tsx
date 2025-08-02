import ProductSidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useGetAllClothes } from "@/hooks/useClothes";
import type { Clothes } from "@/utils/types";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom"; // <-- If you use Next.js, use "next/link"

const filters = [
  "All",
  "Dogs",
  "Cats",
  "Golden Retriever",
  "Labrador",
  "Persian",
  "Siamese",
  "Others",
];

const filterTypeSet = new Set([
  "Dogs",
  "Cats",
  "Golden Retriever",
  "Labrador",
  "Persian",
  "Siamese",
]);

const fallbackProductImage =
  "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=912&q=80";

// Helper functions
function getDisplayPrice(price: Clothes["price"]): string {
  if (price && typeof price === "object" && "$numberDecimal" in price)
    return (
      "₨ " +
      Number(price.$numberDecimal).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  if (typeof price === "string" && !isNaN(Number(price)))
    return (
      "₨ " +
      Number(price).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  if (typeof price === "number" && !isNaN(price))
    return "₨ " + price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return "—";
}
function joinVals(val: string[] | string) {
  if (Array.isArray(val)) return val.join(", ");
  return typeof val === "string" ? val : "";
}
function getProductImage(url?: string | null) {
  if (
    url &&
    (url.toLowerCase().endsWith(".jpg") ||
      url.toLowerCase().endsWith(".jpeg") ||
      url.toLowerCase().endsWith(".png") ||
      url.toLowerCase().endsWith(".webp") ||
      url.startsWith("data:image"))
  ) {
    return url;
  }
  return fallbackProductImage;
}

type ProductCard = {
  id: string;
  name: string;
  price: string;
  color: string;
  size: string;
  productImage: string;
  type: string;
};

export default function ProductPage() {
  const { data, isLoading, isError } = useGetAllClothes();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Map backend Clothes to the card type
  const products: ProductCard[] = useMemo(
    () =>
      Array.isArray(data?.clothes)
        ? data.clothes.map((item: Clothes) => ({
          id: item._id ?? "",
          name: item.name,
          price: getDisplayPrice(item.price),
          color: joinVals(item.color),
          size: joinVals(item.size),
          productImage: getProductImage(item.imagePath),
          type: item.type,
        }))
        : [],
    [data]
  );

  // Filtering: "All" shows all, others match type (case-insensitive), "Others" shows everything not in filterTypeSet
  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products;
    if (activeFilter === "Others") {
      return products.filter(
        (p) => !filterTypeSet.has(p.type.trim())
      );
    }
    return products.filter(
      (p) => p.type.trim().toLowerCase() === activeFilter.trim().toLowerCase()
    );
  }, [activeFilter, products]);

  return (
    <div className="flex w-full px-4 py-6">
      <ProductSidebar />

      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-6">All Pets Available for Adoption</h1>
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => (
            <Button
              key={f}
              variant={activeFilter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(f)}
              className={activeFilter === f ? "" : "bg-white"}
            >
              {f}
            </Button>
          ))}
        </div>

        {/* Handle loading, error, empty */}
        {isLoading ? (
          <div className="w-full flex justify-center py-20">
            <span className="text-gray-400 text-lg">Loading pets...</span>
          </div>
        ) : isError ? (
          <div className="w-full flex justify-center py-20">
            <span className="text-red-500 text-lg">Failed to load pets.</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="w-full flex justify-center py-20">
            <span className="text-gray-400 text-lg">No pets available for adoption.</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                to={`/clothes/${product.id}`}
                key={product.id}
                className="group block"
                tabIndex={0}
                aria-label={`Go to ${product.name} page`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="group border rounded-lg shadow-sm bg-white p-2 flex flex-col transition hover:shadow-md">
                  <div className="relative w-full overflow-hidden rounded-sm">
                    <img
                      src={product.productImage}
                      alt={product.name}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center text-xs py-1 opacity-0 group-hover:opacity-100 transition">
                      Adopt Now
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Breed: {product.color}</p>
                  <p className="text-xs text-gray-500">Age: {product.size}</p>
                  <p className="text-sm font-medium mt-1">{product.name}</p>
                  <p className="text-sm font-semibold">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
