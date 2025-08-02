import ProductSidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useGetAllClothes } from "@/hooks/useClothes";
import type { Clothes } from "@/utils/types";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const filters = [
    "All",
    "Persian",
    "Siamese",
    "Maine Coon",
    "British Shorthair",
    "Ragdoll",
    "Others",
];
const filterTypeSet = new Set([
    "Persian",
    "Siamese",
    "Maine Coon",
    "British Shorthair",
    "Ragdoll",
]);

const fallbackProductImage =
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=843&q=80";

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

const Cats = () => {
    const { data, isLoading, isError } = useGetAllClothes();
    const [activeFilter, setActiveFilter] = useState<string>("All");

    // Filter to only show Female category (representing Cats), case-insensitive
    const catProducts = useMemo(
        () =>
            Array.isArray(data?.clothes)
                ? data.clothes.filter(
                    (item: Clothes) =>
                        item.category &&
                        item.category.trim().toLowerCase() === "female"
                )
                : [],
        [data]
    );

    // Apply type filter only on cat products
    const filteredProducts = useMemo(() => {
        if (activeFilter === "All") return catProducts;
        if (activeFilter === "Others") {
            return catProducts.filter(
                (p: any) => !filterTypeSet.has((p.type ?? "").trim())
            );
        }
        return catProducts.filter(
            (p: any) =>
                (p.type ?? "")
                    .trim()
                    .toLowerCase() === activeFilter.trim().toLowerCase()
        );
    }, [activeFilter, catProducts]);

    return (
        <div className="flex w-full px-4 py-6 font-sans">
            <ProductSidebar />
            <main className="flex-1">
                <h1 className="text-2xl font-bold mb-6">Cats Available for Adoption</h1>
                {/* Filter Chips for breed */}
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
                {/* Loading/Error/Empty/Products */}
                {isLoading ? (
                    <div className="w-full flex justify-center py-20">
                        <span className="text-gray-400 text-lg">Loading cats...</span>
                    </div>
                ) : isError ? (
                    <div className="w-full flex justify-center py-20">
                        <span className="text-red-500 text-lg">Failed to load cats.</span>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="w-full flex justify-center py-20">
                        <span className="text-gray-400 text-lg">No cats available for adoption.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((item: Clothes) => (
                            <Link
                                to={`/clothes/${item._id}`}
                                key={item._id}
                                className="group block"
                                tabIndex={0}
                                aria-label={`Go to ${item.name} page`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <div className="group border rounded-lg shadow-sm bg-white p-2 flex flex-col transition hover:shadow-md">
                                    <div className="relative w-full overflow-hidden rounded-sm">
                                        <img
                                            src={getProductImage(item.imagePath)}
                                            alt={item.name}
                                            className="w-full h-auto object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center text-xs py-1 opacity-0 group-hover:opacity-100 transition">
                                            Adopt Now
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Breed: {joinVals(item.color)}</p>
                                    <p className="text-xs text-gray-500">Age: {joinVals(item.size)}</p>
                                    <p className="text-sm font-medium mt-1">{item.name}</p>
                                    <p className="text-sm font-semibold">{getDisplayPrice(item.price)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Cats; 