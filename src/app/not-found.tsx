export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-gray-500">Trang bạn tìm kiếm không tồn tại.</p>

      <a href="/" className="btn btn-primary mt-6">
        Về trang chủ
      </a>
    </div>
  );
}
