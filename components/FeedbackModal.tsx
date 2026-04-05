"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

type Props = {
  open: boolean;
  onClose: () => void;
  tool?: string;
};

export default function FeedbackModal({ open, onClose, tool }: Props) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  if (!open) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setRating(0);
      setHovered(0);
      setNote("");
      setSubmitted(false);
      setError(false);
    }, 300);
  };

  const handleSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, note, tool }),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(handleClose, 2000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-3000 flex items-end sm:items-center justify-center">
      <div onClick={handleClose} className="absolute inset-0 bg-black/50" />
      <div className="relative w-full sm:w-auto sm:min-w-[420px] bg-white rounded-t-2xl sm:rounded-2xl p-6 z-3100 shadow-2xl">
        {submitted ? (
          <div className="text-center py-6">
            <p className="text-4xl mb-3">🎉</p>
            <p className="text-xl font-bold text-gray-900">Thank you!</p>
            <p className="text-gray-500 text-sm mt-1">
              Your feedback helps us improve PagelyPDF.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  How was your experience?
                </h3>
                {tool && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Tool: <span className="font-medium text-gray-500">{tool}</span>
                  </p>
                )}
              </div>
              <CgClose
                onClick={handleClose}
                className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-700 transition mt-0.5"
              />
            </div>

            <div className="flex gap-3 justify-center my-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  <FaStar
                    size={36}
                    className={`transition-colors duration-100 ${
                      star <= (hovered || rating)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }`}
                  />
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="text-center text-sm text-gray-500 -mt-2 mb-4">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent!"}
              </p>
            )}

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tell us more (optional)"
              rows={3}
              maxLength={500}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none placeholder:text-gray-400"
            />

            {error && (
              <p className="text-red-500 text-xs mt-1">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 cursor-pointer transition"
              >
                Skip
              </button>
              <button
                onClick={handleSubmit}
                disabled={rating === 0 || submitting}
                className="flex-1 py-2.5 rounded-xl bg-blue-800 text-white text-sm font-semibold hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
              >
                {submitting ? "Sending..." : "Submit Feedback"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
