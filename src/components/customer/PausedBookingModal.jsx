import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertTriangle, PlayCircle, ShieldCheck } from 'lucide-react';

export const PausedBookingModal = ({ onResumeAndContinue }) => {
  const {
    isBlockedSessionModalOpen,
    setIsBlockedSessionModalOpen,
    customer,
    handleResumeSubscriptionSubmit
  } = useApp();

  const sub = customer.subscription;
  if (!isBlockedSessionModalOpen || !sub.isPaused) return null;

  const handleResumeAndBook = () => {
    handleResumeSubscriptionSubmit();
    if (onResumeAndContinue) {
      onResumeAndContinue();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 9993,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          maxWidth: '460px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
          border: '1.5px solid #fed7aa',
          overflow: 'hidden',
          animation: 'slideUp 0.25s ease-out',
          margin: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fffbeb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#92400e', margin: 0 }}>
                Subscription Paused
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#b45309', margin: 0 }}>
                Session access temporarily on hold
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBlockedSessionModalOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', color: '#94a3b8', borderRadius: '50%' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
          
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>
            Your subscription is currently paused.
          </div>
          
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
            Resume your subscription to join live daily classes, access masterclass recordings, or book upcoming sessions.
          </p>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '14px 16px', fontSize: '0.82rem', color: '#166534', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#16a34a" style={{ flexShrink: 0 }} />
            <span>Any unused pause days from this period will be automatically credited back to your pause allowance.</span>
          </div>

        </div>

        {/* Actions */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px', justifyContent: 'center', background: '#fdfbf7' }}>
          <button
            type="button"
            onClick={() => setIsBlockedSessionModalOpen(false)}
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#475569',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Stay Paused
          </button>
          
          <button
            type="button"
            onClick={handleResumeAndBook}
            style={{
              padding: '10px 26px',
              borderRadius: '9999px',
              border: 'none',
              background: '#ea580c',
              color: '#ffffff',
              fontSize: '0.88rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(234, 88, 12, 0.3)'
            }}
          >
            Resume & Book
          </button>
        </div>

      </div>
    </div>
  );
};
