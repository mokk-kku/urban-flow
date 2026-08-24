import { isSupabaseConfigured, supabase } from './supabase-client.js';

const form = document.getElementById('auth-form');
const toggleBtn = document.getElementById('toggle-auth');
const registerFields = document.getElementById('register-fields');
const registerPasswordConfirm = document.getElementById('register-password-confirm');
const authTitle = document.getElementById('auth-title');
const authSubtitle = document.getElementById('auth-subtitle');
const submitBtn = document.getElementById('submit-btn');
const statusBox = document.getElementById('auth-status');
const displayNameInput = document.getElementById('display-name');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordInput = document.getElementById('password');

let currentLang = localStorage.getItem('urban_lang') || 'th';
let isLogin = true;

function tr(th, en) {
    return currentLang === 'th' ? th : en;
}

function setStatus(message = '', type = '') {
    statusBox.textContent = message;
    statusBox.className = 'auth-status';
    if (!message) {
        statusBox.classList.add('hidden');
        return;
    }
    statusBox.classList.add(type === 'success' ? 'success' : 'error');
}

function updateStaticText() {
    document.querySelectorAll('[data-en]').forEach((element) => {
        element.innerText = element.getAttribute(`data-${currentLang}`);
    });
    document.body.className = currentLang === 'th' ? 'th-lang' : '';
    document.getElementById('lang-btn').innerText = currentLang === 'th' ? '🇬🇧 EN' : '🇹🇭 TH';
    updateModeText();
}

function updateModeText() {
    authTitle.innerText = isLogin
        ? tr('ยินดีต้อนรับกลับมา', 'Welcome Back')
        : tr('สร้างบัญชีใหม่', 'Create Account');
    authSubtitle.innerText = isLogin
        ? tr('เข้าสู่ระบบด้วยบัญชี Urban Flow', 'Sign in with your Urban Flow account')
        : tr('สร้างบัญชีเพื่อบันทึกเส้นทางและส่งรายงาน', 'Create an account to save routes and submit reports');
    submitBtn.innerText = isLogin ? tr('เข้าสู่ระบบ', 'Sign In') : tr('ลงทะเบียน', 'Register');
    toggleBtn.innerText = isLogin
        ? tr('ยังไม่มีบัญชี? สร้างบัญชีใหม่', 'No account? Create one')
        : tr('มีบัญชีแล้ว? กลับไปเข้าสู่ระบบ', 'Already registered? Back to Login');
    registerFields.classList.toggle('hidden', isLogin);
    registerPasswordConfirm.classList.toggle('hidden', isLogin);
    displayNameInput.required = !isLogin;
    confirmPasswordInput.required = !isLogin;
    passwordInput.autocomplete = isLogin ? 'current-password' : 'new-password';
}

async function redirectIfAlreadySignedIn() {
    if (!supabase) return;
    const { data, error } = await supabase.auth.getUser();
    if (!error && data.user) window.location.replace('index.html');
}

document.getElementById('lang-btn').addEventListener('click', () => {
    currentLang = currentLang === 'th' ? 'en' : 'th';
    localStorage.setItem('urban_lang', currentLang);
    updateStaticText();
});

toggleBtn.addEventListener('click', (event) => {
    event.preventDefault();
    isLogin = !isLogin;
    setStatus();
    updateModeText();
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus();

    if (!isSupabaseConfigured || !supabase) {
        setStatus(tr(
            'ยังไม่ได้ตั้งค่า Supabase Publishable Key ใน src/config.js',
            'Supabase Publishable Key is not configured in src/config.js.'
        ));
        return;
    }

    const email = document
        .getElementById('email')
        .value
        .normalize('NFKC')
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .trim()
        .toLowerCase();

    const password = document.getElementById('password').value;

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        throw new Error(
            tr(
                'รูปแบบอีเมลไม่ถูกต้อง',
                'Invalid email format.'
            )
        );
    }

    submitBtn.disabled = true;
    submitBtn.innerText = tr('กำลังดำเนินการ...', 'Please wait...');

    function getAuthErrorMessage(error) {
        switch (error?.code) {
            case 'email_address_invalid':
                return tr(
                    'รูปแบบอีเมลไม่ถูกต้อง',
                    'The email address is invalid.'
                );

            case 'over_email_send_rate_limit':
                return tr(
                    'ระบบส่งอีเมลยืนยันบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง',
                    'Too many verification emails have been sent. Please wait and try again.'
                );

            case 'user_already_exists':
                return tr(
                    'อีเมลนี้ถูกใช้สมัครสมาชิกแล้ว',
                    'This email is already registered.'
                );

            case 'weak_password':
                return tr(
                    'รหัสผ่านยังไม่ผ่านข้อกำหนดด้านความปลอดภัย',
                    'The password does not meet the security requirements.'
                );

            default:
                return error?.message ||
                    tr(
                        'เกิดข้อผิดพลาด กรุณาลองใหม่',
                        'Something went wrong. Please try again.'
                    );
        }
    }

    try {
        if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            window.location.replace('index.html');
            return;
        }

        const displayName = displayNameInput.value.trim();
        const confirmPassword = confirmPasswordInput.value;

        if (displayName.length < 2) {
            throw new Error(tr('ชื่อแสดงผลต้องมีอย่างน้อย 2 ตัวอักษร', 'Display name must contain at least 2 characters.'));
        }
        if (password.length < 6) {
            throw new Error(tr('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร', 'Password must contain at least 6 characters.'));
        }
        if (password !== confirmPassword) {
            throw new Error(tr('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน', 'Passwords do not match.'));
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { display_name: displayName },
                emailRedirectTo: new URL('index.html', window.location.href).href,
            },
        });
        if (error) throw error;

        if (data.session) {
            window.location.replace('index.html');
            return;
        }

        setStatus(tr(
            'สมัครสมาชิกสำเร็จ กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชีก่อนเข้าสู่ระบบ',
            'Registration successful. Check your email to confirm the account before signing in.'
        ), 'success');
        isLogin = true;
        updateModeText();
        document.getElementById('password').value = '';
        confirmPasswordInput.value = '';
    } catch (error) {
        console.error('Supabase Auth Error:', {
            message: error?.message,
            code: error?.code,
            status: error?.status,
            name: error?.name,
        });

        setStatus(getAuthErrorMessage(error));
        
    } finally {
        submitBtn.disabled = false;
        updateModeText();
    }
});

updateStaticText();
if (!isSupabaseConfigured) {
    setStatus(tr(
        'ตั้งค่า SUPABASE_PUBLISHABLE_KEY ใน src/config.js ก่อนใช้งาน Register/Login',
        'Set SUPABASE_PUBLISHABLE_KEY in src/config.js before using Register/Login.'
    ));
}
redirectIfAlreadySignedIn();
