import { 
    loadContent,
    renderSite,
    renderHero
} from "./content.js";

async function main() {
    try {
        const content = await loadContent();

        renderSite(content.site);
        renderHero(content.hero);

        console.log("Portfolio content rendered.");
    } catch (error) {
        console.error("Failed to initialize: ", error);
    }
}

main();