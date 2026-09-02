import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, PlayCircle, Calendar, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ResumeSubscriptionModal = () => {
  const {
    isResumeModalOpen,
    setIsResumeModalOpen,
    customer,
    handleResumeSubscriptionSubmit,
    addDays
  } = useApp();

  const sub = customer.subscription;
  if (!isResumeModalOpen || !sub.isPaused) return null;

  const planCode = sub.planCode || 'YOGA_3M';
  const getPlanMaxPauseDays = (code) => {
    if (code === 'YOGA_12M') return 45;
    if (code === 'YOGA_6M') return 30;
    return 15;
  };
  const maxPool = sub.totalPauseDays || getPlanMaxPauseDays(planCode);

  let daysPausedActual = 1;
  if (sub.pausedAt) {
    const pausedAtDate = new Date(sub.pausedAt);
    if (!isNaN(pausedAtDate.getTime())) {
      const today = new Date();
      const msDiff = today.getTime() - pausedAtDate.getTime();
      daysPausedActual = Math.max(1, Math.ceil(msDiff / (1000 * 60 * 60 * 24)));
    }
  }

  const plannedDuration = sub.pauseDuration || 1;
  const actualDays = Math.min(daysPausedActual, plannedDuration);
  const unusedDays = Math.max(0, plannedDuration - actualDays);
  const currentRemaining = sub.pauseDaysRemaining || 0;
  const newRemainingPool = Math.min(maxPool, currentRemaining + unusedDays);

  const baseEndDate = sub.prevEndDate || '13 Jan 2027';
  const baseNextRenewalDate = sub.prevNextRenewalDate || '14 Jan 2027';
  const finalEndDate = addDays(baseEndDate, actualDays);
  const finalNextRenewalDate = addDays(baseNextRenewalDate, actualDays);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 9992,
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
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
          border: '1px solid #f0e6d8',
          overflow: 'hidden',
          animation: 'slideUp 0.25s ease-out',
          margin: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fdfbf7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <PlayCircle size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                Resume your subscription?
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                Your yoga access will resume immediately
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsResumeModalOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', color: '#94a3b8', borderRadius: '50%' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Pause Status Review */}
          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '18px', padding: '16px 20px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400e', marginBottom: '8px' }}>
              Current Pause Details
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#78350f' }}>Pause started:</span>
                <strong style={{ color: '#1e293b' }}>{sub.pausedAt || 'Today'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#78350f' }}>Planned pause duration:</span>
                <strong style={{ color: '#1e293b' }}>{plannedDuration} Days</strong>
              </div>
              {sub.pauseReason && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#78350f' }}>Reason:</span>
                  <strong style={{ color: '#1e293b' }}>{sub.pauseReason}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Refunded Days Benefit Notice */}
          <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '18px', padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 800, color: '#166534', marginBottom: '6px' }}>
              <CheckCircle2 size={18} color="#16a34a" /> Early Resume Adjustment
            </div>
            <p style={{ fontSize: '0.85rem', color: '#14532d', margin: '0 0 10px 0', lineHeight: 1.45 }}>
              {unusedDays > 0 ? (
                <>
                  You have <strong>{unusedDays} unused pause {unusedDays === 1 ? 'day' : 'days'}</strong> from this pause period. They will be returned to your available pause balance immediately.
                </>
              ) : (
                <>
                  Your full pause duration has been completed. Your subscription will resume active access now.
                </>
              )}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', paddingTop: '8px', borderTop: '1px dashed #bbf7d0' }}>
              <span style={{ color: '#166534', fontWeight: 600 }}>Available Pause Balance:</span>
              <strong style={{ color: '#15803d' }}>{newRemainingPool} / {maxPool} Days</strong>
            </div>
          </div>

          {/* Revised Expiry */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
            <span style={{ color: '#475569', fontWeight: 600 }}>Updated Subscription Expiry:</span>
            <strong style={{ color: '#0f172a' }}>{finalEndDate}</strong>
          </div>

          {/* Benefits Info */}
          <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>• All daily live yoga sessions and masterclasses will be unlocked immediately.</div>
            <div>• Your next scheduled auto-renewal date is set to <strong>{finalNextRenewalDate}</strong>.</div>
          </div>

        </div>

        {/* Actions */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px', justifyContent: 'flex-end', background: '#fdfbf7' }}>
          <button
            type="button"
            onClick={() => setIsResumeModalOpen(false)}
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
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleResumeSubscriptionSubmit}
            style={{
              padding: '10px 26px',
              borderRadius: '9999px',
              border: 'none',
              background: '#16a34a',
              color: '#ffffff',
              fontSize: '0.88rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)'
            }}
          >
            Resume Now
          </button>
        </div>

      </div>
    </div>
  );
};
