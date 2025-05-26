import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPage() {
  // Get all blog posts from markdown files
  const allPosts = await getAllPosts();
  
  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto py-20">
        <div className="mb-12 text-center">
          <h1 className="font-space-grotesk text-4xl font-bold tracking-tight md:text-5xl">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Thoughts, tutorials, and insights on web development
          </p>
        </div>

        {allPosts.length > 0 ? (
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                readingTime={post.readingTime}
                category={post.category}
                slug={post.slug}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No blog posts found.</p>
            <p className="mt-2">Check back soon for new content!</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
