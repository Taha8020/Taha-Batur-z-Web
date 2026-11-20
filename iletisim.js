// İletişim Sayfası — Dil Sözlüğü, Form & Fonksiyonlar

// Formun doğrudan gönderilmesi için Formspree / Web3Forms gibi bir adres yapıştır.
// Örn: 'https://formspree.io/f/xxxxxxxx'  — boş bırakılırsa e-posta uygulaması açılır.
const FORM_ENDPOINT = '';
const MAIL_TO = 'tahabaturoz@gmail.com';

const i18n = {
    tr: {
        nav_home: "Anasayfa",
        nav_about: "Hakkımda",
        nav_projects: "Projeler",
        nav_contact: "İletişim",
        nav_contact_btn: "İletişime geç",

        c_status: "Back-end Geliştirici & Sistem Altyapısı",
        c_title: "Benimle iletişime geç",
        c_lead: "Bir proje, staj ya da iş birliği fikrin varsa mesaj bırak. Dilersen aşağıdaki kanallardan doğrudan da ulaşabilirsin.",
        c_direct: "Doğrudan iletişim",
        c_form: "Mesaj gönder",

        f_name: "Ad Soyad",
        f_email: "E-posta",
        f_msg: "Mesajın",
        ph_msg: "Projeni ya da sorunu kısaca anlat",
        f_send: "Mesajı gönder",
        f_sending: "Mesaj gönderiliyor…",
        f_ok: "Mesaj gönderildi. En kısa sürede dönüş yapacağım.",
        f_err: "Mesaj gönderilemedi. Bağlantını kontrol edip tekrar dene ya da doğrudan e-posta at.",
        f_mailto: "E-posta uygulaman açılıyor. Mesajı orada göndermen yeterli.",

        m_title: "Konum",
        m_sub: "Çağlayan Adliyesi çevresi, İstanbul",
        m_btn: "Yol tarifi al",

        footer_desc: "Back-end Geliştirici & Sistem Altyapısı",
        footer_copy: "© 2024 Taha Batur Öz. Tüm hakları saklıdır."
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_projects: "Projects",
        nav_contact: "Contact",
        nav_contact_btn: "Contact Me",

        c_status: "Back-end Developer & Systems Infrastructure",
        c_title: "Get in touch",
        c_lead: "Have a project, internship or collaboration in mind? Leave a message, or reach me directly through the channels below.",
        c_direct: "Direct contact",
        c_form: "Send a message",

        f_name: "Full name",
        f_email: "Email",
        f_msg: "Your message",
        ph_msg: "Briefly describe your project or question",
        f_send: "Send message",
        f_sending: "Sending message…",
        f_ok: "Message sent. I'll get back to you soon.",
        f_err: "Couldn't send the message. Check your connection and try again, or email me directly.",
        f_mailto: "Your email app is opening. Just press send there.",

        m_title: "Location",
        m_sub: "Around Çağlayan Courthouse, Istanbul",
        m_btn: "Get directions",

        footer_desc: "Back-end Developer & Systems Infrastructure",
        footer_copy: "© 2024 Taha Batur Öz. All rights reserved."
    }
};

let lang = 'tr';
const t = key => i18n[lang][key];

// Dil Değiştirme
function setLanguage(l) {
    if (!i18n[l]) return;
    lang = l;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const v = i18n[l][el.dataset.i18n];
        if (v) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const v = i18n[l][el.dataset.i18nPh];
        if (v) el.placeholder = v;
    });

    document.documentElement.lang = l;
    document.title = l === 'en' ? 'Contact | Taha Batur Öz' : 'İletişim | Taha Batur Öz';
    document.getElementById('btn-en').classList.toggle('active', l === 'en');
    document.getElementById('btn-tr').classList.toggle('active', l !== 'en');

    try { localStorage.setItem('preferred_language', l); } catch (e) {}
}

// Mesaj formu
function initForm() {
    const form = document.getElementById('msg-form');
    const btn = form.querySelector('button[type="submit"]');
    const status = document.getElementById('form-status');

    // Durum mesajı data-i18n taşır, dil değişince kendiliğinden çevrilir
    function say(key, cls) {
        status.className = 'c-status' + (cls ? ' ' + cls : '');
        if (key) { status.dataset.i18n = key; status.textContent = t(key); }
        else { delete status.dataset.i18n; status.textContent = ''; }
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const data = new FormData(form);
        if (data.get('_gotcha')) return; // bot tuzağı

        // Adres tanımlı değilse: e-posta uygulamasını hazır mesajla aç
        if (!FORM_ENDPOINT) {
            const subject = 'Web sitesinden mesaj: ' + data.get('name');
            const body = data.get('message') + '\n\n— ' + data.get('name') + ' (' + data.get('email') + ')';
            location.href = 'mailto:' + MAIL_TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            say('f_mailto', 'ok');
            return;
        }

        btn.disabled = true;
        say('f_sending');
        try {
            const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
            if (!res.ok) throw new Error(res.status);
            form.reset();
            say('f_ok', 'ok');
        } catch (err) {
            say('f_err', 'err');
        }
        btn.disabled = false;
    });
}

// Navbar scroll compact
function initHeaderScrollWatcher() {
    const header = document.querySelector('.header');
    if (!header) return;
    let ticking = false;

    function handleScroll() {
        header.classList.toggle('scrolled-compact', window.scrollY > 80);
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) { window.requestAnimationFrame(handleScroll); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
}

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScrollWatcher();
    initForm();

    document.getElementById('btn-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('btn-tr').addEventListener('click', () => setLanguage('tr'));

    try {
        const saved = localStorage.getItem('preferred_language');
        if (saved) setLanguage(saved);
    } catch (e) {}
});
