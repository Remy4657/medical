import ProductFilterDesktop from "./ProductFilterDesktop";

type Props = {
  open: boolean;
  onClose: () => void;

  filters: any;

  setFilters: React.Dispatch<React.SetStateAction<any>>;
};

export default function MobileFilterDrawer({
  open,
  onClose,
  filters,
  setFilters,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-base-100 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Bộ lọc</h2>

          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        {/* Filter content */}
        <div className="h-[calc(100%-130px)] overflow-y-auto p-5">
          <ProductFilterDesktop filters={filters} setFilters={setFilters} />
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t bg-base-100 p-4">
          <button onClick={onClose} className="btn btn-primary w-full">
            Áp dụng bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
}
