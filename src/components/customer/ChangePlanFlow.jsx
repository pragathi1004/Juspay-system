import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PLAN_SPECS } from '../../data/planSpecs';
import { ArrowLeft, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const ChangePlanFlow = () => {
  const { customer, setCustomerScreen, handlePlanChangeSubmit } = useApp();
  const currentSub = customer.subscription;

  const [selectedTargetPlan, setSelectedTargetPlan] = useState(
    PLAN_SPECS.find((p) => p.code !== currentSub.planCode) || PLAN_SPECS[0]
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const diffAmount = Math.max(0, selectedTargetPlan.price - (currentSub.amount || 2999));

  const handleExecutePlanChange = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      handlePlanChangeSubmit(selectedTargetPlan);
      setCustomerScreen('DASHBOARD');
    }, 1200);
  };

  return (
    <div style={{ background: '#fdfbf7', minHeight: '90vh', padding: '40px 20px 80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
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

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
          Change Subscription Plan
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '32px' }}>
          Switch your Sri Sri Yoga subscription plan. Your existing mandate will be updated seamlessly.
        </p>

        {/* CURRENT PLAN HIGHLIGHT BOX */}
        <div
          style={{
            background: '#e0f2fe',
            border: '1px solid #38bdf8',
            borderRadius: '16px',
            padding: '18px 24px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span className="badge badge-info" style={{ marginBottom: '4px' }}>Currently Active</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0369a1' }}>
              {currentSub.planName}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#0284c7' }}>
              Current Price: ₹{currentSub.amount} • Valid until {currentSub.endDate}
            </div>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0369a1' }}>
            ₹{currentSub.amount}
          </div>
        </div>

        {/* PLAN SELECTION GRID */}
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', color: '#1e293b' }}>
          Select Target Upgrade / Change Plan
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {PLAN_SPECS.map((plan) => {
            const isCurrent = plan.code === currentSub.planCode;
            const isSelected = plan.code === selectedTargetPlan.code;

            return (
              <div
                key={plan.id}
                onClick={() => !isCurrent && setSelectedTargetPlan(plan)}
                style={{
                  background: isSelected ? '#fff9f0' : '#ffffff',
                  border: isSelected
                    ? '2px solid var(--aol-orange)'
                    : isCurrent
                    ? '1px dashed #94a3b8'
                    : '1px solid #cbd5e1',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: isCurrent ? 'not-allowed' : 'pointer',
                  opacity: isCurrent ? 0.6 : 1,
                  position: 'relative'
                }}
              >
                {isCurrent && (
                  <span style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>
                    Current
                  </span>
                )}

                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1e293b', marginBottom: '6px' }}>
                  {plan.name}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--aol-orange-dark)', marginBottom: '4px' }}>
                  ₹{plan.price.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {plan.billingCycle} Autopay
                </div>
              </div>
            );
          })}
        </div>

        {/* DIFFERENTIAL CALCULATION SUMMARY */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            marginBottom: '32px'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
            Plan Switch Summary & Cost Calculation
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>New Selected Plan:</span>
              <strong style={{ color: '#1e293b' }}>{selectedTargetPlan.name} (₹{selectedTargetPlan.price})</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Current Plan Credit:</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>- ₹{currentSub.amount}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', fontSize: '1.1rem' }}>
              <span style={{ fontWeight: 700, color: '#1e293b' }}>Differential Amount Due Now:</span>
              <strong style={{ color: 'var(--aol-orange-dark)', fontWeight: 800 }}>₹{diffAmount.toLocaleString('en-IN')}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Updated Mandate Limit:</span>
              <strong style={{ color: '#334155' }}>₹{selectedTargetPlan.price} / {selectedTargetPlan.billingCycle}</strong>
            </div>
          </div>
        </div>

        {/* Technical Flow Disclosure Note */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px 18px', borderRadius: '12px', fontSize: '0.8rem', color: '#64748b', marginBottom: '24px' }}>
          <ShieldCheck size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          Executing this plan change updates your subscription plan to <strong>{selectedTargetPlan.name}</strong> for ₹{selectedTargetPlan.price}.
        </div>

        {/* Action Button */}
        <button
          onClick={handleExecutePlanChange}
          disabled={isProcessing}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '1.05rem' }}
        >
          {isProcessing ? 'Revoking Old Mandate & Initializing Upgrade...' : `Confirm Upgrade & Pay ₹${diffAmount}`}
        </button>
      </div>
    </div>
  );
};
