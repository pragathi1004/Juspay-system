import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, History, FileText, CheckCircle, ShieldCheck, ChevronRight, CreditCard, Lock, ArrowLeft } from 'lucide-react';

export const PaymentHistoryModal = () => {
  const {
    isPaymentHistoryOpen,
    setIsPaymentHistoryOpen,
    paymentHistory,
    customer,
    selectedPaymentDetail,
    setSelectedPaymentDetail
  } = useApp();

  if (!isPaymentHistoryOpen) return null;

  const sub = customer.subscription;

  return (
    <div 
      className="modal-overlay" 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        background: 'rgba(15, 23, 42, 0.65)', 
        backdropFilter: 'blur(4px)',
        zIndex: 9990, 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'center', 
        padding: '24px 16px',
        overflowY: 'auto'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          border: '1px solid #e2e8f0',
          margin: 'auto 0'
        }}
      >
        {/* STICKY ACCESSIBLE HEADER */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fdfbf7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <History size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Payment History</h2>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Complete log of initial payment and automatic renewals via Juspay</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* PROMINENT BACK TO DASHBOARD BUTTON IN HEADER */}
            <button
              onClick={() => setIsPaymentHistoryOpen(false)}
              style={{
                background: '#ea580c',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(234, 88, 12, 0.25)'
              }}
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>

            <button
              onClick={() => setIsPaymentHistoryOpen(false)}
              style={{ background: '#f1f5f9', border: 'none', color: '#64748b', cursor: 'pointer', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* SCROLLABLE BODY CONTENT */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          
          {/* TOP SUMMARY CARD */}
          <div
            style={{
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '14px',
              padding: '16px 20px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: '#78350f', textTransform: 'uppercase', fontWeight: 700 }}>Current Subscription</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>{sub.planName || '3 Months Sri Sri Yoga'}</div>
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#78350f' }}>Status</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#047857' }}>● {sub.status || 'Active'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#78350f' }}>Renewal Amount</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ea580c' }}>₹{sub.renewalAmount ? sub.renewalAmount.toLocaleString('en-IN') : '1,499'}</div>
              </div>
            </div>
          </div>

          {/* PAYMENT HISTORY TABLE */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                  <th style={{ padding: '12px 16px' }}>Description</th>
                  <th style={{ padding: '12px 16px' }}>Amount</th>
                  <th style={{ padding: '12px 16px' }}>Payment Type</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((item, idx) => (
                  <tr
                    key={item.id || idx}
                    onClick={() => setSelectedPaymentDetail(item)}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      cursor: 'pointer',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fafaf9'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1e293b' }}>
                      {item.date}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>
                      {item.description || '3 Months Sri Sri Yoga'}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#1e293b' }}>
                      ₹{item.amount?.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          background: item.paymentType === 'Auto-Renewal' ? '#eff6ff' : '#f0fdf4',
                          color: item.paymentType === 'Auto-Renewal' ? '#1d4ed8' : '#047857',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        {item.paymentType}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: item.status?.includes('Failed') ? '#ef4444' : '#059669' }}>
                      {item.status || '✓ Paid'}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button
                        style={{ background: '#f1f5f9', border: 'none', color: '#0284c7', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        View Details <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BOTTOM BACK TO DASHBOARD ACTION BUTTON */}
          <button
            onClick={() => setIsPaymentHistoryOpen(false)}
            style={{
              width: '100%',
              padding: '14px',
              background: '#ea580c',
              color: '#ffffff',
              fontWeight: 800,
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '0.925rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)'
            }}
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>

        </div>
      </div>

      {/* PAYMENT DETAIL DRAWER / MODAL */}
      {selectedPaymentDetail && (
        <div 
          className="modal-overlay" 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0,0,0,0.65)', 
            zIndex: 9999, 
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
              borderRadius: '20px',
              maxWidth: '480px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              border: '1px solid #e2e8f0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1.1rem', color: '#1e293b' }}>
                <CheckCircle size={20} color="#10b981" /> Transaction Receipt
              </div>
              <button onClick={() => setSelectedPaymentDetail(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Amount Charged</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1e293b' }}>₹{selectedPaymentDetail.amount?.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>✓ Payment Successful</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Payment ID</span>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>{selectedPaymentDetail.details?.paymentId || selectedPaymentDetail.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Order ID</span>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>{selectedPaymentDetail.details?.orderId || selectedPaymentDetail.orderId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Subscription ID</span>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>{selectedPaymentDetail.subscriptionId || sub.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Payment Type</span>
                  <span style={{ fontWeight: 700, color: '#2563eb' }}>{selectedPaymentDetail.paymentType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Payment Method</span>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>{selectedPaymentDetail.method || 'UPI ••••1234'}</span>
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed #cbd5e1', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={12} color="#059669" /> Sensitive credentials masked for privacy
              </div>
            </div>

            <button
              onClick={() => setSelectedPaymentDetail(null)}
              style={{ width: '100%', padding: '12px', background: '#facc15', color: '#111827', fontWeight: 800, border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
