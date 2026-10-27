const ribbons = [
  'M -180 580 C 90 190, 220 660, 570 520 S 1160 170, 1620 480',
  'M -140 770 C 180 1020, 420 440, 840 650 S 1240 920, 1600 650',
]

function OrbitMark({ className }: { className: string }) {
  return (
    <svg className={`orbit-mark ${className}`} viewBox="0 0 64 64" fill="none">
      <path d="M 22 8 A 26 26 0 1 0 42 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M 18 28 L 32 39 L 46 27" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="7" r="4" fill="currentColor" />
      <circle cx="18" cy="28" r="4" fill="currentColor" />
      <circle cx="32" cy="39" r="5" fill="currentColor" />
      <circle cx="46" cy="27" r="5" fill="#3cae99" />
    </svg>
  )
}

export function HubBackground() {
  return (
    <div className="hub-background" aria-hidden="true">
      <div className="hero-aura hero-aura-mint" />
      <div className="hero-aura hero-aura-sky" />
      <svg className="hero-ribbons" viewBox="0 0 1440 1100" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ribbon-mint" x1="0" y1="300" x2="1440" y2="800" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8edac6" stopOpacity=".08" />
            <stop offset=".2" stopColor="#a6dfce" stopOpacity=".55" />
            <stop offset=".5" stopColor="#d9f2e8" stopOpacity=".1" />
            <stop offset=".8" stopColor="#87cfc2" stopOpacity=".4" />
            <stop offset="1" stopColor="#b9dfde" stopOpacity=".06" />
          </linearGradient>
        </defs>
        {ribbons.map((path, index) => (
          <g className={`hero-ribbon hero-ribbon-${index + 1}`} key={path}>
            <path d={path} stroke="url(#ribbon-mint)" strokeWidth={index === 0 ? 90 : 60} />

          </g>
        ))}
      </svg>
      <OrbitMark className="orbit-mark-one" />
      <OrbitMark className="orbit-mark-two" />
      <OrbitMark className="orbit-mark-three" />
      <OrbitMark className="orbit-mark-four" />
      <OrbitMark className="orbit-mark-five" />
      <div className="hub-background-fade" />
    </div>
  )
}
