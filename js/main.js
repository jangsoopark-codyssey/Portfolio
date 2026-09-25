import { 
    loadContent,
    renderSite,
    renderHero
} from "./content.js";

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
}

async function main() {
    try {
        const content = await loadContent();

        renderSite(content.site);
        renderHero(content.hero);

        initNavigation();
    } catch (error) {
        console.error("Failed to initialize: ", error);
    }
}

main();