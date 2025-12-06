'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { VenueEditorData } from '@/lib/venue-editor-schema';

interface VenueGalleryProps {
    data: VenueEditorData;
}

export function VenueGallery({ data }: VenueGalleryProps) {
    const { galleryImages, themeColor } = data;
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

    if (!galleryImages || galleryImages.length === 0) {
        return null;
    }

    return (
        <>
            <section className="py-20 bg-white" id="gallery">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
                        <p className="text-gray-600">Take a peek inside our space</p>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryImages.slice(0, 8).map((image, index) => (
                            <button
                                key={image.id}
                                onClick={() => setSelectedImage(image.url)}
                                className={`relative overflow-hidden rounded-xl group ${index === 0 ? 'col-span-2 row-span-2' : ''
                                    }`}
                            >
                                <div className={`aspect-square ${index === 0 ? 'aspect-auto h-full' : ''}`}>
                                    <img
                                        src={image.url}
                                        alt={image.alt || `Gallery image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Gallery preview"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
