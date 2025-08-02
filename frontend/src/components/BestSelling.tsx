import { useGetAllClothes } from "@/hooks/useClothes";
import type { Clothes } from "@/utils/types";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

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
  return "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=912&q=80";
}
function getRandomSubset<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

export default function BestSelling() {
  const { data, isLoading, isError } = useGetAllClothes();

  // Properly type clothes array
  const clothes: Clothes[] = Array.isArray(data?.clothes)
    ? (data.clothes as Clothes[])
    : [];

  const dogBestsellers = useMemo(() => {
    return getRandomSubset(
      clothes.filter(
        (item) =>
          item.category === "Male" &&
          item.bestseller === true
      ),
      4
    );
  }, [clothes]);

  const catBestsellers = useMemo(() => {
    return getRandomSubset(
      clothes.filter(
        (item) =>
          item.category === "Female" &&
          item.bestseller === true
      ),
      4
    );
  }, [clothes]);

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-12 xl:px-16">
      <Tabs defaultValue="dogs" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl font-bold tracking-tight">Popular Pets</h2>
            <TabsList>
              <TabsTrigger value="dogs">Dogs</TabsTrigger>
              <TabsTrigger value="cats">Cats</TabsTrigger>
            </TabsList>
          </div>
          <Button variant="default" className="text-sm px-5 py-2 font-mono font-semibold" asChild>
            <Link to="/clothes/all">View All Pets</Link>
          </Button>
        </div>
        <TabsContent value="dogs">
          {isLoading ? (
            <div className="w-full flex justify-center py-12">
              <span className="text-gray-400 text-lg">Loading...</span>
            </div>
          ) : isError ? (
            <div className="w-full flex justify-center py-12">
              <span className="text-red-500 text-lg">Failed to load pets.</span>
            </div>
          ) : dogBestsellers.length === 0 ? (
            <div className="w-full flex justify-center py-12">
              <span className="text-gray-400 text-lg">No dogs available.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {dogBestsellers.map((item) => (
                <Link
                  to={`/clothes/${item._id}`}
                  key={item._id}
                  className="group block"
                  tabIndex={0}
                  aria-label={`Go to ${item.name} page`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="group border rounded-lg shadow-sm bg-white p-2 flex flex-col transition hover:shadow-md">
                    <div className="relative w-full overflow-hidden rounded-md">
                      <img
                        src={getProductImage(item.imagePath)}
                        alt={item.name}
                        className="w-full h-auto object-cover"
                      />
                      <Button
                        className="absolute bottom-0 w-full rounded-none bg-black text-white text-sm py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black"
                      >
                        Adopt Now
                      </Button>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">{joinVals(item.color)}</p>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm font-semibold">{getDisplayPrice(item.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="cats">
          {isLoading ? (
            <div className="w-full flex justify-center py-12">
              <span className="text-gray-400 text-lg">Loading...</span>
            </div>
          ) : isError ? (
            <div className="w-full flex justify-center py-12">
              <span className="text-red-500 text-lg">Failed to load pets.</span>
            </div>
          ) : catBestsellers.length === 0 ? (
            <div className="w-full flex justify-center py-12">
              <span className="text-gray-400 text-lg">No cats available.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {catBestsellers.map((item) => (
                <Link
                  to={`/clothes/${item._id}`}
                  key={item._id}
                  className="group block"
                  tabIndex={0}
                  aria-label={`Go to ${item.name} page`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="group border rounded-lg shadow-sm bg-white p-2 flex flex-col transition hover:shadow-md">
                    <div className="relative w-full overflow-hidden rounded-md">
                      <img
                        src={getProductImage(item.imagePath)}
                        alt={item.name}
                        className="w-full h-auto object-cover"
                      />
                      <Button
                        className="absolute bottom-0 w-full rounded-none bg-black text-white text-sm py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black"
                      >
                        Adopt Now
                      </Button>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">{joinVals(item.color)}</p>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm font-semibold">{getDisplayPrice(item.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
// components/ProductSidebar.tsx
