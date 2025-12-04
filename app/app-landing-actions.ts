'use server';

import { redis } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { AppLandingEditorData, defaultAppLandingData } from '@/lib/app-landing-editor-schema';

const APP_LANDING_CONFIG_KEY = 'app-landing-config';

export async function saveAppLandingData(data: AppLandingEditorData) {
    try {
        await redis.set(APP_LANDING_CONFIG_KEY, JSON.stringify(data));
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to save app landing data:', error);
        return { success: false, error: 'Failed to save data' };
    }
}

export async function getAppLandingData(): Promise<AppLandingEditorData> {
    try {
        const data = await redis.get(APP_LANDING_CONFIG_KEY);
        if (data && typeof data === 'string') {
            return JSON.parse(data) as AppLandingEditorData;
        }
        if (data && typeof data === 'object') {
            return data as AppLandingEditorData;
        }
        return defaultAppLandingData;
    } catch (error) {
        console.error('Failed to get app landing data:', error);
        return defaultAppLandingData;
    }
}
