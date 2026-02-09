import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getAllTags } from "@/lib/markdown";
import { getFeaturedProjects, getAuthor } from "@/lib/data";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, Twitter, Mail, Sparkles, BookOpen, Code2, Zap } from "lucide-react";

export default async function HomePage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const projects = getFeaturedProjects();
  const author = getAuthor();

  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Pinia Style */}
      <section className="relative overflow-hidden gradient-hero">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-400/20 blur-3xl animate-pulse-soft" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-amber-400/20 blur-3xl animate-pulse-soft delay-500" />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 mb-6 animate-slide-up">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  欢迎来到我的博客
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up delay-100">
                <span className="text-stone-800 dark:text-stone-100">你好，我是 </span>
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  {author.name}
                </span>
              </h1>

              {/* Bio */}
              <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mb-8 animate-slide-up delay-200">
                {author.bio}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 animate-slide-up delay-300">
                <Link href="/blog">
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:-translate-y-0.5"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    浏览文章
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 border-2 border-stone-300 dark:border-stone-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all hover:-translate-y-0.5"
                  >
                    <Code2 className="mr-2 h-5 w-5" />
                    查看作品
                  </Button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 justify-center lg:justify-start animate-slide-up delay-400">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600"
                >
                  <a
                    href={author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-500"
                >
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600"
                >
                  <a href={`mailto:${author.social.email}`}>
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right - Avatar/Illustration */}
            <div className="flex-1 flex justify-center lg:justify-end animate-float">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-amber-400/30 rounded-full blur-2xl scale-110" />
                
                {/* Avatar container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white dark:border-stone-800 shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-100 to-amber-100 dark:from-emerald-900/50 dark:to-amber-900/50">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-stone-800 rounded-xl px-3 py-2 shadow-lg border border-emerald-100 dark:border-emerald-900 animate-bounce">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium">全栈开发</span>
                  </div>
                </div>

                <div className="absolute -bottom-2 -left-4 bg-white dark:bg-stone-800 rounded-xl px-3 py-2 shadow-lg border border-emerald-100 dark:border-emerald-900 animate-bounce delay-700">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium">React/Node.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Tags Cloud Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3">
          {tags.map((tag, index) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm rounded-full cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
            <h2 className="text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
              最新文章
            </h2>
          </div>
          <Link href="/blog">
            <Button
              variant="ghost"
              className="gap-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full"
            >
              查看全部
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post, index) => (
            <div
              key={post.slug}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-stone-50/50 dark:bg-stone-900/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
              <h2 className="text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
                精选项目
              </h2>
            </div>
            <Link href="/portfolio">
              <Button
                variant="ghost"
                className="gap-2 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-full"
              >
                查看全部
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="gradient-card rounded-3xl p-8 md:p-12 border border-emerald-100 dark:border-emerald-900/50">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-stone-800 dark:text-stone-100">
              想要一起学习成长？
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              关注我的社交媒体，获取更多技术分享和项目更新
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6"
              >
                <a href={author.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  关注 GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="rounded-full px-6 border-2"
              >
                <a href={`mailto:${author.social.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  联系我
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
