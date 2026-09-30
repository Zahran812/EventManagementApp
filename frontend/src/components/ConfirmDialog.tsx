'use client';

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(17,17,17,0.6)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-message"
    >
      <div
        style={{
          border: '3px solid #111111',
          boxShadow: '6px 6px 0px #111111',
          backgroundColor: '#FFFFFF',
          padding: '24px',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <p
          id="confirm-dialog-message"
          style={{
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: '1rem',
            marginBottom: '24px',
            color: '#111111',
          }}
        >
          {message}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onCancel}>
            Batal
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
