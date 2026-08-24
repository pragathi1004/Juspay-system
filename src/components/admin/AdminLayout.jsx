import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  RefreshCw,
  BookOpen,
  CreditCard,
  MessageSquare,
  Webhook,
  Settings,
  Search,
  Bell,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const { adminTab, setAdminTab } = useApp();

  const navItems = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'SUBSCRIPTIONS', label: 'Subscriptions', icon: Users },
    { id: 'RENEWALS', label: 'Renewals & Failed Retries', icon: RefreshCw },
    { id: 'PLANS', label: 'Courses', icon: BookOpen },
    { id: 'PAYMENTS', label: 'Payments & Mandates', icon: CreditCard },
    { id: 'COMMUNICATIONS', label: 'Communications Center', icon: MessageSquare },
    { id: 'EVENTS', label: 'Juspay Webhook Logs', icon: Webhook },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--admin-main-bg)' }}>
      {/* LEFT NAVIGATION SIDEBAR */}
      <aside
        style={{
          width: '260px',
          background: 'var(--admin-sidebar-bg)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid #1e293b',
          flexShrink: 0
        }}
      >
        <div>
          {/* Brand Header */}
          <div style={{ padding: '24px 20px', borderBottom: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'var(--aol-orange)', padding: '6px', borderRadius: '8px' }}>
                <ShieldCheck size={20} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.5px' }}>Art of Living</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>AutoPay Admin Console</div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, padding: '8px 12px', textTransform: 'uppercase' }}>
              Operations Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isActive ? 'var(--aol-orange)' : 'transparent',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin User Badge */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #1e293b', background: '#020617' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
              OP
            </div>
            <div>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#f8fafc' }}>AoL Operations Lead</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>juspay.admin@artofliving.org</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        {/* Top Header */}
        <header
          style={{
            background: '#ffffff',
            borderBottom: '1px solid var(--admin-border)',
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ position: 'relative', width: '360px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
            <input
              type="text"
              placeholder="Search Subscriber, Phone, Mandate ID, Order ID..."
              style={{
                width: '100%',
                padding: '8px 14px 8px 38px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="badge badge-active" style={{ fontSize: '0.7rem' }}>
              Juspay Webhook Connected (Live)
            </span>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={20} color="#64748b" />
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', color: '#ffffff', fontSize: '0.6rem', fontWeight: 700, borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                3
              </span>
            </div>
          </div>
        </header>

        {/* View Body */}
        <div style={{ padding: '32px', flex: 1 }}>{children}</div>
      </main>
    </div>
  );
};
