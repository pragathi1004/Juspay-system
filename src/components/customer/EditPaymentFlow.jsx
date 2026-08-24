import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CreditCard, ShieldCheck, CheckCircle, RefreshCw, Lock, QrCode, Building } from 'lucide-react';

export const EditPaymentFlow = () => {
  const { customer, setCustomerScreen, handleEditPaymentSubmit } = useApp();
  const sub = customer.subscription;

  const [newMethod, setNewMethod] = useState('UPI'); // 'UPI' | 'CARD' | 'NB'
  const [newDetail, setNewDetail] = useState('priya.sharma@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [showQrCode, setShowQrCode] = useState(false);
  const [qrTimer, setQrTimer] = useState(180);

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

  // Lock body scroll while this flow is active (modal/page overlay)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);


  const handleUpdatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const detailStr = newMethod === 'UPI' ? newDetail : newMethod === 'CARD' ? 'HDFC Card (•••• 9912)' : 'ICICI NetBanking';
      handleEditPaymentSubmit(detailStr);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div style={{ background: '#fdfbf7', minHeight: '100vh', padding: '40px 20px 80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className="edit-payment-scroll" style={{ height: 'calc(100vh - 80px)', overflowY: 'auto', width: '100%', maxWidth: '580px' }}>
        {/* Back Link */}
        <button
          onClick={() => setCustomerScreen('MANAGE_HUB')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '20px'
          }}
        >
          <ArrowLeft size={16} /> Back to Subscription Hub
        </button>

        {!isSuccess ? (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
              Edit Payment Details
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '28px' }}>
              Update your payment method for automatic subscription renewal.
            </p>

            {/* CURRENT MANDATE STATE BOX */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '20px 24px',
                marginBottom: '28px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Current Active Mandate
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                    {sub.maskedPaymentDetail}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Mandate ID: {sub.mandateId}
                  </div>
                </div>
                <span className="badge badge-active">Active</span>
              </div>
            </div>

            {/* SELECT NEW PAYMENT METHOD */}
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '14px', color: '#1e293b' }}>
              Select New Payment & Mandate Method
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
              <button
                onClick={() => setNewMethod('UPI')}
                style={{
                  padding: '14px 10px',
                  borderRadius: '12px',
                  border: newMethod === 'UPI' ? '2px solid var(--aol-orange)' : '1px solid #cbd5e1',
                  background: newMethod === 'UPI' ? '#fff9f0' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: newMethod === 'UPI' ? 'var(--aol-orange-dark)' : '#475569',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <QrCode size={20} />
                UPI Autopay
              </button>

              <button
                onClick={() => setNewMethod('CARD')}
                style={{
                  padding: '14px 10px',
                  borderRadius: '12px',
                  border: newMethod === 'CARD' ? '2px solid var(--aol-orange)' : '1px solid #cbd5e1',
                  background: newMethod === 'CARD' ? '#fff9f0' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: newMethod === 'CARD' ? 'var(--aol-orange-dark)' : '#475569',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CreditCard size={20} />
                Card SI
              </button>

              <button
                onClick={() => setNewMethod('NB')}
                style={{
                  padding: '14px 10px',
                  borderRadius: '12px',
                  border: newMethod === 'NB' ? '2px solid var(--aol-orange)' : '1px solid #cbd5e1',
                  background: newMethod === 'NB' ? '#fff9f0' : '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: newMethod === 'NB' ? 'var(--aol-orange-dark)' : '#475569',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Building size={20} />
                e-NACH NetBanking
              </button>
            </div>

            {/* INPUT FIELD FOR NEW METHOD */}
            {newMethod === 'UPI' && (
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Enter UPI ID or Phone Number for Auto-debit Mandate
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                    placeholder="e.g. name@upi or 9876543210"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem'
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      background: '#0f172a',
                      color: '#ffffff',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      border: 'none'
                    }}
                  >
                    Verify
                  </button>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px', marginBottom: '16px' }}>
                  Supports Google Pay, PhonePe, Paytm, BHIM & major banks.
                </div>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <span style={{ background: '#e2e8f0', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', color: '#475569', fontWeight: 700 }}>OR</span>
                </div>
                
                {showQrCode ? (
                  <div style={{ textAlign: 'center', background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
                      Scan with any UPI App
                    </div>
                    <div style={{ background: '#f8fafc', width: '180px', height: '180px', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <QrCode size={120} color="#475569" strokeWidth={1} />
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 700, background: '#fef2f2', padding: '6px 12px', borderRadius: '8px', display: 'inline-block' }}>
                      QR expires in {Math.floor(qrTimer / 60)}:{(qrTimer % 60).toString().padStart(2, '0')}
                    </div>
                    <div style={{ marginTop: '16px' }}>
                      <button
                        onClick={() => { setShowQrCode(false); setQrTimer(180); }}
                        style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Cancel & Enter UPI ID instead
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowQrCode(true)}
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      color: '#0f172a',
                      padding: '12px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      border: '1px solid #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <QrCode size={18} /> Show QR Code to Scan & Pay
                  </button>
                )}
              </div>
            )}

            {newMethod === 'CARD' && (
              <div style={{ marginBottom: '28px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  New Card Number
                </label>
                <input
                  type="text"
                  defaultValue="4821 •••• •••• 9912"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', marginBottom: '16px' }}
                />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Expiry</label>
                    <input type="text" defaultValue="08/29" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>CVV</label>
                    <input type="password" defaultValue="•••" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>OTP Validation</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" placeholder="Enter Bank OTP" style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                    <button type="button" style={{ background: '#0f172a', color: '#ffffff', padding: '10px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}>
                      Send OTP
                    </button>
                  </div>
                </div>
              </div>
            )}

            {newMethod === 'NB' && (
              <div style={{ marginBottom: '28px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Select Bank for New e-NACH Mandate
                </label>
                <select style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', marginBottom: '16px' }}>
                  <option>ICICI Bank</option>
                  <option>HDFC Bank</option>
                  <option>State Bank of India</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Account Number</label>
                    <input type="text" placeholder="Enter Account No." style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>IFSC Code</label>
                    <input type="text" placeholder="e.g. ICIC0000123" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>OTP Validation</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" placeholder="Enter Bank OTP" style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                    <button type="button" style={{ background: '#0f172a', color: '#ffffff', padding: '10px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}>
                      Send OTP
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TECHNICAL RE-AUTHORIZATION DISCLOSURE */}
            <div style={{ background: '#fff9f0', border: '1px solid #fed7aa', padding: '14px 18px', borderRadius: '12px', fontSize: '0.8rem', color: '#7c2d12', marginBottom: '24px' }}>
              <ShieldCheck size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Updating payment method creates a new ₹1 authorization mandate with Juspay. Once verified, your old mandate <strong>{sub.mandateId}</strong> will be revoked automatically.
            </div>

            <button
              onClick={handleUpdatePayment}
              disabled={isProcessing}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '1rem', position: 'sticky', bottom: '0', background: '#fdfbf7', zIndex: 10 }}
            >
              {isProcessing ? 'Authorizing New Mandate with Juspay...' : 'Authorize New Payment Method'}
            </button>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '64px', height: '64px', background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle size={36} color="#10b981" />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
              Payment Method Updated!
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              Your future automatic renewals will be processed using your new authorized mandate.
            </p>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', textAlign: 'left', marginBottom: '28px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#64748b' }}>New Payment Method:</span>
                <strong style={{ color: '#1e293b' }}>{sub.maskedPaymentDetail}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Mandate Status:</span>
                <span className="badge badge-active">Active</span>
              </div>
            </div>

            <button
              onClick={() => setCustomerScreen('DASHBOARD')}
              className="btn-primary"
              style={{ width: '100%', borderRadius: '12px' }}
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
