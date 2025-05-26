import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

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
    
    // Generate a unique ID for the image
    const id = uuidv4();
    
    // For demonstration purposes, we'll just return a placeholder image URL
    // In a real app, you would upload to a service like Cloudinary, S3, etc.
    const placeholderImageUrl = `https://picsum.photos/seed/${id}/800/600`;
    
    return NextResponse.json({
      success: true,
      path: placeholderImageUrl,
      filename: file.name,
      id: id
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Error processing image' },
      { status: 500 }
    );
  }
}
