"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search, FileText, Tag, Sparkles } from "lucide-react";
import type { Post } from "@/lib/types";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch posts for search
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback(
    (slug: string) => {
      setOpen(false);
      router.push(`/blog/${slug}`);
    },
    [router]
  );

  // Filter posts based on query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  // Get unique tags from filtered posts
  const relatedTags = Array.from(
    new Set(filteredPosts.flatMap((p) => p.tags))
  ).slice(0, 5);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="relative h-10 w-full justify-start rounded-full bg-stone-100/50 dark:bg-stone-900/50 text-sm font-normal text-stone-600 dark:text-stone-400 shadow-none border-stone-200 dark:border-stone-800 hover:bg-white dark:hover:bg-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all md:w-64 lg:w-80"
      >
        <Search className="mr-2 h-4 w-4 shrink-0 text-emerald-500" />
        <span className="hidden lg:inline-flex">搜索文章、标签...</span>
        <span className="inline-flex lg:hidden">搜索...</span>
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-6 select-none items-center gap-1 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 px-2 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="max-w-2xl rounded-2xl overflow-hidden border-0 shadow-2xl"
      >
        <div className="flex items-center border-b border-stone-100 dark:border-stone-800 px-4">
          <Search className="h-5 w-5 text-emerald-500 mr-3" />
          <CommandInput
            placeholder="搜索文章标题、内容或标签..."
            className="h-14 flex-1 border-0 bg-transparent text-base placeholder:text-stone-400 focus:ring-0 focus:outline-none"
            value={query}
            onValueChange={setQuery}
          />
        </div>

        <CommandList className="max-h-[400px] p-2">
          <CommandEmpty className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
              <Search className="h-8 w-8 text-stone-400" />
            </div>
            <p className="text-stone-500 dark:text-stone-400">
              未找到相关文章
            </p>
            <p className="text-sm text-stone-400 dark:text-stone-500 mt-1">
              试试其他关键词
            </p>
          </CommandEmpty>

          {query && relatedTags.length > 0 && (
            <>
              <CommandGroup heading="相关标签" className="px-2">
                {relatedTags.map((tag) => (
                  <CommandItem
                    key={tag}
                    value={`tag:${tag}`}
                    onSelect={() => {
                      setOpen(false);
                      router.push(`/blog?tag=${encodeURIComponent(tag)}`);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Tag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="flex-1">{tag}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator className="my-2 bg-stone-100 dark:bg-stone-800" />
            </>
          )}

          <CommandGroup heading="文章" className="px-2">
            {filteredPosts.map((post) => (
              <CommandItem
                key={post.slug}
                value={post.title}
                onSelect={() => handleSelect(post.slug)}
                className="flex items-start gap-3 px-3 py-3 rounded-xl cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center shrink-0 group-hover:from-emerald-200 group-hover:to-teal-200 transition-colors">
                  <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-800 dark:text-stone-200 truncate">
                    {post.title}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 truncate mt-0.5">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          {!query && (
            <>
              <CommandSeparator className="my-2 bg-stone-100 dark:bg-stone-800" />
              <div className="px-4 py-3 text-xs text-stone-400 dark:text-stone-500">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  <span>按 Enter 打开文章，按 ⌘K 快速打开搜索</span>
                </div>
              </div>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
