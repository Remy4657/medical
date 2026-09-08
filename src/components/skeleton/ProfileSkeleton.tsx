export default function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Avatar */}
      <div className="mb-8 flex justify-center">
        <div className="h-[114px] w-[114px] rounded-full bg-gray-200" />
      </div>

      {/* Info */}
      <div className="space-y-0">
        {/* Họ và tên */}
        <SkeletonInfoRow />

        {/* Email */}
        <SkeletonInfoRow />

        {/* Giới tính */}
        <SkeletonInfoRow />

        {/* Ngày sinh */}
        <SkeletonInfoRow />
      </div>

      {/* Button */}
      <div className="mt-8 flex justify-center">
        <div className="h-[48px] w-[190px] rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

function SkeletonInfoRow() {
  return (
    <div className="flex min-h-[64px] items-center justify-between border-b border-[#e1e5ea] py-4">
      <div className="h-4 w-[100px] rounded bg-gray-200" />
      <div className="h-4 w-[160px] rounded bg-gray-200" />
    </div>
  );
}
