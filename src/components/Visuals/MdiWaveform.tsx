import type { JSX } from "solid-js";

export function MdiWaveform(props: JSX.IntrinsicElements["svg"], key: string) {
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
        d="m22 12l-2 1l-1 1l-1-1l-1 3l-1-3l-1 8l-1-8l-1 2l-1-2l-1 4l-1-4l-1 9l-1-9l-1 6l-1-6l-1 1l-1-1l-2-1l2-1l1-1l1 1l1-6l1 6l1-9l1 9l1-4l1 4l1-2l1 2l1-8l1 8l1-3l1 3l1-1l1 1l2 1Z"
      ></path>
    </svg>
  );
}
export default MdiWaveform;
