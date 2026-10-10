// PlaceValueChart.jsx — reusable SVG/React component for Dollars | . | Tenths | Hundredths
import React from 'react';

export default function PlaceValueChart({
  amountCents,            // integer cents, e.g. 465
  missingColumn,           // 'dollars' | 'tenths' | 'hundredths' | null
  animated = false,
  size = 'medium',          // 'small' | 'medium' | 'large'
}) {
  const dollars = Math.floor(amountCents / 100);
  const cents = amountCents % 100;
  const tenths = Math.floor(cents / 10);
  const hundredths = cents % 10;

  const columnWidth = size === 'large' ? 90 : size === 'medium' ? 70 : 54;
  const columnHeight = size === 'large' ? 110 : size === 'medium' ? 90 : 70;
  const fontSize = size === 'large' ? 36 : size === 'medium' ? 28 : 20;

  const columns = [
    { label: 'Dollars', value: dollars, key: 'dollars' },
    { label: '', value: '.', key: 'decimalPoint', isDot: true },
    { label: 'Tenths', value: tenths, key: 'tenths' },
    { label: 'Hundredths', value: hundredths, key: 'hundredths' },
  ];

  const svgWidth = columns.reduce((sum, c) => sum + (c.isDot ? columnWidth * 0.4 : columnWidth), 20);
  const svgHeight = columnHeight + 50;

  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}
         xmlns="http://www.w3.org/2000/svg"
         style={{ maxWidth: '100%', height: 'auto', maxHeight: '160px', margin: '0 auto', display: 'block' }}
         className={animated ? "animated-chart" : ""}>
      {(() => {
        let xCursor = 10;
        return columns.map((col, i) => {
          const width = col.isDot ? columnWidth * 0.4 : columnWidth;
          const x = xCursor;
          xCursor += width;
          const isMissing = missingColumn === col.key;

          if (col.isDot) {
            return (
              <text key={col.key} x={x + width / 2} y={columnHeight / 2 + 20}
                    textAnchor="middle" fontSize={fontSize * 1.4}
                    fontWeight="bold" fill="#4A90D9">
                .
              </text>
            );
          }

          return (
            <g key={col.key} className={animated ? "popInGroup" : ""} style={{ animationDelay: `${i * 0.1}s` }}>
              <rect x={x} y="10" width={width - 8} height={columnHeight}
                    rx="12"
                    fill={isMissing ? '#FFFFFF' : `hsl(${(i * 70) % 360}, 65%, 92%)`}
                    stroke={isMissing ? '#FF6B6B' : `hsl(${(i * 70) % 360}, 65%, 60%)`}
                    strokeWidth={isMissing ? '3' : '2'}
                    strokeDasharray={isMissing ? '6,3' : '0'} />
              <text x={x + (width - 8) / 2} y={columnHeight / 2 + 26}
                    textAnchor="middle" fontSize={fontSize} fontWeight="700"
                    fill="#333">
                {isMissing ? '?' : col.value}
              </text>
              <text x={x + (width - 8) / 2} y={columnHeight + 38}
                    textAnchor="middle" fontSize="12" fill="#666">
                {col.label}
              </text>
            </g>
          );
        });
      })()}
      <text x={svgWidth / 2} y={svgHeight - 4}
            textAnchor="middle" fontSize="14" fill="#E2E8F0" fontWeight="bold">
        {`$${dollars}.${String(cents).padStart(2, '0')}`}
      </text>
    </svg>
  );
}
