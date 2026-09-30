'use client';

import { useState } from 'react';
import type { CreateTicketDto } from '../lib/types';

interface TicketFormProps {
  eventId: number;
  onSubmit: (data: CreateTicketDto) => void;
  isLoading: boolean;
}

interface FormErrors {
  ordererName?: string;
  ordererEmail?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TicketForm({ eventId, onSubmit, isLoading }: TicketFormProps) {
  const [ordererName, setOrdererName] = useState('');
  const [ordererEmail, setOrdererEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!ordererName.trim()) {
      newErrors.ordererName = 'Nama pemesan wajib diisi';
    }
    if (!ordererEmail.trim()) {
      newErrors.ordererEmail = 'Email pemesan wajib diisi';
    } else if (!EMAIL_REGEX.test(ordererEmail)) {
      newErrors.ordererEmail = 'Format email tidak valid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ordererName, ordererEmail, eventId });
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label htmlFor="ticket-name" style={{ fontWeight: 700, display: 'block', marginBottom: '4px' }}>
          Nama Pemesan *
        </label>
        <input
          id="ticket-name"
          type="text"
          value={ordererName}
          onChange={(e) => setOrdererName(e.target.value)}
          placeholder="Masukkan nama lengkap..."
          aria-required="true"
          aria-describedby={errors.ordererName ? 'name-error' : undefined}
          aria-invalid={!!errors.ordererName}
        />
        {errors.ordererName && (
          <span id="name-error" className="field-error" role="alert">
            {errors.ordererName}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="ticket-email" style={{ fontWeight: 700, display: 'block', marginBottom: '4px' }}>
          Email Pemesan *
        </label>
        <input
          id="ticket-email"
          type="email"
          value={ordererEmail}
          onChange={(e) => setOrdererEmail(e.target.value)}
          placeholder="contoh@email.com"
          aria-required="true"
          aria-describedby={errors.ordererEmail ? 'email-error' : undefined}
          aria-invalid={!!errors.ordererEmail}
        />
        {errors.ordererEmail && (
          <span id="email-error" className="field-error" role="alert">
            {errors.ordererEmail}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn btn-accent" disabled={isLoading}>
          {isLoading ? 'Memproses...' : 'Pesan Tiket ▶'}
        </button>
      </div>
    </form>
  );
}
