import React from 'react';

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '24px', gap: '16px' }}>
      <button
        onClick={onPrev}
        disabled={page <= 1}
        style={{
          background: page <= 1 ? 'rgba(200, 164, 93, 0.1)' : '#C8A45D',
          color: page <= 1 ? '#777' : '#1E1E1E',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: page <= 1 ? 'default' : 'pointer',
          transition: 'background 0.2s',
        }}
      >
        ◀ Prev
      </button>
      <span style={{ color: '#C8A45D', fontSize: '0.95rem', fontWeight: 600 }}>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page >= totalPages}
        style={{
          background: page >= totalPages ? 'rgba(200, 164, 93, 0.1)' : '#C8A45D',
          color: page >= totalPages ? '#777' : '#1E1E1E',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: page >= totalPages ? 'default' : 'pointer',
          transition: 'background 0.2s',
        }}
      >
        Next ▶
      </button>
    </div>
  );
}
