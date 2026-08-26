import Image from "next/image";

type PropType = {
  selected: boolean;
  item: any;
  onClick: () => void;
};

export const Thumb = (props: PropType) => {
  const { selected, item, onClick } = props;
  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : "",
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <Image src={item.url} width={70} height={70} alt="" />
      </button>
    </div>
  );
};
