'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getEvents, updateEvent } from '../../../../lib/api';
import type { Event, UpdateEventDto } from '../../../../lib/types';
import EventForm from '../../../../components/EventForm';
import Notification from '../../../../components/Notification';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsFetching(true);
      try {
        const events = await getEvents();
        const found = events.find((e) => e.id === id);
        if (!found) {
          setNotification({ message: 'Event tidak ditemukan.', type: 'error' });
        } else {
          setEvent(found);
        }
      } catch (err) {
        setNotification({
          message: err instanceof Error ? err.message : 'Gagal memuat data event.',
          type: 'error',
        });
      } finally {
        setIsFetching(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (data: UpdateEventDto) => {
    setIsLoading(true);
    try {
      await updateEvent(id, data);
      setNotification({ message: 'Event berhasil diperbarui!', type: 'success' });
      setTimeout(() => router.push('/'), 1200);
    } catch (err) {
      setNotification({
        message: err instanceof Error ? err.message : 'Gagal memperbarui event.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', fontFamily: 'monospace' }}>
      <header
        style={{
          borderBottom: '3px solid #111111',
          padding: '16px',
          backgroundColor: '#FFE500',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Link href="/" className="btn" style={{ textDecoration: 'none' }}>
          ← Kembali
        </Link>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase' }}>
          Edit Event
        </h1>
      </header>

      <div className="container" style={{ marginTop: '32px', maxWidth: '700px' }}>
        {isFetching ? (
          <p style={{ fontWeight: 700 }}>Memuat data...</p>
        ) : event ? (
          <div className="card">
            <EventForm initialData={event} onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        ) : (
          <p style={{ fontWeight: 700, color: 'red' }}>Event tidak ditemukan.</p>
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
