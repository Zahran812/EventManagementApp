'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getEvents, createTicket } from '../../../../lib/api';
import type { CreateTicketDto, Event } from '../../../../lib/types';
import TicketForm from '../../../../components/TicketForm';
import Notification from '../../../../components/Notification';

export default function BookEventPage() {
  const params = useParams();
  const id = Number(params.id);

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsFetching(true);
      try {
        const events = await getEvents();
        const found = events.find((e) => e.id === id);
        if (found) {
          setEvent(found);
        } else {
          setNotification({ message: 'Event tidak ditemukan.', type: 'error' });
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

  const handleSubmit = async (data: CreateTicketDto) => {
    setIsLoading(true);
    try {
      await createTicket(data);
      setNotification({ message: 'Tiket berhasil dipesan! Selamat datang 🎉', type: 'success' });
      setBooked(true);
    } catch (err) {
      setNotification({
        message: err instanceof Error ? err.message : 'Gagal memesan tiket.',
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
          backgroundColor: '#00C2FF',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Link href="/" className="btn" style={{ textDecoration: 'none' }}>
          ← Kembali
        </Link>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase' }}>
          Pesan Tiket
        </h1>
      </header>

      <div className="container" style={{ marginTop: '32px', maxWidth: '600px' }}>
        {isFetching ? (
          <p style={{ fontWeight: 700 }}>Memuat data...</p>
        ) : event ? (
          <>
            <div
              className="card"
              style={{ marginBottom: '24px', backgroundColor: '#f5f5f5' }}
            >
              <h2 style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '8px' }}>{event.title}</h2>
              <p style={{ fontSize: '0.875rem' }}>
                📅 {new Date(event.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
              <p style={{ fontSize: '0.875rem' }}>📍 {event.location}</p>
            </div>

            {booked ? (
              <div className="card" style={{ textAlign: 'center', backgroundColor: '#FFE500' }}>
                <p style={{ fontWeight: 900, marginBottom: '16px' }}>✓ Tiket berhasil dipesan!</p>
                <Link href="/" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                  Kembali ke Beranda
                </Link>
              </div>
            ) : (
              <div className="card">
                <TicketForm eventId={id} onSubmit={handleSubmit} isLoading={isLoading} />
              </div>
            )}
          </>
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
