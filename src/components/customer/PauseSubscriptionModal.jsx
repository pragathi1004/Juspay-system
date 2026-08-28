import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Clock, HelpCircle, AlertCircle, PlayCircle, Calendar } from 'lucide-react';

export const PauseSubscriptionModal = () => {
  const {
    isPauseModalOpen,
    setIsPauseModalOpen,
    customer,
    handlePauseSubscriptionSubmit
  } = useApp();

  const sub = customer.subscription;
  const planCode = sub.planCode || 'YOGA_3M';
  
  // Cult Fit rules pool lookup
  const getPlanMaxPauseDays = (code) => {
    if (code === 'YOGA_12M') return 45;
    if (code === 'YOGA_6M') return 30;
    return 15;
  };

  const maxPool = getPlanMaxPauseDays(planCode);
  const remainingDays = sub.pauseDaysRemaining !== undefined ? sub.pauseDaysRemaining : maxPool;

  const [pauseDays, setPauseDays] = useState(Math.min(10, remainingDays));

  if (!isPauseModalOpen) return null;

  // Safe Date Math helper
  const calculateNewDate = (dateStr, days) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      date.setDate(date.getDate() + parseInt(days));
      const d = date.getDate();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const m = months[date.getMonth()];
      const y = date.getFullYear();
      return `${d} ${m} ${y}`;
    } catch (e) {
      return dateStr;
    }
  };

  const oldEndDate = sub.endDate || '13 Jan 2027';
  const oldNextRenewalDate = sub.nextRenewalDate || '14 Jan 2027';
  const newEndDate = calculateNewDate(oldEndDate, pauseDays);
  const newNextRenewalDate = calculateNewDate(oldNextRenewalDate, pauseDays);

  const handleConfirm = () => {
    if (pauseDays > 0 && pauseDays <= remainingDays) {
      handlePauseSubscriptionSubmit(pauseDays);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          maxWidth: '540px',
          width: '100%',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          animation: 'slideUp 0.25s ease-out'
        }}
      >
        {/* Sticky Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fdfbf7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Pause Subscription</h2>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Temporarily suspend billing and daily classes</p>
            </div>
          </div>
          <button
            onClick={() => setIsPauseModalOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', color: '#94a3b8' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Pause Pool Card */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>
              <span>Membership Tier Pool:</span>
              <strong style={{ color: '#0f172a' }}>{maxPool} Days Max</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700 }}>
              <span style={{ color: '#334155' }}>Your Available Pause Days:</span>
              <span style={{ color: '#15803d', background: '#dcfce7', padding: '2px 8px', borderRadius: '6px' }}>
                {remainingDays} Days Left
              </span>
            </div>
          </div>

          {remainingDays <= 0 ? (
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '16px', borderRadius: '16px', display: 'flex', gap: '10px', color: '#991b1b', fontSize: '0.85rem' }}>
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>No pause days remaining.</strong> You have fully consumed your pause days allowance for this billing cycle.
              </div>
            </div>
          ) : (
            <>
              {/* Slider for days selection */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155' }}>Pause Duration:</label>
                  <strong style={{ fontSize: '1.2rem', color: '#ea580c' }}>{pauseDays} Days</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max={remainingDays}
                  value={pauseDays}
                  onChange={(e) => setPauseDays(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: '#ea580c',
                    cursor: 'pointer',
                    height: '6px',
                    borderRadius: '3px',
                    background: '#e2e8f0',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px' }}>
                  <span>1 day</span>
                  <span>{remainingDays} days (max)</span>
                </div>
              </div>

              {/* Date Projection Comparison */}
              <div style={{ background: '#fffbeb', border: '1px solid #fef08a', borderRadius: '16px', padding: '16px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#854d0e', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} /> Billing Cycle Adjustments Projection
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #fef08a', paddingBottom: '6px' }}>
                    <span style={{ color: '#713f12' }}>Subscription Access Expiry:</span>
                    <div>
                      <span style={{ textDecoration: 'line-through', color: '#a16207', marginRight: '6px' }}>{oldEndDate}</span>
                      <strong style={{ color: '#15803d' }}>{newEndDate}</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#713f12' }}>Next Scheduled Renewal:</span>
                    <div>
                      <span style={{ textDecoration: 'line-through', color: '#a16207', marginRight: '6px' }}>{oldNextRenewalDate}</span>
                      <strong style={{ color: '#15803d' }}>{newNextRenewalDate}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Rules and FAQ */}
          <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
              <div style={{ color: '#ea580c', fontWeight: 'bold' }}>•</div>
              <span>Suspends class access and postpones next auto-renewal debit instantly.</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
              <div style={{ color: '#ea580c', fontWeight: 'bold' }}>•</div>
              <span>You can resume early at any time; any unused pause days will be immediately refunded back to your available pool.</span>
            </div>
          </div>
        </div>

        {/* Sticky Actions Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '12px', justifyContent: 'flex-end', background: '#fdfbf7' }}>
          <button
            onClick={() => setIsPauseModalOpen(false)}
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Keep Active
          </button>
          
          <button
            onClick={handleConfirm}
            disabled={remainingDays <= 0}
            style={{
              padding: '10px 24px',
              borderRadius: '9999px',
              border: 'none',
              background: remainingDays <= 0 ? '#cbd5e1' : '#ea580c',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: remainingDays <= 0 ? 'not-allowed' : 'pointer',
              boxShadow: remainingDays <= 0 ? 'none' : '0 2px 8px rgba(234, 88, 12, 0.25)'
            }}
          >
            Confirm Suspension
          </button>
        </div>
      </div>
    </div>
  );
};
