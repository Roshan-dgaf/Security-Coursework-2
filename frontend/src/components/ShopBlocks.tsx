import { Button } from "@/components/ui/button";

const blocks = [
  {
    label: "Shop Dogs",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=912&q=80",
  },
  {
    label: "Shop Cats",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=912&q=80",
  },
];

export default function ShopBlocks() {
  return (
    <section className="w-full px-4 py-8 md:px-8 lg:px-12 xl:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blocks.map((block, index) => (
          <div key={index} className="relative w-full h-full overflow-hidden rounded-md">
            <img
              src={block.image}
              alt={block.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
              <p className="text-white font-semibold text-sm sm:text-base">{block.label}</p>
              <div className="flex gap-2">
                <Button variant="secondary" className="bg-white text-black hover:bg-gray-200">
                  New Releases
                </Button>
                <Button variant="secondary" className="bg-white text-black hover:bg-gray-200">
                  Best Sellers
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
