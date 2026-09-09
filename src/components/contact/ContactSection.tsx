"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { getContactCheckmarkVariants, getContactPanelVariants } from "@/lib/motion";
import { submitContactForm } from "./contact-actions";
import type { ContactContent } from "./contact-content";
import { ContactForm } from "./ContactForm";
import { ContactIntro } from "./ContactIntro";
import { contactFormSchema, type ContactFormValues } from "./contact-schema";
import { ContactSuccess } from "./ContactSuccess";
import { useContactFiles } from "./useContactFiles";

type ContactSectionProps = {
  content: ContactContent;
};

export function ContactSection({ content }: ContactSectionProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema), mode: "onBlur" });

  const { files, addFiles, removeFile, isUploading } = useContactFiles();

  const panelVariants = getContactPanelVariants(shouldReduceMotion);
  const checkmarkVariants = getContactCheckmarkVariants(shouldReduceMotion);

  const onValid = handleSubmit(async (values) => {
    setSubmitError(null);
    const result = await submitContactForm({
      ...values,
      files: files
        .filter((entry) => entry.status === "done" && entry.blobUrl && entry.blobDownloadUrl)
        .map((entry) => ({
          url: entry.blobUrl as string,
          downloadUrl: entry.blobDownloadUrl as string,
          pathname: entry.blobPathname ?? entry.file.name,
          size: entry.file.size,
        })),
    });

    if (result.success) {
      setStatus("success");
    } else {
      setSubmitError(result.error);
    }
  });

  return (
    <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
      <div className="lg:col-span-4 lg:col-start-1">
        <ContactIntro content={content} />
      </div>

      <div className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <motion.div key="success" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
              <ContactSuccess content={content.success} checkmarkVariants={checkmarkVariants} />
            </motion.div>
          ) : (
            <motion.div key="form" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
              <ContactForm
                content={content}
                register={register}
                errors={errors}
                files={files}
                addFiles={addFiles}
                removeFile={removeFile}
                isUploading={isUploading}
                isSubmitting={isSubmitting}
                submitError={submitError}
                onSubmit={onValid}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
