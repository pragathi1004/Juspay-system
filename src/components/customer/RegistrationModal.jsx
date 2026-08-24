import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PLAN_SPECS } from '../../data/planSpecs';
import { Check, Award, ArrowLeft, ShieldCheck, X } from 'lucide-react';

export const RegistrationModal = () => {
  const { customer, setCustomerScreen, setSelectedPlanForCheckout } = useApp();
  const sub = customer.subscription;

  // Selected plan tab for renewal
  const [selectedPlan, setSelectedPlan] = useState(PLAN_SPECS[2]); // 12 Months ₹3,499 default

  const handleRenewClick = () => {
    setSelectedPlanForCheckout(selectedPlan);
    setCustomerScreen('CRM_FORM');
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '20px 16px 60px 16px', display: 'flex', justifyContent: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '540px', background: '#ffffff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
        
        {/* TOP BACK BAR */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setCustomerScreen('LANDING')}
            style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.5px' }}>MANAGE SUBSCRIPTION</span>
        </div>

        {/* HERO TRAINER BANNER (MATCHING SCREENSHOT 2) */}
        <div style={{ background: '#fff3e0', padding: '24px 24px 16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ffe0b2' }}>
          <div>
            <div style={{ fontSize: '1rem', color: '#e65100', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Daily</div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#e65100', lineHeight: 1.1, marginBottom: '6px' }}>
              SRI SRI YOGA<br />Classes
            </h1>
            <div style={{ fontSize: '0.75rem', color: '#ef6c00', fontWeight: 700 }}>with MAYUR & EESHA</div>
            <div style={{ fontSize: '0.65rem', color: '#bf360c' }}>Govt. Certified Yoga Trainers | 10+ Years Exp</div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300" 
            alt="Mayur & Eesha" 
            style={{ width: '120px', height: '120px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(230,81,0,0.2)' }}
          />
        </div>

        {/* WELCOME & CURRENT SUBSCRIPTION DETAILS (SCREENSHOT 2) */}
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ea580c', marginBottom: '16px', textAlign: 'center' }}>
            Welcome {customer.name}
          </h2>

          <div style={{ border: '1px solid #cbd5e1', borderRadius: '16px', padding: '18px 20px', background: '#ffffff', marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#334155', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              Your Subscription Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Current Plan</span>
                <strong style={{ color: '#ea580c', fontWeight: 700 }}>{sub.planName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Start Date</span>
                <strong style={{ color: '#334155' }}>14 Oct 2025</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>End Date</span>
                <strong style={{ color: '#334155' }}>13 Oct 2026</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748b' }}>Status</span>
                <span style={{ background: '#22c55e', color: '#ffffff', padding: '2px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700 }}>Active</span>
              </div>
            </div>
          </div>

          {/* PLAN SELECTION FOR RENEWAL (MATCHING SCREENSHOT 3) */}
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#475569', fontStyle: 'italic', marginBottom: '12px', textAlign: 'center' }}>
            Select plan to renew:
          </h3>

          {/* PLAN TABS GRID (3 / 6 / 12 MONTHS) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '24px' }}>
            {PLAN_SPECS.map((p) => {
              const isSelected = selectedPlan.code === p.code;
              return (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => setSelectedPlan(p)}
                  style={{
                    padding: '12px 6px',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #ea580c' : '1px solid #cbd5e1',
                    background: isSelected ? '#fff7ed' : '#ffffff',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: isSelected ? '#ea580c' : '#64748b', textTransform: 'uppercase' }}>
                    {p.name.replace(' Plan', '')}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: isSelected ? '#ea580c' : '#1e293b', marginTop: '2px' }}>
                    ₹ {p.price.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '2px' }}>
                    *Click for details
                  </div>
                </button>
              );
            })}
          </div>

          {/* SELECTED PLAN CARD BOX (MATCHING SCREENSHOT 3) */}
          <div style={{ border: '2px solid #ea580c', borderRadius: '20px', background: '#ffffff', overflow: 'hidden', boxShadow: '0 6px 18px rgba(234, 88, 12, 0.12)', marginBottom: '24px' }}>
            {/* Header pill */}
            <div style={{ background: '#78350f', color: '#ffffff', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 800, fontSize: '1.1rem' }}>
              <span>{selectedPlan.name}</span>
              <Award size={22} color="#f59e0b" />
            </div>

            <div style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#334155', marginBottom: '20px' }}>
                ₹ {selectedPlan.price.toLocaleString('en-IN')}
              </div>

              {/* FEATURES CHECKLIST */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', maxWidth: '320px', margin: '0 auto 24px auto' }}>
                {selectedPlan.features.map((feat, idx) => {
                  const featText = typeof feat === 'string' ? feat : feat.text;
                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#78350f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                        <Check size={14} />
                      </div>
                      <span>{featText}</span>
                    </div>
                  );
                })}
              </div>

              {/* RENEW BUTTON (MATCHING SCREENSHOT 3) */}
              <button
                type="button"
                onClick={handleRenewClick}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  background: '#f97316',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
                  letterSpacing: '1px'
                }}
              >
                RENEW
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
