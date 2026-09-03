import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X, ChevronRight, CheckCircle, AlertCircle,
  PauseCircle, XCircle, ArrowLeft, Calendar
} from 'lucide-react';

const CANCEL_REASONS = [
  "I don't use the app enough",
  "Too expensive",
  "I'm too busy right now",
  "I'm travelling",
  "I completed my goal",
  "I didn't find the content useful",
  "Technical issues",
  "Other"
];

// ─── Shared card wrapper ───────────────────────────────────────────────────
const ModalShell = ({ children, onClose }) => (
  <div
    style={{
      position: 'fixed', inset: 0,
      background: 'rgba(15,23,42,0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 9990,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '24px 16px', overflowY: 'auto'
    }}
  >
    <div
      style={{
        background: '#ffffff', borderRadius: '24px',
        padding: '32px', maxWidth: '520px', width: '100%',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
        border: '1px solid #e2e8f0', margin: 'auto 0',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* close button */}
      {onClose && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4px' }}>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9', border: 'none', cursor: 'pointer',
              borderRadius: '50%', width: '34px', height: '34px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}
      {children}
    </div>
  </div>
);

export const CancelSubscriptionFlow = () => {
  const {
    customer,
    setCustomerScreen,
    handleCancelSubscriptionSubmit,
    isTurnOffRenewalModalOpen,
    setIsTurnOffRenewalModalOpen,
    setIsPauseModalOpen
  } = useApp();

  const sub = customer.subscription;
  const endDate = sub.endDate || '13 Jan 2027';
  const amount  = sub.amount ? `₹${sub.amount.toLocaleString('en-IN')}` : '₹4,999';
  const planName = sub.planName || '12-Month Plan';

  // 'PAUSE_OR_CANCEL' | 'REASON' | 'CONFIRM' | 'DONE'
  const [step, setStep]     = useState('PAUSE_OR_CANCEL');
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    handleCancelSubscriptionSubmit(reason, '');
    setStep('DONE');
  };

  const closeModal = () => {
    setIsTurnOffRenewalModalOpen(false);
    setStep('PAUSE_OR_CANCEL');
    setReason('');
  };

  const goToPause = () => {
    setIsTurnOffRenewalModalOpen(false);
    setStep('PAUSE_OR_CANCEL');
    setReason('');
    setIsPauseModalOpen(true);
  };

  // ── STEP: PAUSE vs CANCEL ────────────────────────────────────────────────
  const renderPauseOrCancel = () => (
    <>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', margin: '0 0 6px' }}>
        Need a break?
      </h2>
      <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 24px', lineHeight: 1.5 }}>
        You don't have to cancel your membership.
      </p>

      {/* Pause Option */}
      <button
        onClick={goToPause}
        style={{
          width: '100%', textAlign: 'left', background: '#fff7ed',
          border: '2px solid #fed7aa', borderRadius: '16px',
          padding: '18px 20px', cursor: 'pointer', marginBottom: '12px',
          transition: 'box-shadow 0.15s'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: '#ffedd5', borderRadius: '10px',
            width: '40px', height: '40px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c'
          }}>
            <PauseCircle size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#9a3412' }}>
              Pause Membership
            </div>
            <div style={{ fontSize: '0.82rem', color: '#78350f', marginTop: '2px', lineHeight: 1.4 }}>
              Take a break and save your remaining membership days.
            </div>
          </div>
          <ChevronRight size={18} color="#ea580c" style={{ flexShrink: 0 }} />
        </div>
      </button>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0 16px' }}>
        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>
          Still want to cancel?
        </span>
        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
      </div>

      {/* Continue to cancel */}
      <button
        onClick={() => setStep('REASON')}
        style={{
          width: '100%', padding: '13px', background: '#ffffff',
          border: '1.5px solid #cbd5e1', color: '#475569',
          fontWeight: 700, borderRadius: '12px', cursor: 'pointer',
          fontSize: '0.9rem', transition: 'all 0.15s'
        }}
      >
        Continue to Cancel
      </button>
    </>
  );

  // ── STEP: REASON ─────────────────────────────────────────────────────────
  const renderReason = () => (
    <>
      {/* back */}
      <button
        onClick={() => setStep('PAUSE_OR_CANCEL')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#64748b', display: 'flex', alignItems: 'center',
          gap: '4px', fontSize: '0.82rem', fontWeight: 600,
          padding: '0', marginBottom: '20px'
        }}
      >
        <ArrowLeft size={15} /> Back
      </button>

      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', margin: '0 0 6px' }}>
        We're sorry to see you go
      </h2>
      <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 20px', lineHeight: 1.5 }}>
        What's the main reason you're cancelling? <span style={{ color: '#94a3b8' }}>(optional)</span>
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {CANCEL_REASONS.map((r) => (
          <label
            key={r}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
              border: `1.5px solid ${reason === r ? '#ea580c' : '#e2e8f0'}`,
              background: reason === r ? '#fff7ed' : '#ffffff',
              transition: 'all 0.15s'
            }}
          >
            <input
              type="radio"
              name="cancelReason"
              value={r}
              checked={reason === r}
              onChange={() => setReason(r)}
              style={{ accentColor: '#ea580c', width: '16px', height: '16px', flexShrink: 0 }}
            />
            <span style={{
              fontSize: '0.875rem', fontWeight: reason === r ? 700 : 500,
              color: reason === r ? '#9a3412' : '#334155'
            }}>
              {r}
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={() => setStep('CONFIRM')}
        style={{
          width: '100%', padding: '13px', background: '#1e293b',
          color: '#ffffff', fontWeight: 700, borderRadius: '12px',
          border: 'none', cursor: 'pointer', fontSize: '0.9rem'
        }}
      >
        Continue
      </button>
    </>
  );

  // ── STEP: CONFIRM ─────────────────────────────────────────────────────────
  const renderConfirm = () => (
    <>
      {/* back */}
      <button
        onClick={() => setStep('REASON')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#64748b', display: 'flex', alignItems: 'center',
          gap: '4px', fontSize: '0.82rem', fontWeight: 600,
          padding: '0', marginBottom: '20px'
        }}
      >
        <ArrowLeft size={15} /> Back
      </button>

      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', margin: '0 0 6px' }}>
        Cancel your membership?
      </h2>
      <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 20px', lineHeight: 1.5 }}>
        Your membership will remain active until:
      </p>

      {/* Active-until callout */}
      <div style={{
        background: '#f0fdf4', border: '1.5px solid #bbf7d0',
        borderRadius: '14px', padding: '16px 20px', marginBottom: '20px',
        display: 'flex', alignItems: 'center', gap: '12px'
      }}>
        <Calendar size={20} color="#16a34a" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 600 }}>
            Access continues until
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#15803d' }}>
            {endDate}
          </div>
        </div>
      </div>

      {/* What happens next */}
      <div style={{
        background: '#f8fafc', border: '1px solid #e2e8f0',
        borderRadius: '14px', padding: '16px 20px', marginBottom: '24px'
      }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
          After cancellation
        </div>
        {[
          'No further renewal',
          `Your current access remains until ${endDate}`,
          'You can rejoin anytime'
        ].map((line) => (
          <div key={line} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
            <CheckCircle size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '1px' }} />
            <span style={{ fontSize: '0.875rem', color: '#334155' }}>{line}</span>
          </div>
        ))}

        {/* Billing summary */}
        <div style={{
          borderTop: '1px dashed #cbd5e1', marginTop: '12px', paddingTop: '12px',
          display: 'flex', flexDirection: 'column', gap: '6px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: '#64748b' }}>Plan</span>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>{planName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: '#64748b' }}>Amount paid</span>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>{amount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: '#64748b' }}>Next renewal</span>
            <span style={{ fontWeight: 800, color: '#dc2626' }}>Cancelled</span>
          </div>
        </div>
      </div>

      {/* CTAs — Keep is primary, Cancel is de-emphasised */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={closeModal}
          style={{
            width: '100%', padding: '14px',
            background: 'linear-gradient(135deg, #ea580c, #f97316)',
            color: '#ffffff', fontWeight: 800, fontSize: '1rem',
            borderRadius: '12px', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(234,88,12,0.3)'
          }}
        >
          Keep Membership
        </button>
        <button
          onClick={handleConfirm}
          style={{
            width: '100%', padding: '13px',
            background: '#ffffff', color: '#dc2626',
            fontWeight: 700, fontSize: '0.9rem',
            borderRadius: '12px', border: '1.5px solid #fca5a5',
            cursor: 'pointer'
          }}
        >
          Cancel Membership
        </button>
      </div>
    </>
  );

  // ── STEP: DONE ────────────────────────────────────────────────────────────
  const renderDone = () => (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '64px', height: '64px', borderRadius: '50%',
        background: '#ecfdf5', color: '#059669', margin: '0 auto 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '2px solid #a7f3d0'
      }}>
        <CheckCircle size={32} />
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px' }}>
        Membership Cancelled
      </h2>
      <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 24px', lineHeight: 1.5 }}>
        Your auto-renewal has been stopped. No further charges will be made.
      </p>

      {/* Status card */}
      <div style={{
        background: '#f8fafc', border: '1px solid #e2e8f0',
        borderRadius: '14px', padding: '16px 20px',
        marginBottom: '24px', textAlign: 'left'
      }}>
        {[
          { label: 'Status', value: '🔴 Cancelled', valueColor: '#dc2626' },
          { label: 'Active until', value: endDate, valueColor: '#059669' },
          { label: 'Next renewal', value: 'None', valueColor: '#64748b' },
        ].map(({ label, value, valueColor }) => (
          <div
            key={label}
            style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: '0.875rem', marginBottom: '8px'
            }}
          >
            <span style={{ color: '#64748b' }}>{label}</span>
            <strong style={{ color: valueColor }}>{value}</strong>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          closeModal();
          setCustomerScreen('DASHBOARD');
        }}
        style={{
          width: '100%', padding: '13px',
          background: '#1e293b', color: '#ffffff',
          fontWeight: 700, borderRadius: '12px', border: 'none', cursor: 'pointer'
        }}
      >
        Return to Dashboard
      </button>
    </div>
  );

  // ─── MODAL VARIANT (triggered from ManageSubscriptionHub) ─────────────────
  if (isTurnOffRenewalModalOpen) {
    return (
      <ModalShell onClose={step !== 'DONE' ? closeModal : null}>
        {step === 'PAUSE_OR_CANCEL' && renderPauseOrCancel()}
        {step === 'REASON'          && renderReason()}
        {step === 'CONFIRM'         && renderConfirm()}
        {step === 'DONE'            && renderDone()}
      </ModalShell>
    );
  }

  // ─── FULL PAGE VARIANT (CANCEL_WIZARD screen) ─────────────────────────────
  return (
    <div style={{
      background: '#fdfbf7', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 16px', fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '24px',
        padding: '36px', maxWidth: '520px', width: '100%',
        boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
        border: '1px solid #f1f5f9'
      }}>
        {step === 'PAUSE_OR_CANCEL' && renderPauseOrCancel()}
        {step === 'REASON'          && renderReason()}
        {step === 'CONFIRM'         && renderConfirm()}
        {step === 'DONE'            && renderDone()}
      </div>
    </div>
  );
};
