/** Hand-built line drawings for the text tiles. Stroke-drawn on reveal via CSS. */
export function TileArt({ kind }: { kind: "training" | "guidance" | "career" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "training") {
    // Gantt: four bars, a milestone diamond, and a "today" line.
    return (
      <svg className="tile__art" viewBox="0 0 160 120" aria-hidden="true">
        <g {...common}>
          <path d="M14 22h58" />
          <path d="M40 46h74" />
          <path d="M22 70h48" />
          <path d="M60 94h86" />
          <path d="M104 12v100" strokeDasharray="4 6" />
          <path d="M134 40l8 8-8 8-8-8z" />
        </g>
      </svg>
    );
  }
  if (kind === "guidance") {
    // Compass: two rings, a needle, cardinal ticks.
    return (
      <svg className="tile__art" viewBox="0 0 160 120" aria-hidden="true">
        <g {...common}>
          <circle cx="80" cy="60" r="46" />
          <circle cx="80" cy="60" r="30" />
          <path d="M80 8v10M80 102v10M28 60h10M122 60h10" />
          <path d="M96 40L86 66l-22 14 10-26z" />
          <circle cx="80" cy="60" r="3" />
        </g>
      </svg>
    );
  }
  // Career: rising steps and an arrow.
  return (
    <svg className="tile__art" viewBox="0 0 160 120" aria-hidden="true">
      <g {...common}>
        <path d="M12 108h30V84h30V60h30V36h30" />
        <path d="M100 20l32 0 0 32" />
        <path d="M132 20L96 56" />
      </g>
    </svg>
  );
}
