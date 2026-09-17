import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={`/bai-viet/${blog.slug}`}
      className="group card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <figure className="relative aspect-[16/10] overflow-hidden">
        {blog.thumbnail ? (
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-base-200 flex items-center justify-center">
            <span className="text-base-content/40">No image</span>
          </div>
        )}
      </figure>

      <div className="card-body p-4">
        {blog.category && (
          <span className="text-sm text-gray-100 rounded-2xl bg-gray-400 px-2 w-fit font-medium">
            {blog.category.name}
          </span>
        )}

        <h2 className="card-title text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h2>

        {blog.excerpt && (
          <p className="text-sm text-base-content/70 line-clamp-3">
            {blog.excerpt}
          </p>
        )}

        {blog.createdAt && (
          <span className="text-xs text-base-content/50 mt-1">
            {new Intl.DateTimeFormat("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(new Date(blog.createdAt))}
          </span>
        )}
      </div>
    </Link>
  );
}
