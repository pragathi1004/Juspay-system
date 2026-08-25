import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, CheckCircle, ArrowLeft, RefreshCw, X, ShieldCheck, Mail, Phone, HelpCircle } from 'lucide-react';

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
  const [showSupportInfo, setShowSupportInfo] = useState(false);
  const amountStr = sub.amount ? sub.amount.toLocaleString('en-IN') : '1,499';

  const handleConfirmTurnOff = () => {
    handleTurnOffAutoRenewalSubmit();
    setStep(2);
  };

  // Render modal version if triggered from Manage Hub or Dashboard
  if (isTurnOffRenewalModalOpen) {
    return (
      <div 
        className="modal-overlay" 
        style={{ 
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)', 
          backdropFilter: 'blur(4px)',
          zIndex: 9990, 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'center', 
          padding: '24px 16px',
          overflowY: 'auto'
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '580px',
            width: '100%',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            margin: 'auto 0'
          }}
        >
          {step === 1 ? (
            <div>
              {/* HEADER WITH CLOSE BUTTON */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1.1rem', color: '#dc2626' }}>
                  <AlertCircle size={22} /> Subscription Cancellation Terms
                </div>
                <button
                  onClick={() => setIsTurnOffRenewalModalOpen(false)}
                  style={{ background: '#f1f5f9', border: 'none', color: '#64748b', cursor: 'pointer', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* TERMS AND CONDITIONS BOX */}
              <div style={{ background: '#fff9f5', border: '1px solid #ffedd5', borderRadius: '16px', padding: '20px', textAlign: 'left', marginBottom: '20px', fontSize: '0.875rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#9a3412', borderBottom: '1px dashed #fed7aa', paddingBottom: '8px' }}>
                  📜 Art of Living Subscription Terms & Policy
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#059669', fontWeight: 800, fontSize: '1.1rem' }}>✓</span>
                  <div>
                    <strong>24-Hour Notice Requirement:</strong> Cancellations must be submitted at least 24 hours prior to your scheduled renewal date (<strong>{sub.endDate || '13 Jan 2027'}</strong>) to prevent auto-debit.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#059669', fontWeight: 800, fontSize: '1.1rem' }}>✓</span>
                  <div>
                    <strong>Continued Access:</strong> Your daily yoga program access remains 100% active until <strong>{sub.endDate || '13 Jan 2027'}</strong>.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#dc2626', fontWeight: 800, fontSize: '1.1rem' }}>•</span>
                  <div>
                    <strong>Non-Refundable Policy:</strong> Subscription fees charged within 24 hours of renewal or after renewal date are non-refundable as per Art of Living policies.
                  </div>
                </div>
              </div>

              {/* SUPPORT TEAM CONTACT SECTION */}
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '14px', padding: '16px', textAlign: 'left', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showSupportInfo ? '10px' : '0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.875rem', color: '#1e40af' }}>
                    <HelpCircle size={18} color="#2563eb" /> Need Help or Have Questions?
                  </div>
                  <button
                    onClick={() => setShowSupportInfo(!showSupportInfo)}
                    style={{ background: '#dbeafe', border: 'none', color: '#1d4ed8', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    {showSupportInfo ? 'Hide Support Info' : 'View Support Contacts'}
                  </button>
                </div>

                {showSupportInfo && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#1e3a8a', paddingTop: '8px', borderTop: '1px dashed #93c5fd' }}>
                    <div>📧 <strong>Email Support:</strong> <a href="mailto:support@srisriyoga.in" style={{ color: '#1d4ed8', fontWeight: 700 }}>support@srisriyoga.in</a></div>
                    <div>📞 <strong>Helpline / WhatsApp:</strong> <span style={{ fontWeight: 700 }}>+91 80 6761 2345</span> / <span style={{ fontWeight: 700 }}>9920656992</span></div>
                    <div>⏰ <strong>Support Hours:</strong> Mon - Sat | 9:00 AM – 6:00 PM IST</div>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsTurnOffRenewalModalOpen(false)}
                  style={{ flex: 1, minWidth: '140px', padding: '12px', background: '#facc15', color: '#111827', fontWeight: 800, borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleConfirmTurnOff}
                  style={{ flex: 1, minWidth: '140px', padding: '12px', background: '#ffffff', border: '1.5px solid #dc2626', color: '#dc2626', fontWeight: 700, borderRadius: '10px', cursor: 'pointer', fontSize: '0.95rem' }}
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
          Subscription Cancellation Terms
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
