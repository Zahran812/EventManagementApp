'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createEvent } from '../../../lib/api';
import type { CreateEventDto } from '../../../lib/types';
import EventForm from '../../../components/EventForm';
import Notification from '../../../components/Notification';

export default function NewEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (data: CreateEventDto) => {
    setIsLoading(true);
    try {
      await createEvent(data);
      setNotification({ message: 'Event berhasil ditambahkan!', type: 'success' });
      setTimeout(() => router.push('/'), 1200);
    } catch (err) {
      setNotification({
        message: err instanceof Error ? err.message : 'Gagal menambahkan event.',
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
          Tambah Event Baru
        </h1>
      </header>

      <div className="container" style={{ marginTop: '32px', maxWidth: '700px' }}>
        <div className="card">
          <EventForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
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
