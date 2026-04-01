import {
  FaCompress,
  FaFilePdf,
  FaLock,
  FaUnlock,
  FaSyncAlt,
  FaTrash,
  FaImages,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaSort,
  FaCut,
} from "react-icons/fa";

export const navLinks = [
  { id: 1, url: "/pdf-merge", lable: "Merge PDF" },
  { id: 2, url: "/pdf-split", lable: "Split PDF" },
  { id: 3, url: "/compress-pdf", lable: "Compress PDF" },
];

export const pdfToolSections = [
  {
    title: "PDF Tools",
    items: [
      { id: 1, label: "Extract Pages", url: "/extract-pdf" },
      { id: 2, label: "Reorder Pages", url: "/protect-pdf" },
      { id: 3, label: "Delete Pages", url: "/delete-pages" },
      // { id: 4, label: "Rotate PDF", url: "/rotate-pdf" },
      { id: 4, label: "Protect PDF", url: "/protect-pdf" },
      { id: 5, label: "Unlock PDF", url: "/unlock-pdf" },
    ],
  },
  {
    title: "Convert from PDF",
    items: [
      { id: 6, label: "PDF to Word", url: "/pdf-to-word" },
      { id: 7, label: "PDF to PowerPoint", url: "/pdf-to-ppt" },
      { id: 8, label: "PDF to Excel", url: "/pdf-to-excel" },
      { id: 9, label: "PDF to JPG", url: "/pdf-to-jpg" },
    ],
  },
  {
    title: "Convert to PDF",
    items: [
      { id: 10, label: "Word to PDF", url: "/word-to-pdf" },
      { id: 11, label: "PowerPoint to PDF", url: "/ppt-to-pdf" },
      { id: 12, label: "Excel to PDF", url: "/excel-to-pdf" },
      { id: 13, label: "JPG to PDF", url: "/jpg-to-pdf" },
    ],
  },
];

export type Category =
  | "all"
  | "organize"
  | "optimize"
  | "convert"
  | "edit"
  | "security";

export const tools = [
  {
    name: "Merge PDF",
    path: "/pdf-merge",
    category: "organize",
    icon: FaSort,
    desc: "Combine multiple PDFs into one document",
    color: "text-orange-500",
  },
  {
    name: "Split PDF",
    path: "/pdf-split",
    category: "organize",
    icon: FaCut,
    desc: "Separate pages into individual PDFs",
    color: "text-orange-500",
  },
  {
    name: "Compress PDF",
    path: "/compress-pdf",
    category: "optimize",
    icon: FaCompress,
    desc: "Reduce file size without losing quality",
    color: "text-green-600",
  },
  {
    name: "Extract Pages",
    path: "/extract-pdf",
    category: "organize",
    icon: FaFilePdf,
    desc: "Pull selected pages from a PDF",
    color: "text-green-500",
  },
  {
    name: "Reorder Pages",
    path: "/reorder-pages",
    category: "organize",
    icon: FaSyncAlt,
    desc: "Change the order of PDF pages",
    color: "text-blue-800",
  },
  {
    name: "Delete Pages",
    path: "/delete-pages",
    category: "edit",
    icon: FaTrash,
    desc: "Remove unwanted pages instantly",
    color: "text-red-500",
  },
  {
    name: "PDF to Word",
    path: "/pdf-to-word",
    category: "convert",
    icon: FaFileWord,
    desc: "Convert PDFs into editable Word files",
    color: "text-blue-800",
  },
  {
    name: "PDF to PowerPoint",
    path: "/pdf-to-ppt",
    category: "convert",
    icon: FaFilePowerpoint,
    desc: "Turn PDFs into presentation slides",
    color: "text-orange-600",
  },
  {
    name: "PDF to Excel",
    path: "/pdf-to-excel",
    category: "convert",
    icon: FaFileExcel,
    desc: "Extract tables into Excel sheets",
    color: "text-green-800",
  },
  {
    name: "PDF to JPG",
    path: "/pdf-to-jpg",
    category: "convert",
    icon: FaImages,
    desc: "Convert PDF pages into images",
    color: "text-yellow-500",
  },
  {
    name: "JPG to PDF",
    path: "/jpg-to-pdf",
    category: "convert",
    icon: FaImages,
    desc: "Create PDFs from image files",
    color: "text-yellow-500",
  },
  {
    name: "Word to PDF",
    path: "/word-to-pdf",
    category: "convert",
    icon: FaFileWord,
    desc: "Convert Word documents to PDF",
    color: "text-blue-800",
  },
  {
    name: "PowerPoint to PDF",
    path: "/ppt-to-pdf",
    category: "convert",
    icon: FaFilePowerpoint,
    desc: "Export presentations as PDFs",
    color: "text-orange-500",
  },
  {
    name: "Excel to PDF",
    path: "/excel-to-pdf",
    category: "convert",
    icon: FaFileExcel,
    desc: "Convert spreadsheets into PDF format",
    color: "text-green-800",
  },

  {
    name: "Protect PDF",
    path: "/protect-pdf",
    category: "security",
    icon: FaLock,
    desc: "Secure PDFs with password protection",
    color: "text-sky-500",
  },
  {
    name: "Unlock PDF",
    path: "/unlock-pdf",
    category: "security",
    icon: FaUnlock,
    desc: "Remove password from secured PDFs",
    color: "text-sky-500",
  },
];

export const tabs = [
  { label: "All", value: "all" },
  { label: "Organize PDF", value: "organize" },
  { label: "Optimize PDF", value: "optimize" },
  { label: "Convert PDF", value: "convert" },
  { label: "Edit PDF", value: "edit" },
  { label: "PDF Security", value: "security" },
];
