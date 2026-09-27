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
} from "./github.js"

import {
    initContactForm
} from "./contact.js"


function initNavigation() {
    const menuButton = document.querySelector("#menu-button")
    const navigation = document.querySelector("#navigation")

    menuButton.addEventListener("click", () => {
        navigation.classList.toggle('active');

        const isOpen = navigation.classList.contains("active");

        menuButton.setAttribute("aria-expanded", isOpen);
    });

    const links = navigation.querySelectorAll("a");

    links.forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", (event) => {
        const isOpen = navigation.classList.contains("active");

        if (!isOpen)
            return;

        const clickedMenuButton = menuButton.contains(event.target);
        const clickedNavigation = navigation.contains(event.target);

        if (!clickedMenuButton && !clickedNavigation) {
            navigation.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
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

    const initialTheme = 
        savedTheme !== null
            ? savedTheme
            : mediaQuery.matches
                ? "dark"
                : "light";

    applyTheme(initialTheme);

    themeButton.addEventListener("click", () => {
        const currentTheme = document.documentElement.dataset.theme;

        const nextTheme = 
            currentTheme === "dark"
                ? "light"
                : "dark";

        applyTheme(nextTheme);

        localStorage.setItem(
            "theme",
            nextTheme
        );
    });

    mediaQuery.addEventListener("change", (event) => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme !== null) {
            return;
        }

        applyTheme(
            event.matches
                ? "dark"
                : "light"
        );
    });
}

function applyTheme(theme) {
    const themeButton = document.querySelector("#theme-button");
    const profileImage = document.querySelector("#about-profile-image");

    document.documentElement.dataset.theme = theme;

    const isDark = theme === "dark";

    themeButton.setAttribute(
        "aria-pressed",
        isDark
    );

    profileImage.src = isDark
        ? "./assets/images/profile-dark.png"
        : "./assets/images/profile.png"
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

        initNavigation();
        initContactForm(content.contact.endpoint);
        initTopButton();
        initHeaderScroll();
        initTheme();
        initScrollAnimation();

        await loadProjects(
            content.projects.username
        );
    } catch (error) {
        console.error("Failed to initialize: ", error);
    }
}

main();