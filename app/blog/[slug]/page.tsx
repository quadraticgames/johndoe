import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/lib/blog";

// Define the page component props type according to Next.js 14 conventions
type PageProps = {
  params: {
    slug: string;
  };
  searchParams: Record<string, string | string[]>;
};

export default async function BlogPost({ params }: PageProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  // If post doesn't exist, show a not found message
  if (!post) {
    return (
      <div className="relative min-h-screen bg-background">
        <SiteHeader />
        <main className="container py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold">Post not found</h1>
            <p className="mt-4 text-muted-foreground">The blog post you're looking for doesn't exist.</p>
            <Button variant="default" asChild className="mt-8">
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-20">
        <div className="mx-auto max-w-3xl">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </Button>

          <article>
            <div className="mb-8">
              <Badge variant="outline" className="mb-4 bg-muted/50">
                {post.category}
              </Badge>
              <h1 className="mb-4 font-space-grotesk text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {/* Using dangerouslySetInnerHTML to render the HTML content */}
              <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
