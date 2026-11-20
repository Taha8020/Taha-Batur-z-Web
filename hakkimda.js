// Hakkımda Sayfası — Dil Sözlüğü & Fonksiyonlar

const i18n = {
    tr: {
        nav_home: "Anasayfa",
        nav_about: "Hakkımda",
        nav_projects: "Projeler",
        nav_contact: "İletişim",
        nav_contact_btn: "İletişime geç",

        about_status: "Back-end Geliştirici & Sistem Altyapısı",
        about_hero_intro: "Merhaba, ben",
        about_hero_lead: "Teknik altyapı bilgisini yazılım geliştirme yetkinliğiyle birleştiren bir <strong>Back-end Geliştirici</strong>.",

        about_journey_title: "Eğitim & Deneyim",
        about_skills_title: "Yetkinlikler",

        // Timeline
        tl_edu_badge: "Eğitim",
        tl_work_badge: "Staj",
        tl_uni_date: "2023 — Devam ediyor",
        tl_uni_title: "Sakarya Uygulamalı Bilimler Üniversitesi",
        tl_uni_sub: "Back-end Yazılım Geliştirme",
        tl_uni_desc: "Veri yapıları, algoritma tasarımı, veritabanı sistemleri ve yazılım mimarisi üzerine kapsamlı akademik eğitim.",
        tl_intern_date: "2022 — 2023",
        tl_intern_title: "Saran Holding — IT Departmanı",
        tl_intern_sub: "Sistem Altyapısı & IT Destek Stajyeri",
        tl_intern_desc: "Kurumsal sunucu yönetimi, ağ cihazı yapılandırması, donanım teşhisi ve IT varlık envanteri yönetimi alanlarında gerçek saha deneyimi kazandım.",
        tl_hs_date: "2019 — 2023",
        tl_hs_title: "Teknik Lise",
        tl_hs_sub: "Bilişim Teknolojileri",
        tl_hs_desc: "Donanım, ağ altyapısı ve temel yazılım geliştirme alanlarında teknik eğitim. Sistem kurulum ve bakım becerilerinin temeli bu dönemde atıldı.",

        // Skills labels
        sg_lang: "Diller & Temeller",
        sg_system: "Sistem & Ağ",
        sg_arch: "Mimari & Veri",
        sg_tools: "Araçlar & Ortam",

        // Özet
        about_summary: "Teknik liseden gelen sağlam donanım temeli, Saran Holding'deki kurumsal IT deneyimi ve üniversitedeki yazılım mimarisi eğitimini bir araya getiriyorum. Hedefim; saha gerçekliğini bilen, uçtan uca çalışan sistemler tasarlayan bir back-end geliştirici olmak.",

        // Footer
        footer_desc: "Back-end Geliştirici & Sistem Altyapısı",
        footer_copy: "© 2024 Taha Batur Öz. Tüm hakları saklıdır."
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_projects: "Projects",
        nav_contact: "Contact",
        nav_contact_btn: "Contact Me",

        about_status: "Back-end Developer & Systems Infrastructure",
        about_hero_intro: "Hello, I'm",
        about_hero_lead: "A <strong>Back-end Developer</strong> who bridges deep systems knowledge with modern software development.",

        about_journey_title: "Education & Experience",
        about_skills_title: "Skills",

        // Timeline
        tl_edu_badge: "Education",
        tl_work_badge: "Internship",
        tl_uni_date: "2023 — Present",
        tl_uni_title: "Sakarya University of Applied Sciences",
        tl_uni_sub: "Back-end Software Development",
        tl_uni_desc: "Comprehensive academic training in data structures, algorithm design, database systems, and software architecture.",
        tl_intern_date: "2022 — 2023",
        tl_intern_title: "Saran Holding — IT Department",
        tl_intern_sub: "Systems Infrastructure & IT Support Intern",
        tl_intern_desc: "Gained hands-on enterprise experience in server management, network device configuration, hardware diagnostics, and IT asset inventory management.",
        tl_hs_date: "2019 — 2023",
        tl_hs_title: "Technical High School",
        tl_hs_sub: "Information Technologies",
        tl_hs_desc: "Technical training in hardware, network infrastructure, and foundational software development. The groundwork for system setup and maintenance skills was laid here.",

        // Skills labels
        sg_lang: "Languages & Fundamentals",
        sg_system: "Systems & Networking",
        sg_arch: "Architecture & Data",
        sg_tools: "Tools & Environment",

        // Summary
        about_summary: "I combine a strong hardware foundation from technical high school, real-world corporate IT experience at Saran Holding, and software architecture education from university. My goal is to become a back-end developer who understands field realities and builds reliable end-to-end systems.",

        // Footer
        footer_desc: "Back-end Developer & Systems Infrastructure",
        footer_copy: "© 2024 Taha Batur Öz. All rights reserved."
    }
};

// Dil Değiştirme
function setLanguage(lang) {
    if (!i18n[lang]) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) {
            el.innerHTML = i18n[lang][key];
        }
    });

    document.documentElement.lang = lang;

    const titles = { tr: 'Hakkımda | Taha Batur Öz', en: 'About | Taha Batur Öz' };
    document.title = titles[lang] || document.title;

    const btnEn = document.getElementById('btn-en');
    const btnTr = document.getElementById('btn-tr');
    if (lang === 'en') {
        btnEn.classList.add('active');
        btnTr.classList.remove('active');
    } else {
        btnTr.classList.add('active');
        btnEn.classList.remove('active');
    }

    try { localStorage.setItem('preferred_language', lang); } catch (e) {}
}

// Navbar scroll compact
function initHeaderScrollWatcher() {
    const header = document.querySelector('.header');
    if (!header) return;
    let ticking = false;

    function handleScroll() {
        const shouldCompact = window.scrollY > 80;
        header.classList.toggle('scrolled-compact', shouldCompact);
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

    const btnEn = document.getElementById('btn-en');
    const btnTr = document.getElementById('btn-tr');
    if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
    if (btnTr) btnTr.addEventListener('click', () => setLanguage('tr'));

    // Kayıtlı dil tercihi
    try {
        const savedLang = localStorage.getItem('preferred_language');
        if (savedLang) setLanguage(savedLang);
    } catch (e) {}
});
