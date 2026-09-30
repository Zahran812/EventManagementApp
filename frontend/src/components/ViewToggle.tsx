'use client';

interface ViewToggleProps {
  view: 'card' | 'list';
  onToggle: (view: 'card' | 'list') => void;
}

export default function ViewToggle({ view, onToggle }: ViewToggleProps) {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button
        className="btn"
        onClick={() => onToggle('card')}
        aria-pressed={view === 'card'}
        style={{
          backgroundColor: view === 'card' ? '#FFE500' : '#FFFFFF',
          fontWeight: view === 'card' ? 900 : 700,
        }}
        aria-label="Tampilan Kartu"
      >
        ■■ Kartu
      </button>
      <button
        className="btn"
        onClick={() => onToggle('list')}
        aria-pressed={view === 'list'}
        style={{
          backgroundColor: view === 'list' ? '#FFE500' : '#FFFFFF',
          fontWeight: view === 'list' ? 900 : 700,
        }}
        aria-label="Tampilan Daftar"
      >
        ≡ Daftar
      </button>
    </div>
  );
}
