import { getAllProjects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderGit2, Sparkles, Star, ExternalLink } from "lucide-react";

export default function PortfolioPage() {
  const projects = getAllProjects();
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags))
  ).sort();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-stone-50 to-emerald-50 dark:from-amber-950/20 dark:via-stone-950/30 dark:to-emerald-950/20" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium mb-6">
              <FolderGit2 className="h-4 w-4" />
              作品集
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 bg-clip-text text-transparent">
                我的项目
              </span>
            </h1>

            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 mb-8 max-w-2xl mx-auto">
              这里展示了我的一些个人项目和实验性作品。
              <span className="block mt-2">点击项目卡片查看详情和演示。</span>
            </p>

            {/* Tags Cloud */}
            <div className="flex flex-wrap justify-center gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-4 py-2 rounded-full text-sm bg-white dark:bg-stone-800 shadow-sm hover:shadow-md transition-all cursor-default"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-100">
                精选项目
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-stone-50/50 dark:bg-stone-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-100">
                更多项目
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <section className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
              <FolderGit2 className="h-10 w-10 text-stone-400" />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-2">
              暂无项目展示
            </h3>
            <p className="text-stone-500 dark:text-stone-400">
              项目正在筹备中，敬请期待
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-emerald-500/25">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              有合作想法？
            </h3>
            <p className="text-emerald-100 mb-6">
              如果你对我的项目感兴趣，或者想一起合作开发，欢迎联系我！
            </p>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="rounded-full px-8 bg-white text-emerald-600 hover:bg-emerald-50"
            >
              <a href="mailto:hello@example.com" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                联系我
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
