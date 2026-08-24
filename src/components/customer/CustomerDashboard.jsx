import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PlayCircle, Play, ChevronRight, Award, Lock, Target, BookOpen, MessageCircle, ShieldCheck, RefreshCw, Calendar, CheckCircle, FileText, AlertTriangle, AlertCircle, RefreshCcw, User } from 'lucide-react';
import { PaymentHistoryModal } from './PaymentHistoryModal';
import aolLogoSwans from '../../assets/aol_logo_swans.png';

export const CustomerDashboard = () => {
  const { customer, setCustomerScreen, setIsPaymentHistoryOpen, isPaymentHistoryOpen, handleTurnOnAutoRenewalSubmit, setSimulatedState } = useApp();
  const sub = customer.subscription;
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 9, minutes: 24, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2Digits = (num) => String(num).padStart(2, '0');

  const isAutoPayActive = sub.autopayStatus === 'ACTIVE';
  const amountDisplay = sub.amount ? sub.amount.toLocaleString('en-IN') : '1,499';

  return (
    <div style={{ background: '#FFF8E8', minHeight: '100vh', paddingBottom: '60px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* STICKY HEADER MATCHING SRI SRI YOGA BRANDING */}
      <header style={{ position: 'sticky', top: 0, background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #fef3c7', zIndex: 40, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={aolLogoSwans} 
              alt="Sri Sri School of Yoga" 
              style={{ height: '46px', width: 'auto' }} 
            />
          </div>

          {/* RIGHT USER PROFILE DROPDOWN */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '20px', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, color: '#92400e', fontSize: '0.875rem' }}
            >
              <User size={16} /> Hello, {customer.name}
              <ChevronRight size={14} style={{ transform: profileDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.2s' }} />
            </button>

            {profileDropdownOpen && (
              <div style={{ position: 'absolute', right: 0, top: '42px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '220px', overflow: 'hidden', zIndex: 50 }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', background: '#fafaf9' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>{customer.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{customer.email}</div>
                </div>
                <button
                  onClick={() => { setProfileDropdownOpen(false); setCustomerScreen('MANAGE_HUB'); }}
                  style={{ width: '100%', padding: '10px 16px', border: 'none', background: 'none', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  ⚙️ Manage Subscription
                </button>
                <button
                  onClick={() => { setProfileDropdownOpen(false); setIsPaymentHistoryOpen(true); }}
                  style={{ width: '100%', padding: '10px 16px', border: 'none', background: 'none', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  🧾 View Payment History
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ============================================================ */}
        {/* SCREEN 10: RENEWAL REMINDER BANNER (1 DAY BEFORE RENEWAL)   */}
        {/* ============================================================ */}
        {sub.status === 'RENEWAL_DUE' && (
          <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '16px', padding: '20px 24px', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f59e0b', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <RefreshCw size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#78350f' }}>
                    🔔 Your Sri Sri Yoga subscription renews tomorrow!
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#92400e', marginTop: '2px' }}>
                    Your subscription will automatically renew at <strong>₹{amountDisplay}</strong> on <strong>14 Jan 2027</strong> using your registered payment method ({sub.maskedPaymentDetail || 'UPI ••••1234'}).
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setCustomerScreen('MANAGE_HUB')}
                  style={{ background: '#ea580c', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Manage Subscription
                </button>
                <button
                  onClick={() => setCustomerScreen('MANAGE_HUB')}
                  style={{ background: '#ffffff', border: '1px solid #d97706', color: '#b45309', padding: '10px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Turn Off Future Renewal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 12: RENEWAL FAILED BANNER                            */}
        {/* ============================================================ */}
        {sub.status === 'RENEWAL_FAILED' && (
          <div style={{ background: '#fef2f2', border: '2px solid #ef4444', borderRadius: '16px', padding: '20px 24px', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ef4444', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#991b1b' }}>
                    ⚠️ We couldn't renew your subscription
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#7f1d1d', marginTop: '2px' }}>
                    Amount: ₹{amountDisplay} • Attempt 1 of 3 Failed ({sub.failureReason || 'Bank declined debit'})<br />
                    <span style={{ fontWeight: 700 }}>Grace Period Active: Your yoga class access continues until {sub.gracePeriodEndDate || '19 Jan 2027'}.</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setSimulatedState('RENEWAL_SUCCESS')}
                  style={{ background: '#dc2626', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Retry Payment Now
                </button>
                <button
                  onClick={() => setCustomerScreen('EDIT_PAYMENT_WIZARD')}
                  style={{ background: '#ffffff', border: '1px solid #dc2626', color: '#991b1b', padding: '10px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Update Payment Method
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN 13: EXPIRED SUBSCRIPTION BANNER                      */}
        {/* ============================================================ */}
        {sub.status === 'EXPIRED' && (
          <div style={{ background: '#f8fafc', border: '2px solid #94a3b8', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#64748b', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <AlertCircle size={28} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
              Your Yoga Subscription Has Expired
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>
              Previous Plan: 3 Months Sri Sri Yoga • Expired On: {sub.endDate || '13 Jan 2027'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setCustomerScreen('CRM_FORM')}
                style={{ background: '#f97316', color: '#ffffff', padding: '12px 28px', borderRadius: '24px', border: 'none', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}
              >
                Subscribe Again
              </button>
              <button
                onClick={() => setIsPaymentHistoryOpen(true)}
                style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', padding: '12px 20px', borderRadius: '24px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}
              >
                View Past Payment History
              </button>
            </div>
          </div>
        )}

        {/* 1. ORIENTATION BANNER */}
        <button
          type="button"
          onClick={() => alert('Opening Orientation Video')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            borderRadius: '16px',
            border: '2px solid #fed7aa',
            background: 'linear-gradient(to right, #fff7ed, #fffbe6)',
            padding: '14px 20px',
            cursor: 'pointer',
            textAlign: 'left',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              <PlayCircle size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>Orientation</div>
              <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>Watch this video to know more about your Yoga Journey</div>
            </div>
          </div>
          <ChevronRight size={20} color="#fb923c" />
        </button>

        {/* 2. LIVE SESSION TILE */}
        <div style={{ borderRadius: '20px', background: 'linear-gradient(to right, #f0fdf4, #f0fdfa)', border: '2px solid #99f6e4', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <p style={{ fontSize: '1rem', color: '#374151', fontWeight: 600, marginBottom: '6px' }}>
              Next Live Session begins at 5:00 AM IST
            </p>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ea580c', letterSpacing: '1px' }}>
              {format2Digits(timeLeft.hours)}:{format2Digits(timeLeft.minutes)}:{format2Digits(timeLeft.seconds)}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>Hours : Minutes : Seconds</p>
          </div>

          {/* YouTube Video Player Mock */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ width: '100%', maxWidth: '720px', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', position: 'relative', background: '#000', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
              <img 
                src="https://i.ytimg.com/vi/x1dl_JqKeoY/hqdefault.jpg" 
                alt="Sri Sri Yoga Live Session" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
              />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)', cursor: 'pointer' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(220,38,38,0.5)' }}>
                  <Play size={36} color="#fff" style={{ marginLeft: '4px' }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '12px' }}>All sessions are open to you, and you can join any class as per timings below.</p>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Session Timings (IST)</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', fontSize: '0.85rem', color: '#374151' }}>
              <div><span style={{ color: '#3b82f6', fontWeight: 700 }}>Morning:</span> 5am, 6am, 7am, 8am</div>
              <div><span style={{ color: '#d97706', fontWeight: 700 }}>Midday:</span> 11am, 12pm</div>
              <div><span style={{ color: '#8b5cf6', fontWeight: 700 }}>Evening:</span> 4pm, 5pm, 6pm, 7pm, 8pm</div>
            </div>
          </div>
        </div>

        {/* 3. TWO-COLUMN LAYOUT (Upcoming Sessions vs Membership Details) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          
          {/* LEFT: UPCOMING SESSIONS */}
          <div style={{ borderRadius: '20px', border: '2px solid #fef08a', background: '#ffffff', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>Upcoming Sessions</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '16px' }}>We have some upcoming exciting sessions for you.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', flexShrink: 0 }}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>Masterclass - Dental Health</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>30th Aug, 2026 • 5pm IST</div>
                </div>
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', flexShrink: 0 }}>
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>Weekly Q&A Session</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Every Sunday • 5pm IST</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: MEMBERSHIP DETAILS (PROMPT SPEC COMPLIANT CARD) */}
          <div style={{ borderRadius: '20px', border: '2px solid #fef08a', background: '#ffffff', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>Membership Details</h3>
                <span className="badge badge-active" style={{ background: sub.status === 'EXPIRED' ? '#64748b' : '#059669', color: '#ffffff', border: 'none', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {sub.status || 'Active'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#6b7280' }}>Plan</span>
                  <strong style={{ color: '#111827', fontWeight: 700 }}>{sub.planName || '3 Months Sri Sri Yoga'}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#6b7280' }}>Start Date</span>
                  <strong style={{ color: '#111827', fontWeight: 600 }}>{sub.startDate || '14 Oct 2026'}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#6b7280' }}>Expiry Date</span>
                  <strong style={{ color: '#111827', fontWeight: 700 }}>{sub.endDate || '13 Jan 2027'}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#6b7280' }}>Days Remaining</span>
                  <strong style={{ color: '#ea580c', fontWeight: 800 }}>{sub.daysRemaining !== undefined ? sub.daysRemaining : 55} Days</strong>
                </div>

                {/* NEXT RENEWAL DETAILS SECTION (REQUIRED BY PROMPT) */}
                <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '12px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#6b7280' }}>Next Renewal</span>
                    <strong style={{ color: isAutoPayActive ? '#1e293b' : '#64748b', fontWeight: 700 }}>
                      {isAutoPayActive ? (sub.nextRenewalDate || '14 Jan 2027') : 'Not scheduled'}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#6b7280' }}>Renewal Amount</span>
                    <strong style={{ color: isAutoPayActive ? '#ea580c' : '#64748b', fontWeight: 800 }}>
                      {isAutoPayActive ? `₹${amountDisplay}` : '₹0'}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280' }}>Auto-Renewal</span>
                    <strong style={{ color: isAutoPayActive ? '#059669' : '#dc2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {isAutoPayActive ? '🟢 Active' : '🔴 Off'}
                    </strong>
                  </div>
                </div>

              </div>
            </div>

            {/* BUTTON & PAYMENT HISTORY ENTRY POINT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {isAutoPayActive ? (
                <button
                  type="button"
                  onClick={() => setCustomerScreen('MANAGE_HUB')}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    background: '#f97316',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
                    transition: 'transform 0.15s, background 0.15s'
                  }}
                >
                  Manage Subscription
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleTurnOnAutoRenewalSubmit}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    background: '#059669',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)'
                  }}
                >
                  Turn Auto-Renewal On
                </button>
              )}

              {/* PAYMENT HISTORY SECONDARY LINK (PRIMARY PLACEMENT UNDER MEMBERSHIP DETAILS) */}
              <button
                type="button"
                onClick={() => setIsPaymentHistoryOpen(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0284c7',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                🧾 View Payment History →
              </button>
            </div>

          </div>
        </div>

        {/* 4. MILESTONE & REWARDS SECTION */}
        <div style={{ borderRadius: '20px', border: '2px solid #fde047', background: 'linear-gradient(to bottom, #fff4d6, #fff8e8)', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Award size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827' }}>Achieve Milestones & Unlock Rewards!</h3>
              <span style={{ fontSize: '0.75rem', background: '#d1fae5', color: '#047857', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>Unlocked</span>
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #fde68a', borderRadius: '16px', padding: '20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>🎉 7 Days Milestone Achieved!</h4>
              <p style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '12px' }}>Keep showing up! Here's what to aim for next.</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f0fdf4', border: '1px solid #99f6e4', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, color: '#0f766e' }}>
                <Target size={16} /> 12 days completed • 2 days to go for next milestone
              </div>
            </div>

            <div style={{ background: '#ccfbf1', border: '2px solid #99f6e4', borderRadius: '16px', padding: '16px 24px', textAlign: 'center', minWidth: '180px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0f766e', letterSpacing: '0.5px', marginBottom: '6px' }}>NEXT MILESTONE</div>
              <div style={{ width: '48px', height: '48px', margin: '0 auto 8px auto', borderRadius: '50%', background: '#14b8a6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Lock size={22} />
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>14 Days Milestone</div>
            </div>
          </div>
        </div>

      </main>

      {/* PAYMENT HISTORY MODAL */}
      <PaymentHistoryModal />

    </div>
  );
};

