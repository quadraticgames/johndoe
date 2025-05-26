"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { marked } from "marked";

interface BlogPostData {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  thumbnail: string;
  content: string;
}

export default function MarkdownEditor() {
  const [postData, setPostData] = useState<BlogPostData>({
    title: "",
    excerpt: "",
    date: format(new Date(), "yyyy-MM-dd"),
    readingTime: "5",
    category: "Web Development",
    thumbnail: "",
    content: "",
  });
  
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle form field changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setPostData((prev) => ({ ...prev, category: value }));
  };
  
  // Handle markdown content changes
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setPostData((prev) => ({ ...prev, content: newContent }));
    
    // Generate preview HTML using marked
    try {
      const htmlContent = marked(newContent);
      setPreviewHtml(`<div class="prose prose-invert max-w-none">
        <h1>${postData.title || "Your Title"}</h1>
        <p>${postData.excerpt || "Your excerpt"}</p>
        <div>${htmlContent}</div>
      </div>`);
    } catch (error) {
      console.error("Error parsing markdown:", error);
      setPreviewHtml(`<div class="prose prose-invert max-w-none">
        <h1>${postData.title || "Your Title"}</h1>
        <p>${postData.excerpt || "Your excerpt"}</p>
        <div>${newContent.replace(/\n/g, "<br />")}</div>
      </div>`);
    }
  };
  
  // Update preview when title or excerpt changes
  useEffect(() => {
    if (postData.content) {
      try {
        const htmlContent = marked(postData.content);
        setPreviewHtml(`<div class="prose prose-invert max-w-none">
          <h1>${postData.title || "Your Title"}</h1>
          <p>${postData.excerpt || "Your excerpt"}</p>
          <div>${htmlContent}</div>
        </div>`);
      } catch (error) {
        console.error("Error parsing markdown:", error);
      }
    }
  }, [postData.title, postData.excerpt]);
  
  // Handle image upload
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      
      // Send the image to our API route for processing
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      
      const data = await response.json();
      
      // Insert the image path at the cursor position or at the end of the content
      const imagePath = data.path;
      const textArea = document.getElementById("content") as HTMLTextAreaElement;
      const cursorPosition = textArea.selectionStart;
      const imageMarkdown = `![${file.name}](${imagePath})`;
      
      const newContent = 
        postData.content.substring(0, cursorPosition) + 
        imageMarkdown + 
        postData.content.substring(cursorPosition);
      
      setPostData((prev) => ({ ...prev, content: newContent }));
      
      // If this is the first image and no thumbnail is set, use it as thumbnail
      if (!postData.thumbnail) {
        setPostData((prev) => ({ ...prev, thumbnail: imagePath }));
      }
      
      // Show success message
      toast({
        title: "Image added",
        description: `Image placeholder for "${file.name}" has been added to your post.`,
      });
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Image processing failed",
        description: "There was an error adding your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    if (!postData.title || !postData.excerpt || !postData.content) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Generate slug from title
      const slug = postData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      
      // Create markdown content with frontmatter
      const frontmatter = `---
title: ${postData.title}
excerpt: ${postData.excerpt}
date: ${postData.date}
readingTime: ${postData.readingTime}
category: ${postData.category}
thumbnail: ${postData.thumbnail || ''}
---

${postData.content}`;
      
      // Send to API for saving
      const response = await fetch("/api/blog/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          content: frontmatter,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save blog post");
      }
      
      const data = await response.json();
      
      // Show success message
      toast({
        title: "Blog post processed",
        description: `Your post "${postData.title}" has been processed successfully.`,
      });
      
      // Show a demo notice
      toast({
        title: "Demo Mode",
        description: "This is a demo environment. In a production app, your post would be saved to a database or CMS.",
        variant: "default",
        duration: 5000,
      });
      
      // Optional: Save to localStorage for demo purposes
      try {
        const savedPosts = JSON.parse(localStorage.getItem('demoSavedPosts') || '[]');
        savedPosts.push({
          slug,
          title: postData.title,
          excerpt: postData.excerpt,
          date: postData.date,
          thumbnail: postData.thumbnail,
          preview: postData.content.substring(0, 100) + '...'
        });
        localStorage.setItem('demoSavedPosts', JSON.stringify(savedPosts));
      } catch (localStorageError) {
        console.error('Error saving to localStorage:', localStorageError);
      }
      
      // Reset form or redirect to the post
      // window.location.href = `/blog/${slug}`;
    } catch (error) {
      console.error("Error processing blog post:", error);
      toast({
        title: "Processing failed",
        description: "There was an error processing your blog post. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Insert markdown formatting
  const insertFormatting = (format: string) => {
    const textArea = document.getElementById("content") as HTMLTextAreaElement;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = postData.content.substring(start, end);
    
    let formattedText = "";
    
    switch (format) {
      case "bold":
        formattedText = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        formattedText = `*${selectedText || "italic text"}*`;
        break;
      case "heading":
        formattedText = `\n## ${selectedText || "Heading"}\n`;
        break;
      case "link":
        formattedText = `[${selectedText || "link text"}](url)`;
        break;
      case "list":
        formattedText = `\n- ${selectedText || "List item"}\n- Another item\n- And another\n`;
        break;
      case "code":
        formattedText = selectedText ? `\`${selectedText}\`` : "```\ncode block\n```";
        break;
      case "quote":
        formattedText = `\n> ${selectedText || "Blockquote"}\n`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = 
      postData.content.substring(0, start) + 
      formattedText + 
      postData.content.substring(end);
    
    setPostData((prev) => ({ ...prev, content: newContent }));
    
    // Set focus back to textarea and place cursor after the inserted text
    setTimeout(() => {
      textArea.focus();
      const newCursorPosition = start + formattedText.length;
      textArea.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };
  
  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-10">
        <div className="mb-8">
          <h1 className="font-space-grotesk text-4xl font-bold tracking-tight">Markdown Editor</h1>
          <p className="mt-2 text-muted-foreground">Create and edit your blog posts with ease</p>
        </div>
        
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={postData.title} 
                onChange={handleInputChange} 
                placeholder="Enter post title" 
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                name="date" 
                type="date" 
                value={postData.date} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea 
              id="excerpt" 
              name="excerpt" 
              value={postData.excerpt} 
              onChange={handleInputChange} 
              placeholder="Brief description of your post" 
              rows={2} 
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={postData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="React">React</SelectItem>
                  <SelectItem value="TypeScript">TypeScript</SelectItem>
                  <SelectItem value="Next.js">Next.js</SelectItem>
                  <SelectItem value="CSS">CSS</SelectItem>
                  <SelectItem value="Unity">Unity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="readingTime">Reading Time (minutes)</Label>
              <Input 
                id="readingTime" 
                name="readingTime" 
                type="number" 
                min="1" 
                value={postData.readingTime} 
                onChange={handleInputChange} 
              />
            </div>
            <div>
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <Input 
                id="thumbnail" 
                name="thumbnail" 
                value={postData.thumbnail} 
                onChange={handleInputChange} 
                placeholder="/images/blog/your-image.jpg" 
              />
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("bold")}>
                Bold
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("italic")}>
                Italic
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("heading")}>
                Heading
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("link")}>
                Link
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("list")}>
                List
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("code")}>
                Code
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("quote")}>
                Quote
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Image"}
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>
            
            <Tabs defaultValue="write">
              <TabsList className="mb-4">
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="write">
                <Textarea 
                  id="content" 
                  name="content" 
                  value={postData.content} 
                  onChange={handleContentChange} 
                  placeholder="Write your post content in markdown..." 
                  className="font-mono min-h-[400px]" 
                />
              </TabsContent>
              <TabsContent value="preview">
                <Card>
                  <CardContent className="pt-6">
                    <div 
                      className="min-h-[400px] prose prose-invert max-w-none" 
                      dangerouslySetInnerHTML={{ __html: previewHtml }} 
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="flex justify-end">
            <Button type="button" onClick={handleSubmit}>Save Post</Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
