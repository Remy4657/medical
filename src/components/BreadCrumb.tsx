import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  slug?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: Props) {
  const breadcrumbItems = [{ name: "Trang chủ", slug: "/" }, ...items];
  return (
    <div className="breadcrumbs text-sm text-primary">
      <ul>
        {breadcrumbItems.map((item, index) => {
          const isLast = breadcrumbItems.length - 1 === index;
          if (!isLast && item.slug) {
            return (
              <li key={index}>
                <Link href={`/${item.slug}`}>{item.name}</Link>
              </li>
            );
          }

          return (
            <li key={index}>
              <span className="cursor-auto no-underline text-amber-950">
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
