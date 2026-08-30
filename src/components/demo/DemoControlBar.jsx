import React from 'react';
import { useApp } from '../../context/AppContext';
import { Layout, User, ShieldCheck, RotateCcw, Sparkles, Sliders } from 'lucide-react';

export const DemoControlBar = () => {
  const {
    appVersion,
    setAppVersion,
    activeApp,
    setActiveApp,
    customerScreen,
    setCustomerScreen,
    adminTab,
    setAdminTab,
    setSimulatedState,
    setIsPaymentHistoryOpen
  } = useApp();

  return (
    <div className="demo-bar" style={{ background: '#0f172a', borderBottom: '2px solid #334155', padding: '8px 24px', color: '#ffffff' }}>
      <div className="demo-bar-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.85rem', color: '#fbbf24' }}>
        <Sparkles size={16} color="#fbbf24" />
        <span>PM REVIEW PROTOTYPE: SRI SRI YOGA + JUSPAY RECURRING PAYMENTS</span>
      </div>

      <div className="demo-bar-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Version Toggle */}
        <div className="demo-toggle-group" style={{ display: 'flex', gap: '4px', background: '#1e293b', padding: '3px', borderRadius: '8px', border: '1px solid #475569' }}>
          <button
            onClick={() => { setAppVersion('v1'); setCustomerScreen('CRM_FORM'); }}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: appVersion === 'v1' ? '#fbbf24' : 'transparent',
              color: appVersion === 'v1' ? '#0f172a' : '#cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Version 1
          </button>
          <button
            onClick={() => { setAppVersion('v2'); setCustomerScreen('CRM_FORM'); }}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: appVersion === 'v2' ? '#fbbf24' : 'transparent',
              color: appVersion === 'v2' ? '#0f172a' : '#cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Version 2
          </button>
        </div>

        {/* Toggle App View */}
        <div className="demo-toggle-group" style={{ display: 'flex', gap: '4px', background: '#1e293b', padding: '3px', borderRadius: '8px' }}>
          <button
            className={`demo-toggle-btn ${activeApp === 'CUSTOMER' ? 'active' : ''}`}
            onClick={() => setActiveApp('CUSTOMER')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeApp === 'CUSTOMER' ? '#ea580c' : 'transparent',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <User size={14} /> Customer Experience
          </button>
          <button
            className={`demo-toggle-btn ${activeApp === 'ADMIN' ? 'active' : ''}`}
            onClick={() => setActiveApp('ADMIN')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeApp === 'ADMIN' ? '#2563eb' : 'transparent',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShieldCheck size={14} /> Admin Operations Console
          </button>
        </div>

        {/* Customer Lifecycle Jump Selector */}
        {activeApp === 'CUSTOMER' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={14} color="#94a3b8" />
            <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600 }}>
              Jump to State:
            </span>
            <select
              style={{
                background: '#1e293b',
                color: '#ffffff',
                border: '1px solid #475569',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'PAYMENT_HISTORY') {
                  setCustomerScreen('DASHBOARD');
                  setIsPaymentHistoryOpen(true);
                } else {
                  setSimulatedState(val);
                }
              }}
            >
              <option value="PUBLIC_LANDING">0. Public Landing Page (AoL Main)</option>
              <option value="CHALLENGE">0.1 14-Day Free Yoga Challenge (challenge.srisriyoga.in)</option>
              <option value="CRM_FORM">1. Registration & Consent (₹1,499)</option>
              <option value="JUSPAY">2. Juspay Payment Gateway (Mock)</option>
              <option value="PREPARATION">3. Payment Success & Dashboard Prep</option>
              <option value="ACTIVE">5. Dashboard — Active Auto-Renewal (🟢 Active)</option>
              <option value="PAYMENT_HISTORY">6. Payment History Modal</option>
              <option value="AUTOPAY_OFF">8 & 9. Auto-Renewal Turned Off (🔴 Off)</option>
              <option value="RENEWAL_DUE">10. Renewal Reminder (1 Day Before)</option>
              <option value="RENEWAL_SUCCESS">11. Renewal Success (Auto-Charged)</option>
              <option value="RENEWAL_FAILED_1">12. Renewal Failure (Attempt 1 of 3)</option>
              <option value="EXPIRED">13. Expired Subscription</option>
            </select>
          </div>
        )}

        {/* Admin Tab Switcher Quick Pick */}
        {activeApp === 'ADMIN' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600 }}>
              Admin View:
            </span>
            <select
              style={{
                background: '#1e293b',
                color: '#ffffff',
                border: '1px solid #475569',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              value={adminTab}
              onChange={(e) => setAdminTab(e.target.value)}
            >
              <option value="DASHBOARD">Dashboard Overview (KPIs & Growth Charts)</option>
              <option value="SUBSCRIPTIONS">Subscriptions Management (Filters & Table)</option>
              <option value="RENEWALS">Renewals & Failure Console</option>
              <option value="PLANS">CRM Courses & Juspay Mapping</option>
              <option value="PAYMENTS">Payments & Mandates History</option>
              <option value="COMMUNICATIONS">Communications Log (WhatsApp / Email)</option>
              <option value="EVENTS">Juspay Webhook Events Log</option>
            </select>
          </div>
        )}

        {/* Reset Demo Button */}
        <button
          type="button"
          style={{ background: '#334155', color: '#f8fafc', padding: '6px 12px', borderRadius: '6px', border: 'none', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          onClick={() => {
            setCustomerScreen('PUBLIC_LANDING');
            setActiveApp('CUSTOMER');
          }}
          title="Reset to public landing page"
        >
          <RotateCcw size={13} />
          Reset Flow
        </button>
      </div>
    </div>
  );
};

