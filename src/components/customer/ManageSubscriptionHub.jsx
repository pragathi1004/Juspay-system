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
  AlertCircle,
  Clock,
  PlayCircle,
  AlertTriangle,
  Calendar,
  CalendarDays
} from 'lucide-react';
import { PaymentHistoryModal } from './PaymentHistoryModal';
import { CancelSubscriptionFlow } from './CancelSubscriptionFlow';
import { PauseSubscriptionModal } from './PauseSubscriptionModal';
import { ResumeSubscriptionModal } from './ResumeSubscriptionModal';

export const ManageSubscriptionHub = () => {
  const {
    customer,
    setCustomerScreen,
    paymentHistory,
    setIsPaymentHistoryOpen,
    handleTurnOffAutoRenewalSubmit,
    handleTurnOnAutoRenewalSubmit,
    setIsTurnOffRenewalModalOpen,
    setIsPauseModalOpen,
    setIsResumeModalOpen
  } = useApp();

  const sub = customer.subscription;
  const isAutoPayActive = sub.autopayStatus === 'ACTIVE';
  const isPaused = sub.status === 'PAUSED' || sub.isPaused;
  const amountStr = sub.amount ? sub.amount.toLocaleString('en-IN') : '1,499';

  const planCode = sub.planCode || 'YOGA_3M';
  const getPlanMaxPauseDays = (code) => {
    if (code === 'YOGA_12M') return 45;
    if (code === 'YOGA_6M') return 30;
    return 15;
  };
  const maxPausePool = sub.totalPauseDays || getPlanMaxPauseDays(planCode);
  const remainingPauseDays = sub.pauseDaysRemaining !== undefined ? sub.pauseDaysRemaining : maxPausePool;

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
          Manage your membership status, pause options, view payment logs, or update billing settings.
        </p>

        {/* ========================================================================= */}
        {/* CURRENT SUBSCRIPTION CARD (ACTIVE / PAUSED)                                */}
        {/* ========================================================================= */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            border: isPaused ? '2px solid #f59e0b' : (isAutoPayActive ? '1px solid #e2e8f0' : '1px solid #fca5a5'),
            boxShadow: isPaused ? '0 8px 30px rgba(245, 158, 11, 0.12)' : '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '36px',
            position: 'relative'
          }}
        >
          {/* TOP ROW: STATUS & PLAN DETAILS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: isPaused ? '#fef3c7' : (isAutoPayActive ? '#dcfce7' : '#fee2e2'),
                    color: isPaused ? '#b45309' : (isAutoPayActive ? '#15803d' : '#b91c1c'),
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Status: {isPaused ? '⏸️ PAUSED' : '🟢 ACTIVE'}
                </span>

                <span
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                >
                  Auto-Renewal: {isAutoPayActive ? 'On' : 'Off'}
                </span>
              </div>

              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                {sub.planName || '3 Month Yoga'}
              </h2>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: isPaused ? '#d97706' : '#ea580c' }}>
                ₹{amountStr}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Billed {sub.billingCycle || 'Quarterly'}
              </div>
            </div>
          </div>

          {/* PAUSED HIGHLIGHT BANNER INSIDE CARD */}
          {isPaused && (
            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '16px', padding: '16px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#92400e', marginBottom: '2px' }}>
                  ⏸️ Currently Paused for {sub.pauseDuration} Days
                </div>
                <div style={{ fontSize: '0.82rem', color: '#78350f' }}>
                  {sub.pauseReason ? `Reason: ${sub.pauseReason} • ` : ''}Scheduled to resume on <strong>{sub.pauseEndDate || sub.endDate}</strong>.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsResumeModalOpen(true)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  background: '#ea580c',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(234, 88, 12, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <PlayCircle size={16} /> Resume Subscription
              </button>
            </div>
          )}

          {/* GRID METRICS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '20px',
              fontSize: '0.875rem'
            }}
          >
            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Subscription Start</div>
              <div style={{ fontWeight: 700, color: '#334155' }}>{sub.startDate || '14 Oct 2026'}</div>
            </div>

            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
                {isPaused ? 'Adjusted Expiry Date' : 'Subscription Expiry'}
              </div>
              <div style={{ fontWeight: 700, color: isPaused ? '#15803d' : '#334155' }}>
                {sub.endDate || '13 Jan 2027'}
              </div>
            </div>

            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
                {isPaused ? 'Adjusted Next Renewal' : 'Next Renewal Date'}
              </div>
              <div style={{ fontWeight: 700, color: isAutoPayActive ? '#ea580c' : '#64748b' }}>
                {isAutoPayActive ? (sub.nextRenewalDate || '14 Jan 2027') : 'Not scheduled'}
              </div>
            </div>

            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Pause Allowance</div>
              <div style={{ fontWeight: 800, color: remainingPauseDays > 0 ? '#ea580c' : '#94a3b8' }}>
                {remainingPauseDays} / {maxPausePool} Days Remaining
              </div>
            </div>

            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Payment Method</div>
              <div style={{ fontWeight: 700, color: '#334155' }}>{sub.maskedPaymentDetail || 'UPI ••••1234'}</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4 PRIMARY ACTION CARDS                                                    */}
        {/* ========================================================================= */}
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px', color: '#1e293b' }}>
          Subscription Actions
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '44px' }}>
          
          {/* ACTION 1: PAUSE / RESUME SUBSCRIPTION */}
          <div
            onClick={() => isPaused ? setIsResumeModalOpen(true) : setIsPauseModalOpen(true)}
            style={{
              background: isPaused ? '#fffbeb' : '#ffffff',
              border: isPaused ? '2px solid #f59e0b' : '1px solid #cbd5e1',
              borderRadius: '20px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: isPaused ? '0 4px 16px rgba(245, 158, 11, 0.1)' : 'none'
            }}
          >
            <div>
              <div style={{ background: isPaused ? '#fef3c7' : '#fff7ed', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isPaused ? '#d97706' : '#ea580c', marginBottom: '16px' }}>
                {isPaused ? <PlayCircle size={22} /> : <Clock size={22} />}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px', color: isPaused ? '#92400e' : '#1e293b' }}>
                {isPaused ? 'Resume Subscription' : 'Pause Subscription'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.4 }}>
                {isPaused
                  ? `Your subscription is paused for ${sub.pauseDuration} days. Tap to resume immediately and refund unused pause days.`
                  : `Taking a break? Pause your daily classes and save your validity. You have ${remainingPauseDays} of ${maxPausePool} pause days remaining.`
                }
              </p>
            </div>
            <div style={{ color: isPaused ? '#d97706' : '#ea580c', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {isPaused ? 'Resume Now' : 'Pause Subscription'} <ChevronRight size={16} />
            </div>
          </div>

          {/* ACTION 2: CANCEL SUBSCRIPTION */}
          <div
            onClick={() => setIsTurnOffRenewalModalOpen(true)}
            style={{
              background: '#ffffff',
              border: '1.5px solid #fca5a5',
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
              <div style={{ background: '#fef2f2', width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', marginBottom: '16px' }}>
                <XCircle size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px', color: '#991b1b' }}>
                Cancel Subscription
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.4 }}>
                Cancel your Sri Sri Yoga subscription. Must be requested at least 24 hours prior to next renewal date ({sub.endDate || '13 Jan 2027'}).
              </p>
            </div>
            <div style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Cancel Subscription <ChevronRight size={16} />
            </div>
          </div>

          {/* ACTION 3: VIEW PAYMENT HISTORY */}
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

          {/* ACTION 4: UPDATE PAYMENT METHOD */}
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

          {/* ACTION 5: CHANGE PLAN */}
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
                Switch to 6-Month (30 pause days) or 12-Month (45 pause days) plan.
              </p>
            </div>
            <div style={{ color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Select New Plan <ChevronRight size={16} />
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* PAUSE HISTORY SECTION                                                    */}
        {/* ========================================================================= */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <CalendarDays size={22} color="#ea580c" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
              Pause History
            </h2>
          </div>

          {sub.pauseHistory && sub.pauseHistory.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sub.pauseHistory.map((item, idx) => (
                <div
                  key={item.id || idx}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '16px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '2px' }}>
                      {item.startDate} – {item.endDate} ({item.actualDaysPaused || item.pauseDays} {item.actualDaysPaused === 1 || item.pauseDays === 1 ? 'day' : 'days'})
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Reason: <strong style={{ color: '#334155' }}>{item.reason}</strong>
                      {item.resumedEarly && item.refundedPauseDays > 0 && (
                        <span style={{ color: '#15803d', marginLeft: '8px' }}>
                          • {item.refundedPauseDays} unused days refunded
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    style={{
                      background: item.resumedAt ? '#dcfce7' : '#fef3c7',
                      color: item.resumedAt ? '#15803d' : '#b45309',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '9999px'
                    }}
                  >
                    {item.resumedAt ? '✓ Completed' : '⏸️ Currently Active'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', background: '#fafaf9', borderRadius: '16px', color: '#64748b', fontSize: '0.88rem' }}>
              No pauses taken yet in this subscription cycle. You have {remainingPauseDays} of {maxPausePool} pause days available.
            </div>
          )}
        </div>

      </div>

      {/* MODALS */}
      <PaymentHistoryModal />
      <CancelSubscriptionFlow />
      <PauseSubscriptionModal />
      <ResumeSubscriptionModal />
    </div>
  );
};
