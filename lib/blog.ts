import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const blogsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  content?: string;
}

// This should be run only on the server side
export async function getAllPosts(): Promise<BlogPost[]> {
  console.log('Reading blog posts from:', blogsDirectory);
  
  // Check if directory exists
  if (!fs.existsSync(blogsDirectory)) {
    console.log('Blog directory does not exist');
    return [];
  }
  
  // Get all markdown files
  const fileNames = fs.readdirSync(blogsDirectory);
  console.log('Found blog files:', fileNames);
  
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Parse metadata section
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        readingTime: data.readingTime,
        category: data.category,
      } as BlogPost;
    })
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1)); // Sort by date

  return allPostsData;
}

// This should be run only on the server side
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse the post metadata and content
    const { data, content } = matter(fileContents);
    
    // Convert markdown to HTML
    const htmlContent = marked(content);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      readingTime: data.readingTime,
      category: data.category,
      content: htmlContent,
    } as BlogPost;
  } catch (error) {
    console.error(`Error getting post with slug ${slug}:`, error);
    return null;
  }
}

// This should be run only on the server side
export async function getFeaturedPosts(count: number = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}
