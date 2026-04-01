"use client";

import { ReactNode } from "react";
import { useLenis } from "@/hooks/useLenis";

type Props = {
  children: ReactNode;
};

export default function SmoothScrollProvider({ children }: Props) {
  useLenis();

  return <>{children}</>;
}
