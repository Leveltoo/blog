export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  demoUrl: string;
  githubUrl: string;
  tags: string[];
  featured: boolean;
}

export interface Author {
  name: string;
  bio: string;
  avatar: string;
  social: {
    github?: string;
    twitter?: string;
    email?: string;
  };
}
