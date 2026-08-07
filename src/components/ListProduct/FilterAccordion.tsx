type FilterAccordionProps = {
  id: number;
  title: string;
  openId: number | null;
  setOpenId: React.Dispatch<React.SetStateAction<number | null>>;
  children: React.ReactNode;
};

export default function FilterAccordion({
  id,
  title,
  openId,
  setOpenId,
  children,
}: FilterAccordionProps) {
  const isOpen = openId === id;

  return (
    <div className="collapse collapse-arrow border-base-300">
      <input
        type="checkbox"
        checked={isOpen}
        onChange={() => {
          setOpenId((prev) => (prev === id ? null : id));
        }}
      />

      <div className="collapse-title font-semibold">{title}</div>

      <div
        className={`collapse-content grid text-sm transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
