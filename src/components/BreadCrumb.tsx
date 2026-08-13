import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  slug?: string;
};

type Props = {
  items: BreadcrumbItem[];
  nameProduct?: string;
};

export default function Breadcrumb({ items = [], nameProduct }: Props) {
  const breadcrumbItems = [{ name: "Trang chủ", slug: "/" }, ...items];
  return (
    <div className="breadcrumbs text-sm text-primary">
      {nameProduct ? (
        <ul>
          {breadcrumbItems.map((item, index) => {
            return (
              <li key={index}>
                {item.slug === "/" ? (
                  <Link href={`/`}>{item.name}</Link>
                ) : (
                  <Link href={`/danh-muc/${item.slug}`}>{item.name}</Link>
                )}
              </li>
            );
          })}
          <li>
            <span className="cursor-auto no-underline text-base-content">
              {nameProduct}
            </span>
          </li>
        </ul>
      ) : (
        <ul>
          {" "}
          {breadcrumbItems.map((item, index) => {
            const isLast = breadcrumbItems.length - 1 === index;
            if (!isLast && item.slug) {
              return (
                <li key={index}>
                  {item.slug === "/" ? (
                    <Link href={`/`}>{item.name}</Link>
                  ) : (
                    <Link href={`/danh-muc/${item.slug}`}>{item.name}</Link>
                  )}
                </li>
              );
            }

            return (
              <li key={index}>
                <span className="cursor-auto no-underline text-base-content">
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
