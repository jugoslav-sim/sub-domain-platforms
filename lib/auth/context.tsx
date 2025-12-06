'use client';

import * as React from 'react';
import { createClient } from '@/lib/auth/client';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    profile: {
        id: string;
        email: string;
        full_name: string | null;
        avatar_url: string | null;
        role: 'admin' | 'owner' | 'staff';
    } | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>({
    user: null,
    profile: null,
    isLoading: true,
    signOut: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [profile, setProfile] = React.useState<AuthContextType['profile']>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const supabase = createClient();

    React.useEffect(() => {
        // Get initial session
        const getSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                // Fetch profile
                const { data: profile } = await supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                setProfile(profile);
            }

            setIsLoading(false);
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);

                if (session?.user) {
                    const { data: profile } = await supabase
                        .from('user_profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    setProfile(profile);
                } else {
                    setProfile(null);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [supabase]);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        window.location.href = '/auth/login';
    };

    return (
        <AuthContext.Provider value={{ user, profile, isLoading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return React.useContext(AuthContext);
}
