import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  XCircle,
  TrendingUp,
  CreditCard,
  History,
  FileText,
  Lock,
  ArrowLeft,
  ChevronRight,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { PaymentHistoryModal } from './PaymentHistoryModal';

export const ManageSubscriptionHub = () => {
  const {
    customer,
    setCustomerScreen,
    paymentHistory,
    setIsPaymentHistoryOpen,
    handleTurnOffAutoRenewalSubmit,
    handleTurnOnAutoRenewalSubmit
  } = useApp();

  const sub = customer.subscription;
  const isAutoPayActive = sub.autopayStatus === 'ACTIVE';
  const amountStr = sub.amount ? sub.amount.toLocaleString('en-IN') : '1,499';

  return (
    <div style={{ background: '#fdfbf7', minHeight: '100vh', padding: '40px 20px 80px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Back Link */}
        <button
          onClick={() => setCustomerScreen('DASHBOARD')}
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
          <ArrowLeft size={16} /> Back to Yoga Dashboard
        </button>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
          Manage Subscription
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '28px' }}>
          Manage automatic renewal options, view payment history, or update your payment method.
        </p>

        {/* CURRENT SUBSCRIPTION CARD (SCREEN 7 SPEC) */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            border: isAutoPayActive ? '1px solid #e2e8f0' : '1px solid #fca5a5',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '36px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span
                style={{
                  background: isAutoPayActive ? '#dcfce7' : '#fee2e2',
                  color: isAutoPayActive ? '#15803d' : '#b91c1c',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px'
                }}
              >
                Auto-Renewal: {isAutoPayActive ? '🟢 Active' : '🔴 Off'}
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>
                {sub.planName || '3 Months Sri Sri Yoga'}
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ea580c' }}>
                ₹{amountStr}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Billed {sub.billingCycle || 'Quarterly'}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '20px',
              fontSize: '0.875rem'
            }}
          >
            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Start Date</div>
              <div style={{ fontWeight: 700, color: '#334155' }}>{sub.startDate || '14 Oct 2026'}</div>
            </div>
            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Paid Subscription End Date</div>
              <div style={{ fontWeight: 700, color: '#334155' }}>{sub.endDate || '13 Jan 2027'}</div>
            </div>
            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Next Renewal Date</div>
              <div style={{ fontWeight: 700, color: isAutoPayActive ? '#ea580c' : '#64748b' }}>
                {isAutoPayActive ? (sub.nextRenewalDate || '14 Jan 2027') : 'Not scheduled'}
              </div>
            </div>
            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Next Renewal Charge</div>
              <div style={{ fontWeight: 800, color: isAutoPayActive ? '#ea580c' : '#64748b' }}>
                {isAutoPayActive ? `₹${amountStr}` : '₹0'}
              </div>
            </div>
            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Payment Method</div>
              <div style={{ fontWeight: 700, color: '#334155' }}>{sub.maskedPaymentDetail || 'UPI ••••1234'}</div>
            </div>
          </div>
        </div>

        {/* 4 PRIMARY ACTION CARDS */}
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px', color: '#1e293b' }}>
          Subscription Actions
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '44px' }}>
          
          {/* ACTION 1: TURN OFF FUTURE RENEWAL (PREFERRED LANGUAGE SPEC) */}
          <div
            onClick={() => {
              if (isAutoPayActive) {
                handleTurnOffAutoRenewalSubmit();
              } else {
                handleTurnOnAutoRenewalSubmit();
              }
            }}
            style={{
              background: '#ffffff',
              border: isAutoPayActive ? '1.5px solid #fca5a5' : '1.5px solid #6ee7b7',
              borderRadius: '20px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ background: isAutoPayActive ? '#fef2f2' : '#ecfdf5', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isAutoPayActive ? '#ef4444' : '#059669', marginBottom: '16px' }}>
                <RefreshCw size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px', color: isAutoPayActive ? '#991b1b' : '#065f46' }}>
                {isAutoPayActive ? 'Turn Off Future Renewal' : 'Turn Auto-Renewal Back On'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.4 }}>
                {isAutoPayActive
                  ? 'Stop automatic charge of ₹' + amountStr + ' on next renewal date. Current access continues until ' + (sub.endDate || '13 Jan 2027') + '.'
                  : 'Re-enable automatic renewal so your daily yoga access continues without interruption.'}
              </p>
            </div>
            <div style={{ color: isAutoPayActive ? '#dc2626' : '#059669', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {isAutoPayActive ? 'Turn Off Renewal' : 'Enable Renewal'} <ChevronRight size={16} />
            </div>
          </div>

          {/* ACTION 2: VIEW PAYMENT HISTORY */}
          <div
            onClick={() => setIsPaymentHistoryOpen(true)}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '20px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ background: '#f0f9ff', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', marginBottom: '16px' }}>
                <History size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px', color: '#0369a1' }}>View Payment History</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.4 }}>
                Inspect past transactions, initial subscription payment, and all recurring auto-charge receipts.
              </p>
            </div>
            <div style={{ color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Open Payment Logs <ChevronRight size={16} />
            </div>
          </div>

          {/* ACTION 3: UPDATE PAYMENT METHOD */}
          <div
            onClick={() => setCustomerScreen('EDIT_PAYMENT_WIZARD')}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '20px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ background: '#ecfdf5', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '16px' }}>
                <CreditCard size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>Update Payment Method</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.4 }}>
                Change payment method (UPI / Card / NetBanking). Replaces current payment method with a new payment setup.
              </p>
            </div>
            <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Update Payment Method <ChevronRight size={16} />
            </div>
          </div>

          {/* ACTION 4: CHANGE PLAN */}
          <div
            onClick={() => setCustomerScreen('CHANGE_PLAN_WIZARD')}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '20px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ background: '#e0f2fe', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', marginBottom: '16px' }}>
                <TrendingUp size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>Change Plan</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.4 }}>
                Switch to 6-Month or 12-Month plan. Renewal amount and cycle will adjust automatically.
              </p>
            </div>
            <div style={{ color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Select New Plan <ChevronRight size={16} />
            </div>
          </div>

        </div>

      </div>

      {/* PAYMENT HISTORY MODAL */}
      <PaymentHistoryModal />
    </div>
  );
};

