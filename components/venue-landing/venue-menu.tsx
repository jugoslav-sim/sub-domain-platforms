import { VenueEditorData } from '@/lib/venue-editor-schema';

interface VenueMenuProps {
    data: VenueEditorData;
}

export function VenueMenu({ data }: VenueMenuProps) {
    const { menuItems, menuCategories, themeColor } = data;

    if (!menuItems || menuItems.length === 0) {
        return null;
    }

    // Group items by category
    const categories = menuCategories && menuCategories.length > 0
        ? menuCategories
        : [...new Set(menuItems.map(item => item.category))];

    const signatureItems = menuItems.filter(item => item.isSignature);

    return (
        <section className="py-20 bg-gray-50" id="menu">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
                    <p className="text-gray-600">Signature drinks and culinary delights</p>
                </div>

                {/* Signature Items Highlight */}
                {signatureItems.length > 0 && (
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            ✨ Signature Selections
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {signatureItems.slice(0, 6).map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                                >
                                    {item.imageUrl && (
                                        <div className="aspect-video relative overflow-hidden">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div
                                                className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                                                style={{ backgroundColor: themeColor }}
                                            >
                                                Signature
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
                                            <span
                                                className="text-lg font-bold"
                                                style={{ color: themeColor }}
                                            >
                                                {item.price}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Full Menu by Category */}
                <div className="max-w-4xl mx-auto space-y-12">
                    {categories.map((category) => {
                        const categoryItems = menuItems.filter(item => item.category === category && !item.isSignature);
                        if (categoryItems.length === 0) return null;

                        return (
                            <div key={category}>
                                <h3
                                    className="text-xl font-bold mb-6 pb-2 border-b-2"
                                    style={{ borderColor: themeColor }}
                                >
                                    {category}
                                </h3>
                                <div className="space-y-4">
                                    {categoryItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-start gap-4"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                                </div>
                                                {item.description && (
                                                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                                )}
                                            </div>
                                            <span className="font-semibold text-gray-900 whitespace-nowrap">
                                                {item.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
