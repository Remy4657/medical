import Link from "next/link";

export function PageError({ message, action }: any) {
  return (
    <div
      className="rounded-box border border-base-300 bg-base-100 p-8 text-center"
      role="alert"
    >
      <p className="text-base-content/70">{message}</p>
      {action ? (
        <Link href={action.href} className="btn btn-primary btn-sm mt-4">
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
