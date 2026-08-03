"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2>Đã xảy ra lỗi!</h2>

      <button onClick={() => reset()}>Thử lại</button>
    </div>
  );
}
