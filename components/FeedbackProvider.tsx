"use client";
import { createContext, useContext, useState, useCallback } from "react";
import FeedbackModal from "./FeedbackModal";

type FeedbackContextType = {
  openFeedback: (tool?: string) => void;
};

const FeedbackContext = createContext<FeedbackContextType>({
  openFeedback: () => {},
});

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [tool, setTool] = useState<string | undefined>();

  const openFeedback = useCallback((toolName?: string) => {
    setTool(toolName);
    setOpen(true);
  }, []);

  return (
    <FeedbackContext.Provider value={{ openFeedback }}>
      {children}
      <FeedbackModal open={open} onClose={() => setOpen(false)} tool={tool} />
    </FeedbackContext.Provider>
  );
}

export const useFeedback = () => useContext(FeedbackContext);
