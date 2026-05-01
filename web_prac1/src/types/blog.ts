export interface Author {
  name: string;
  avatarUrl?: string;
  bio?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: Author;
  tags: Tag[];
  readTimeMinutes: number;
}