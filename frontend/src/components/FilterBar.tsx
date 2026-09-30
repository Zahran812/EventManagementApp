'use client';

interface FilterBarProps {
  value: string;
  onChange: (val: string) => void;
  onFilter: () => void;
}

export default function FilterBar({ value, onChange, onFilter }: FilterBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFilter();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <label htmlFor="filter-event-name" style={{ fontWeight: 700, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
        Filter event:
      </label>
      <input
        id="filter-event-name"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nama event..."
        style={{ maxWidth: '300px' }}
        aria-label="Filter berdasarkan nama event"
      />
      <button className="btn" onClick={onFilter} aria-label="Cari event">
        Cari
      </button>
    </div>
  );
}
