/**
 * Inline SVG of the LPU Top Bot architecture.
 * Sources feed the engines feed the CRM. Humans review exceptions above.
 * This visual is what justifies a 6-figure install.
 */
export default function InstallDiagram() {
  const engines = ["Sourcing", "JD", "Qualification", "Name Clear", "Background"];
  const sources = ["LocumSmart", "Aya", "LotusOne"];

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 920 540"
        className="w-full min-w-[720px] h-auto"
        role="img"
        aria-label="The Top Bot install diagram. Three sources feed five engines which feed the GHL pipeline. The human team sits above and reviews exceptions."
      >
        <defs>
          <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,168,76,0)" />
            <stop offset="50%" stopColor="rgba(201,168,76,0.6)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0)" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Title band */}
        <text
          x="460"
          y="30"
          textAnchor="middle"
          fill="#C9A84C"
          fontSize="11"
          fontFamily="var(--font-inter)"
          letterSpacing="4"
          fontWeight="700"
        >
          THE TOP BOT · INSTALL TOPOLOGY
        </text>

        {/* Human oversight row */}
        <g>
          {[
            { x: 200, label: "Ali", role: "Executive" },
            { x: 460, label: "Ahmed", role: "Ops" },
            { x: 720, label: "Tyson", role: "Field" },
          ].map((person) => (
            <g key={person.label}>
              <rect
                x={person.x - 70}
                y={70}
                width="140"
                height="56"
                rx="8"
                fill="#161412"
                stroke="rgba(201,168,76,0.25)"
                strokeWidth="1"
              />
              <text
                x={person.x}
                y={92}
                textAnchor="middle"
                fill="#F5F0E8"
                fontSize="15"
                fontFamily="var(--font-cormorant)"
                fontWeight="600"
              >
                {person.label}
              </text>
              <text
                x={person.x}
                y={110}
                textAnchor="middle"
                fill="rgba(201,168,76,0.6)"
                fontSize="10"
                fontFamily="var(--font-inter)"
                letterSpacing="2"
              >
                {person.role.toUpperCase()}
              </text>
              <line
                x1={person.x}
                y1={126}
                x2={person.x}
                y2={186}
                stroke="rgba(201,168,76,0.2)"
                strokeDasharray="3,4"
              />
            </g>
          ))}
          <text
            x="80"
            y="100"
            fill="rgba(245,240,232,0.5)"
            fontSize="11"
            fontFamily="var(--font-inter)"
            fontStyle="italic"
          >
            Human team reviews exceptions only
          </text>
        </g>

        {/* Top Bot core */}
        <g>
          <rect
            x="340"
            y="190"
            width="240"
            height="70"
            rx="10"
            fill="rgba(201,168,76,0.1)"
            stroke="rgba(201,168,76,0.4)"
            strokeWidth="1.5"
            filter="url(#softGlow)"
          />
          <text
            x="460"
            y="220"
            textAnchor="middle"
            fill="#C9A84C"
            fontSize="20"
            fontFamily="var(--font-cormorant)"
            fontWeight="700"
          >
            The Top Bot
          </text>
          <text
            x="460"
            y="240"
            textAnchor="middle"
            fill="rgba(201,168,76,0.65)"
            fontSize="10"
            fontFamily="var(--font-inter)"
            letterSpacing="3"
          >
            AI CHIEF OF STAFF
          </text>
        </g>

        {/* Engines row */}
        <g>
          {engines.map((engine, i) => {
            const x = 70 + i * 160;
            return (
              <g key={engine}>
                <line
                  x1="460"
                  y1="260"
                  x2={x + 60}
                  y2="310"
                  stroke="rgba(201,168,76,0.2)"
                  strokeWidth="1"
                />
                <rect
                  x={x}
                  y="310"
                  width="120"
                  height="50"
                  rx="6"
                  fill="#141520"
                  stroke="rgba(201,168,76,0.15)"
                  strokeWidth="1"
                />
                <text
                  x={x + 60}
                  y="334"
                  textAnchor="middle"
                  fill="#F5F0E8"
                  fontSize="12"
                  fontFamily="var(--font-inter)"
                  fontWeight="500"
                >
                  {engine}
                </text>
                <text
                  x={x + 60}
                  y="349"
                  textAnchor="middle"
                  fill="rgba(201,168,76,0.55)"
                  fontSize="9"
                  fontFamily="var(--font-jetbrains)"
                >
                  ENGINE
                </text>
              </g>
            );
          })}
        </g>

        {/* Source feeds */}
        <g>
          {sources.map((source, i) => {
            const x = 200 + i * 260;
            return (
              <g key={source}>
                <line
                  x1={x + 50}
                  y1="420"
                  x2={x + 50}
                  y2="380"
                  stroke="rgba(201,168,76,0.15)"
                  strokeDasharray="2,3"
                />
                <rect
                  x={x}
                  y="420"
                  width="100"
                  height="36"
                  rx="4"
                  fill="transparent"
                  stroke="rgba(201,168,76,0.2)"
                />
                <text
                  x={x + 50}
                  y="442"
                  textAnchor="middle"
                  fill="rgba(201,168,76,0.7)"
                  fontSize="11"
                  fontFamily="var(--font-jetbrains)"
                >
                  {source}
                </text>
              </g>
            );
          })}
          <text
            x="80"
            y="440"
            fill="rgba(245,240,232,0.4)"
            fontSize="10"
            fontFamily="var(--font-inter)"
            fontStyle="italic"
          >
            Data sources
          </text>
        </g>

        {/* Output pipeline */}
        <g>
          <line x1="460" y1="360" x2="460" y2="490" stroke="rgba(201,168,76,0.3)" />
          <rect
            x="340"
            y="490"
            width="240"
            height="40"
            rx="6"
            fill="#161412"
            stroke="rgba(201,168,76,0.3)"
          />
          <text
            x="460"
            y="515"
            textAnchor="middle"
            fill="#F5F0E8"
            fontSize="13"
            fontFamily="var(--font-inter)"
            fontWeight="500"
          >
            GHL Pipeline
          </text>
        </g>

        {/* Divider accent */}
        <line x1="40" y1="58" x2="880" y2="58" stroke="url(#goldLine)" strokeWidth="1" />
      </svg>
    </div>
  );
}
