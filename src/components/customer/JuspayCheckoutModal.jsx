import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CreditCard, QrCode, Building, Percent, ShieldCheck, Lock, ChevronRight, Search, Check } from 'lucide-react';

export const JuspayCheckoutModal = () => {
  const {
    isJuspayModalOpen,
    setIsJuspayModalOpen,
    selectedPlanForCheckout,
    handleJuspayPaymentSuccess,
    regForm
  } = useApp();

  const [paymentTab, setPaymentTab] = useState('CARD'); // 'CARD' | 'UPI' | 'NB' | 'EMI'
  const [emiSubTab, setEmiSubTab] = useState('CREDIT'); // 'CREDIT' | 'DEBIT'
  


  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // UPI fields
  const [upiId, setUpiId] = useState('manchitd@upi');
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrTimer, setQrTimer] = useState(180);

  // NetBanking fields
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  // QR Timer Countdown
  useEffect(() => {
    let interval;
    if (showQrCode && qrTimer > 0) {
      interval = setInterval(() => {
        setQrTimer((prev) => prev - 1);
      }, 1000);
    } else if (qrTimer === 0) {
      setShowQrCode(false);
      setQrTimer(180);
    }
    return () => clearInterval(interval);
  }, [showQrCode, qrTimer]);

  useEffect(() => {
    if (isJuspayModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isJuspayModalOpen]);

  if (!isJuspayModalOpen) return null;

  const handleSubmitPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      handleJuspayPaymentSuccess(paymentTab);
    }, 1500);
  };

  const amountDisplay = selectedPlanForCheckout?.price ? selectedPlanForCheckout.price.toLocaleString('en-IN') : '1,499';
  const cycleDisplay = selectedPlanForCheckout?.name || '3 Months Plan';
  const billingCycleName = selectedPlanForCheckout?.billingCycle || 'Quarterly';

  return (
    <div className="modal-overlay" style={{ overflowY: 'auto', alignItems: 'center', justifyContent: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
      <div className="modal-card" style={{ maxWidth: '880px', width: '92%', maxHeight: '88vh', padding: '0', background: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        
        {/* TOP HEADER BAR (STICKY/FIXED) */}
        <div style={{ padding: '16px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', flexShrink: 0 }}>
          {/* Left: Art of Living Sun Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="https://srisrischoolofyoga.org/in/app/uploads-yoga/2024/06/SSSYLogo_Orange.png" 
              alt="THE ART OF LIVING" 
              style={{ height: '42px', width: 'auto' }} 
            />
            <span style={{ fontSize: '0.75rem', background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '12px', fontWeight: 700 }}>
              Juspay Autopay Gateway
            </span>
          </div>

          {/* Center: Title */}
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b' }}>
            {cycleDisplay} — Complete Payment & Setup Autopay
          </div>

          {/* Right: Amount + Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Initial Charge</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ea580c' }}>
                ₹{amountDisplay}
              </div>
            </div>
            <button
              onClick={() => setIsJuspayModalOpen(false)}
              style={{ background: '#f1f5f9', border: 'none', color: '#64748b', cursor: 'pointer', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* MAIN 2-COLUMN PAYMENT CONTAINER (FLEX EXPAND + INNER SCROLLING) */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', flex: 1, overflow: 'hidden', minHeight: 0 }}>
          
          {/* LEFT SIDEBAR TABS */}
          <div style={{ background: '#f8fafc', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            
            {/* TAB 1: CARD */}
            <button
              type="button"
              onClick={() => setPaymentTab('CARD')}
              style={{
                padding: '18px 20px',
                border: 'none',
                borderLeft: paymentTab === 'CARD' ? '4px solid #eab308' : '4px solid transparent',
                background: paymentTab === 'CARD' ? '#ffffff' : 'transparent',
                fontWeight: paymentTab === 'CARD' ? 700 : 500,
                color: paymentTab === 'CARD' ? '#0f172a' : '#475569',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}
            >
              <CreditCard size={18} color={paymentTab === 'CARD' ? '#eab308' : '#64748b'} />
              Credit / Debit Card
            </button>

            {/* TAB 2: UPI */}
            <button
              type="button"
              onClick={() => setPaymentTab('UPI')}
              style={{
                padding: '18px 20px',
                border: 'none',
                borderLeft: paymentTab === 'UPI' ? '4px solid #eab308' : '4px solid transparent',
                background: paymentTab === 'UPI' ? '#ffffff' : 'transparent',
                fontWeight: paymentTab === 'UPI' ? 700 : 500,
                color: paymentTab === 'UPI' ? '#0f172a' : '#475569',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}
            >
              <QrCode size={18} color={paymentTab === 'UPI' ? '#eab308' : '#64748b'} />
              UPI
            </button>

            {/* TAB 3: NETBANKING */}
            <button
              type="button"
              onClick={() => setPaymentTab('NB')}
              style={{
                padding: '18px 20px',
                border: 'none',
                borderLeft: paymentTab === 'NB' ? '4px solid #eab308' : '4px solid transparent',
                background: paymentTab === 'NB' ? '#ffffff' : 'transparent',
                fontWeight: paymentTab === 'NB' ? 700 : 500,
                color: paymentTab === 'NB' ? '#0f172a' : '#475569',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}
            >
              <Building size={18} color={paymentTab === 'NB' ? '#eab308' : '#64748b'} />
              NetBanking
            </button>

            {/* TAB 4: EMI ON CARDS */}
            <button
              type="button"
              onClick={() => setPaymentTab('EMI')}
              style={{
                padding: '18px 20px',
                border: 'none',
                borderLeft: paymentTab === 'EMI' ? '4px solid #eab308' : '4px solid transparent',
                background: paymentTab === 'EMI' ? '#ffffff' : 'transparent',
                fontWeight: paymentTab === 'EMI' ? 700 : 500,
                color: paymentTab === 'EMI' ? '#0f172a' : '#475569',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left'
              }}
            >
              <Percent size={18} color={paymentTab === 'EMI' ? '#eab308' : '#64748b'} />
              EMI on Cards
            </button>

            {/* SECURED BY JUSPAY FOOTER */}
            <div style={{ marginTop: 'auto', padding: '20px', fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              secured by <span style={{ fontWeight: 800, color: '#2563eb' }}>O JUSPAY</span>
            </div>
          </div>

          {/* RIGHT CONTENT PANEL (SCROLLABLE) */}
          <div style={{ padding: '28px 32px 36px 32px', overflowY: 'auto', maxHeight: '100%' }}>
            
            {/* ------------------------------------------------------------- */}
            {/* CONTENT AREA 1: CREDIT / DEBIT CARD (SCREENSHOT 6) */}
            {/* ------------------------------------------------------------- */}
            {paymentTab === 'CARD' && (
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>
                  Enter Credit / Debit card details
                </h3>

                {/* EMI Available link */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '0.85rem' }}>
                  <span style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    💳 EMI Plans available
                  </span>
                  <button type="button" onClick={() => setPaymentTab('EMI')} style={{ background: 'none', border: 'none', color: '#eab308', fontWeight: 700, cursor: 'pointer' }}>
                    View Plans
                  </button>
                </div>

                {/* Card Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#eab308', marginBottom: '4px' }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '4px', border: '1px solid #fde047', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>CVV</label>
                      <input
                        type="password"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* PROCEED TO PAY BUTTON (YELLOW MATCHING SCREENSHOT 6) */}
                <button
                  type="button"
                  onClick={handleSubmitPayment}
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    maxWidth: '240px',
                    padding: '12px 24px',
                    background: '#fde047',
                    color: '#1e293b',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
                  }}
                >
                  {isProcessing ? 'Authenticating with Bank...' : 'Proceed to Pay'}
                </button>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* CONTENT AREA 2: UPI (SCREENSHOT 7) */}
            {/* ------------------------------------------------------------- */}
            {paymentTab === 'UPI' && (
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                  Pay by any UPI app
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
                  Scan the QR using any UPI app on your mobile phone like PhonePe, Paytm, GooglePay, BHIM, etc
                </p>

                {/* UPI Brand Icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#7c3aed' }}>PhonePe</span>
                  <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#2563eb' }}>GPay</span>
                  <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#0284c7' }}>Paytm</span>
                  <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#d97706' }}>BHIM</span>
                </div>

                {/* QR Code Container */}
                {showQrCode ? (
                  <div style={{ textAlign: 'center', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px dashed #cbd5e1', marginBottom: '24px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
                      Scan QR Code for UPI Autopay Mandate
                    </div>
                    <div style={{ background: '#ffffff', width: '180px', height: '180px', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <QrCode size={140} color="#334155" />
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
                      style={{
                        padding: '12px 28px',
                        background: '#fde047',
                        color: '#1e293b',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginBottom: '16px'
                      }}
                    >
                      Generate QR Code
                    </button>

                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Or enter UPI ID / VPA:</div>
                    <div style={{ display: 'flex', gap: '8px', maxWidth: '360px' }}>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. mobile@upi"
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmitPayment}
                  disabled={isProcessing}
                  style={{
                    padding: '12px 28px',
                    background: '#fde047',
                    color: '#1e293b',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {isProcessing ? 'Verifying Mandate...' : 'Proceed to Pay ₹' + amountDisplay}
                </button>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* CONTENT AREA 3: NETBANKING (SCREENSHOT 8) */}
            {/* ------------------------------------------------------------- */}
            {paymentTab === 'NB' && (
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
                  Net Banking
                </h3>

                {/* Popular Bank Logos */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  {[
                    { id: 'SBI', name: 'SBI', color: '#0284c7' },
                    { id: 'HDFC', name: 'HDFC', color: '#dc2626' },
                    { id: 'ICICI', name: 'ICICI', color: '#ea580c' },
                    { id: 'AXIS', name: 'Axis', color: '#9d174d' }
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBank(b.id)}
                      style={{
                        padding: '14px 10px',
                        border: selectedBank === b.id ? '2px solid #eab308' : '1px solid #cbd5e1',
                        borderRadius: '8px',
                        background: selectedBank === b.id ? '#fffbeb' : '#ffffff',
                        textAlign: 'center',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ color: b.color, fontSize: '1rem', fontWeight: 900 }}>{b.name}</div>
                    </button>
                  ))}
                </div>

                {/* Search Banks */}
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    placeholder="Search banks"
                    style={{ width: '100%', padding: '10px 14px 10px 36px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Account & IFSC details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>Account Number</label>
                    <input type="text" placeholder="Enter Bank Account No." value={accountNo} onChange={(e) => setAccountNo(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>IFSC Code</label>
                    <input type="text" placeholder="e.g. HDFC0000123" value={ifsc} onChange={(e) => setIfsc(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmitPayment}
                  disabled={isProcessing}
                  style={{ padding: '12px 28px', background: '#fde047', color: '#1e293b', fontWeight: 700, border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {isProcessing ? 'Redirecting to NetBanking...' : 'Proceed to Pay'}
                </button>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* CONTENT AREA 4: EMI ON CARDS (SCREENSHOT 9) */}
            {/* ------------------------------------------------------------- */}
            {paymentTab === 'EMI' && (
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
                  Select EMI Option
                </h3>

                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '20px' }}>
                  <button
                    type="button"
                    onClick={() => setEmiSubTab('CREDIT')}
                    style={{
                      padding: '10px 20px',
                      border: 'none',
                      borderBottom: emiSubTab === 'CREDIT' ? '2px solid #eab308' : '2px solid transparent',
                      background: 'none',
                      fontWeight: 700,
                      color: emiSubTab === 'CREDIT' ? '#0f172a' : '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    Credit Card EMI
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmiSubTab('DEBIT')}
                    style={{
                      padding: '10px 20px',
                      border: 'none',
                      borderBottom: emiSubTab === 'DEBIT' ? '2px solid #eab308' : '2px solid transparent',
                      background: 'none',
                      fontWeight: 700,
                      color: emiSubTab === 'DEBIT' ? '#0f172a' : '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    Debit Card EMI
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {['Bank Of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'State Bank of India'].map((bank, idx) => (
                    <div
                      key={idx}
                      onClick={() => alert(`Selected EMI for ${bank}`)}
                      style={{
                        padding: '14px 18px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#334155'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#eab308' }}>★</span>
                        <span>{bank}</span>
                      </div>
                      <ChevronRight size={18} color="#94a3b8" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
