'use client';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 1000,
        maxWidth: '400px',
        padding: '12px 16px',
        border: '3px solid #111111',
        boxShadow: '4px 4px 0px #111111',
        backgroundColor: type === 'success' ? '#FFE500' : '#FF5C00',
        color: '#111111',
        fontFamily: 'var(--font-mono, monospace)',
        fontWeight: 700,
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
      }}
      role="alert"
    >
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        aria-label="Tutup notifikasi"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 900,
          fontSize: '1rem',
          padding: 0,
          lineHeight: 1,
          color: '#111111',
        }}
      >
        ✕
      </button>
    </div>
  );
}
