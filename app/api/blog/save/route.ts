import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

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
    
    // For Vercel deployment, we can't write to the filesystem directly
    // Instead, we'll return a mock success response
    
    // Extract title from content for the response
    const titleMatch = content.match(/title:\s*(.+)/);
    const title = titleMatch ? titleMatch[1] : safeSlug;
    
    return NextResponse.json({
      success: true,
      slug: safeSlug,
      path: `/blog/${safeSlug}`,
      title: title,
      message: "Note: In Vercel's serverless environment, files can't be written directly to the filesystem. In a production app, you would integrate with a database or CMS to store blog posts.",
      preview: content.substring(0, 200) + '...'
    });
    
    /* 
    // This code works locally but not on Vercel:
    // Determine the target directory - we'll save to content/blog
    const targetDir = join(process.cwd(), 'content', 'blog');
    
    // Ensure the directory exists
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
    }
    
    // Write the file to the target directory
    const filePath = join(targetDir, `${safeSlug}.md`);
    await writeFile(filePath, content);
    */
  } catch (error) {
    console.error('Error saving blog post:', error);
    return NextResponse.json(
      { error: 'Error saving blog post' },
      { status: 500 }
    );
  }
}
