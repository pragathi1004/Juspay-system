import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, User, ShieldCheck, CreditCard, History, MessageSquare, Clock, AlertTriangle, RefreshCw, XCircle, ChevronRight, Check } from 'lucide-react';

export const SubscriptionDetailDrawer = () => {
  const { selectedAdminSubDetail, setSelectedAdminSubDetail } = useApp();
  const [activeTab, setActiveTab] = useState('DETAILS'); // 'DETAILS' | 'PAYMENTS' | 'COMMUNICATIONS' | 'TIMELINE'

  if (!selectedAdminSubDetail) return null;

  const sub = selectedAdminSubDetail;

  return (
    <div className="drawer-overlay">
      <div className="drawer-content" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
              Subscription Details
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              {sub.customerName}
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              {sub.id} • Mandate: {sub.mandateId}
            </div>
          </div>

          <button
            onClick={() => setSelectedAdminSubDetail(null)}
            style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={18} color="#64748b" />
          </button>
        </div>

        {/* Status Badge Strip */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span className={`badge ${sub.status === 'ACTIVE' ? 'badge-active' : sub.status === 'RENEWAL_FAILED' ? 'badge-danger' : 'badge-warning'}`}>
            Status: {sub.status}
          </span>
          <span className={`badge ${sub.autopayStatus === 'ACTIVE' ? 'badge-active' : 'badge-danger'}`}>
            Autopay: {sub.autopayStatus}
          </span>
          <span className="badge badge-info">{sub.planName}</span>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '24px', gap: '16px' }}>
          <button
            onClick={() => setActiveTab('DETAILS')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'DETAILS' ? '2px solid var(--aol-orange)' : 'none',
              color: activeTab === 'DETAILS' ? 'var(--aol-orange-dark)' : '#64748b',
              fontWeight: 700,
              padding: '8px 4px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('PAYMENTS')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'PAYMENTS' ? '2px solid var(--aol-orange)' : 'none',
              color: activeTab === 'PAYMENTS' ? 'var(--aol-orange-dark)' : '#64748b',
              fontWeight: 700,
              padding: '8px 4px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Payments
          </button>

          <button
            onClick={() => setActiveTab('COMMUNICATIONS')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'COMMUNICATIONS' ? '2px solid var(--aol-orange)' : 'none',
              color: activeTab === 'COMMUNICATIONS' ? 'var(--aol-orange-dark)' : '#64748b',
              fontWeight: 700,
              padding: '8px 4px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Communications
          </button>

          <button
            onClick={() => setActiveTab('TIMELINE')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'TIMELINE' ? '2px solid var(--aol-orange)' : 'none',
              color: activeTab === 'TIMELINE' ? 'var(--aol-orange-dark)' : '#64748b',
              fontWeight: 700,
              padding: '8px 4px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Lifecycle Timeline
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'DETAILS' && (
          <div>
            {/* Customer Info Box */}
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Customer Info</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
                <div><span style={{ color: '#64748b' }}>Email:</span> <strong>{sub.email}</strong></div>
                <div><span style={{ color: '#64748b' }}>Phone:</span> <strong>{sub.phone}</strong></div>
                <div><span style={{ color: '#64748b' }}>Customer ID:</span> <strong>{sub.customerId}</strong></div>
                <div><span style={{ color: '#64748b' }}>City:</span> <strong>Bengaluru</strong></div>
              </div>
            </div>

            {/* Mandate Info Box */}
            <div style={{ background: '#fff9f0', border: '1px solid #fed7aa', padding: '16px', borderRadius: '14px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9a3412', marginBottom: '8px' }}>Juspay Autopay Mandate Specs</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
                <div><span style={{ color: '#64748b' }}>Mandate ID:</span> <strong>{sub.mandateId}</strong></div>
                <div><span style={{ color: '#64748b' }}>Max Amount:</span> <strong>₹{sub.amount}</strong></div>
                <div><span style={{ color: '#64748b' }}>Payment Method:</span> <strong>{sub.paymentMethod}</strong></div>
                <div><span style={{ color: '#64748b' }}>Mandate Status:</span> <span className="badge badge-active">{sub.autopayStatus}</span></div>
              </div>
            </div>

            {/* Admin Operations Buttons */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginTop: '20px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                Administrative Actions
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => alert(`Triggering Juspay manual retry for ${sub.id}...`)}
                  className="btn-primary"
                  style={{ background: '#0284c7', fontSize: '0.8rem', padding: '10px' }}
                >
                  <RefreshCw size={14} /> Retry Payment
                </button>
                <button
                  onClick={() => alert(`Revoking mandate ${sub.mandateId} with Juspay API...`)}
                  className="btn-secondary"
                  style={{ borderColor: '#fca5a5', color: '#dc2626', fontSize: '0.8rem', padding: '10px' }}
                >
                  <XCircle size={14} /> Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PAYMENTS */}
        {activeTab === 'PAYMENTS' && (
          <div style={{ fontSize: '0.85rem' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#1e293b' }}>
                <span>PAY_991823 • ₹{sub.amount}</span>
                <span className="badge badge-active">SUCCESS</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Date: {sub.lastPaymentDate} • Method: {sub.paymentMethod}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMMUNICATIONS */}
        {activeTab === 'COMMUNICATIONS' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span>Subscription Confirmation</span>
                <span style={{ color: '#16a34a', fontSize: '0.75rem' }}>Delivered (Email + WA)</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Sent on {sub.startDate}</div>
            </div>
          </div>
        )}

        {/* TAB 4: TIMELINE */}
        {activeTab === 'TIMELINE' && (
          <div style={{ position: 'relative', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'absolute', left: '8px', top: '8px', bottom: '8px', width: '2px', background: '#cbd5e1' }} />
            <div>
              <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>1. Lead Registration & OTP Verified</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sub.startDate} 10:12 AM</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>2. Juspay Mandate Mandate Created ({sub.mandateId})</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sub.startDate} 10:14 AM</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#16a34a', fontSize: '0.85rem' }}>3. First Payment Charged & Subscription Activated</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sub.startDate} 10:15 AM</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
