const SUPPORTED_VERSION = 1;

export async function loadContent() {
    const response = await fetch("./data/content.json");

    if (!response.ok) {
        throw new Error(
            `Failed to load content: ${response.status} ${response.statusText}`
        );
    }

    const content = await response.json();

    validateVersion(content.version);

    return content;
}

function validateVersion(version) {
    if (!version) {
        throw new Error("content.json version is missing.");
    }

    const major = Number(version.split(".")[0]);

    if (Number.isNaN(major)) {
        throw new Error(
            `Invalid content version: ${version}`
        );
    }

    if (major !== SUPPORTED_VERSION) {
        throw new Error(
            `Unsupported content version: ${version}`
        );
    }
}

export function renderSite(site) {
    document.title = site.title;
    document.documentElement.lang = site.language;

    const description = document.querySelector(
        'meta[name="description"]'
    );

    if (description) {
        description.setAttribute("content", site.description);
    }

    const logo = document.getElementById("logo");
    logo.textContent = site.logo;

    renderNavigation(site.navigation);
    renderTopButton(site.topButton);
}

function renderNavigation(navigation) {
    const list = document.getElementById("navigation-list");

    list.replaceChildren();

    for (const item of navigation) {
        const li = document.createElement('li');

        const link = document.createElement('a');
        link.textContent = item.label;
        link.href = `#${item.target}`;

        li.appendChild(link);
        list.appendChild(li);
    }
}

function renderTopButton(topButton) {
    const button = document.getElementById("top-button");

    button.setAttribute("aria-label", topButton.ariaLabel);

    if (topButton.display.type === "text") {
        button.textContent = topButton.display.value;
    }
}

export function renderHero(hero) {
    const mainText = document.getElementById("hero-main-text");
    const subText = document.getElementById("hero-sub-text");
    const ctaContainer = document.getElementById("hero-cta");

    mainText.textContent = hero.mainText;
    subText.textContent = hero.subText;

    ctaContainer.replaceChildren();

    for (const item of hero.cta) {
        const link = document.createElement('a');

        link.textContent = item.label;
        link.href = `#${item.target}`;

        ctaContainer.appendChild(link);
    }
}

export function renderAbout(about) {
    const heading = document.querySelector("#about-heading");
    const profileImage = document.querySelector("#about-profile-image");
    const intro = document.querySelector("#about-intro");
    const body = document.querySelector("#about-body");

    heading.textContent = about.heading;

    profileImage.src = about.profileImage;
    profileImage.alt = about.profileAlt;

    intro.textContent = about.intro;

    body.replaceChildren();

    about.body.forEach((paragraph) => {
        const p = document.createElement("p");

        p.textContent = paragraph;

        body.appendChild(p);
    });
}

export function renderSkills(skills) {
    const heading = document.querySelector("#skills-heading");
    const list = document.querySelector("#skills-list");

    heading.textContent = skills.heading;

    list.replaceChildren();

    skills.items.forEach((skill) => {
        const article = document.createElement("article");
        article.classList.add("skill-card");

        const title = document.createElement("h3");
        title.classList.add("skill-card__title");
        title.textContent = skill.category;

        const description = document.createElement("p");
        description.classList.add("skill-card__description");
        description.textContent = skill.description;

        const stack = document.createElement("ul");
        stack.classList.add("skill-card__stack");

        skill.stack.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;

            const className = item
                .toLowerCase()
                .replace(/\+/g, "plus")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

            li.classList.add(
                "skill-card__tag",
                `skill-card__tag--${className}`
            );

            stack.appendChild(li);
        });
        
        article.append(
            title,
            description,
            stack
        );

        list.appendChild(article);
    });
}

export function renderProjects(projects) {
    const heading = document.querySelector("#projects-heading");

    heading.textContent = projects.heading;
}

export function renderContact(contact) {
    const heading = document.querySelector("#contact-heading");
    const intro = document.querySelector("#contact-intro");
    const fields = document.querySelector("#contact-fields");
    const submitButton = document.querySelector("#contact-submit");

    heading.textContent = contact.heading;
    intro.textContent = contact.intro;
    submitButton.textContent = contact.button;

    fields.replaceChildren();

    Object.entries(contact.fields).forEach(([name, field]) => {
        const fieldContainer = document.createElement("div");
        fieldContainer.classList.add("form-field");

        const label = document.createElement("label");
        label.htmlFor = `contact-${name}`;
        label.textContent = field.label;

        let input;

        if (name === "message") {
            input = document.createElement("input");
            input.rows = 6;
        } else {
            input = document.createElement("input");
            input.type = name === "email" ? "email" : "text";
        }

        input.id = `contact-${name}`;
        input.name = name;
        input.required = true;

        fieldContainer.append(label, input);
        fields.appendChild(fieldContainer);
    });
}

export function renderFooter(footer) {
    const links = document.querySelector("#footer-links");
    const copyright = document.querySelector("#footer-copyright");

    links.replaceChildren();

    footer.links.forEach((item) => {
        const link = document.createElement("a");

        link.textContent = item.label;
        link.href = item.url;

        if (item.url.startsWith('http')) {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }

        links.appendChild(link)
    });

    copyright.textContent = footer.copyright;
}