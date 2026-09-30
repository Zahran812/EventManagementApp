'use client';

import { useState, useEffect } from 'react';
import type { Event, CreateEventDto } from '../lib/types';

interface EventFormProps {
  initialData?: Event;
  onSubmit: (data: CreateEventDto) => void;
  isLoading: boolean;
}

interface FormErrors {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
}

export default function EventForm({ initialData, onSubmit, isLoading }: EventFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [date, setDate] = useState(initialData?.date ?? '');
  const [location, setLocation] = useState(initialData?.location ?? '');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDate(initialData.date);
      setLocation(initialData.location);
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!title.trim()) newErrors.title = 'Judul wajib diisi';
    if (!description.trim()) newErrors.description = 'Deskripsi wajib diisi';
    if (!date.trim()) newErrors.date = 'Tanggal wajib diisi';
    if (!location.trim()) newErrors.location = 'Lokasi wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title, description, date, location });
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label htmlFor="event-title" style={{ fontWeight: 700, display: 'block', marginBottom: '4px' }}>
          Judul *
        </label>
        <input
          id="event-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-required="true"
          aria-describedby={errors.title ? 'title-error' : undefined}
          aria-invalid={!!errors.title}
        />
        {errors.title && <span id="title-error" className="field-error" role="alert">{errors.title}</span>}
      </div>

      <div>
        <label htmlFor="event-description" style={{ fontWeight: 700, display: 'block', marginBottom: '4px' }}>
          Deskripsi *
        </label>
        <textarea
          id="event-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          aria-required="true"
          aria-describedby={errors.description ? 'description-error' : undefined}
          aria-invalid={!!errors.description}
          style={{ resize: 'vertical' }}
        />
        {errors.description && <span id="description-error" className="field-error" role="alert">{errors.description}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label htmlFor="event-date" style={{ fontWeight: 700, display: 'block', marginBottom: '4px' }}>
            Tanggal *
          </label>
          <input
            id="event-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-required="true"
            aria-describedby={errors.date ? 'date-error' : undefined}
            aria-invalid={!!errors.date}
          />
          {errors.date && <span id="date-error" className="field-error" role="alert">{errors.date}</span>}
        </div>

        <div>
          <label htmlFor="event-location" style={{ fontWeight: 700, display: 'block', marginBottom: '4px' }}>
            Lokasi *
          </label>
          <input
            id="event-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-required="true"
            aria-describedby={errors.location ? 'location-error' : undefined}
            aria-invalid={!!errors.location}
          />
          {errors.location && <span id="location-error" className="field-error" role="alert">{errors.location}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn btn-secondary" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan Event ▶'}
        </button>
      </div>
    </form>
  );
}
