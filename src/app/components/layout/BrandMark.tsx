export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <path
        d="
          M 18 10
          L 82 10
          C 82 10, 85 10, 85 13
          L 85 13
          C 85 13, 85 16, 82 18
          L 55 42
          C 68 48, 72 58, 72 66
          C 72 78, 66 86, 54 86
          L 30 86
          L 30 70
          L 50 70
          C 58 70, 62 66, 62 62
          C 62 56, 58 52, 50 52
          L 30 52
          L 30 10
          Z
        "
        fill="currentColor"
      />
    </svg>
  );
}