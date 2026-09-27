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

    const initialTheme = 
        savedTheme === "dark"
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
}

function applyTheme(theme) {
    const themeButton = document.querySelector("#theme-button");

    document.documentElement.dataset.theme = theme;

    const isDark = theme === "dark";

    themeButton.setAttribute(
        "aria-pressed",
        isDark
    );
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

        await loadProjects(
            content.projects.username
        );
    } catch (error) {
        console.error("Failed to initialize: ", error);
    }
}

main();