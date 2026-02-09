import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, ChevronRight } from "lucide-react";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: `${post.title} | 我的博客`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Header Background */}
      <div className="absolute inset-0 h-96 bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50 dark:from-emerald-950/20 dark:via-stone-950/30 dark:to-amber-950/20 -z-10" />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Back Button */}
          <Link href="/blog">
            <Button
              variant="ghost"
              className="mb-6 pl-0 text-stone-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回文章列表
            </Button>
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                >
                  <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 border-0 rounded-full px-3">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-stone-800 dark:text-stone-100">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{Math.ceil(post.content.length / 500)} 分钟阅读</span>
              </div>
            </div>
          </header>

          <Separator className="mb-10 bg-stone-200 dark:bg-stone-800" />

          {/* Article Content */}
          <article
            className="prose prose-stone dark:prose-invert max-w-none
              prose-headings:scroll-mt-20
              prose-h1:text-3xl prose-h1:font-bold
              prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-stone-800 dark:prose-h2:text-stone-100
              prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-stone-800 dark:prose-h3:text-stone-100
              prose-p:leading-8 prose-p:mb-6 prose-p:text-stone-600 dark:prose-p:text-stone-400
              prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline prose-a:font-medium hover:prose-a:underline
              prose-strong:font-semibold prose-strong:text-stone-800 dark:prose-strong:text-stone-200
              prose-code:rounded-lg prose-code:bg-stone-100 dark:prose-code:bg-stone-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:text-emerald-600 dark:prose-code:text-emerald-400
              prose-pre:rounded-2xl prose-pre:bg-stone-900 prose-pre:p-6 prose-pre:shadow-lg
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
              prose-li:text-stone-600 dark:prose-li:text-stone-400
              prose-blockquote:border-l-4 prose-blockquote:border-emerald-400 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-stone-600 dark:prose-blockquote:text-stone-400 prose-blockquote:bg-stone-50 dark:prose-blockquote:bg-stone-900/30 prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg
              prose-img:rounded-2xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Separator className="my-12 bg-stone-200 dark:bg-stone-800" />

          {/* Article Footer */}
          <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link href="/blog">
              <Button
                variant="outline"
                className="rounded-full border-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回文章列表
              </Button>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-sm text-stone-500 dark:text-stone-400">
                分享文章:
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </footer>

          {/* Related Tags */}
          <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800">
            <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-3">
              相关标签
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                  <Badge
                    variant="outline"
                    className="rounded-full px-4 py-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    {tag}
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
