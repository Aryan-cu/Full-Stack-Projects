// PerformancePanel — shows per-hook status and live render counts.
export default function PerformancePanel({ memoOn, useMemoOn, useCallbackOn, counts }) {
  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontSize: '13px',
    borderBottom: '1px solid var(--border-color)',
  };
  const labelStyle = { color: 'var(--text-secondary)', fontWeight: '500' };
  const valOn = { color: 'var(--success)', fontWeight: 600 };
  const valOff = { color: 'var(--danger)', fontWeight: 600 };
  const sectionStyle = { marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' };
  const sectionTitle = {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    marginBottom: '8px',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '0.5px',
  };

  const tag = (on) => (on ? { text: '✓ Active', style: valOn } : { text: '✗ Inactive', style: valOff });

  return (
    <div style={{ background: 'var(--card-bg)', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
      <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>⚡ Performance</h3>

      <div style={rowStyle}>
        <span style={labelStyle}>React.memo</span>
        <span style={tag(memoOn).style} data-testid="memo-status">
          {tag(memoOn).text}
        </span>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>useMemo</span>
        <span style={tag(useMemoOn).style} data-testid="usememo-status">
          {tag(useMemoOn).text}
        </span>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>useCallback</span>
        <span style={tag(useCallbackOn).style} data-testid="usecallback-status">
          {tag(useCallbackOn).text}
        </span>
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitle}>Render Counts</div>
        <div style={rowStyle}>
          <span style={labelStyle}>App</span>
          <span data-testid="render-count-app">{counts.App || 0}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Calendar</span>
          <span data-testid="render-count-calendar">{counts.Calendar || 0}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>PostCard</span>
          <span data-testid="render-count-postcard">{counts.PostCard || 0}</span>
        </div>
      </div>
    </div>
  );
}