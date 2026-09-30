'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getTickets } from '../../lib/api';
import type { Ticket } from '../../lib/types';
import FilterBar from '../../components/FilterBar';
import TicketRow from '../../components/TicketRow';
import Notification from '../../components/Notification';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadTickets = useCallback(async (eventName?: string) => {
    setIsLoading(true);
    try {
      const data = await getTickets(eventName);
      setTickets(data);
    } catch (err) {
      setNotification({
        message: err instanceof Error ? err.message : 'Gagal memuat data tiket. Coba lagi.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const handleFilter = () => {
    loadTickets(filterValue.trim() || undefined);
  };

  return (
    <main style={{ minHeight: '100vh', fontFamily: 'monospace' }}>
      <header
        style={{
          borderBottom: '3px solid #111111',
          padding: '16px',
          backgroundColor: '#FF5C00',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: '#FFFFFF' }}>
          Daftar Tiket Dipesan
        </h1>
        <Link href="/" className="btn" style={{ textDecoration: 'none' }}>
          ← Beranda
        </Link>
      </header>

      <div className="container" style={{ marginTop: '24px' }}>
        {/* Filter Bar */}
        <div style={{ marginBottom: '24px' }}>
          <FilterBar
            value={filterValue}
            onChange={setFilterValue}
            onFilter={handleFilter}
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <p style={{ fontWeight: 700, padding: '24px 0' }}>Memuat data tiket...</p>
        ) : tickets.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '48px', backgroundColor: '#f5f5f5' }}>
            <p style={{ fontWeight: 700 }}>
              {filterValue ? `Tidak ada tiket untuk event "${filterValue}".` : 'Belum ada tiket yang dipesan.'}
            </p>
          </div>
        ) : (
          <div style={{ border: '3px solid #111111', overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'monospace',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#FF5C00', borderBottom: '3px solid #111111', color: '#FFFFFF' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 900, textTransform: 'uppercase' }}>Nama Pemesan</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 900, textTransform: 'uppercase' }}>Email</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 900, textTransform: 'uppercase' }}>Event</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 900, textTransform: 'uppercase' }}>Waktu Pesan</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <TicketRow key={ticket.id} ticket={ticket} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </main>
  );
}
