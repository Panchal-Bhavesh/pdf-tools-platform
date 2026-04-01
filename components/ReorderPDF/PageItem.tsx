"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PdfPreview from "../common/PdfPreview";

type props = {
  id: number;
  file: File;
};

export default function SortablePage({ id, file }: props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // className="p-3 text-center rounded-lg border font-semibold bg-white text-blue-800 border-blue-800 cursor-move hover:bg-blue-100"
    >
      <PdfPreview file={file} pageNumber={id} />
    </div>
  );
}
