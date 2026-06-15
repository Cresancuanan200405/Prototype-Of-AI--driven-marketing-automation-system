import React from "react";

export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
      <path d="M7 12h10v2H7z" fill="rgba(255,255,255,0.9)" />
    </svg>
  );
}
