"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/lib/types";
import { ExternalLink, Github, Sparkles, X } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="group relative overflow-hidden border-0 bg-white dark:bg-stone-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-amber-400 text-amber-950 border-0 shadow-lg">
                <Sparkles className="h-3 w-3 mr-1" />
                精选
              </Badge>
            </div>
          )}

          {/* Image */}
          <div className="aspect-video overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Content overlay on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/80 text-sm line-clamp-2">{project.description}</p>
          </div>

          {/* Default content */}
          <CardContent className="p-5 group-hover:opacity-0 transition-opacity duration-200">
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 gap-0 border-0 bg-white dark:bg-stone-950 rounded-2xl">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-stone-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Image */}
        <div className="relative aspect-video">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                {project.featured && (
                  <Badge className="bg-amber-400 text-amber-950 border-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    精选项目
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
                {project.title}
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <DialogDescription className="text-base text-stone-600 dark:text-stone-400 mb-6">
            {project.description}
          </DialogDescription>

          {/* Demo Preview */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
              在线预览
            </h4>
            <div className="aspect-video rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
              <iframe
                src={project.demoUrl}
                title={project.title}
                className="w-full h-full"
                sandbox="allow-same-origin allow-scripts"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
              技术栈
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="flex-1 h-12 rounded-xl border-2 hover:bg-stone-50 dark:hover:bg-stone-900"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <Github className="h-5 w-5" />
                查看源码
              </a>
            </Button>
            <Button
              asChild
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25"
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                在线演示
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
