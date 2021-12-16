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

  projectContainer.classList.add("project-entries__project");

  let hammer = '<i class="fas fa-hammer"></i> '
  let linkAnchor = `<i class="fab fa-github"></i> <a href="${projectEntry.githubLink}">${projectEntry.githubName}</a>`;

  title.textContent = projectEntry.title;
  body.insertAdjacentHTML('afterbegin', projectEntry.body);
  tech.textContent = projectEntry.tech;
  tech.insertAdjacentHTML('afterbegin', hammer);
  link.insertAdjacentHTML('afterbegin', linkAnchor);

  projectContainer.appendChild(title);
  projectContainer.appendChild(body);
  projectContainer.appendChild(tech);
  projectContainer.appendChild(link);

  projectsContainer.appendChild(projectContainer);
}

const projects = [
                  new Project(
                    "Website - Axyl",
                    "Designed and deployed the website of <a href='https://axylos.org'>Axyl</a>, \
                    helping drive more than 1,200+ downloads.",
                    "HTML/CSS, Sass, JavaScript",
                    "axyl-os/axyl-os.github.io",
                    "https://github.com/axyl-os/axyl-os.github.io"
                  ),
                  new Project(
                    "Axyl Stats Bot",
                    "Developed and deployed a set of services allowing 100+ members in the \
                    Axyl server to access metrics about the Axyl project (downloads, stars, etc).",
                    "Python, PostgreSQL",
                    "angelofallars/axyl-stats",
                    "https://github.com/angelofallars/axyl-stats"
                  ),
                  new Project(
                    "treefetch",
                    "A lightning-fast system fetch tool for Linux systems built with Rust, reaching over 180+ downloads.",
                    "Rust",
                    "angelofallars/treefetch",
                    "https://github.com/angelofallars/treefetch"
                  ),
];

const projectsContainer = document.querySelector(".project-entries");

for (let i = 0; i < projects.length; i++) {
  createProjectEntry(projects[i]);
}
