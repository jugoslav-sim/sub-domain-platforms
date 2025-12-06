'use client';

import * as React from 'react';
import { useAuth } from '@/lib/auth/context';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { updateProfileAction, deleteVenueAction, deleteAllVenuesAction, deleteAccountAction, exportDataAction } from './actions';
import { getUserVenuesAction } from '@/app/admin/actions';
import { Loader2, Download, Trash2, AlertTriangle, Save, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function SettingsPage() {
    const { user, profile } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const [venues, setVenues] = React.useState<any[]>([]);

    React.useEffect(() => {
        getUserVenuesAction().then(setVenues);
    }, []);

    if (!user || !profile) return null;

    return (
        <div className="container max-w-4xl mx-auto py-10 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="data">Data & Privacy</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileSettings profile={profile} user={user} />
                </TabsContent>

                <TabsContent value="data">
                    <DataSettings venues={venues} onVenuesChange={setVenues} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function ProfileSettings({ profile, user }: { profile: any, user: any }) {
    const [isSaving, setIsSaving] = React.useState(false);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            fullName: profile.full_name || '',
            avatarUrl: profile.avatar_url || ''
        }
    });

    const onSubmit = async (data: any) => {
        setIsSaving(true);
        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('avatarUrl', data.avatarUrl);

        const result = await updateProfileAction(formData);
        setIsSaving(false);

        if (result.success) {
            toast({ title: 'Profile updated', description: 'Your changes have been saved.' });
            window.location.reload(); // Reload to refresh auth context
        } else {
            toast({ title: 'Error', description: result.error, variant: 'destructive' });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                    Manage your public profile information.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={profile.avatar_url} />
                        <AvatarFallback className="text-lg">
                            {profile.full_name?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <Label>Email</Label>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Display Name</Label>
                        <Input id="fullName" {...register('fullName')} placeholder="Your Name" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="avatarUrl">Avatar URL</Label>
                        <Input id="avatarUrl" {...register('avatarUrl')} placeholder="https://..." />
                        <p className="text-xs text-muted-foreground">Link to an image for your profile picture.</p>
                    </div>

                    <Button type="submit" disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

function DataSettings({ venues, onVenuesChange }: { venues: any[], onVenuesChange: (v: any[]) => void }) {
    const [isExporting, setIsExporting] = React.useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        const result = await exportDataAction();
        setIsExporting(false);

        if (result.success) {
            // Create downloadable JSON blob
            const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `venuevibe-export-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast({ title: 'Export Ready', description: 'Your data has been downloaded.' });
        } else {
            toast({ title: 'Export Failed', description: result.error, variant: 'destructive' });
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Export Data</CardTitle>
                    <CardDescription>
                        Download a copy of all your venue data in JSON format.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" onClick={handleExport} disabled={isExporting}>
                        {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                        Download Data Archive
                    </Button>
                </CardContent>
            </Card>

            <VenueList venues={venues} onVenuesChange={onVenuesChange} />

            <DangerZone onVenuesChange={onVenuesChange} />
        </div>
    );
}

function VenueList({ venues, onVenuesChange }: { venues: any[], onVenuesChange: (v: any[]) => void }) {
    const handleDelete = async (venueId: string) => {
        const result = await deleteVenueAction(venueId);
        if (result.success) {
            onVenuesChange(venues.filter(v => v.id !== venueId));
            toast({ title: 'Venue Deleted', description: 'The venue has been removed.' });
            window.location.reload(); // Refresh to update selector
        } else {
            toast({ title: 'Error', description: result.error, variant: 'destructive' });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Venues</CardTitle>
                <CardDescription>Manage your existing venues.</CardDescription>
            </CardHeader>
            <CardContent>
                {venues.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                        You don't have any venues yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {venues.map(venue => (
                            <div key={venue.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <div className="font-medium">{venue.name}</div>
                                    <div className="text-sm text-muted-foreground">@{venue.tag}</div>
                                </div>
                                <DeleteConfirmationDialog
                                    title={`Delete ${venue.name}?`}
                                    description="This action cannot be undone. This will permanently delete this venue and all associated data."
                                    confirmText="DELETE"
                                    onConfirm={() => handleDelete(venue.id)}
                                >
                                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </DeleteConfirmationDialog>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function DangerZone({ onVenuesChange }: { onVenuesChange: (v: any[]) => void }) {
    const router = useRouter();

    const handleDeleteAllVenues = async () => {
        const result = await deleteAllVenuesAction();
        if (result.success) {
            onVenuesChange([]);
            toast({ title: 'All Venues Deleted', description: 'All your venues have been removed.' });
            window.location.reload();
        } else {
            toast({ title: 'Error', description: result.error, variant: 'destructive' });
        }
    };

    const handleDeleteAccount = async () => {
        const result = await deleteAccountAction();
        if (result.success) {
            window.location.href = '/'; // Redirect to home after deletion/signout
        } else {
            toast({ title: 'Error', description: result.error, variant: 'destructive' });
        }
    };

    return (
        <Card className="border-red-200 bg-red-50/10">
            <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>
                    Irreversible actions. Please proceed with caution.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white">
                    <div>
                        <div className="font-medium text-red-900">Delete All Venues</div>
                        <div className="text-sm text-muted-foreground">Remove all venues you own.</div>
                    </div>
                    <DeleteConfirmationDialog
                        title="Delete All Venues?"
                        description="This will permanently delete ALL venues you own. This action cannot be undone."
                        confirmText="DELETE"
                        onConfirm={handleDeleteAllVenues}
                    >
                        <Button variant="destructive" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                            Delete All Venues
                        </Button>
                    </DeleteConfirmationDialog>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white">
                    <div>
                        <div className="font-medium text-red-900">Delete Account</div>
                        <div className="text-sm text-muted-foreground">Permanently delete your account and data.</div>
                    </div>
                    <DeleteConfirmationDialog
                        title="Delete Account?"
                        description="This will permanently delete your account, profile, and all venues. This action cannot be undone."
                        confirmText="DELETE ACCOUNT"
                        onConfirm={handleDeleteAccount}
                    >
                        <Button variant="destructive">
                            Delete Account
                        </Button>
                    </DeleteConfirmationDialog>
                </div>
            </CardContent>
        </Card>
    );
}

interface DeleteConfirmationDialogProps {
    title: string;
    description: string;
    confirmText: string;
    onConfirm: () => Promise<void> | void;
    children: React.ReactNode;
}

function DeleteConfirmationDialog({ title, description, confirmText, onConfirm, children }: DeleteConfirmationDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleConfirm = async () => {
        if (input !== confirmText) return;
        setIsLoading(true);
        await onConfirm();
        setIsLoading(false);
        setOpen(false);
        setInput('');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-red-600 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        {title}
                    </DialogTitle>
                    <DialogDescription className="py-2">
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Type <span className="font-mono font-bold text-red-600">{confirmText}</span> to confirm:</Label>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={confirmText}
                            className="font-mono"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={input !== confirmText || isLoading}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
