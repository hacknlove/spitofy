import type { JSX } from "solid-js";

export function MdiEqualizer(props: JSX.IntrinsicElements["svg"], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="currentColor"
        d="M10 20h4V4h-4v16m-6 0h4v-8H4v8M16 9v11h4V9h-4Z"
      ></path>
    </svg>
  );
}
export default MdiEqualizer;
