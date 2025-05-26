import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedPosts, getAllPosts, getPostBySlug } from '@/lib/blog';

// API route to get featured blog posts
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  const featured = searchParams.get('featured');
  
  try {
    if (slug) {
      // Get a specific post by slug
      const post = await getPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    } else if (featured) {
      // Get featured posts
      const count = parseInt(featured) || 3;
      const posts = await getFeaturedPosts(count);
      return NextResponse.json(posts);
    } else {
      // Get all posts
      const posts = await getAllPosts();
      return NextResponse.json(posts);
    }
  } catch (error) {
    console.error('Error handling blog request:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}