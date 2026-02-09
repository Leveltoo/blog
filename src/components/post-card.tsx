"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Post } from "@/lib/types";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white dark:bg-stone-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:via-emerald-500/5 group-hover:to-teal-500/10 transition-all duration-500 rounded-2xl" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      
      <Link href={`/blog/${post.slug}`} className="block p-6">
        <CardHeader className="p-0 pb-4">
          {/* Meta info */}
          <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {Math.ceil(post.content.length / 500)} 分钟
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="p-0">
          {/* Description */}
          <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
            {post.description}
          </p>

          {/* Tags and Arrow */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2.5 py-0.5 rounded-full border-stone-200 dark:border-stone-700 text-stone-500"
                >
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Arrow icon */}
            <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <ArrowUpRight className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
