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
  thumbnail?: string;
  content?: string;
}

// This should be run only on the server side
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    console.log('Reading blog posts from:', blogsDirectory);
    
    // Check if directory exists
    if (!fs.existsSync(blogsDirectory)) {
      console.log('Blog directory does not exist');
      return [];
    }
    
    // Get all markdown files
    const fileNames = fs.readdirSync(blogsDirectory);
    console.log('Found blog files:', fileNames);
    
    if (!fileNames || fileNames.length === 0) {
      console.log('No blog files found');
      return [];
    }
    
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          // Remove ".md" from file name to get slug
          const slug = fileName.replace(/\.md$/, '');

          // Read markdown file as string
          const fullPath = path.join(blogsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');

          // Parse metadata section
          const { data } = matter(fileContents);

          return {
            slug,
            title: data.title || 'Untitled Post',
            excerpt: data.excerpt || 'No excerpt available',
            date: data.date || new Date().toISOString().split('T')[0],
            readingTime: data.readingTime || '5 min read',
            category: data.category || 'Uncategorized',
            thumbnail: data.thumbnail || data.coverImage || '/images/blog-placeholder.jpg',
          } as BlogPost;
        } catch (err) {
          console.error(`Error processing blog file ${fileName}:`, err);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => {
        try {
          return new Date(b.date) > new Date(a.date) ? 1 : -1;
        } catch {
          return 0;
        }
      }); // Sort by date

    return allPostsData;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

// This should be run only on the server side
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Check if directory exists
    if (!fs.existsSync(blogsDirectory)) {
      console.log('Blog directory does not exist when getting post by slug');
      return null;
    }
    
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log(`Blog post file for slug '${slug}' does not exist`);
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse the post metadata and content
    const { data, content } = matter(fileContents);
    
    // Convert markdown to HTML
    const htmlContent = marked(content);

    return {
      slug,
      title: data.title || 'Untitled Post',
      excerpt: data.excerpt || 'No excerpt available',
      date: data.date || new Date().toISOString().split('T')[0],
      readingTime: data.readingTime || '5 min read',
      category: data.category || 'Uncategorized',
      thumbnail: data.thumbnail || data.coverImage || '/images/blog-placeholder.jpg',
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
