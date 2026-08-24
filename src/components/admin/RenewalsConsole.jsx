import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RefreshCw, AlertTriangle, CheckCircle, Clock, Bell, ArrowRight, ShieldAlert } from 'lucide-react';

export const RenewalsConsole = () => {
  const { subscriptionsList, setSelectedAdminSubDetail } = useApp();
  const [renewalTab, setRenewalTab] = useState('FAILED'); // 'UPCOMING' | 'SUCCESSFUL' | 'FAILED' | 'RETRYING'

  const failedRenewals = subscriptionsList.filter((s) => s.status === 'RENEWAL_FAILED');
  const dueRenewals = subscriptionsList.filter((s) => s.status === 'RENEWAL_DUE');

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Renewals & Failed Payments Operations
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Manage recurring auto-debit retries, grace periods, and failed mandate resolution workflows.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '24px', gap: '20px' }}>
        <button
          onClick={() => setRenewalTab('FAILED')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: renewalTab === 'FAILED' ? '2px solid #ef4444' : 'none',
            color: renewalTab === 'FAILED' ? '#dc2626' : '#64748b',
            fontWeight: 700,
            padding: '10px 4px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <AlertTriangle size={16} /> Failed Payments & Grace ({failedRenewals.length})
        </button>

        <button
          onClick={() => setRenewalTab('UPCOMING')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: renewalTab === 'UPCOMING' ? '2px solid var(--aol-orange)' : 'none',
            color: renewalTab === 'UPCOMING' ? 'var(--aol-orange-dark)' : '#64748b',
            fontWeight: 700,
            padding: '10px 4px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Clock size={16} /> Upcoming Renewals ({dueRenewals.length})
        </button>
      </div>

      {/* TAB CONTENT: FAILED PAYMENTS */}
      {renewalTab === 'FAILED' && (
        <div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Plan & Amount</th>
                  <th>Failure Reason</th>
                  <th>Attempt</th>
                  <th>Next Retry</th>
                  <th>Grace Period End</th>
                  <th>Payment Method</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {failedRenewals.map((sub) => (
                  <tr key={sub.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{sub.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sub.phone}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>₹{sub.amount}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sub.planName}</div>
                    </td>
                    <td>
                      <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
                        {sub.failureReason || 'Insufficient Funds'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: '#dc2626' }}>
                      Attempt {sub.retryCount || 1} of 3
                    </td>
                    <td style={{ fontSize: '0.8rem', fontWeight: 600 }}>{sub.nextRenewal}</td>
                    <td style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 600 }}>
                      {sub.gracePeriodEndDate || 'In 6 Days'}
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{sub.paymentMethod}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => alert(`Triggered Juspay manual retry for ${sub.id}`)}
                          style={{
                            background: '#0284c7',
                            color: '#ffffff',
                            border: 'none',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Retry Now
                        </button>
                        <button
                          onClick={() => setSelectedAdminSubDetail(sub)}
                          style={{
                            background: '#f1f5f9',
                            border: 'none',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#334155',
                            cursor: 'pointer'
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: UPCOMING RENEWALS */}
      {renewalTab === 'UPCOMING' && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Plan</th>
                <th>Renewal Date</th>
                <th>Amount</th>
                <th>Mandate Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dueRenewals.map((sub) => (
                <tr key={sub.id}>
                  <td style={{ fontWeight: 700 }}>{sub.customerName}</td>
                  <td>{sub.planName}</td>
                  <td style={{ fontWeight: 600, color: 'var(--aol-orange-dark)' }}>{sub.nextRenewal}</td>
                  <td style={{ fontWeight: 700 }}>₹{sub.amount}</td>
                  <td><span className="badge badge-active">{sub.autopayStatus}</span></td>
                  <td>
                    <button
                      onClick={() => alert(`Sending WhatsApp & Email T-1 Reminder to ${sub.customerName}`)}
                      style={{ background: '#f59e0b', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Send Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
