"use client";
import { CgClose } from "react-icons/cg";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TermsModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-2000 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/60" />
      <div className="relative w-[90%] max-w-2xl bg-white rounded-2xl z-2100 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Terms &amp; Conditions</h2>
          <CgClose
            onClick={onClose}
            className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800 transition"
          />
        </div>

        <div className="overflow-y-auto px-6 py-5 space-y-5 text-sm text-gray-700 leading-relaxed">
          <p className="text-gray-500 text-xs">Last updated: {new Date().getFullYear()}</p>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">1. Acceptance of Terms</h3>
            <p>
              By accessing and using PagelyPDF (&quot;the Service&quot;), you agree to be bound by
              these Terms &amp; Conditions. If you do not agree to these terms, please do not
              use the Service.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">2. Description of Service</h3>
            <p>
              PagelyPDF provides free online PDF tools including merging, splitting,
              compressing, converting, and securing PDF files. The Service is provided
              &quot;as is&quot; without any warranties of any kind.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">3. File Privacy &amp; Security</h3>
            <p>
              Files you upload are processed solely to perform the requested operation.
              We do not store, share, or retain your files after processing is complete.
              All file transfers are handled securely. You are responsible for ensuring
              you have the right to process any files you upload.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">4. Acceptable Use</h3>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>Upload files containing illegal, harmful, or infringing content</li>
              <li>Attempt to reverse-engineer or disrupt the Service</li>
              <li>Use automated scripts to overload or abuse the Service</li>
              <li>Upload files you do not own or have authorization to process</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">5. Intellectual Property</h3>
            <p>
              All content, design, and code of PagelyPDF are the property of PagelyPDF
              and are protected by applicable intellectual property laws. You may not
              reproduce, distribute, or create derivative works without prior written
              permission.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">6. Limitation of Liability</h3>
            <p>
              PagelyPDF shall not be liable for any indirect, incidental, or consequential
              damages arising from your use of the Service, including but not limited to
              data loss, file corruption, or interruption of service. Use the Service at
              your own risk and always keep backups of important files.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">7. Service Availability</h3>
            <p>
              We strive to keep PagelyPDF available at all times but do not guarantee
              uninterrupted access. We reserve the right to modify, suspend, or discontinue
              the Service at any time without notice.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">8. Changes to Terms</h3>
            <p>
              We reserve the right to update these Terms &amp; Conditions at any time.
              Continued use of the Service after changes constitutes your acceptance of
              the revised terms.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-gray-900 mb-1">9. Contact</h3>
            <p>
              If you have any questions about these Terms &amp; Conditions, please reach
              out via the Contact Us form on our website.
            </p>
          </section>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-blue-800 text-white font-semibold hover:bg-blue-900 transition cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
