"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Đã xảy ra lỗi!</h1>

      <p className="mt-2 text-gray-500">Có lỗi xảy ra trong quá trình xử lý</p>

      <button onClick={() => reset()} className="btn btn-primary mt-6">
        Thử lại
      </button>
    </div>
  );
}
