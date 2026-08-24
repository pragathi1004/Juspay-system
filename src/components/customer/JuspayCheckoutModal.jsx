import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';

export const JuspayCheckoutModal = () => {
  const {
    setIsJuspayModalOpen,
    setCustomerScreen,
    selectedPlanForCheckout,
    handleJuspayPaymentSuccess,
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

  const handleSubmitPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsJuspayModalOpen(false);
      handleJuspayPaymentSuccess(paymentTab);
    }, 1500);
  };

  const handleBack = () => setCustomerScreen('CRM_FORM');

  const amountDisplay = selectedPlanForCheckout?.price
    ? selectedPlanForCheckout.price.toLocaleString('en-IN')
    : '1,499';
  const cycleDisplay = selectedPlanForCheckout?.name || '3 Months Plan';

  /* ── Sidebar tab data ── */
  const tabs = [
    {
      id: 'CARD',
      label: 'Credit / Debit Card',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
    {
      id: 'UPI',
      label: 'UPI',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      ),
    },
    {
      id: 'NB',
      label: 'NetBanking',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="22" x2="21" y2="22" />
          <line x1="6" y1="18" x2="6" y2="11" />
          <line x1="10" y1="18" x2="10" y2="11" />
          <line x1="14" y1="18" x2="14" y2="11" />
          <line x1="18" y1="18" x2="18" y2="11" />
          <polygon points="12 2 20 7 4 7" />
        </svg>
      ),
    },
    {
      id: 'EMI',
      label: 'EMI on Cards',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="16" x2="16" y2="8" />
          <circle cx="9" cy="9" r="1" fill="currentColor" />
          <circle cx="15" cy="15" r="1" fill="currentColor" />
        </svg>
      ),
    },
  ];

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    outline: 'none',
    color: '#374151',
    background: '#ffffff',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: 600,
    color: '#d97706',
    marginBottom: '5px',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>

      {/* ══════════════════════════════════════════
          TOP HEADER — matches Juspay screenshot
      ══════════════════════════════════════════ */}
      <div style={{
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e5e7eb',
        background: '#ffffff',
      }}>
        {/* Left: Art of Living Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleBack}
            title="Back to Registration"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', marginRight: '4px' }}
          >
            <ArrowLeft size={18} />
          </button>
          <img
            src="https://srisrischoolofyoga.org/in/app/uploads-yoga/2024/06/SSSYLogo_Orange.png"
            alt="The Art of Living"
            style={{ height: '44px', width: 'auto' }}
          />
        </div>

        {/* Center: Title */}
        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', letterSpacing: '-0.2px' }}>
          Complete your payment
        </div>

        {/* Right: Amount */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.72rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Amount</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#111827' }}>₹{amountDisplay}</div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN BODY — sidebar + content
      ══════════════════════════════════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(100vh - 77px)' }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{
          borderRight: '1px solid #e5e7eb',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {tabs.map((tab) => {
            const isActive = paymentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPaymentTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '18px 24px',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #d97706' : '3px solid transparent',
                  background: isActive ? '#fffbeb' : '#ffffff',
                  color: isActive ? '#111827' : '#6b7280',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.12s ease',
                }}
              >
                <span style={{ color: isActive ? '#d97706' : '#9ca3af', flexShrink: 0 }}>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}

          {/* Secured by Juspay footer */}
          <div style={{ marginTop: 'auto', padding: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#9ca3af' }}>
            secured by
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: '#1d4ed8' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d4ed8">
                <circle cx="12" cy="12" r="10" />
                <text x="12" y="16" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">J</text>
              </svg>
              JUSPAY
            </span>
          </div>
        </div>

        {/* ── RIGHT CONTENT PANEL ── */}
        <div style={{ padding: '36px 48px 48px 48px', background: '#ffffff' }}>

          {/* ─── CREDIT / DEBIT CARD ─── */}
          {paymentTab === 'CARD' && (
            <div style={{ maxWidth: '480px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '20px', marginTop: 0 }}>
                Enter Credit / Debit card details
              </h3>

              {/* EMI Plans available row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#374151', fontSize: '0.88rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  EMI Plans available
                </div>
                <button
                  type="button"
                  onClick={() => setPaymentTab('EMI')}
                  style={{ background: 'none', border: 'none', color: '#d97706', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
                >
                  View Plans
                </button>
              </div>

              {/* Card Number */}
              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>Card Number</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Enter Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    style={{ ...inputStyle, paddingRight: '46px', border: '1px solid #fbbf24' }}
                  />
                  {/* Card icon on right */}
                  <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                    <svg width="32" height="22" viewBox="0 0 48 32" rx="4">
                      <rect width="48" height="32" rx="4" fill="#e5e7eb" />
                      <rect x="4" y="10" width="16" height="12" rx="2" fill="#9ca3af" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expiry + CVV row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
                <div>
                  <label style={{ ...labelStyle, color: '#6b7280' }}>Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ ...labelStyle, color: '#6b7280' }}>CVV</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      style={{ ...inputStyle, paddingRight: '40px' }}
                    />
                    {/* CVV ? icon */}
                    <div style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: '1.5px solid #9ca3af',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#9ca3af',
                      cursor: 'pointer',
                    }}>?</div>
                  </div>
                </div>
              </div>

              {/* Proceed to Pay button */}
              <button
                type="button"
                onClick={handleSubmitPayment}
                disabled={isProcessing}
                style={{
                  padding: '12px 52px',
                  background: isProcessing ? '#fde68a' : '#fde047',
                  color: '#111827',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.1px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  transition: 'background 0.15s',
                }}
              >
                {isProcessing ? 'Authenticating...' : 'Proceed to Pay'}
              </button>
            </div>
          )}

          {/* ─── UPI ─── */}
          {paymentTab === 'UPI' && (
            <div style={{ maxWidth: '480px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '8px', marginTop: 0 }}>
                Pay by any UPI app
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '22px' }}>
                Scan the QR using any UPI app — PhonePe, GPay, Paytm, BHIM, etc.
              </p>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map((app, i) => (
                  <span key={i} style={{ background: '#f3f4f6', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, color: ['#7c3aed','#2563eb','#0284c7','#d97706'][i] }}>
                    {app}
                  </span>
                ))}
              </div>

              {showQrCode ? (
                <div style={{ textAlign: 'center', background: '#f9fafb', padding: '28px', borderRadius: '10px', border: '1px dashed #d1d5db', marginBottom: '24px', maxWidth: '260px' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Scan QR for UPI Autopay</div>
                  <div style={{ background: '#ffffff', width: '150px', height: '150px', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h1v1h-1zM16 14h1v1h-1zM14 16h1v1h-1zM16 16h1v1h-1zM18 14h3v1h-3zM14 18h3v1h-3zM18 18h3v1h-3z"/></svg>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#dc2626', fontWeight: 700 }}>
                    Expires in: {Math.floor(qrTimer / 60)}:{(qrTimer % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: '24px' }}>
                  <button
                    type="button"
                    onClick={() => setShowQrCode(true)}
                    style={{ padding: '11px 28px', background: '#fde047', color: '#111827', fontWeight: 600, fontSize: '0.92rem', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '18px' }}
                  >
                    Generate QR Code
                  </button>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>Or enter UPI ID / VPA:</div>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. mobile@upi"
                    style={{ ...inputStyle, maxWidth: '300px' }}
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmitPayment}
                disabled={isProcessing}
                style={{ padding: '12px 52px', background: '#fde047', color: '#111827', fontWeight: 600, fontSize: '0.95rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                {isProcessing ? 'Verifying...' : `Proceed to Pay ₹${amountDisplay}`}
              </button>
            </div>
          )}

          {/* ─── NETBANKING ─── */}
          {paymentTab === 'NB' && (
            <div style={{ maxWidth: '480px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '20px', marginTop: 0 }}>Net Banking</h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {[{id:'SBI',name:'SBI',color:'#0284c7'},{id:'HDFC',name:'HDFC',color:'#dc2626'},{id:'ICICI',name:'ICICI',color:'#ea580c'},{id:'AXIS',name:'Axis',color:'#9d174d'}].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBank(b.id)}
                    style={{ padding: '14px 8px', border: selectedBank === b.id ? '2px solid #d97706' : '1px solid #d1d5db', borderRadius: '6px', background: selectedBank === b.id ? '#fffbeb' : '#ffffff', fontWeight: 800, cursor: 'pointer', color: b.color, fontSize: '0.9rem' }}
                  >
                    {b.name}
                  </button>
                ))}
              </div>

              <div style={{ position: 'relative', marginBottom: '18px' }}>
                <Search size={15} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input type="text" placeholder="Search banks" style={{ ...inputStyle, paddingLeft: '36px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div>
                  <label style={{ ...labelStyle, color: '#6b7280' }}>Account Number</label>
                  <input type="text" placeholder="Enter Account No." value={accountNo} onChange={(e) => setAccountNo(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ ...labelStyle, color: '#6b7280' }}>IFSC Code</label>
                  <input type="text" placeholder="e.g. HDFC0000123" value={ifsc} onChange={(e) => setIfsc(e.target.value)} style={inputStyle} />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmitPayment}
                disabled={isProcessing}
                style={{ padding: '12px 52px', background: '#fde047', color: '#111827', fontWeight: 600, fontSize: '0.95rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                {isProcessing ? 'Redirecting...' : 'Proceed to Pay'}
              </button>
            </div>
          )}

          {/* ─── EMI ON CARDS ─── */}
          {paymentTab === 'EMI' && (
            <div style={{ maxWidth: '480px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '18px', marginTop: 0 }}>Select EMI Option</h3>

              <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '20px' }}>
                {[{id:'CREDIT',label:'Credit Card EMI'},{id:'DEBIT',label:'Debit Card EMI'}].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setEmiSubTab(t.id)}
                    style={{ padding: '10px 20px', border: 'none', borderBottom: emiSubTab === t.id ? '2px solid #d97706' : '2px solid transparent', background: 'none', fontWeight: 600, color: emiSubTab === t.id ? '#111827' : '#6b7280', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Bank Of India','HDFC Bank','ICICI Bank','Axis Bank','State Bank of India'].map((bank, idx) => (
                  <div
                    key={idx}
                    onClick={() => alert(`Selected EMI for ${bank}`)}
                    style={{ padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, color: '#374151', background: '#ffffff' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#d97706' }}>★</span>{bank}
                    </div>
                    <ChevronRight size={16} color="#9ca3af" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
