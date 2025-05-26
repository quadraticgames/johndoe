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
    
    // Determine the target directory - we'll save to content/blog
    const targetDir = join(process.cwd(), 'content', 'blog');
    
    // Ensure the directory exists
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
    }
    
    // Write the file to the target directory
    const filePath = join(targetDir, `${safeSlug}.md`);
    await writeFile(filePath, content);
    
    return NextResponse.json({
      success: true,
      slug: safeSlug,
      path: `/blog/${safeSlug}`
    });
  } catch (error) {
    console.error('Error saving blog post:', error);
    return NextResponse.json(
      { error: 'Error saving blog post' },
      { status: 500 }
    );
  }
}
