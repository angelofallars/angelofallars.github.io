const projectsContainer = document.querySelector(".projects");

class Project {
  constructor(title, body, techUsed, githubName, githubLink) {
    this.title = title;
    this.body = body;
    this.tech = techUsed;
    this.githubName = githubName;
    this.githubLink = githubLink;
  }
}

function createProjectEntry(projectEntry) {
  const projectContainer = document.createElement("div");
  const title = document.createElement("h3");
  const body = document.createElement("p");
  const tech = document.createElement("div");
  const link = document.createElement("div");

  projectContainer.classList.add("projects__project");

  let hammer = '<i class="fas fa-hammer"></i> '
  let linkAnchor = `<i class="fab fa-github"></i> <a href="${projectEntry.githubLink}">${projectEntry.githubName}</a>`;

  title.textContent = projectEntry.title;
  body.textContent = projectEntry.body;
  tech.textContent = projectEntry.tech;
  tech.insertAdjacentHTML('afterbegin', hammer);
  link.insertAdjacentHTML('afterbegin', linkAnchor);

  projectContainer.appendChild(title);
  projectContainer.appendChild(body);
  projectContainer.appendChild(tech);
  projectContainer.appendChild(link);

  projectsContainer.appendChild(projectContainer);
}


const projects = [new Project("Landing Page - buymeacoffee.js",
                              "Main page for the official Node.js API wrapper for Buy Me A Coffee.",
                              "HTML, CSS, JavaScript",
                              "WarenGonzaga/buymeacoffee.js",
                              "https://github.com/WarenGonzaga/buymeacoffee.js"),
                  new Project("Mathmouse",
                              "Discord bot for fun math quizzes built with the discord.py API wrapper.",
                              "Python, Heroku",
                              "angelofallars/mathmouse",
                              "https://github.com/angelofallars/mathmouse"),
                  new Project("Pomoff",
                              "Lightweight and configurable Pomodoro timer built in Python.",
                              "Python",
                              "angelofallars/pomoff",
                              "https://github.com/angelofallars/pomoff"),
                  new Project("Felish",
                              "Minimalist Unix shell with amusing features.",
                              "C",
                              "angelofallars/felish",
                              "https://github.com/angelofallars/felish"),
];

for (let i = 0; i < projects.length; i++) {
  createProjectEntry(projects[i]);
}
