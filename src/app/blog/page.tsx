import Link from "next/link";
import { getAllPosts, getAllTags, getPostsByTag } from "@/lib/markdown";
import { PostCard } from "@/components/post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Tag, ArrowLeft, SearchX, Grid3X3, List } from "lucide-react";

interface BlogPageProps {
  searchParams: { tag?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const tag = searchParams.tag;
  const tags = await getAllTags();
  const posts = tag ? await getPostsByTag(tag) : await getAllPosts();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-stone-50/50 to-amber-50/80 dark:from-emerald-950/30 dark:via-stone-950/50 dark:to-amber-950/30" />
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            {tag ? (
              <Link href="/blog">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-4 text-stone-500 hover:text-emerald-600"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  返回全部文章
                </Button>
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-4">
                <BookOpen className="h-4 w-4" />
                博客文章
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {tag ? (
                <>
                  <span className="text-stone-400 dark:text-stone-600">#</span>
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    {tag}
                  </span>
                </>
              ) : (
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  所有文章
                </span>
              )}
            </h1>

            <p className="text-stone-600 dark:text-stone-400 text-lg">
              {tag
                ? `共 ${posts.length} 篇关于 "${tag}" 的文章`
                : `共 ${posts.length} 篇文章，分享技术与思考`}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Tags Filter */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="h-5 w-5 text-emerald-500" />
              <span className="font-medium text-stone-700 dark:text-stone-300">
                标签筛选
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/blog">
                <Badge
                  variant={!tag ? "default" : "secondary"}
                  className={`cursor-pointer px-4 py-2 rounded-full text-sm transition-all ${
                    !tag
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                  }`}
                >
                  全部
                </Badge>
              </Link>
              {tags.map((t) => (
                <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`}>
                  <Badge
                    variant={tag === t ? "default" : "secondary"}
                    className={`cursor-pointer px-4 py-2 rounded-full text-sm transition-all ${
                      tag === t
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                    }`}
                  >
                    {t}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <div
                  key={post.slug}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
                <SearchX className="h-10 w-10 text-stone-400" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-2">
                没有找到相关文章
              </h3>
              <p className="text-stone-500 dark:text-stone-400 mb-6">
                试试其他标签或查看全部文章
              </p>
              <Link href="/blog">
                <Button className="rounded-full bg-emerald-500 hover:bg-emerald-600">
                  查看所有文章
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
