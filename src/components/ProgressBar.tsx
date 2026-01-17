import React from "react";

interface ProgressBarProps {
  total_xp: number;
  next_level_required_xp: number;
}

export default function ProgressBar({
  total_xp,
  next_level_required_xp,
}: ProgressBarProps) {
  
  const xpInsideLevel = total_xp % next_level_required_xp

  const percent = Math.min(
    Math.max((xpInsideLevel / next_level_required_xp) * 100, 0)
  );

  return (
    <div style={{ width: "100%", background: "#e9ecef", borderRadius: "8px" }}>
      <div
        style={{
          width: `${percent}%`,
          height: "12px",
          background: "#AFd6aa",
          border:"solid",
          borderWidth:"2px",
          borderRadius: "8px",
          transition: "width 0.4s ease",
        }}
      ></div>
    </div>
  );
}
