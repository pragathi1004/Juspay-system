import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CreditCard, QrCode, Building, Percent, ShieldCheck, Lock, ChevronRight, Search, Check } from 'lucide-react';

export const JuspayCheckoutModal = () => {
  const {
    isJuspayModalOpen,
    setIsJuspayModalOpen,
    customerScreen,
    setCustomerScreen,
    selectedPlanForCheckout,
    handleJuspayPaymentSuccess,
    regForm
  } = useApp();

  const [paymentTab, setPaymentTab] = useState('CARD');
  const [emiSubTab, setEmiSubTab] = useState('CREDIT');

  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // UPI fields
  const [upiId, setUpiId] = useState('pragathi@upi');
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrTimer, setQrTimer] = useState(180);

  // NetBanking fields
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);

  // QR Timer Countdown
  useEffect(() => {
    let interval;
    if (showQrCode && qrTimer > 0) {
      interval = setInterval(() => setQrTimer((prev) => prev - 1), 1000);
    } else if (qrTimer === 0) {
      setShowQrCode(false);
      setQrTimer(180);
    }
    return () => clearInterval(interval);
  }, [showQrCode, qrTimer]);

  // Render as a full-page screen when customerScreen === 'PAYMENT', or as legacy modal
  const isFullPage = customerScreen === 'PAYMENT';
  if (!isFullPage && !isJuspayModalOpen) return null;

  const handleSubmitPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsJuspayModalOpen(false);
      handleJuspayPaymentSuccess(paymentTab);
    }, 1500);
  };

  const handleBack = () => {
    if (isFullPage) {
      setCustomerScreen('CRM_FORM');
    } else {
      setIsJuspayModalOpen(false);
    }
  };

  const amountDisplay = selectedPlanForCheckout?.price
    ? selectedPlanForCheckout.price.toLocaleString('en-IN')
    : '1,499';
  const cycleDisplay = selectedPlanForCheckout?.name || '3 Months Plan';

  const pageContent = (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ── TOP HEADER ── */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '14px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
      }}>
        {/* Left: logo + back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            type="button"
            onClick={handleBack}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#475569'
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>

          <img
            src="https://srisrischoolofyoga.org/in/app/uploads-yoga/2024/06/SSSYLogo_Orange.png"
            alt="Sri Sri School of Yoga"
            style={{ height: '40px', width: 'auto' }}
          />
          <span style={{
            fontSize: '0.72rem',
            background: '#fef3c7',
            color: '#92400e',
            padding: '4px 10px',
            borderRadius: '12px',
            fontWeight: 700
          }}>
            Juspay Autopay Gateway
          </span>
        </div>

        {/* Center title */}
        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b' }}>
          {cycleDisplay} — Complete Payment & Setup Autopay
        </div>

        {/* Right: amount */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Initial Charge</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ea580c' }}>₹{amountDisplay}</div>
        </div>
      </div>

      {/* ── STEP INDICATOR ── */}
      <div style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '10px 32px' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#92400e' }}>
          <span style={{ color: '#16a34a' }}>✓ Step 1: Registration Complete</span>
          <span style={{ color: '#cbd5e1' }}>›</span>
          <span style={{ background: '#ea580c', color: '#fff', padding: '2px 10px', borderRadius: '9999px' }}>Step 2: Payment</span>
          <span style={{ color: '#cbd5e1' }}>›</span>
          <span style={{ color: '#94a3b8' }}>Step 3: Confirmation</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: '920px', margin: '32px auto', padding: '0 24px 80px 24px' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '220px 1fr'
        }}>

          {/* ── LEFT SIDEBAR ── */}
          <div style={{ background: '#f8fafc', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>

            {/* TAB: CARD */}
            {[
              { id: 'CARD', label: 'Credit / Debit Card', icon: <CreditCard size={18} /> },
              { id: 'UPI', label: 'UPI', icon: <QrCode size={18} /> },
              { id: 'NB', label: 'NetBanking', icon: <Building size={18} /> },
              { id: 'EMI', label: 'EMI on Cards', icon: <Percent size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPaymentTab(tab.id)}
                style={{
                  padding: '18px 20px',
                  border: 'none',
                  borderLeft: paymentTab === tab.id ? '4px solid #eab308' : '4px solid transparent',
                  background: paymentTab === tab.id ? '#ffffff' : 'transparent',
                  fontWeight: paymentTab === tab.id ? 700 : 500,
                  color: paymentTab === tab.id ? '#0f172a' : '#475569',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left'
                }}
              >
                <span style={{ color: paymentTab === tab.id ? '#eab308' : '#64748b' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}

            <div style={{ marginTop: 'auto', padding: '20px', fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              secured by <span style={{ fontWeight: 800, color: '#2563eb' }}>O JUSPAY</span>
            </div>
          </div>

          {/* ── RIGHT CONTENT PANEL ── */}
          <div style={{ padding: '32px 36px' }}>

            {/* ─── CARD ─── */}
            {paymentTab === 'CARD' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>
                  Enter Credit / Debit card details
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', fontSize: '0.85rem' }}>
                  <span style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>💳 EMI Plans available</span>
                  <button type="button" onClick={() => setPaymentTab('EMI')} style={{ background: 'none', border: 'none', color: '#eab308', fontWeight: 700, cursor: 'pointer' }}>
                    View Plans
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '28px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#eab308', marginBottom: '6px' }}>Card Number</label>
                    <input
                      type="text"
                      placeholder="Enter Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      style={{ width: '100%', padding: '13px 14px', borderRadius: '8px', border: '1.5px solid #fde047', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        style={{ width: '100%', padding: '13px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>CVV</label>
                      <input
                        type="password"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        style={{ width: '100%', padding: '13px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmitPayment}
                  disabled={isProcessing}
                  style={{
                    padding: '14px 40px',
                    background: isProcessing ? '#fde68a' : '#fde047',
                    color: '#1e293b',
                    fontWeight: 800,
                    fontSize: '1rem',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(234,179,8,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {isProcessing ? (
                    <><span>⏳</span> Authenticating with Bank...</>
                  ) : (
                    <><Lock size={16} /> Proceed to Pay ₹{amountDisplay}</>
                  )}
                </button>
              </div>
            )}

            {/* ─── UPI ─── */}
            {paymentTab === 'UPI' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                  Pay by any UPI app
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
                  Scan the QR using any UPI app like PhonePe, Paytm, GPay, or BHIM
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map((app, i) => (
                    <span key={i} style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, color: ['#7c3aed', '#2563eb', '#0284c7', '#d97706'][i] }}>{app}</span>
                  ))}
                </div>

                {showQrCode ? (
                  <div style={{ textAlign: 'center', background: '#f8fafc', padding: '28px', borderRadius: '14px', border: '1px dashed #cbd5e1', marginBottom: '24px', maxWidth: '280px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>Scan QR for UPI Autopay Mandate</div>
                    <div style={{ background: '#ffffff', width: '160px', height: '160px', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <QrCode size={130} color="#334155" />
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 700 }}>
                      Expires in: {Math.floor(qrTimer / 60)}:{(qrTimer % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                ) : (
                  <div style={{ marginBottom: '24px' }}>
                    <button
                      type="button"
                      onClick={() => setShowQrCode(true)}
                      style={{ padding: '12px 28px', background: '#fde047', color: '#1e293b', fontWeight: 700, fontSize: '0.95rem', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '16px' }}
                    >
                      Generate QR Code
                    </button>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Or enter UPI ID / VPA:</div>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi"
                      style={{ width: '100%', maxWidth: '320px', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', boxSizing: 'border-box' }}
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmitPayment}
                  disabled={isProcessing}
                  style={{ padding: '14px 36px', background: '#fde047', color: '#1e293b', fontWeight: 800, fontSize: '1rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                >
                  {isProcessing ? 'Verifying...' : `Proceed to Pay ₹${amountDisplay}`}
                </button>
              </div>
            )}

            {/* ─── NETBANKING ─── */}
            {paymentTab === 'NB' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '18px' }}>Net Banking</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  {[{ id: 'SBI', name: 'SBI', color: '#0284c7' }, { id: 'HDFC', name: 'HDFC', color: '#dc2626' }, { id: 'ICICI', name: 'ICICI', color: '#ea580c' }, { id: 'AXIS', name: 'Axis', color: '#9d174d' }].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBank(b.id)}
                      style={{ padding: '14px 10px', border: selectedBank === b.id ? '2px solid #eab308' : '1px solid #cbd5e1', borderRadius: '8px', background: selectedBank === b.id ? '#fffbeb' : '#ffffff', fontWeight: 700, cursor: 'pointer' }}
                    >
                      <div style={{ color: b.color, fontSize: '1rem', fontWeight: 900 }}>{b.name}</div>
                    </button>
                  ))}
                </div>

                <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '380px' }}>
                  <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input type="text" placeholder="Search banks" style={{ width: '100%', padding: '10px 14px 10px 36px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px', maxWidth: '480px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>Account Number</label>
                    <input type="text" placeholder="Enter Bank Account No." value={accountNo} onChange={(e) => setAccountNo(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>IFSC Code</label>
                    <input type="text" placeholder="e.g. HDFC0000123" value={ifsc} onChange={(e) => setIfsc(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmitPayment}
                  disabled={isProcessing}
                  style={{ padding: '14px 36px', background: '#fde047', color: '#1e293b', fontWeight: 800, fontSize: '1rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                >
                  {isProcessing ? 'Redirecting to NetBanking...' : 'Proceed to Pay'}
                </button>
              </div>
            )}

            {/* ─── EMI ─── */}
            {paymentTab === 'EMI' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>Select EMI Option</h3>

                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '20px' }}>
                  {[{ id: 'CREDIT', label: 'Credit Card EMI' }, { id: 'DEBIT', label: 'Debit Card EMI' }].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEmiSubTab(t.id)}
                      style={{ padding: '10px 20px', border: 'none', borderBottom: emiSubTab === t.id ? '2px solid #eab308' : '2px solid transparent', background: 'none', fontWeight: 700, color: emiSubTab === t.id ? '#0f172a' : '#64748b', cursor: 'pointer' }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '480px' }}>
                  {['Bank Of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'State Bank of India'].map((bank, idx) => (
                    <div
                      key={idx}
                      onClick={() => alert(`Selected EMI for ${bank}`)}
                      style={{ padding: '14px 18px', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: '#334155', background: '#ffffff' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#eab308' }}>★</span><span>{bank}</span>
                      </div>
                      <ChevronRight size={18} color="#94a3b8" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* SECURITY FOOTER */}
        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
          <ShieldCheck size={16} color="#16a34a" />
          <span>256-bit SSL encrypted • Secured by Juspay</span>
          <Lock size={14} color="#94a3b8" />
        </div>
      </div>
    </div>
  );

  // Render as full page
  if (isFullPage) return pageContent;

  // Legacy: render as overlay modal (for backward compatibility from old flow)
  return (
    <div className="modal-overlay" style={{ overflowY: 'auto', alignItems: 'flex-start', justifyContent: 'center', padding: '0' }}>
      {pageContent}
    </div>
  );
};
