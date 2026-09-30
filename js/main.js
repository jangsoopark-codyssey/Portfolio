import { 
    loadContent,
    renderSite,
    renderHero,
    renderAbout,
    renderSkills,
    renderProjects,
    renderContact,
    renderFooter
} from "./content.js";

import {
    loadProjects
} from "./github.js";

import {
    initContactForm
} from "./contact.js";

import {
    STATE
} from "./state.js";


function initHeroTyping() {
    const heroText = document.querySelector("#hero-main-text");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        return;
    }

    const fullText = heroText.textContent.trim();
    if (!fullText) {
        return;
    }

    heroText.textContent = "";

    let index = 0;
    const typingInterval = setInterval(() => {
        heroText.textContent += fullText[index];

        index += 1;

        if (index >= fullText.length) {
            clearInterval(typingInterval);

            heroText.classList.add("typing-complete");
        }
    }, 45);
}

function initNavigation() {
    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector("#navigation");

    const renderNavigation = () => {
        navigation.classList.toggle(
            "active",
            STATE.menuOpen
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(STATE.menuOpen)
        );
    };

    menuButton.addEventListener("click", () => {
        STATE.menuOpen = !STATE.menuOpen;

        renderNavigation();
    });

    const links = navigation.querySelectorAll("a");

    links.forEach((link) => {
        link.addEventListener("click", () => {
            STATE.menuOpen = false;

            renderNavigation();
        });
    });

    document.addEventListener("click", (event) => {
        if (!STATE.menuOpen) {
            return;
        }

        const clickedMenuButton = menuButton.contains(event.target);
        const clickedNavigation = navigation.contains(event.target);

        if (!clickedMenuButton && !clickedNavigation) {
            STATE.menuOpen = false;

            renderNavigation();
        }
    });

    renderNavigation();
}

function initTopButton() {
    const topButton = document.querySelector("#top-button");

    window.addEventListener("scroll", () => {
        if (window.scrollY >= 300) {
            topButton.hidden = false;
        } else {
            topButton.hidden = true;
        }
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function initHeaderScroll() {
    const header = document.querySelector("#header");

    window.addEventListener("scroll", () => {
        const isScrolled = window.scrollY >= 60;

        header.classList.toggle("scrolled", isScrolled);
    });
}

function initTheme() {
    const themeButton = document.querySelector("#theme-button");
    const savedTheme = localStorage.getItem("theme");
    const mediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );

    STATE.theme = 
        savedTheme !== null
            ? savedTheme
            : mediaQuery.matches
                ? "dark"
                : "light";

    applyTheme();

    themeButton.addEventListener("click", () => {
        STATE.theme = 
            STATE.theme === "dark"
                ? "light"
                : "dark";

        localStorage.setItem(
            "theme",
            STATE.theme
        );

        applyTheme();
    });

    mediaQuery.addEventListener("change", (event) => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme !== null) {
            return;
        }

        STATE.theme = event.matches ? "dark" : "light";

        applyTheme();
    });
}

function applyTheme() {
    const themeButton = document.querySelector("#theme-button");
    const profileImage = document.querySelector("#about-profile-image");

    document.documentElement.dataset.theme = STATE.theme;

    const isDark = STATE.theme === "dark";

    themeButton.setAttribute(
        "aria-pressed",
        String(isDark)
    );

    profileImage.src = isDark
        ? "./assets/images/profile-dark.png"
        : "./assets/images/profile.png";
}

function initScrollAnimation() {
    const targets = document.querySelectorAll(
        "#about, #skills, #projects, #contact"
    );

    if (!("IntersectionObserver" in window)) {
        return;
    }

    targets.forEach((target) => {
        target.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.2
        }
    );

    targets.forEach((target) => {
        observer.observe(target);
    });
}

function initDesktopToc() {
    const sections = document.querySelectorAll(
        "#hero, #about, #skills, #projects, #contact"
    );

    const links = document.querySelectorAll(
        "#desktop-toc-nav a"
    );

    const renderActiveSection = () => {
        links.forEach((link) => {
            const isActive = 
                link.dataset.section === STATE.activeSection;

            link.classList.toggle("active", isActive);
        });
    };

    const updateActiveSection = () => {
        const referenceY = window.innerHeight * 0.35;

        let nextSection = STATE.activeSection;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= referenceY && rect.bottom > referenceY) {
                nextSection = section.id;
            }
        });

        if (nextSection === STATE.activeSection) {
            return;
        }
        
        STATE.activeSection = nextSection;
        
        renderActiveSection();
    };

    window.addEventListener(
        "scroll",
        updateActiveSection
    )

    window.addEventListener(
        "resize",
        updateActiveSection
    )

    updateActiveSection();
    renderActiveSection();
}

async function main() {
    try {
        const content = await loadContent();

        renderSite(content.site);
        renderHero(content.hero);
        renderAbout(content.about);
        renderSkills(content.skills);
        renderProjects(content.projects);
        renderContact(content.contact);
        renderFooter(content.footer);

        initHeroTyping();
        initNavigation();
        initContactForm(content.contact.endpoint);
        initTopButton();
        initHeaderScroll();
        initTheme();
        initScrollAnimation();
        initDesktopToc();

        await loadProjects(
            content.projects.username
        );
    } catch (error) {
        console.error("Failed to initialize: ", error);
    }
}

main();