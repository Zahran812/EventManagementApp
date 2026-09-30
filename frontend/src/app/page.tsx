'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getEvents, deleteEvent } from '../lib/api';
import type { Event } from '../lib/types';
import EventCard from '../components/EventCard';
import EventRow from '../components/EventRow';
import ViewToggle from '../components/ViewToggle';
import ConfirmDialog from '../components/ConfirmDialog';
import Notification from '../components/Notification';

export default function HomePage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [view, setView] = useState<'card' | 'list'>('card');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setNotification({
        message: err instanceof Error ? err.message : 'Gagal memuat data. Coba lagi.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteEvent(deleteTarget.id);
      setNotification({ message: `Event "${deleteTarget.title}" berhasil dihapus.`, type: 'success' });
      setDeleteTarget(null);
      await loadEvents();
    } catch (err) {
      setNotification({
        message: err instanceof Error ? err.message : 'Gagal menghapus event.',
        type: 'error',
      });
      setDeleteTarget(null);
    }
  };

  return (
    <main style={{ minHeight: '100vh', padding: '0 0 40px 0', fontFamily: 'monospace' }}>
      {/* Header */}
      <header
        style={{
          borderBottom: '3px solid #111111',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFE500',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Event Management App
        </h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/tickets" className="btn" style={{ backgroundColor: '#00C2FF', textDecoration: 'none' }}>
            Daftar Tiket
          </Link>
          <Link href="/events/new" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            + Tambah Event
          </Link>
        </div>
      </header>

      <div className="container" style={{ marginTop: '24px' }}>
        {/* View Toggle */}
        <div style={{ marginBottom: '24px' }}>
          <ViewToggle view={view} onToggle={setView} />
        </div>

        {/* Content */}
        {isLoading ? (
          <p style={{ fontWeight: 700, padding: '24px 0' }}>Memuat data event...</p>
        ) : events.length === 0 ? (
          <div
            className="card"
            style={{ textAlign: 'center', padding: '48px', backgroundColor: '#f5f5f5' }}
          >
            <p style={{ fontWeight: 700, marginBottom: '16px' }}>Belum ada event.</p>
            <Link href="/events/new" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              + Tambah Event Pertama
            </Link>
          </div>
        ) : view === 'card' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={() => router.push(`/events/${event.id}/edit`)}
                onDelete={() => setDeleteTarget(event)}
                onBook={() => router.push(`/events/${event.id}/book`)}
              />
            ))}
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
                <tr style={{ backgroundColor: '#FFE500', borderBottom: '3px solid #111111' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 900, textTransform: 'uppercase' }}>Judul</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 900, textTransform: 'uppercase' }}>Tanggal</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 900, textTransform: 'uppercase' }}>Lokasi</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 900, textTransform: 'uppercase' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <EventRow
                    key={event.id}
                    event={event}
                    onEdit={() => router.push(`/events/${event.id}/edit`)}
                    onDelete={() => setDeleteTarget(event)}
                    onBook={() => router.push(`/events/${event.id}/book`)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirm Delete Dialog */}
      {deleteTarget && (
        <ConfirmDialog
          message={`Hapus event "${deleteTarget.title}"? Tindakan ini tidak bisa dibatalkan.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Notification */}
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
