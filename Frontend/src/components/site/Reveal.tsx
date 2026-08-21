import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

export function Reveal({
  children,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const reveal = useReveal<HTMLElement>();
  const Tag = As as "div";
  return (
    <Tag
      ref={reveal.ref as React.RefObject<HTMLDivElement>}
      data-visible={reveal["data-visible"]}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={`mt-4 font-serif text-3xl leading-tight tracking-wide md:text-4xl ${
          tone === "dark" ? "text-primary" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      <div className={`gold-rule mt-5 ${align === "center" ? "mx-auto" : ""}`} />
      {intro && (
        <p
          className={`mt-5 text-sm leading-relaxed md:text-base ${
            tone === "dark" ? "text-[oklch(0.82_0.02_80)]" : "text-muted-foreground"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
