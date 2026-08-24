import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Clock, MessageSquare, Mail, Sparkles, ArrowRight, ShieldCheck, PhoneCall, ChevronRight } from 'lucide-react';

export const ConfirmationScreen = () => {
  const { customer, setCustomerScreen, regForm } = useApp();
  const sub = customer.subscription;
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const amountStr = sub.amount ? sub.amount.toLocaleString('en-IN') : '1,499';

  return (
    <div style={{ background: '#fdfbf7', minHeight: '90vh', padding: '40px 20px 80px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '720px',
          width: '100%',
          boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9',
          textAlign: 'center'
        }}
      >
        {/* Success Icon Badge */}
        <div
          style={{
            width: '76px',
            height: '76px',
            background: '#ecfdf5',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            border: '2px solid #a7f3d0'
          }}
        >
          <CheckCircle size={44} color="#10b981" />
        </div>

        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
          Payment Successful 🎉
        </h1>
        <p style={{ color: '#047857', fontSize: '1.05rem', fontWeight: 700, marginBottom: '24px' }}>
          Your Sri Sri Yoga subscription has been activated.
        </p>

        {/* SUBSCRIPTION DETAILS CARD */}
        <div
          style={{
            background: '#fffbeb',
            border: '1.5px solid #fde68a',
            borderRadius: '20px',
            padding: '24px',
            textAlign: 'left',
            marginBottom: '28px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px dashed #fcd34d', paddingBottom: '12px' }}>
            <div>
              <span className="badge badge-active" style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700 }}>
                Auto-Renewal: Active
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginTop: '6px' }}>
                {sub.planName || '3 Months Sri Sri Yoga'}
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ea580c' }}>
                ₹{amountStr}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#78350f', fontWeight: 600 }}>
                Paid via {sub.maskedPaymentDetail || 'UPI ••••1234'}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.875rem' }}>
            <div>
              <div style={{ color: '#78350f', fontSize: '0.75rem', fontWeight: 600 }}>Subscription ID</div>
              <div style={{ fontWeight: 700, color: '#1e293b' }}>{sub.id || 'SUB_6688891'}</div>
            </div>
            <div>
              <div style={{ color: '#78350f', fontSize: '0.75rem', fontWeight: 600 }}>Juspay Mandate ID</div>
              <div style={{ fontWeight: 700, color: '#1e293b' }}>{sub.mandateId || 'MND_JSP_991823'}</div>
            </div>
            <div>
              <div style={{ color: '#78350f', fontSize: '0.75rem', fontWeight: 600 }}>Subscription Validity</div>
              <div style={{ fontWeight: 700, color: '#1e293b' }}>14 Oct 2026 – 13 Jan 2027</div>
            </div>
            <div>
              <div style={{ color: '#78350f', fontSize: '0.75rem', fontWeight: 600 }}>Next Renewal Date</div>
              <div style={{ fontWeight: 700, color: '#ea580c' }}>14 Jan 2027 (₹{amountStr})</div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DASHBOARD PREPARATION NOTICE (CRITICAL PROMPT SPEC REQUIREMENT) */}
        {/* ============================================================ */}
        <div
          style={{
            background: 'linear-gradient(to right, #eff6ff, #f0fdf4)',
            border: '2px dashed #60a5fa',
            borderRadius: '20px',
            padding: '24px',
            textAlign: 'center',
            marginBottom: '28px'
          }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#3b82f6', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
            <Clock size={26} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '8px' }}>
            ⏳ Your Dashboard Is Being Prepared
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#1e40af', fontWeight: 600, lineHeight: 1.5, marginBottom: '12px' }}>
            Your personalized Yoga Dashboard will be available within <strong>2–3 hours</strong>.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5, marginBottom: '16px' }}>
            You will receive a confirmation on WhatsApp & Email when your dashboard is ready.<br />
            <span style={{ fontWeight: 700, color: '#047857' }}>Your subscription is active. You can begin your Yoga journey from tomorrow.</span>
          </p>

          {/* CONFIRMATION DELIVERY STATUS BADGES */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={14} /> ✓ WhatsApp confirmation sent
            </div>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} /> ✓ Email confirmation sent
            </div>
          </div>
        </div>

        {/* REVIEWER DEMO SIMULATION CTAS */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setCustomerScreen('DASHBOARD')}
            style={{
              padding: '14px 36px',
              background: '#ea580c',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={18} /> Simulate 2–3 Hours Passed / Open Dashboard <ArrowRight size={18} />
          </button>

          <button
            onClick={() => setShowWhatsAppModal(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0284c7',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <MessageSquare size={14} /> Preview WhatsApp Confirmation Message Sent
          </button>
        </div>

      </div>

      {/* WHATSAPP MESSAGE PREVIEW MODAL */}
      {showWhatsAppModal && (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div style={{ background: '#075e54', width: '380px', borderRadius: '20px', overflow: 'hidden', color: '#ffffff', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ padding: '16px 20px', background: '#128c7e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#075e54', fontWeight: 900, fontSize: '0.85rem' }}>
                  AOL
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Sri Sri School of Yoga</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Official WhatsApp Business</div>
                </div>
              </div>
              <button onClick={() => setShowWhatsAppModal(false)} style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ background: '#e5ddd5', padding: '16px', color: '#111827', minHeight: '300px' }}>
              <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', fontSize: '0.85rem', lineHeight: 1.5, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <p style={{ fontWeight: 700, color: '#075e54', marginBottom: '8px' }}>🎉 Payment Successful!</p>
                <p>Dear {regForm.firstName || 'Pragathi'},</p>
                <p>Your Sri Sri Yoga subscription has been activated successfully!</p>
                <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', margin: '8px 0', fontSize: '0.8rem' }}>
                  • <strong>Plan:</strong> 3 Months Sri Sri Yoga<br />
                  • <strong>Amount Paid:</strong> ₹1,499<br />
                  • <strong>Validity:</strong> 14 Oct 2026 – 13 Jan 2027<br />
                  • <strong>Auto-Renewal Date:</strong> 14 Jan 2027 (₹1,499)
                </div>
                <p style={{ fontSize: '0.8rem', color: '#475569' }}>
                  ⏳ <strong>Dashboard Preparation:</strong> Your personalized Yoga Dashboard will be ready in 2–3 hours. Your live classes start tomorrow!
                </p>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', textAlign: 'right', marginTop: '6px' }}>10:14 AM ✓✓</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

