'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onUpload?: (file: File) => Promise<string>;
}

export function ImageUpload({ value, onChange, placeholder = "https://...", onUpload }: ImageUploadProps) {
    const [isDragging, setIsDragging] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    // Check if the value is a valid displayable URL (http/https)
    const isValidImageUrl = (url: string) => {
        if (!url) return false;
        // Only display http/https URLs, not blob: or uuid-like strings
        return url.startsWith('http://') || url.startsWith('https://');
    };

    // Reset error state when value changes
    React.useEffect(() => {
        setImageError(false);
    }, [value]);

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

    const handleFile = async (file: File) => {
        if (onUpload) {
            try {
                setIsUploading(true);
                const url = await onUpload(file);
                setIsUploading(false);
                onChange(url);
                toast({
                    title: "Image uploaded",
                    description: "Your image has been successfully uploaded."
                });
            } catch (error) {
                console.error('Upload failed:', error);
                setIsUploading(false);
                toast({
                    title: "Upload failed",
                    description: `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    variant: "destructive"
                });
            }
        } else {
            // For older implementations or demos
            const url = URL.createObjectURL(file);
            onChange(url);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1"
                    disabled={isUploading}
                />
                <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <Upload className="h-4 w-4 mr-2" />
                    )}
                    {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={isUploading}
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
                {isUploading ? (
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                        <p className="text-sm">Uploading image...</p>
                    </div>
                ) : (value && isValidImageUrl(value) && !imageError) ? (
                    <>
                        <img
                            src={value}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                            onError={() => setImageError(true)}
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
