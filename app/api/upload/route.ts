import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
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
    
    // Create a unique filename
    const originalName = file.name;
    const extension = path.extname(originalName);
    const filename = `${uuidv4()}${extension}`;
    
    // For Vercel deployment, we can't write to the filesystem directly
    // Instead, we'll return a mock success response for now
    // In a real implementation, you would use a storage service like S3, Cloudinary, etc.
    
    // Return a mock success response with a path
    return NextResponse.json({
      success: true,
      path: `/images/blog/${filename}`,
      filename,
      message: "Note: In Vercel's serverless environment, files can't be written directly to the filesystem. In a production app, you would integrate with a storage service like AWS S3, Cloudinary, or similar."
    });
    
    /* 
    // This code works locally but not on Vercel:
    // Create a buffer from the file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Determine the target directory - we'll save to public/images/blog
    const targetDir = path.join(process.cwd(), 'public', 'images', 'blog');
    
    // Ensure the directory exists
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
    }
    
    // Write the file to the target directory
    const filePath = path.join(targetDir, filename);
    await writeFile(filePath, buffer);
    */
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}
