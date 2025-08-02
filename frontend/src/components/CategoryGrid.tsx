
const categories = [
    {
        label: "Dogs",
        image:
            "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=912&q=80",
    },
    {
        label: "Cats",
        image:
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=843&q=80",
    },
    {
        label: "Puppies",
        image:
            "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
        label: "Kittens",
        image:
            "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
];
export default function CategoryGrid() {
    return (
        <section className="w-full py-12 px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, idx) => (
                    <div key={idx} className="relative group overflow-hidden rounded-md shadow-sm aspect-[3/4]">
                        <img
                            src={cat.image}
                            alt={cat.label}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-black text-white text-sm font-semibold px-2 py-1 rounded-sm">
                            {cat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}