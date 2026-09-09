import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ContactContent } from "./contact-content";
import type { ContactFormValues } from "./contact-schema";
import type { ContactFile } from "./useContactFiles";
import { ContactFileUploader } from "./ContactFileUploader";

type ContactFormProps = {
  content: ContactContent;
  register: UseFormRegister<ContactFormValues>;
  errors: FieldErrors<ContactFormValues>;
  files: ContactFile[];
  addFiles: (fileList: FileList | File[]) => void;
  removeFile: (id: string) => void;
  isUploading: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: () => void;
};

const inputClass =
  "mt-2 w-full border-b border-bone/15 bg-transparent py-2 font-body text-sm text-bone placeholder:text-bone-dim/60 focus:border-bone/40 focus:outline-none transition-colors duration-300";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 font-body text-xs text-orange">{message}</p>;
}

export function ContactForm({
  content,
  register,
  errors,
  files,
  addFiles,
  removeFile,
  isUploading,
  isSubmitting,
  submitError,
  onSubmit,
}: ContactFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-6"
      noValidate
    >
      <div>
        <label htmlFor="name" className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">
          {content.fields.name.label}
        </label>
        <input
          id="name"
          type="text"
          placeholder={content.fields.name.placeholder}
          className={inputClass}
          {...register("name")}
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">
            {content.fields.email.label}
          </label>
          <input
            id="email"
            type="email"
            placeholder={content.fields.email.placeholder}
            className={inputClass}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="phone" className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">
            {content.fields.phone.label}
          </label>
          <input
            id="phone"
            type="tel"
            placeholder={content.fields.phone.placeholder}
            className={inputClass}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">
            {content.fields.projectType.label}
          </label>
          <select id="projectType" className={`${inputClass} appearance-none`} {...register("projectType")}>
            <option value="" disabled>
              {content.fields.projectType.placeholder}
            </option>
            {content.projectTypes.map((option) => (
              <option key={option.value} value={option.value} className="bg-ink text-bone">
                {option.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.projectType?.message} />
        </div>

        <div>
          <label htmlFor="quantity" className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">
            {content.fields.quantity.label}
          </label>
          <input
            id="quantity"
            type="text"
            placeholder={content.fields.quantity.placeholder}
            className={inputClass}
            {...register("quantity")}
          />
          <FieldError message={errors.quantity?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">
          {content.fields.message.label}
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder={content.fields.message.placeholder}
          className={`${inputClass} resize-none`}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      <ContactFileUploader content={content} files={files} addFiles={addFiles} removeFile={removeFile} />

      <div className="mt-2 flex flex-col items-start gap-3">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-300 ease-out hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <span className="absolute inset-0 rule-signature" aria-hidden="true" />
          <span className="relative">{isSubmitting ? content.submittingLabel : content.submitLabel}</span>
        </button>
        {submitError ? <p className="font-body text-xs text-orange">{submitError}</p> : null}
      </div>
    </form>
  );
}
