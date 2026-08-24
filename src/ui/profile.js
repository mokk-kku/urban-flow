import { $ } from '../core/dom.js';
import { state } from '../core/app-state.js';
import { supabase } from '../supabase-client.js';
import { updateCurrentProfile } from '../services/profile-service.js';

export function setupProfile() {
    updateProfileUI();
    $('accountMenuItem').addEventListener('click', () => $('sub-edit-profile').classList.add('active'));
    $('openEditProfile').addEventListener('click', () => $('sub-edit-profile').classList.add('active'));
    $('closeEditProfile').addEventListener('click', () => $('sub-edit-profile').classList.remove('active'));
    $('saveProfileBtn').addEventListener('click', saveProfile);
    $('logoutBtn').addEventListener('click', logout);
}

export function updateProfileUI() {
    $('profileName').innerText = state.userName || 'Urban Flow User';
    $('profileEmail').innerText = state.userEmail || '';
    const avatarUrl = state.userProfile?.avatar_url
        || `https://ui-avatars.com/api/?name=${encodeURIComponent(state.userName || 'Urban Flow')}&background=333&color=fff&size=150`;
    $('userAvatar').src = avatarUrl;
    $('editAvatarPreview').src = avatarUrl;
    $('editNameInput').value = state.userName || '';
}

export async function saveProfile() {
    const newName = $('editNameInput').value.trim();
    if (newName.length < 2) {
        alert(state.currentLang === 'th' ? 'ชื่อแสดงผลต้องมีอย่างน้อย 2 ตัวอักษร' : 'Display name must contain at least 2 characters.');
        return;
    }

    $('saveProfileBtn').disabled = true;
    try {
        await updateCurrentProfile({ displayName: newName });
        updateProfileUI();
        $('sub-edit-profile').classList.remove('active');
    } catch (error) {
        console.error(error);
        alert(error?.message || 'Could not update profile.');
    } finally {
        $('saveProfileBtn').disabled = false;
    }
}

async function logout() {
    if (!supabase) {
        window.location.replace('auth.html');
        return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    window.location.replace('auth.html');
}
