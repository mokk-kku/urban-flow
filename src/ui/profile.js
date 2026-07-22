import { $ } from '../core/dom.js';
import { state } from '../core/app-state.js';

export function setupProfile() {
    updateProfileUI();
    $('accountMenuItem').addEventListener('click', () => $('sub-edit-profile').classList.add('active'));
    $('openEditProfile').addEventListener('click', () => $('sub-edit-profile').classList.add('active'));
    $('closeEditProfile').addEventListener('click', () => $('sub-edit-profile').classList.remove('active'));
    $('saveProfileBtn').addEventListener('click', saveProfile);
    $('logoutBtn').addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = 'auth.html';
    });
}

export function updateProfileUI() {
    $('profileName').innerText = state.userName;
    $('profileEmail').innerText = state.userEmail;
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(state.userName)}&background=333&color=fff&size=150`;
    $('userAvatar').src = avatarUrl;
    $('editAvatarPreview').src = avatarUrl;
    $('editNameInput').value = state.userName;
}

export function saveProfile() {
    const newName = $('editNameInput').value.trim();
    if (!newName) return;
    state.userName = newName;
    localStorage.setItem(`urban_name_${state.userEmail}`, state.userName);
    updateProfileUI();
    $('sub-edit-profile').classList.remove('active');
}
