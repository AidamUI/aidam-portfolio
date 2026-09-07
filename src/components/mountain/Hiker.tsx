/**
 * The small figure that stands in for Aidam on the trail — the one constant
 * across every stage of the scene. Two flat shapes and a walking stick, built
 * from the theme's `--fig-ink` / `--fig-accent` tokens so it re-colours with
 * the rest of the illustration on a day/night toggle.
 */
export function Hiker({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 46 82"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="5"
        y="26"
        width="14"
        height="23"
        rx="6.5"
        fill="var(--fig-accent)"
      />
      <rect
        x="14"
        y="24"
        width="16"
        height="27"
        rx="7.5"
        fill="var(--fig-ink)"
      />
      <rect
        x="15"
        y="48"
        width="8.5"
        height="27"
        rx="4.2"
        fill="var(--fig-ink)"
        transform="rotate(-13 19 50)"
      />
      <rect
        x="23"
        y="48"
        width="8.5"
        height="27"
        rx="4.2"
        fill="var(--fig-ink)"
        transform="rotate(11 27 50)"
      />
      <rect
        x="26"
        y="28"
        width="7"
        height="19"
        rx="3.5"
        fill="var(--fig-ink)"
        transform="rotate(-16 29 30)"
      />
      <circle cx="23" cy="15" r="8.4" fill="var(--fig-ink)" />
      <rect
        x="10"
        y="11"
        width="26"
        height="4.6"
        rx="2.3"
        fill="var(--fig-accent)"
      />
      <rect
        x="35"
        y="20"
        width="2.6"
        height="56"
        rx="1.3"
        fill="var(--fig-accent)"
        opacity="0.9"
      />
    </svg>
  );
}
