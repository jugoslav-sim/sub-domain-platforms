'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function ImageUpload({ value, onChange, placeholder = "https://..." }: ImageUploadProps) {
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleFile = (file: File) => {
        // In a real app, we would upload to a server here.
        // For this demo, we'll create a local object URL.
        const url = URL.createObjectURL(file);
        onChange(url);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1"
                />
                <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                />
            </div>

            <div
                className={cn(
                    "relative w-full h-48 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-colors overflow-hidden bg-muted/30",
                    isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                    value ? "border-none" : ""
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {value ? (
                    <>
                        <img
                            src={value}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onChange('')}
                                type="button"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Remove Image
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center p-4">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">
                            Drag & drop or click upload
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Recommended size: 1200x400px
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
