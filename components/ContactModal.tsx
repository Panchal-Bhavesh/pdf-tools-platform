"use client";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-2000 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/60" />
      <div className="relative w-[90%] max-w-lg bg-white rounded-2xl p-6 z-2100 max-h-[90vh] overflow-y-auto">
        <CgClose
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 cursor-pointer text-gray-600"
        />
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">
          Contact Us
        </h2>
        <p className="text-gray-700 mb-4 text-center">
          Need help or have a question? Contact us anytime.
        </p>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = Object.fromEntries(new FormData(form));
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            if (res.ok) {
              form.reset();
              onClose();
            } else {
              alert("Something went wrong!");
            }
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="font-medium text-black">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="Enter First Name"
                className="input bg-light-accent/10 py-3 px-2 rounded-xl focus:outline-none border border-gray-400 placeholder:text-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="font-medium text-black">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter Last Name"
                className="input bg-light-accent/10 py-3 px-2 rounded-xl focus:outline-none border border-gray-400 placeholder:text-gray-400 text-gray-900"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-black">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter Email Address"
              className="input bg-light-accent/10 py-3 px-2 rounded-xl focus:outline-none border border-gray-400 placeholder:text-gray-400 text-gray-900"
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="font-medium text-black">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              placeholder="Enter Subject"
              className="input bg-light-accent/10 py-3 px-2 rounded-xl focus:outline-none border border-gray-400 placeholder:text-gray-400 text-gray-900"
            />
          </div> */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-medium text-black">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Enter your message"
              rows={4}
              className="input bg-light-accent/10 py-3 px-2 rounded-xl focus:outline-none border border-gray-400 placeholder:text-gray-400 text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-800 text-white font-semibold hover:bg-blue-900 transition cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
