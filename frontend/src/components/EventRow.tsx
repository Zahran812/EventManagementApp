'use client';

import type { Event } from '../lib/types';

interface EventRowProps {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  onBook: () => void;
}

export default function EventRow({ event, onEdit, onDelete, onBook }: EventRowProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <tr
      style={{ borderBottom: '2px solid #111111' }}
      aria-label={`Event: ${event.title}`}
    >
      <td style={{ padding: '10px 12px', fontWeight: 700 }}>{event.title}</td>
      <td style={{ padding: '10px 12px' }}>{formattedDate}</td>
      <td style={{ padding: '10px 12px' }}>{event.location}</td>
      <td style={{ padding: '10px 12px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn btn-accent" onClick={onBook} aria-label={`Pesan tiket untuk ${event.title}`} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            Pesan
          </button>
          <button className="btn" onClick={onEdit} aria-label={`Edit event ${event.title}`} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={onDelete} aria-label={`Hapus event ${event.title}`} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            🗑
          </button>
        </div>
      </td>
    </tr>
  );
}
