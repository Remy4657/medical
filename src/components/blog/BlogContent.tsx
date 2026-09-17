"use client";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import { EditorContent, useEditor } from "@tiptap/react";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEffect, useState } from "react";

interface BlogContentProps {
  content: Record<string, any>;
}

export default function BlogContent({ content }: BlogContentProps) {
  // const [html, setHtml] = useState("");

  // useEffect(() => {
  //   const result = generateHTML(content, [
  //     StarterKit,
  //     Image,
  //     Underline,
  //     TextStyle,
  //     Color,
  //   ]);
  //   setHtml(result);
  // }, [content]);

  // return (
  //   <article
  //     className="
  //       prose
  //       prose-lg
  //       max-w-none

  //       prose-headings:text-base-content
  //       prose-p:text-base-content/80
  //       prose-strong:text-base-content
  //       prose-a:text-primary
  //       prose-img:rounded-xl
  //       prose-img:w-full
  //     "
  //     dangerouslySetInnerHTML={{
  //       __html: html,
  //     }}
  //   />
  // );
  const editor = useEditor({
    extensions: [StarterKit, Image, Underline, TextStyle, Color],
    content,
  });

  return <EditorContent editor={editor} />;
}
