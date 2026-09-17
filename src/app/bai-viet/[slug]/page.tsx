import { notFound } from "next/navigation";
import BlogDetail from "@/components/blog/BlogDetail";
import { getBlogBySlug } from "@/services/blogService";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  try {
    const blog = await getBlogBySlug(slug);

    return <BlogDetail blog={blog} />;
  } catch {
    notFound();
  }
}
