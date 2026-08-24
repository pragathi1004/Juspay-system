import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PlayCircle, Play, ChevronRight, Award, Lock, Target, History, BookOpen, MessageCircle, Calendar, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';

export const LandingPage = () => {
  const { customer, setCustomerScreen, setIsRegisterModalOpen } = useApp();
  const sub = customer.subscription;

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

  const handleUpgradeClick = () => {
    setCustomerScreen('MANAGE_SUB');
  };

  return (
    <div style={{ background: '#FFF8E8', minHeight: '100vh', paddingBottom: '60px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* STICKY HEADER */}
      <header style={{ position: 'sticky', top: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #fef3c7', zIndex: 40, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="https://srisrischoolofyoga.org/in/app/uploads-yoga/2024/06/SSSYLogo_Orange.png" 
              alt="Sri Sri School of Yoga" 
              style={{ height: '48px', width: 'auto' }} 
            />
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827' }}>
              Hello, {customer.name}
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

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

          {/* Watch on YouTube button */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <a
              href="https://www.youtube.com/watch?v=x1dl_JqKeoY"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '9999px',
                background: '#dc2626',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(220,38,38,0.3)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Watch on YouTube
            </a>
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

          {/* RIGHT: MEMBERSHIP DETAILS (EXACTLY MATCHING SCREENSHOT 1) */}
          <div style={{ borderRadius: '20px', border: '2px solid #fef08a', background: '#ffffff', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>Membership Details</h3>
                <span className="badge badge-active" style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '4px 12px', fontSize: '0.75rem' }}>Active</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#6b7280' }}>Expiry Date</span>
                  <strong style={{ color: '#111827', fontWeight: 700 }}>13 October 2026</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#6b7280' }}>Lifetime Yoga Days</span>
                  <strong style={{ color: '#111827', fontWeight: 700 }}>12 Days</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#6b7280' }}>Total Remaining Days</span>
                  <strong style={{ color: '#111827', fontWeight: 700 }}>57 Days</strong>
                </div>
              </div>
            </div>

            {/* UPGRADE / RENEW BUTTON (ORANGE BUTTON MATCHING SCREENSHOT 1) */}
            <div>
              <button
                type="button"
                onClick={handleUpgradeClick}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  background: '#f97316',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
                  transition: 'transform 0.15s, background 0.15s'
                }}
              >
                Upgrade / Renew
              </button>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center', marginTop: '10px' }}>
                Your plan will be updated within 24 hours of your renewal or upgrade.
              </p>
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
    </div>
  );
};
