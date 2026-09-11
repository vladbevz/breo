"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { devisFormSchema, type DevisFormValues } from "./devis-schema";
import { submitDevis } from "./devis-actions";

const inputClass =
  "mt-2 w-full border-b border-bone/15 bg-transparent py-2 font-body text-sm text-bone placeholder:text-bone-dim/60 focus:border-bone/40 focus:outline-none transition-colors duration-300";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 font-body text-xs text-orange">{message}</p>;
}

export function DevisForm({ designId }: { designId: string }) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DevisFormValues>({ resolver: zodResolver(devisFormSchema) });

  async function onSubmit(values: DevisFormValues) {
    setSubmitError(null);
    const result = await submitDevis(designId, values);
    if (!result.success) {
      setSubmitError(result.error);
      return;
    }
    router.push(`/devis/${designId}/confirmation`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <div>
        <label htmlFor="name" className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">
          Nom
        </label>
        <input id="name" type="text" placeholder="Votre nom" className={inputClass} {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="company" className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">
          Entreprise (facultatif)
        </label>
        <input id="company" type="text" placeholder="Nom de votre entreprise" className={inputClass} {...register("company")} />
        <FieldError message={errors.company?.message} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">
            Email
          </label>
          <input id="email" type="email" placeholder="vous@exemple.fr" className={inputClass} {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="phone" className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">
            Téléphone (facultatif)
          </label>
          <input id="phone" type="tel" placeholder="06 00 00 00 00" className={inputClass} {...register("phone")} />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">
          Message (facultatif)
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Délais souhaités, précisions sur votre projet…"
          className={`${inputClass} resize-none`}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      <div className="mt-2 flex flex-col items-start gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-300 ease-out hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <span className="absolute inset-0 rule-signature" aria-hidden="true" />
          <span className="relative">{isSubmitting ? "Envoi…" : "Envoyer ma demande"}</span>
        </button>
        {submitError ? <p className="font-body text-xs text-orange">{submitError}</p> : null}
      </div>
    </form>
  );
}
