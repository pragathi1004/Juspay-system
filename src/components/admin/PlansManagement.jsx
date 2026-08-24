import React from 'react';
import { PLAN_SPECS } from '../../data/planSpecs';
import { Tag, Check, Edit, ShieldCheck, Users } from 'lucide-react';

export const PlansManagement = () => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Plans & Pricing Catalog
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Official Sri Sri Yoga subscription plans mapped to Juspay Mandate Courses.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {PLAN_SPECS.map((plan) => (
          <div
            key={plan.id}
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '28px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-active">ACTIVE</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                  Course ID: {plan.courseId}
                </span>
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                {plan.name} Plan
              </h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--aol-orange-dark)', fontWeight: 700, marginBottom: '16px' }}>
                Plan Code: {plan.code}
              </div>

              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                ₹{plan.price.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '20px' }}>
                {plan.billingCycle} Autopay Mandate Limit
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Included Benefits:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {plan.features.filter(f => f.included).map((feat, i) => (
                    <div key={i} style={{ fontSize: '0.825rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={14} color="#16a34a" /> {feat.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Users size={14} /> Active Subscribers: <strong>{plan.code === 'YOGA_12M' ? '742' : plan.code === 'YOGA_6M' ? '442' : '244'}</strong>
              </div>

              <button
                onClick={() => alert(`Editing Plan ${plan.code} properties...`)}
                style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Edit size={14} /> Edit Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
