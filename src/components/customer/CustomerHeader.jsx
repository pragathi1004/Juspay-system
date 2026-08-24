import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, Search, UserCheck, ShieldCheck } from 'lucide-react';

export const CustomerHeader = () => {
  const { customerScreen, setCustomerScreen, customer } = useApp();

  return (
    <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', sticky: 'top' }}>
      {/* Top Utility Bar */}
      <div
        style={{
          borderBottom: '1px solid #f1f5f9',
          padding: '6px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.825rem',
          color: '#64748b'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <span>India - English</span>
          <ChevronDown size={14} />
        </div>
        
        {/* Center Art of Living Logo */}
        <div style={{ textAlign: 'center', margin: '4px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="42" height="30" viewBox="0 0 100 60" fill="none">
              <path d="M50 5 C30 5 15 25 15 45 L85 45 C85 25 70 5 50 5 Z" fill="#e99d4e" opacity="0.3"/>
              <circle cx="50" cy="30" r="16" fill="#e99d4e" />
              <path d="M20 40 Q35 20 50 40 Q65 20 80 40" stroke="#d88b3c" strokeWidth="3" fill="none"/>
            </svg>
            <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', fontSize: '0.95rem', color: '#2d3748' }}>
              The Art of Living
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Search size={16} style={{ cursor: 'pointer' }} />
          {customerScreen !== 'LANDING' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#f8fafc',
                padding: '4px 10px',
                borderRadius: '20px',
                border: '1px solid #cbd5e1'
              }}
            >
              <img
                src={customer.avatar}
                alt={customer.name}
                style={{ width: '22px', height: '22px', borderRadius: '50%' }}
              />
              <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.8rem' }}>{customer.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        style={{
          padding: '12px 40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '28px',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#334155',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <span
          style={{ cursor: 'pointer', color: customerScreen === 'LANDING' ? 'var(--aol-orange)' : 'inherit' }}
          onClick={() => setCustomerScreen('LANDING')}
        >
          Home
        </span>
        <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          Find a solution for... <ChevronDown size={14} />
        </span>
        <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          Meditation <ChevronDown size={14} />
        </span>
        <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--aol-orange)' }}>
          Yoga <ChevronDown size={14} />
        </span>
        <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          Wisdom <ChevronDown size={14} />
        </span>
        <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          Events <ChevronDown size={14} />
        </span>
        <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          Social Impact <ChevronDown size={14} />
        </span>
        <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          About Us <ChevronDown size={14} />
        </span>

        {customerScreen !== 'LANDING' && (
          <button
            onClick={() => setCustomerScreen('DASHBOARD')}
            style={{
              marginLeft: 'auto',
              background: '#fcf9f2',
              color: 'var(--aol-orange-dark)',
              border: '1px solid var(--aol-orange)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <UserCheck size={14} />
            My Yoga Dashboard
          </button>
        )}
      </div>
    </header>
  );
};
