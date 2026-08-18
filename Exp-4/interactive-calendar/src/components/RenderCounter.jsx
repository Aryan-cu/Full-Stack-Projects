// RenderCounter — useRef persists across renders without causing re-render
import { useRef } from 'react';

export default function RenderCounter({ name, onCount, color = 'var(--primary)' }) {
  // useRef persists across renders without causing re-render
  const count = useRef(0);
  count.current += 1;

  // Report during render — parent must use a ref-backed store to avoid loops.
  if (onCount) onCount(name, count.current);

  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '6px',
    background: 'rgba(102, 126, 234, 0.1)',
    border: `1px solid ${color}`,
    fontSize: '11px',
    fontFamily: 'monospace',
    color: 'var(--text-primary)',
    fontWeight: '500',
  };
  const dotStyle = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: color,
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  };

  return (
    <span style={containerStyle} data-testid={`render-counter-${name}`}>
      <span style={dotStyle} />
      <span>{name}: {count.current}</span>
    </span>
  );
}
