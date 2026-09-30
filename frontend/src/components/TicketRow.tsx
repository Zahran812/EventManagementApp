'use client';

import type { Ticket } from '../lib/types';

interface TicketRowProps {
  ticket: Ticket;
}

export default function TicketRow({ ticket }: TicketRowProps) {
  const formattedDate = new Date(ticket.createdAt).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <tr style={{ borderBottom: '2px solid #111111' }}>
      <td style={{ padding: '10px 12px', fontWeight: 700 }}>{ticket.ordererName}</td>
      <td style={{ padding: '10px 12px' }}>{ticket.ordererEmail}</td>
      <td style={{ padding: '10px 12px' }}>{ticket.event?.title ?? `Event #${ticket.eventId}`}</td>
      <td style={{ padding: '10px 12px', fontSize: '0.8rem' }}>{formattedDate}</td>
    </tr>
  );
}
