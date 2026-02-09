import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/markdown";

export async function GET() {
  try {
    const posts = await getAllPosts();
    // Return only necessary data for search
    const searchData = posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags,
    }));
    return NextResponse.json(searchData);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
