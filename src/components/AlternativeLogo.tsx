interface AlternativeLogoProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

export function AlternativeLogo({ 
  className = "", 
  color = "currentColor",
  strokeWidth = 2.5
}: AlternativeLogoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Head outline - front view */}
      <path
        d="M 100 40 C 120 40 140 50 150 65 C 155 75 157 85 157 95 C 157 105 157 120 155 135 C 153 145 150 155 140 165 C 130 175 115 180 100 180 C 85 180 70 175 60 165 C 50 155 47 145 45 135 C 43 120 43 105 43 95 C 43 85 45 75 50 65 C 60 50 80 40 100 40 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Stylized "M" formed by lightning bolt */}
      <path
        d="M 75 70 L 85 100 L 90 85 L 100 110 L 110 85 L 115 100 L 125 70"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Pain waves radiating from head */}
      <path
        d="M 30 80 Q 25 85 30 90"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 20 100 Q 15 105 20 110"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity="0.4"
      />
      
      <path
        d="M 170 80 Q 175 85 170 90"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 180 100 Q 185 105 180 110"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function AlternativeLogoV2({ 
  className = "", 
  color = "currentColor",
  strokeWidth = 2.5
}: AlternativeLogoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circular head */}
      <circle
        cx="100"
        cy="100"
        r="60"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      
      {/* Lightning bolt in the center forming an M shape */}
      <path
        d="M 70 80 L 80 105 L 85 95 L 100 120 L 115 95 L 120 105 L 130 80"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Horizontal pain indicator line */}
      <path
        d="M 65 110 L 135 110"
        stroke={color}
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function AlternativeLogoV3({ 
  className = "", 
  color = "currentColor",
  strokeWidth = 2.5
}: AlternativeLogoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Profile head outline - opposite direction */}
      <path
        d="M 140 55 C 135 48 128 45 120 45 C 105 45 95 52 88 60 C 82 68 78 78 75 90 C 73 100 72 110 72 120 C 72 135 75 145 80 155 C 85 163 92 168 100 170 L 100 175 C 95 175 90 173 88 170 C 70 165 60 145 58 125 C 57 115 57 105 58 95 C 60 80 65 68 73 58 C 82 47 95 40 110 40 C 122 40 133 44 142 52 C 145 55 147 58 148 62 L 140 55 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Lightning bolt "M" */}
      <path
        d="M 95 75 L 100 95 L 105 85 L 115 105 L 125 85 L 130 95 L 135 75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
