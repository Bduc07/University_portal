import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

export const STATUS = {
  good: { color: '#0ca30c', label: 'Good', icon: FaCheckCircle },
  neutral: { color: '#fab219', label: 'Neutral', icon: FaExclamationTriangle },
  bad: { color: '#d03b3b', label: 'Needs Improvement', icon: FaTimesCircle },
};

export const monthLabel = (ym) => {
  const [year, month] = ym.split('-');
  return new Date(Number(year), Number(month) - 1).toLocaleDateString(undefined, {
    month: 'short',
    year: '2-digit',
  });
};

export const TrendLine = ({ monthly }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const width = 480;
  const height = 200;
  const padding = { top: 16, right: 16, bottom: 28, left: 28 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const yFor = (rating) => padding.top + plotH * (1 - (rating - 1) / 4);
  const xFor = (i) =>
    monthly.length === 1
      ? padding.left + plotW / 2
      : padding.left + (plotW * i) / (monthly.length - 1);

  const points = monthly.map((m, i) => ({ x: xFor(i), y: yFor(m.averageRating), ...m }));
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="Monthly average rating trend">
        {[1, 2, 3, 4, 5].map((tick) => (
          <g key={tick}>
            <line x1={padding.left} x2={width - padding.right} y1={yFor(tick)} y2={yFor(tick)} stroke="#e1e0d9" strokeWidth="1" />
            <text x={padding.left - 8} y={yFor(tick) + 3} textAnchor="end" fontSize="10" fill="#898781">
              {tick}
            </text>
          </g>
        ))}

        {monthly.length > 1 && (
          <path d={linePath} fill="none" stroke="#1F386B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {points.map((p, i) => (
          <g key={p.month}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 6 : 4}
              fill="#1F386B"
              stroke="#fff"
              strokeWidth="1.5"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: 'pointer', transition: 'r 0.1s' }}
            />
            <text x={p.x} y={height - 8} textAnchor="middle" fontSize="10" fill="#898781">
              {monthLabel(p.month)}
            </text>
          </g>
        ))}
      </svg>

      {hoverIndex !== null && (
        <div
          className="absolute bg-[#1F386B] text-white text-xs rounded px-2 py-1 pointer-events-none shadow-lg -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(points[hoverIndex].x / width) * 100}%`,
            top: `${(points[hoverIndex].y / height) * 100}%`,
          }}
        >
          {monthLabel(points[hoverIndex].month)}: {points[hoverIndex].averageRating.toFixed(2)} ★ (
          {points[hoverIndex].count} review{points[hoverIndex].count === 1 ? '' : 's'})
        </div>
      )}
    </div>
  );
};

export const PieChart = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const segments = [
    { key: 'good', value: good },
    { key: 'neutral', value: neutral },
    { key: 'bad', value: bad },
  ].filter((s) => s.value > 0);

  let offsetAcc = 0;
  const gap = segments.length > 1 ? 3 : 0;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 160 160" className="w-40 h-40">
        <g transform="translate(80,80) rotate(-90)">
          <circle r={radius} fill="none" stroke="#e1e0d9" strokeWidth="22" />
          {segments.map((s) => {
            const fraction = s.value / total;
            const dash = Math.max(fraction * circumference - gap, 0);
            const strokeDasharray = `${dash} ${circumference - dash}`;
            const strokeDashoffset = -offsetAcc;
            offsetAcc += fraction * circumference;
            return (
              <circle
                key={s.key}
                r={radius}
                fill="none"
                stroke={STATUS[s.key].color}
                strokeWidth="22"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
              />
            );
          })}
        </g>
        <text x="80" y="76" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1F386B">
          {total}
        </text>
        <text x="80" y="94" textAnchor="middle" fontSize="10" fill="#898781">
          review{total === 1 ? '' : 's'}
        </text>
      </svg>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3">
        {Object.entries(STATUS).map(([key, meta]) => {
          const Icon = meta.icon;
          const value = key === 'good' ? good : key === 'neutral' ? neutral : bad;
          return (
            <span key={key} className="flex items-center gap-1 text-xs text-[#52514e]">
              <Icon size={12} color={meta.color} />
              {meta.label}: <strong className="text-[#1F386B]">{value}</strong>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const QuestionBarChart = ({ questions }) => {
  const lowest = questions.reduce(
    (min, q) => (q.averageRating < min ? q.averageRating : min),
    questions[0]?.averageRating ?? 0
  );

  return (
    <div className="space-y-4">
      {questions.map((q) => {
        const isLowest = q.averageRating === lowest;
        return (
          <div key={q.questionText}>
            <div className="flex justify-between items-baseline gap-2 mb-1">
              <p className="text-sm text-[#52514e] flex items-center gap-1">
                {isLowest && <FaExclamationTriangle size={11} color="#fab219" />}
                {q.questionText}
              </p>
              <span className="text-sm font-semibold text-[#1F386B] shrink-0">{q.averageRating.toFixed(1)}</span>
            </div>
            <div className="h-2.5 rounded-full bg-[#e1e0d9] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(q.averageRating / 5) * 100}%`,
                  backgroundColor: isLowest ? '#fab219' : '#1F386B',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
