import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";

const BlogImageComponent = ({ node }: any) => {
  return (
    <NodeViewWrapper className="my-8">
      <figure className="text-center">
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          className="mx-auto w-full max-w-4xl rounded-xl"
        />

        {node.attrs.caption && (
          <figcaption className="mt-3 text-sm italic text-gray-500">
            {node.attrs.caption}
          </figcaption>
        )}
      </figure>
    </NodeViewWrapper>
  );
};

export const BlogImage = Node.create({
  name: "blogImage",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },

      alt: {
        default: "",
      },

      caption: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure[data-blog-image]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      mergeAttributes(HTMLAttributes, {
        "data-blog-image": "",
      }),
      [
        "img",
        {
          src: HTMLAttributes.src,
          alt: HTMLAttributes.alt || "",
        },
      ],
      ["figcaption", {}, HTMLAttributes.caption || ""],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BlogImageComponent);
  },
});
