import {
    STATE
} from "./state.js";


export async function loadProjects(username) {
    const filters = document.querySelector("#project-filters");
    const status = document.querySelector("#projects-status");
    const list = document.querySelector("#projects-list");

    renderLoading(filters, status, list);

    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos`
        );
        
        if (!response.ok) {
            throw new Error(`Github API error: ${response.status}`);
        }

        const projects = await response.json();

        if (projects.length === 0) {
            renderEmpty(filters, status, list);
            return;
        }

        renderSuccess(filters, status, list, projects);

    } catch(error) {
        console.error(error);

        renderError(filters, status, list, username);
    }
}

function renderLoading(filters, status, list) {
    filters.replaceChildren();
    list.replaceChildren();
    status.replaceChildren();

    const message = document.createElement("p");

    message.classList.add("projects-status__message");
    message.textContent = "Loading projects...";

    status.className = "projects-status projects-status--loading";

    status.appendChild(message);
}

function renderEmpty(filters, status, list) {
    filters.replaceChildren();
    list.replaceChildren();
    status.replaceChildren();

    const message = document.createElement("p");

    message.classList.add("projects-status__message");
    message.textContent = "No projects to display.";

    status.className = "projects-status projects-status--empty";
    status.appendChild(message);
}

function renderSuccess(filters, status, list, projects) {
    status.replaceChildren();
    status.className = "projects-status";

    renderProjectFilters(filters, list, projects);
    renderProjectCards(list, projects);
}

function renderProjectCards(list, projects) {
    const cards = projects.map((project) => {
        return createProjectCard(project);
    });

    list.replaceChildren(...cards);
}

function renderProjectFilters(filters, list, projects) {
    filters.replaceChildren();
    
    const languages = projects
        .map((project) => project.language)
        .filter((language) => language !== null)
        .filter((language, index, array) => array.indexOf(language) === index)
        .sort();

    const allButton = createFilterButton("All", STATE.activeProjectFilter === "All");

    allButton.addEventListener("click", () => {
        STATE.activeProjectFilter = "All";

        setActiveFilter(filters, allButton);
        renderProjectCards(list, projects);
    });

    filters.appendChild(allButton);

    languages.forEach((language) => {
        const button = createFilterButton(language, STATE.activeProjectFilter === language);

        button.addEventListener("click", () => {
            STATE.activeProjectFilter = language;

            const filteredProjects = 
                projects.filter((project) => {
                    return project.language === STATE.activeProjectFilter;
                });

            setActiveFilter(filters, button);
            renderProjectCards(list, filteredProjects);
        });

        filters.appendChild(button);
    });
}

function createFilterButton(label, isActive=false) {
    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("project-filter");

    if (isActive) {
        button.classList.add("active");
    }

    button.textContent = label;
    return button;
}

function setActiveFilter(filters, activeButton) {
    const buttons = filters.querySelectorAll(".project-filter");

    buttons.forEach((button) => {
        button.classList.remove("active");
    });
    activeButton.classList.add("active");
}

function createProjectCard(project) {
    const {
        name,
        description,
        html_url,
        language,
        stargazers_count,
        forks_count,
        updated_at
    } = project;

    const article = document.createElement("article");
    article.classList.add("project-card");

    const title = document.createElement("h3");
    title.classList.add("project-card__title");
    title.textContent = name;

    const summary = document.createElement("p");
    summary.classList.add("project-card__description");
    summary.textContent = description || "No description provided.";

    const metadata = document.createElement("div");
    metadata.classList.add("project-card__metadata");

    metadata.textContent = `${language || "N/A"} · Stars ${stargazers_count} · Forks ${forks_count}`;

    const link = document.createElement("a");
    link.classList.add("project-card__link");

    link.href = html_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    
    link.textContent = "View Repository";

    article.append(
        title, 
        summary,
        metadata,
        link
    );

    return article;
}

function renderError(filters, status, list, username) {
    filters.replaceChildren();
    list.replaceChildren();
    status.replaceChildren();

    const message = document.createElement("p");
    message.classList.add("projects-status__message");
    message.textContent = "Failed to load projects.";

    const retryButton = document.createElement("button");
    retryButton.classList.add("projects-status__retry");
    retryButton.type = "button";
    retryButton.textContent = "Retry";

    retryButton.addEventListener("click", () => {
        loadProjects(username);
    });

    status.className = "projects-status projects-status--error";

    status.append(
        message,
        retryButton
    );
}