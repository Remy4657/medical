// components/blog/BlogDetail.tsx

import Link from "next/link";
import Image from "next/image";
import BlogContent from "./BlogContent";
import { Blog } from "@/types/blog";

interface BlogDetailProps {
  blog: Blog;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
  console.log("blog: ", blog);
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      {/* <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <Link href="/blog">Blog</Link>
          </li>

          {blog.category && (
            <li>
              <Link href={`/blog?category=${blog.category.slug}`}>
                {blog.category.name}
              </Link>
            </li>
          )}

          <li>
            <span className="truncate max-w-[250px]">{blog.title}</span>
          </li>
        </ul>
      </div> */}

      <div className="max-w-4xl mx-auto">
        {/* Category */}
        {/* {blog.category && (
          <Link
            href={`/blog?category=${blog.category.slug}`}
            className="text-primary font-medium text-sm"
          >
            {blog.category.name}
          </Link>
        )} */}

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold mt-3 leading-tight">
          {blog.title}
        </h1>

        {/* Date */}
        {blog.createdAt && (
          <p className="text-sm text-base-content/50 mt-4">
            {new Intl.DateTimeFormat("vi-VN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date(blog.createdAt))}
          </p>
        )}

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-lg md:text-xl text-base-content/70 mt-6 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Thumbnail */}
        {/* {blog.thumbnail && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mt-8">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )} */}

        {/* Content */}
        <div className="mt-10">
          {blog.content && <BlogContent content={blog.content} />}
        </div>
      </div>
    </main>
  );
}
