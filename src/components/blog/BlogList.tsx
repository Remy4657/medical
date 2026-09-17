import { getBlogs } from "@/services/blogService";
import BlogCard from "./BlogCard";

interface BlogListProps {
  page?: number;
  category?: string;
}

export default async function BlogList({ page = 1, category }: BlogListProps) {
  const data = await getBlogs();
  console.log("data.item", data.items);
  return (
    <section className="container mx-auto px-4 mt-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Bài viết sức khỏe</h1>

        <p className="text-base-content/60 mt-2">
          Kiến thức hữu ích về sức khỏe và sử dụng thuốc
        </p>
      </div>

      {data.items.length === 0 ? (
        <div className="alert">Không có bài viết nào.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.items.slice(0, 4).map((blog: any) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* <div className="flex justify-center mt-10">
            <div className="join">
              {Array.from(
                { length: data.pagination.totalPages },
                (_, index) => {
                  const currentPage = index + 1;

                  return (
                    <a
                      key={currentPage}
                      href={`?page=${currentPage}${
                        category ? `&category=${category}` : ""
                      }`}
                      className={`join-item btn ${
                        currentPage === page ? "btn-primary" : ""
                      }`}
                    >
                      {currentPage}
                    </a>
                  );
                },
              )}
            </div>
          </div> */}
        </>
      )}
    </section>
  );
}
