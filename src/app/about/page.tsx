import Image from "next/image";
import { getAuthor } from "@/lib/data";
import { getAllPosts } from "@/lib/markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  Twitter,
  Mail,
  FileText,
  Code2,
  Award,
  Heart,
  Sparkles,
  Zap,
  Globe,
} from "lucide-react";

export default async function AboutPage() {
  const author = getAuthor();
  const posts = await getAllPosts();

  // Calculate stats
  const totalPosts = posts.length;
  const totalTags = new Set(posts.flatMap((p) => p.tags)).size;

  const stats = [
    {
      label: "发布文章",
      value: totalPosts,
      icon: FileText,
      color: "from-emerald-400 to-teal-500",
    },
    {
      label: "文章标签",
      value: totalTags,
      icon: Code2,
      color: "from-amber-400 to-orange-500",
    },
    {
      label: "技术栈",
      value: "8+",
      icon: Zap,
      color: "from-violet-400 to-purple-500",
    },
  ];

  const techStack = [
    { name: "React", category: "前端框架" },
    { name: "Next.js", category: "全栈框架" },
    { name: "TypeScript", category: "语言" },
    { name: "Node.js", category: "后端" },
    { name: "Tailwind CSS", category: "样式" },
    { name: "PostgreSQL", category: "数据库" },
    { name: "Docker", category: "运维" },
    { name: "Git", category: "工具" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50 dark:from-emerald-950/20 dark:via-stone-950/30 dark:to-amber-950/20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-400/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-stone-100 dark:border-stone-800">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-amber-400 rounded-full blur-lg opacity-50" />
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-stone-800 shadow-xl">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                      {author.name}
                    </span>
                  </h1>
                  <p className="text-stone-600 dark:text-stone-400 text-lg mb-6 max-w-xl">
                    {author.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-3 justify-center md:justify-start">
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-2 hover:bg-stone-50 dark:hover:bg-stone-800"
                    >
                      <a
                        href={author.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-2 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:border-sky-300"
                    >
                      <a
                        href={author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-2 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:border-amber-300"
                    >
                      <a href={`mailto:${author.social.email}`} className="gap-2">
                        <Mail className="h-4 w-4" />
                        联系我
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={stat.label}
                    className="border-0 shadow-lg bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-stone-500 dark:text-stone-400">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                技术栈
              </span>
            </h2>
            <p className="text-stone-600 dark:text-stone-400">
              我日常使用的技术和工具
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all hover:-translate-y-1 hover:shadow-lg text-center"
              >
                <div className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-1">
                  {tech.name}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400">
                  {tech.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="container mx-auto px-4 py-16 bg-stone-50/50 dark:bg-stone-900/30">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-stone dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-center mb-8">
              关于这个博客
            </h2>

            <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-lg border border-stone-100 dark:border-stone-800">
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                这个博客是我使用{" "}
                <Badge variant="secondary" className="rounded-full">
                  Next.js
                </Badge>{" "}
                和{" "}
                <Badge variant="secondary" className="rounded-full">
                  Tailwind CSS
                </Badge>{" "}
                搭建的个人技术博客。在这里，我会分享我在前端开发、后端技术、以及项目实战中的经验和心得。
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                    <Heart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-1">
                      热爱技术
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      对新技术保持好奇心，持续学习和探索
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                    <Globe className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-1">
                      开源贡献
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      积极参与开源社区，分享代码和经验
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                如果你对我的文章有任何问题或建议，欢迎通过邮件联系我。我会尽快回复你的消息。
                也希望我的文章能对你有所帮助，一起成长进步！
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
