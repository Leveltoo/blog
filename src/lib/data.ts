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
    name: "张三",
    bio: "全栈开发者，热爱技术，喜欢分享。专注于 React、TypeScript 和 Node.js 开发。",
    avatar: "https://placehold.co/200x200/000000/FFFFFF?text=Avatar",
    social: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "hello@example.com",
    },
  };
}
