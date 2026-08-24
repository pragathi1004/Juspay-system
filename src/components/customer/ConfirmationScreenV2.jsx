import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Clock, MessageSquare, Mail, Sparkles, ArrowRight, ShieldCheck, PhoneCall, ChevronRight } from 'lucide-react';

export const ConfirmationScreenV2 = () => {
  const { customer, setCustomerScreen, regForm, selectedPlanForCheckout } = useApp();
  const sub = customer.subscription;
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const amountStr = sub.amount ? sub.amount.toLocaleString('en-IN') : '1,499';

  // Calculate validity dates based on durationMonths
  const durationMonths = selectedPlanForCheckout?.durationMonths || 3;
  const planName = selectedPlanForCheckout?.name || '3 Months Plan';

  const startDay = 14;
  const startMonth = 9; // October (0-indexed)
  const startYear = 2026;
  
  const startDate = new Date(startYear, startMonth, startDay);
  const endDate = new Date(startYear, startMonth + durationMonths, startDay - 1);
  const renewalDate = new Date(startYear, startMonth + durationMonths, startDay);
  
  const formatDate = (date) => {
    const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()} ${monthsNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const validityText = `${formatDate(startDate)} – ${formatDate(endDate)}`;
  const renewalText = formatDate(renewalDate);

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
              <div style={{ color: '#78350f', fontSize: '0.75rem', fontWeight: 600 }}>Payment Reference ID</div>
              <div style={{ fontWeight: 700, color: '#1e293b' }}>{sub.mandateId || 'REF_JSP_991823'}</div>
            </div>
            <div>
              <div style={{ color: '#78350f', fontSize: '0.75rem', fontWeight: 600 }}>Subscription Validity</div>
              <div style={{ fontWeight: 700, color: '#1e293b' }}>{validityText}</div>
            </div>
            <div>
              <div style={{ color: '#78350f', fontSize: '0.75rem', fontWeight: 600 }}>Next Renewal Date</div>
              <div style={{ fontWeight: 700, color: '#ea580c' }}>{renewalText} (₹{amountStr})</div>
            </div>
          </div>
        </div>

        {/* SUBTLE DASHBOARD PREPARATION NOTICE (V2) */}
        <div style={{ marginTop: '32px', borderTop: '1px solid #f1f5f9', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.05rem', color: '#1e3a8a', fontWeight: 700, marginBottom: '12px' }}>
            ⏳ Your personalized Yoga Dashboard will be ready within 2–3 hours.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, marginBottom: '8px' }}>
            We'll notify you on WhatsApp and email when it's ready.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#047857', fontWeight: 600 }}>
            Your subscription is active. You can begin your Yoga journey from tomorrow.
          </p>
        </div>

      </div>

      {/* DISCREET PROTOTYPE CONTROL */}
      <div style={{ marginTop: '40px', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prototype Controls</div>
        <button
          onClick={() => setCustomerScreen('DASHBOARD')}
          style={{
            padding: '6px 16px',
            background: '#e2e8f0',
            color: '#334155',
            fontWeight: 700,
            fontSize: '0.8rem',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#cbd5e1'}
          onMouseOut={(e) => e.currentTarget.style.background = '#e2e8f0'}
        >
          [Simulate Dashboard Ready]
        </button>
      </div>
    </div>
  );
};

