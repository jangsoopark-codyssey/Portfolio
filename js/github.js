
export async function loadProjects(username) {
    const status = document.querySelector("#projects-status");
    const list = document.querySelector("#projects-list");

    renderLoading(status, list);

    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos`
        );
        
        if (!response.ok) {
            throw new Error(`Github API error: ${response.status}`);
        }

        const projects = await response.json();

        if (projects.length == 0) {
            renderEmpty(status, list);
            return;
        }

        renderSuccess(status, list, projects);

    } catch(error) {
        console.error(error);

        renderError(status, list, username);
    }
}

function renderLoading(status, list) {
    list.replaceChildren();

    status.textContent = "Loading projects...";
}

function renderEmpty(status, list) {
    list.replaceChildren();

    status.textContent = "No projects to display.";
}

function renderSuccess(status, list, projects) {
    status.textContent = "";

    const cards = projects.map((project) => {
        return createProjectCard(project);
    });

    list.replaceChildren(...cards);
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
    title.classList.add("project_card__title");
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

function renderError(status, list, username) {
    list.replaceChildren();
    status.replaceChildren();

    const message = document.createElement("p");
    message.textContent = "Failed to load projects.";

    const retryButton = document.createElement("button");
    retryButton.type = "button";
    retryButton.textContent = "Retry";

    retryButton.addEventListener("click", () => {
        loadProjects(username);
    });

    status.append(
        message,
        retryButton
    );
}