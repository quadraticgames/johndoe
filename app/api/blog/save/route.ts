import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { slug, content } = await request.json();
    
    if (!slug || !content) {
      return NextResponse.json(
        { error: 'Slug and content are required' },
        { status: 400 }
      );
    }
    
    // Sanitize the slug to ensure it's safe for filenames
    const safeSlug = slug
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    // Extract metadata from content
    const titleMatch = content.match(/title:\s*(.+)/);
    const title = titleMatch ? titleMatch[1] : safeSlug;
    
    const dateMatch = content.match(/date:\s*(.+)/);
    const date = dateMatch ? dateMatch[1] : new Date().toISOString();
    
    const excerptMatch = content.match(/excerpt:\s*(.+)/);
    const excerpt = excerptMatch ? excerptMatch[1] : '';
    
    // In a real app, you would save this to a database
    // For this demo, we'll just return success with the processed data
    return NextResponse.json({
      success: true,
      slug: safeSlug,
      path: `/blog/${safeSlug}`,
      title: title,
      date: date,
      excerpt: excerpt,
      savedContent: content
    });
  } catch (error) {
    console.error('Error processing blog post:', error);
    return NextResponse.json(
      { error: 'Error processing blog post' },
      { status: 500 }
    );
  }
}
