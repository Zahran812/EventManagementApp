'use client';

import type { Event } from '../lib/types';

interface EventCardProps {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  onBook: () => void;
}

export default function EventCard({ event, onEdit, onDelete, onBook }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        backgroundColor: '#FFFFFF',
      }}
      aria-label={`Event: ${event.title}`}
    >
      <h2
        style={{
          fontSize: '1rem',
          fontWeight: 900,
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          borderBottom: '2px solid #111111',
          paddingBottom: '8px',
        }}
      >
        {event.title}
      </h2>
      <p style={{ fontSize: '0.8rem', display: 'flex', gap: '4px', alignItems: 'center' }}>
        <span aria-hidden="true">📅</span>
        <span>{formattedDate}</span>
      </p>
      <p style={{ fontSize: '0.8rem', display: 'flex', gap: '4px', alignItems: 'center' }}>
        <span aria-hidden="true">📍</span>
        <span>{event.location}</span>
      </p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
        <button className="btn btn-accent" onClick={onBook} aria-label={`Pesan tiket untuk ${event.title}`}>
          Pesan
        </button>
        <button className="btn" onClick={onEdit} aria-label={`Edit event ${event.title}`}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={onDelete} aria-label={`Hapus event ${event.title}`}>
          🗑
        </button>
      </div>
    </article>
  );
}
