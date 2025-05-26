import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }
    
    // Create a buffer from the file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a unique filename
    const originalName = file.name;
    const extension = path.extname(originalName);
    const filename = `${uuidv4()}${extension}`;
    
    // Determine the target directory - we'll save to public/images/blog
    const targetDir = join(process.cwd(), 'public', 'images', 'blog');
    
    // Ensure the directory exists
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
    }
    
    // Write the file to the target directory
    const filePath = join(targetDir, filename);
    await writeFile(filePath, buffer);
    
    // Return the path to the file (relative to the public directory)
    return NextResponse.json({
      success: true,
      path: `/images/blog/${filename}`,
      filename
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}
