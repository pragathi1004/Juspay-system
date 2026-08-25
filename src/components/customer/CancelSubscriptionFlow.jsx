import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, CheckCircle, ArrowLeft, RefreshCw, X, ShieldCheck } from 'lucide-react';

export const CancelSubscriptionFlow = () => {
  const {
    customer,
    setCustomerScreen,
    handleTurnOffAutoRenewalSubmit,
    isTurnOffRenewalModalOpen,
    setIsTurnOffRenewalModalOpen
  } = useApp();

  const sub = customer.subscription;
  const [step, setStep] = useState(1);
  const amountStr = sub.amount ? sub.amount.toLocaleString('en-IN') : '1,499';

  const handleConfirmTurnOff = () => {
    handleTurnOffAutoRenewalSubmit();
    setStep(2);
  };

  // Render modal version if triggered from Manage Hub or Dashboard
  if (isTurnOffRenewalModalOpen) {
    return (
      <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 95, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '560px',
            width: '100%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}
        >
          {step === 1 ? (
            <div>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '2px solid #fca5a5' }}>
                <AlertCircle size={28} />
              </div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
                Cancel your subscription?
              </h2>

              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
                Please review our cancellation terms before confirming.
              </p>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px', textAlign: 'left', marginBottom: '24px', fontSize: '0.875rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#059669', fontWeight: 800 }}>✓</span>
                  <span><strong>24-Hour Notice Rule:</strong> Subscriptions can be cancelled at least 24 hours prior to your scheduled renewal date (<strong>{sub.endDate || '13 Jan 2027'}</strong>).</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#059669', fontWeight: 800 }}>✓</span>
                  <span>Your current access will continue uninterrupted until <strong>{sub.endDate || '13 Jan 2027'}</strong>.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#dc2626', fontWeight: 800 }}>•</span>
                  <span>Cancellation requests within 24 hours of renewal or after renewal date are non-refundable as per terms.</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setIsTurnOffRenewalModalOpen(false)}
                  style={{ flex: 1, padding: '12px', background: '#facc15', color: '#111827', fontWeight: 800, borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleConfirmTurnOff}
                  style={{ flex: 1, padding: '12px', background: '#ffffff', border: '1.5px solid #dc2626', color: '#dc2626', fontWeight: 700, borderRadius: '10px', cursor: 'pointer', fontSize: '0.95rem' }}
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '2px solid #a7f3d0' }}>
                <CheckCircle size={32} />
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
                Subscription Cancelled
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px' }}>
                Your Juspay recurring mandate has been successfully revoked.
              </p>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', textAlign: 'left', marginBottom: '24px', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Active Access Until:</span>
                  <strong style={{ color: '#047857' }}>{sub.endDate || '13 Jan 2027'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Next Renewal:</span>
                  <strong style={{ color: '#dc2626' }}>Cancelled</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Subscription Status:</span>
                  <strong style={{ color: '#dc2626' }}>🔴 Cancelled</strong>
                </div>
              </div>

              <button
                onClick={() => { setIsTurnOffRenewalModalOpen(false); setStep(1); }}
                style={{ width: '100%', padding: '12px', background: '#facc15', color: '#111827', fontWeight: 800, borderRadius: '10px', border: 'none', cursor: 'pointer' }}
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full Page Wizard View
  return (
    <div style={{ background: '#fdfbf7', minHeight: '90vh', padding: '60px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '580px',
          width: '100%',
          boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9',
          textAlign: 'center'
        }}
      >
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '2px solid #fca5a5' }}>
          <AlertCircle size={28} />
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '12px' }}>
          Cancel your subscription?
        </h2>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', textAlign: 'left', marginBottom: '28px', fontSize: '0.925rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ color: '#059669', fontWeight: 800 }}>✓</span>
            <span><strong>24-Hour Notice Rule:</strong> Subscriptions can be cancelled at least 24 hours prior to your scheduled renewal date (<strong>{sub.endDate || '13 Jan 2027'}</strong>).</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ color: '#059669', fontWeight: 800 }}>✓</span>
            <span>Your current access will continue uninterrupted until <strong>{sub.endDate || '13 Jan 2027'}</strong>.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ color: '#dc2626', fontWeight: 800 }}>•</span>
            <span>Cancellation requests within 24 hours of renewal date or after renewal are non-refundable as per terms.</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setCustomerScreen('MANAGE_HUB')}
            style={{ flex: 1, padding: '14px', background: '#facc15', color: '#111827', fontWeight: 800, borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
          >
            Keep Subscription
          </button>
          <button
            onClick={handleConfirmTurnOff}
            style={{ flex: 1, padding: '14px', background: '#ffffff', border: '1.5px solid #dc2626', color: '#dc2626', fontWeight: 700, borderRadius: '10px', cursor: 'pointer', fontSize: '1rem' }}
          >
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
};

