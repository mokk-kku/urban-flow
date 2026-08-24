import { state } from '../core/app-state.js';
import { supabase } from '../supabase-client.js';

export async function loadCurrentProfile(user) {
    state.currentUser = user;
    state.userEmail = user?.email || '';
    state.userName = user?.user_metadata?.display_name || state.userEmail.split('@')[0] || 'Urban Flow User';

    if (!supabase || !user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url, preferred_language, account_status, reputation_score')
        .eq('id', user.id)
        .maybeSingle();

    if (error) {
        console.error('Failed to load profile:', error);
        return null;
    }

    if (data) {
        state.userProfile = data;
        state.userName = data.display_name || state.userName;
        if (data.preferred_language && !localStorage.getItem('urban_lang')) {
            state.currentLang = data.preferred_language;
        }
    }

    return data;
}

export async function updateCurrentProfile({ displayName }) {
    if (!supabase || !state.currentUser) throw new Error('Authentication required');

    const { data, error } = await supabase
        .from('profiles')
        .update({ display_name: displayName })
        .eq('id', state.currentUser.id)
        .select('id, display_name, avatar_url, preferred_language, account_status, reputation_score')
        .single();

    if (error) throw error;
    state.userProfile = data;
    state.userName = data.display_name;
    return data;
}

export async function savePreferredLanguage(language) {
    if (!supabase || !state.currentUser || !['th', 'en'].includes(language)) return;
    const { error } = await supabase
        .from('profiles')
        .update({ preferred_language: language })
        .eq('id', state.currentUser.id);
    if (error) console.error('Could not save preferred language:', error);
}
