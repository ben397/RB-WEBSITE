// Custom flat-geometric illustrations standing in for real photography until RB supplies
// consented photos of their own work. Deliberately not photo-realistic — a designed
// illustration reads as an intentional choice, where a generic stock photo of strangers
// would read as filler. Built from simple shapes only (circles/rects/polygons) so nothing
// here depends on hand-drawn paths.

const PALETTE = {
  navy: "#12263A",
  blue: "#326BA7",
  ochre: "#9A5626",
  paper: "#F6F2EA",
  ink: "#2B2620",
  sage: "#7C8B6F",
};

export type IllustrationVariant =
  | "hero"
  | "livelihood"
  | "psychosocial"
  | "peace"
  | "advocacy";

function Figure({ x, fill }: { x: number; fill: string }) {
  return (
    <g transform={`translate(${x},0)`}>
      <circle cx="0" cy="0" r="14" fill={fill} />
      <path d="M -20 60 Q -20 18 0 18 Q 20 18 20 60 Z" fill={fill} />
    </g>
  );
}

function Backdrop({ from, to }: { from: string; to: string }) {
  const id = `grad-${from}-${to}`.replace(/#/g, "");
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id})`} />
    </>
  );
}

function HeroScene() {
  return (
    <>
      <Backdrop from={PALETTE.blue} to={PALETTE.navy} />
      <circle cx="330" cy="60" r="46" fill={PALETTE.ochre} opacity="0.55" />
      <path d="M0 220 Q100 180 200 210 T400 200 V300 H0 Z" fill={PALETTE.sage} opacity="0.35" />
      <path d="M0 250 Q120 220 240 245 T400 235 V300 H0 Z" fill={PALETTE.paper} opacity="0.15" />
      <g transform="translate(170,205)">
        <Figure x={-22} fill={PALETTE.paper} />
        <Figure x={22} fill={PALETTE.paper} />
      </g>
    </>
  );
}

function LivelihoodScene() {
  return (
    <>
      <Backdrop from={PALETTE.sage} to={PALETTE.paper} />
      <polygon points="120,90 220,90 170,40" fill={PALETTE.navy} opacity="0.85" />
      <rect x="130" y="90" width="80" height="70" fill={PALETTE.paper} stroke={PALETTE.navy} strokeWidth="3" />
      <rect x="145" y="115" width="50" height="45" fill={PALETTE.blue} opacity="0.7" />
      {[0, 1, 2, 3].map((i) => (
        <ellipse
          key={i}
          cx={270}
          cy={160 - i * 14}
          rx="26"
          ry="9"
          fill={PALETTE.ochre}
          opacity={0.9 - i * 0.1}
        />
      ))}
      <path d="M0 220 Q100 190 200 215 T400 205 V300 H0 Z" fill={PALETTE.navy} opacity="0.12" />
    </>
  );
}

function PsychosocialScene() {
  return (
    <>
      <Backdrop from={PALETTE.blue} to={PALETTE.paper} />
      <path
        d="M200 70 C170 40 120 55 120 95 C120 130 160 155 200 180 C240 155 280 130 280 95 C280 55 230 40 200 70 Z"
        fill={PALETTE.ochre}
        opacity="0.5"
      />
      <g transform="translate(160,210)">
        <Figure x={0} fill={PALETTE.navy} />
      </g>
      <g transform="translate(225,215) scale(0.9)">
        <Figure x={0} fill={PALETTE.sage} />
      </g>
      <path d="M0 240 Q120 210 240 235 T400 225 V300 H0 Z" fill={PALETTE.navy} opacity="0.1" />
    </>
  );
}

function PeaceScene() {
  return (
    <>
      <Backdrop from={PALETTE.navy} to={PALETTE.sage} />
      <circle cx="200" cy="140" r="48" fill={PALETTE.paper} />
      <polygon points="200,110 218,124 211,145 189,145 182,124" fill={PALETTE.navy} opacity="0.85" />
      <circle cx="170" cy="115" r="7" fill={PALETTE.navy} opacity="0.6" />
      <circle cx="230" cy="115" r="7" fill={PALETTE.navy} opacity="0.6" />
      <circle cx="180" cy="170" r="7" fill={PALETTE.navy} opacity="0.6" />
      <circle cx="220" cy="170" r="7" fill={PALETTE.navy} opacity="0.6" />
      <path d="M0 230 Q100 200 200 220 T400 210 V300 H0 Z" fill={PALETTE.paper} opacity="0.15" />
      <path
        d="M140 60 Q160 40 190 50 Q170 55 165 75 Q150 70 140 60 Z"
        fill={PALETTE.ochre}
        opacity="0.8"
      />
    </>
  );
}

function AdvocacyScene() {
  return (
    <>
      <Backdrop from={PALETTE.ochre} to={PALETTE.navy} />
      <rect x="175" y="150" width="50" height="60" fill={PALETTE.paper} opacity="0.9" />
      <polygon points="175,150 225,150 210,120 190,120" fill={PALETTE.paper} opacity="0.9" />
      <rect x="196" y="90" width="8" height="34" fill={PALETTE.navy} />
      <circle cx="200" cy="82" r="12" fill={PALETTE.navy} />
      {[24, 40, 56].map((r, i) => (
        <path
          key={r}
          d={`M ${200 - r} 82 A ${r} ${r} 0 0 1 ${200 + r} 82`}
          stroke={PALETTE.paper}
          strokeWidth="3"
          fill="none"
          opacity={0.5 - i * 0.12}
        />
      ))}
      <path d="M0 240 Q120 215 240 235 T400 225 V300 H0 Z" fill={PALETTE.paper} opacity="0.12" />
    </>
  );
}

const SCENES: Record<IllustrationVariant, () => React.ReactElement> = {
  hero: HeroScene,
  livelihood: LivelihoodScene,
  psychosocial: PsychosocialScene,
  peace: PeaceScene,
  advocacy: AdvocacyScene,
};

export function Illustration({
  variant,
  className,
}: {
  variant: IllustrationVariant;
  className?: string;
}) {
  const Scene = SCENES[variant];
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <Scene />
    </svg>
  );
}

export function AvatarIllustration({ seed, className }: { seed: string; className?: string }) {
  const colors = [PALETTE.blue, PALETTE.sage, PALETTE.ochre, PALETTE.navy];
  const color = colors[seed.length % colors.length];
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-hidden="true">
      <rect width="100" height="100" fill={PALETTE.paper} />
      <circle cx="50" cy="38" r="20" fill={color} opacity="0.85" />
      <path d="M15 100 Q15 60 50 60 Q85 60 85 100 Z" fill={color} opacity="0.85" />
    </svg>
  );
}
