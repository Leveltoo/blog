"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { SearchDialog } from "./search-dialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Feather, BookOpen, FolderGit2, User, Home } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/blog", label: "博客", icon: BookOpen },
  { href: "/portfolio", label: "作品集", icon: FolderGit2 },
  { href: "/about", label: "关于", icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-stone-950/80 backdrop-blur-lg shadow-sm border-b border-emerald-100/50 dark:border-emerald-900/30"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <div className="mr-6 flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all group-hover:scale-105">
              <Feather className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-stone-800 to-stone-600 dark:from-stone-100 dark:to-stone-300 bg-clip-text text-transparent hidden sm:block">
              我的博客
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`relative gap-2 rounded-full px-4 transition-all ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
                      : "text-stone-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500" />
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <SearchDialog />
          
          {/* Desktop Theme Toggle */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] bg-white dark:bg-stone-950 border-l border-emerald-100 dark:border-emerald-900/30"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 pb-6 border-b border-emerald-100 dark:border-emerald-900/30">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                    <Feather className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">我的博客</span>
                </div>

                <nav className="flex flex-col gap-2 mt-6">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-start gap-3 rounded-xl h-12 ${
                            isActive
                              ? "bg-emerald-500 text-white hover:bg-emerald-600"
                              : "text-stone-600 dark:text-stone-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto pt-6 border-t border-emerald-100 dark:border-emerald-900/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-500 dark:text-stone-400">
                      切换主题
                    </span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
