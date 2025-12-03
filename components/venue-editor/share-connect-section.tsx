'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Download, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { VenueEditorData } from '@/lib/venue-editor-schema';

export function ShareConnectSection() {
    const { watch } = useFormContext<VenueEditorData>();
    const [copied, setCopied] = React.useState(false);

    // In a real app, this would be the actual public URL
    const venueName = watch('venueName');
    const themeColor = watch('themeColor');

    // Generate a mock slug from the name
    const slug = venueName ? venueName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'your-venue';
    const venueUrl = `https://venuevibe.com/v/${slug}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(venueUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadQRCode = (type: 'branded' | 'bw') => {
        const svg = document.getElementById('venue-qrcode');
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
                // Fill white background
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);

                const pngFile = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.download = `venue-qr-${type}.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
            }
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return (
        <Card className="h-full">
            <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg">Share & Connect</CardTitle>
                </div>
                <CardDescription>
                    Get your venue in front of customers.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-gray-50 p-8 rounded-xl flex items-center justify-center">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <QRCodeSVG
                            id="venue-qrcode"
                            value={venueUrl}
                            size={180}
                            level="M"
                            fgColor={themeColor}
                            includeMargin={true}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="relative">
                        <Input value={venueUrl} readOnly className="pr-10 bg-gray-50" />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full text-muted-foreground hover:text-foreground"
                            onClick={handleCopy}
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" onClick={() => downloadQRCode('branded')}>
                            <Download className="h-4 w-4 mr-2" />
                            Branded
                        </Button>
                        <Button variant="outline" onClick={() => downloadQRCode('bw')}>
                            <Download className="h-4 w-4 mr-2" />
                            B&W
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
