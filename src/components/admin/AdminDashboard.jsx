import React from 'react';
import { useApp } from '../../context/AppContext';
import { ADMIN_METRICS } from '../../data/initialData';
import { Users, CheckCircle2, AlertTriangle, XCircle, TrendingUp, DollarSign, RefreshCcw, Bell } from 'lucide-react';

export const AdminDashboard = () => {
  const { setAdminTab } = useApp();

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Executive Operational Dashboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Real-time metrics for Sri Sri Yoga AutoPay Subscriptions & Juspay Recurring Payment Mandates.
        </p>
      </div>

      {/* KPI CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {/* Card 1: Total Subscribers */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Total Subscribers</span>
            <div style={{ background: '#e0f2fe', padding: '6px', borderRadius: '8px', color: '#0284c7' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{ADMIN_METRICS.totalSubscribers.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>↑ +12.4% vs last month</div>
        </div>

        {/* Card 2: Active Subscriptions */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Active Subscriptions</span>
            <div style={{ background: '#ecfdf5', padding: '6px', borderRadius: '8px', color: '#10b981' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{ADMIN_METRICS.activeSubscriptions.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Autopay Active Mandates</div>
        </div>

        {/* Card 3: Renewal Success Rate */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Renewal Success Rate</span>
            <div style={{ background: '#fef3c7', padding: '6px', borderRadius: '8px', color: '#d97706' }}>
              <RefreshCcw size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{ADMIN_METRICS.renewalSuccessRate}</div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>Target &gt; 92.0% Achieved</div>
        </div>

        {/* Card 4: Monthly Revenue */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Revenue Collected</span>
            <div style={{ background: '#f0fdf4', padding: '6px', borderRadius: '8px', color: '#16a34a' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{ADMIN_METRICS.totalRevenueMonthly}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Via Juspay Gateway</div>
        </div>
      </div>

      {/* SECONDARY METRICS STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#873800', fontWeight: 700 }}>Renewals Due (Next 7 Days)</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#d48806' }}>{ADMIN_METRICS.renewalsDueNext7Days}</div>
          </div>
        </div>

        <div style={{ background: '#fff1f0', border: '1px solid #ffa39e', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#820014', fontWeight: 700 }}>Failed Renewals in Grace</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#cf1322' }}>{ADMIN_METRICS.failedRenewalsInGrace}</div>
          </div>
          <button
            onClick={() => setAdminTab('RENEWALS')}
            style={{ background: '#ff4d4f', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Review
          </button>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Cancelled This Month</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#475569' }}>{ADMIN_METRICS.cancelledThisMonth}</div>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Expired This Month</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#475569' }}>{ADMIN_METRICS.expiredThisMonth}</div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Chart 1: Plan Distribution */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px', color: '#0f172a' }}>
            Plan Distribution (Subscribers by Tier)
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '20px' }}>
            12-Month plan represents 52% of total active subscriber base
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                <span>12 Months Plan (₹4,999 / year)</span>
                <strong style={{ color: 'var(--aol-orange-dark)' }}>52% (742 subs)</strong>
              </div>
              <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '6px' }}>
                <div style={{ width: '52%', height: '100%', background: 'var(--aol-orange)', borderRadius: '6px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                <span>6 Months Plan (₹3,999 / 6mo)</span>
                <strong style={{ color: '#0284c7' }}>31% (442 subs)</strong>
              </div>
              <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '6px' }}>
                <div style={{ width: '31%', height: '100%', background: '#38bdf8', borderRadius: '6px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                <span>3 Months Plan (₹1,499 / 3mo)</span>
                <strong style={{ color: '#64748b' }}>17% (244 subs)</strong>
              </div>
              <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '6px' }}>
                <div style={{ width: '17%', height: '100%', background: '#94a3b8', borderRadius: '6px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Renewal Success vs Failure Trend */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px', color: '#0f172a' }}>
            Auto-Renewal Performance
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px' }}>
            Monthly auto-debit success rate for Juspay mandates
          </p>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '3px' }} /> Past Months
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', background: 'var(--aol-orange)', borderRadius: '3px' }} /> Current Month
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', padding: '0 20px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '110px', width: '36px', background: '#10b981', borderRadius: '6px 6px 0 0', margin: '0 auto' }} />
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>May (93%)</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '120px', width: '36px', background: '#10b981', borderRadius: '6px 6px 0 0', margin: '0 auto' }} />
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Jun (95%)</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '105px', width: '36px', background: '#10b981', borderRadius: '6px 6px 0 0', margin: '0 auto' }} />
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Jul (92%)</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: '118px', width: '36px', background: 'var(--aol-orange)', borderRadius: '6px 6px 0 0', margin: '0 auto' }} />
              <span style={{ fontSize: '0.75rem', color: '#0f172a', fontWeight: 700 }}>Aug (94%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* OPERATIONAL ALERTS TABLE */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="#f59e0b" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
              Operational Attention Alerts (Action Required)
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: '#fff1f0', border: '1px solid #ffa39e', padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#820014' }}>
              <strong>Failed Renewal Retry Pending:</strong> Vikram Sengupta (SUB_661902) — Insufficient funds on Attempt 1. Grace period ends in 6 days.
            </div>
            <button onClick={() => setAdminTab('RENEWALS')} style={{ background: '#ff4d4f', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
              Trigger Retry
            </button>
          </div>

          <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#873800' }}>
              <strong>Upcoming Renewal T-1 Notification:</strong> Ananya Iyer (SUB_771239) — Auto-debit scheduled for tomorrow (₹3,999). WhatsApp reminder sent.
            </div>
            <button onClick={() => setAdminTab('COMMUNICATIONS')} style={{ background: '#d48806', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
              View Touchpoint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
