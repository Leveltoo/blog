import fs from "fs";
import path from "path";
import type { Project, Author } from "./types";

const projectsPath = path.join(process.cwd(), "src/content/projects.json");

export function getAllProjects(): Project[] {
  const fileContents = fs.readFileSync(projectsPath, "utf8");
  const projects: Project[] = JSON.parse(fileContents);
  return projects;
}

export function getFeaturedProjects(): Project[] {
  const projects = getAllProjects();
  return projects.filter((project) => project.featured);
}

export function getProjectById(id: string): Project | null {
  const projects = getAllProjects();
  return projects.find((project) => project.id === id) || null;
}

export function getAuthor(): Author {
  return {
    name: "华莱士",
    bio: "全栈开发者，热爱技术，喜欢分享。专注于 Vue、React、NestJS 和 Node.js 开发。",
    avatar: "https://placehold.co/200x200/10b981/FFFFFF?text=华",
    social: {
      github: "https://github.com/Leveltoo",
      twitter: "https://twitter.com",
      email: "1056480375@qq.com",
    },
  };
}
