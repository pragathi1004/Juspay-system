import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PLAN_SPECS } from '../../data/planSpecs';
import { DailyYogaAuthModal } from './DailyYogaAuthModal';
import { Check, X, ChevronDown, Sparkles, Globe, Search, ArrowRight, ShieldCheck, User, Users, Calendar, Heart } from 'lucide-react';
import aolLogoSwans from '../../assets/aol_logo_swans.png';

export const PublicLandingPage = () => {
  const { regForm, setSelectedPlanForCheckout, setCustomerScreen, setUserFlow, selectedLanguage, setSelectedLanguage, setSurveyMode } = useApp();

  const [activeDropdown, setActiveDropdown] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialStep, setAuthModalInitialStep] = useState('PHONE');

  const handleSelectPlanForLead = (plan) => {
    setSelectedPlanForCheckout(plan);
    setUserFlow('NEW_LEAD');
    if (regForm?.phoneVerified) {
      setCustomerScreen('CRM_FORM');
    } else {
      setAuthModalInitialStep('PHONE');
      setIsAuthModalOpen(true);
    }
  };

  const handleAlreadySubscribed = () => {
    setUserFlow('EXISTING_MEMBER');
    setAuthModalInitialStep('PHONE');
    setIsAuthModalOpen(true);
  };

  const scrollToPlans = () => {
    const el = document.getElementById('membership-plans');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: '#FFF8E8', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* AUTH & REGISTRATION MODAL */}
      <DailyYogaAuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialStep={authModalInitialStep}
      />

      {/* 1. TOP GLOBAL NAVIGATION BAR (MATCHING SCREENSHOT 1 & 2) */}
      <nav style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
        {/* Top utility row */}
        <div style={{ background: '#f8fafc', padding: '6px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#475569' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <Globe size={12} /> India - English ▾
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="#search" style={{ color: '#475569', textDecoration: 'none' }}><Search size={14} /></a>
          </div>
        </div>

        {/* Main Logo & Navigation menu */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img 
            src={aolLogoSwans} 
            alt="The Art of Living" 
            style={{ height: '48px', width: 'auto', cursor: 'pointer' }} 
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>
            <a href="#home" style={{ color: '#334155', textDecoration: 'none' }}>Home</a>
            
            {/* YOGA DROPDOWN TRIGGER */}
            <div 
              style={{ position: 'relative', cursor: 'pointer', padding: '8px 0', color: '#ea580c', borderBottom: '2px solid #ea580c' }}
              onMouseEnter={() => setActiveDropdown(true)}
              onMouseLeave={() => setActiveDropdown(false)}
            >
              Yoga ▾
              {activeDropdown && (
                <div style={{ position: 'absolute', top: '100%', left: 0, width: '260px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '12px 0', zIndex: 100 }}>
                  <div style={{ padding: '8px 16px', fontSize: '0.8rem', color: '#78350f', fontWeight: 700, textTransform: 'uppercase' }}>Beginner Programs</div>
                  <div style={{ padding: '10px 16px', background: '#fef3c7', color: '#ea580c', fontWeight: 700, fontSize: '0.85rem' }}>
                    ✦ Daily Online Yoga Subscription
                  </div>
                  <div style={{ padding: '8px 16px', fontSize: '0.85rem', color: '#451a03' }}>Sri Sri Yoga Classes</div>
                  <div style={{ padding: '8px 16px', fontSize: '0.85rem', color: '#451a03' }}>Happiness Program</div>
                </div>
              )}
            </div>

            <a href="#meditation" style={{ color: '#334155', textDecoration: 'none' }}>Meditation</a>
            <a href="#wisdom" style={{ color: '#334155', textDecoration: 'none' }}>Wisdom</a>
            <a href="#events" style={{ color: '#334155', textDecoration: 'none' }}>Events</a>

            {/* Subscriber Login Link */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '6px 14px',
                borderRadius: '9999px',
                color: '#1e293b',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <User size={14} color="#ea580c" /> Login / OTP
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section style={{ background: '#eaf7ee', padding: '60px 40px', borderBottom: '1px solid #d1fae5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'center', gap: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2.85rem', fontWeight: 900, color: '#14532d', lineHeight: 1.15, marginBottom: '20px' }}>
              Transform Your Life with<br />Daily Sri Sri Yoga
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#166534', marginBottom: '36px', lineHeight: 1.5 }}>
              Join the world's largest yoga community and experience authentic wellness
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('membership-plans');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  padding: '16px 36px',
                  borderRadius: '9999px',
                  background: '#f97316',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
                  transition: 'transform 0.15s ease'
                }}
              >
                Try for Free →
              </button>

              <button
                type="button"
                onClick={handleAlreadySubscribed}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#15803d',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                I've Already Subscribed!
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=700" 
              alt="Sri Sri Yoga Sunset Silhouette" 
              style={{ width: '100%', maxWidth: '480px', borderRadius: '24px', boxShadow: '0 12px 30px rgba(0,0,0,0.12)', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* 3. MEMBERSHIP PLANS COMPARISON SECTION */}
      <section id="membership-plans" style={{ padding: '80px 40px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>
            Membership Plans
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 500, margin: 0 }}>
            Choose the plan that fits your practice. Cancel anytime before trial ends.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          
          {/* 12 MONTHS PLAN CARD (MOST POPULAR) */}
          <div style={{ border: '2px solid #86efac', borderRadius: '24px', background: '#f0fdf4', padding: '32px 28px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 25px rgba(22, 101, 52, 0.08)' }}>
            <div style={{ position: 'absolute', top: '-16px', left: '24px', background: '#000000', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, padding: '4px 14px', borderRadius: '9999px' }}>
              Most Popular
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: '#f97316', color: '#ffffff', display: 'inline-block', padding: '6px 20px', borderRadius: '9999px', fontWeight: 800, fontSize: '1.25rem' }}>
                  12 Months
                </div>
                <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.85rem', fontWeight: 700, padding: '6px 14px', borderRadius: '9999px', border: '1px solid #86efac' }}>
                  14-Day Trial: FREE
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#14532d' }}>₹4,999</span>
                <span style={{ fontSize: '1.1rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹14,999</span>
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px' }}>67% off</span>
              </div>

              {/* FEATURES CHECKLIST */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', fontSize: '0.9rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Unlimited Live Yoga Classes</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Monthly Sunday Masterclass</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Bonus E-Books</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> 3 Mini Programs</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Progress Tracking</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Community Support</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> 1 Month Access to AOL App</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Start free for 14 days. Then ₹4,999/year. Cancel anytime.</div>
              </div>
            </div>

            {/* GET STARTED BUTTON — opens login/OTP modal */}
            <div>
              <button
                type="button"
                onClick={() => handleSelectPlanForLead(PLAN_SPECS.find(p => p.code === 'YOGA_12M'))}
                style={{ width: '100%', padding: '14px', borderRadius: '9999px', background: '#16a34a', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '1rem' }}
              >
                Get started now
              </button>
            </div>

          </div>

          {/* 6 MONTHS PLAN CARD */}
          <div style={{ border: '1px solid #fed7aa', borderRadius: '24px', background: '#fffaf0', padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: '#f97316', color: '#ffffff', display: 'inline-block', padding: '6px 20px', borderRadius: '9999px', fontWeight: 800, fontSize: '1.25rem' }}>
                  6 Months
                </div>
                <span style={{ background: '#ffedd5', color: '#c2410c', fontSize: '0.85rem', fontWeight: 700, padding: '6px 14px', borderRadius: '9999px', border: '1px solid #fed7aa' }}>
                  14-Day Trial: FREE
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1e293b' }}>₹3,999</span>
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px' }}>50% off</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', fontSize: '0.9rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Unlimited Live Yoga Classes</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Monthly Sunday Masterclass</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Bonus E-Books</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> 3 Mini Programs</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Progress Tracking</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Community Support</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={18} color="#ef4444" /> 1 Month Access to AOL App</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Start free for 14 days. Then ₹3,999/6 months. Cancel anytime.</div>
              </div>
            </div>

            {/* CHOOSE PLAN BUTTON — opens login/OTP modal */}
            <div>
              <button
                type="button"
                onClick={() => handleSelectPlanForLead(PLAN_SPECS.find(p => p.code === 'YOGA_6M'))}
                style={{ width: '100%', padding: '14px', borderRadius: '9999px', background: '#ffffff', color: '#ea580c', fontWeight: 700, border: '1px solid #fed7aa', cursor: 'pointer', fontSize: '1rem' }}
              >
                Choose this plan
              </button>
            </div>

          </div>

          {/* 3 MONTHS PLAN CARD */}
          <div style={{ border: '1px solid #fed7aa', borderRadius: '24px', background: '#fffaf0', padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: '#f97316', color: '#ffffff', display: 'inline-block', padding: '6px 20px', borderRadius: '9999px', fontWeight: 800, fontSize: '1.25rem' }}>
                  3 Months
                </div>
                <span style={{ background: '#ffedd5', color: '#c2410c', fontSize: '0.85rem', fontWeight: 700, padding: '6px 14px', borderRadius: '9999px', border: '1px solid #fed7aa' }}>
                  14-Day Trial: FREE
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1e293b' }}>₹2,999</span>
                <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹7,999</span>
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px' }}>0% off</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', fontSize: '0.9rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Unlimited Live Yoga Classes</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Monthly Sunday Masterclass</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Bonus E-Books</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={18} color="#ef4444" /> 3 Mini Programs</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Progress Tracking</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={18} color="#ef4444" /> Community Support</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={18} color="#ef4444" /> 1 Month Access to AOL App</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Start free for 14 days. Then ₹2,999/3 months. Cancel anytime.</div>
              </div>
            </div>

            {/* CHOOSE PLAN BUTTON — opens login/OTP modal */}
            <div>
              <button
                type="button"
                onClick={() => handleSelectPlanForLead(PLAN_SPECS.find(p => p.code === 'YOGA_3M'))}
                style={{ width: '100%', padding: '14px', borderRadius: '9999px', background: '#ffffff', color: '#ea580c', fontWeight: 700, border: '1px solid #fed7aa', cursor: 'pointer', fontSize: '1rem' }}
              >
                Choose this plan
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. OUR MEMBERS STORIES SECTION (MATCHING SCREENSHOT 2) */}
      <section style={{ padding: '60px 40px 80px 40px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>
              Our Members Stories
            </h2>
            <p style={{ color: '#ea580c', fontSize: '1.05rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              ❤️ Real people. Real transformation through Yoga.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
            
            {/* Quote 1 */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '28px 24px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <span style={{ color: '#f97316', fontSize: '3.5rem', fontFamily: 'Georgia, serif', lineHeight: 1, position: 'absolute', top: '4px', left: '16px', userSelect: 'none', opacity: 0.2 }}>“</span>
              <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px', zIndex: 1, position: 'relative' }}>
                Yoga has improved my posture and flexibility. My back pain is gone and I feel light and energetic every day.
              </div>
              <div>
                <div style={{ width: '32px', height: '2px', background: '#fed7aa', marginBottom: '12px' }} />
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>Jamuna Sharma</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>Homemaker</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Pune</div>
              </div>
            </div>

            {/* Quote 2 */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '28px 24px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <span style={{ color: '#f97316', fontSize: '3.5rem', fontFamily: 'Georgia, serif', lineHeight: 1, position: 'absolute', top: '4px', left: '16px', userSelect: 'none', opacity: 0.2 }}>“</span>
              <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px', zIndex: 1, position: 'relative' }}>
                After yoga, my energy levels are up and I can manage my work and home much more peacefully.
              </div>
              <div>
                <div style={{ width: '32px', height: '2px', background: '#fed7aa', marginBottom: '12px' }} />
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>Manoj Verma</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>Business Owner</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Delhi</div>
              </div>
            </div>

            {/* Quote 3 */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '28px 24px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <span style={{ color: '#f97316', fontSize: '3.5rem', fontFamily: 'Georgia, serif', lineHeight: 1, position: 'absolute', top: '4px', left: '16px', userSelect: 'none', opacity: 0.2 }}>“</span>
              <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px', zIndex: 1, position: 'relative' }}>
                I sleep better, feel calmer and my mind is more focused since I started daily yoga practice.
              </div>
              <div>
                <div style={{ width: '32px', height: '2px', background: '#fed7aa', marginBottom: '12px' }} />
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>Minakshi Iyer</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>Working Professional</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Bengaluru</div>
              </div>
            </div>

            {/* Quote 4 */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '28px 24px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <span style={{ color: '#f97316', fontSize: '3.5rem', fontFamily: 'Georgia, serif', lineHeight: 1, position: 'absolute', top: '4px', left: '16px', userSelect: 'none', opacity: 0.2 }}>“</span>
              <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px', zIndex: 1, position: 'relative' }}>
                Yoga helped me manage my weight and stay active even with a busy lifestyle.
              </div>
              <div>
                <div style={{ width: '32px', height: '2px', background: '#fed7aa', marginBottom: '12px' }} />
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>Seema Patil</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>Teacher</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Mumbai</div>
              </div>
            </div>

            {/* Quote 5 */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '28px 24px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <span style={{ color: '#f97316', fontSize: '3.5rem', fontFamily: 'Georgia, serif', lineHeight: 1, position: 'absolute', top: '4px', left: '16px', userSelect: 'none', opacity: 0.2 }}>“</span>
              <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px', zIndex: 1, position: 'relative' }}>
                My flexibility and stamina have improved so much. I'm able to play with my kids without getting tired.
              </div>
              <div>
                <div style={{ width: '32px', height: '2px', background: '#fed7aa', marginBottom: '12px' }} />
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>Anil Kumar</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>IT Professional</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Hyderabad</div>
              </div>
            </div>

            {/* Quote 6 */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '28px 24px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <span style={{ color: '#f97316', fontSize: '3.5rem', fontFamily: 'Georgia, serif', lineHeight: 1, position: 'absolute', top: '4px', left: '16px', userSelect: 'none', opacity: 0.2 }}>“</span>
              <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px', zIndex: 1, position: 'relative' }}>
                Yoga brings me inner peace and helps me handle stress and challenges with a positive mindset.
              </div>
              <div>
                <div style={{ width: '32px', height: '2px', background: '#fed7aa', marginBottom: '12px' }} />
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>Rashmi Nair</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>Bank Employee</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Kochi</div>
              </div>
            </div>

            {/* Quote 7 */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '28px 24px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <span style={{ color: '#f97316', fontSize: '3.5rem', fontFamily: 'Georgia, serif', lineHeight: 1, position: 'absolute', top: '4px', left: '16px', userSelect: 'none', opacity: 0.2 }}>“</span>
              <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px', zIndex: 1, position: 'relative' }}>
                I feel stronger, healthier and more confident. Yoga is now a part of my daily life.
              </div>
              <div>
                <div style={{ width: '32px', height: '2px', background: '#fed7aa', marginBottom: '12px' }} />
                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>Suresh Rao</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>Retired Government Officer</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Chennai</div>
              </div>
            </div>

            {/* Quote 8 - Special CTA */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid #ffedd5' }}>
                <span style={{ fontSize: '1.4rem' }}>🧘</span>
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                Join thousands of members transforming their lives with Yoga every day.
              </p>
              <span style={{ fontSize: '1.25rem', color: '#ef4444' }}>❤️</span>
            </div>

          </div>

          {/* Footer Trust Banner (Grid of 4 items) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#eff6ff', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={20} color="#3b82f6" />
              </div>
              <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 600 }}>Trusted by 50,000+ members</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#fef2f2', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={20} color="#ef4444" />
              </div>
              <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 600 }}>Daily live classes with expert teachers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#f0fdf4', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={20} color="#22c55e" />
              </div>
              <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 600 }}>Transform your mind, body & lifestyle</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#fff7ed', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={20} color="#f97316" />
              </div>
              <span style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 600 }}>Be part of a conscious and supportive community</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
