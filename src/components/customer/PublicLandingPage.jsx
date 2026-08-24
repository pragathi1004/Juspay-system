import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PLAN_SPECS } from '../../data/planSpecs';
import { Check, X, ChevronDown, Sparkles, Globe, Search, ArrowRight, ShieldCheck } from 'lucide-react';

export const PublicLandingPage = () => {
  const { setSelectedPlanForCheckout, setCustomerScreen, setUserFlow, selectedLanguage, setSelectedLanguage } = useApp();

  const [activeDropdown, setActiveDropdown] = useState(false);
  const [openLangCard, setOpenLangCard] = useState(null); // plan code for open dropdown

  const handleSelectPlanForLead = (plan) => {
    setSelectedPlanForCheckout(plan);
    setUserFlow('NEW_LEAD');
    setCustomerScreen('CRM_FORM');
  };

  const handleAlreadySubscribed = () => {
    setUserFlow('EXISTING_MEMBER');
    setCustomerScreen('DASHBOARD');
  };

  const scrollToPlans = () => {
    const el = document.getElementById('membership-plans');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages = ['English / Hindi', 'Malayalam', 'Gujarati', 'Kannada'];

  return (
    <div style={{ background: '#FFF8E8', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
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
            src="https://srisrischoolofyoga.org/in/app/uploads-yoga/2024/06/SSSYLogo_Orange.png" 
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
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (MATCHING SCREENSHOT 2) */}
      <section style={{ background: 'linear-gradient(to right, #e6f4ea, #f0fdf4)', padding: '60px 40px', borderBottom: '1px solid #d1fae5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '40px' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#14532d', lineHeight: 1.15, marginBottom: '20px' }}>
              Transform Your Life with Daily Sri Sri Yoga
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#166534', marginBottom: '36px' }}>
              Join the world's largest yoga community and experience authentic wellness
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button
                type="button"
                onClick={scrollToPlans}
                style={{
                  padding: '16px 40px',
                  borderRadius: '9999px',
                  background: '#f97316',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)'
                }}
              >
                Sign me up!
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
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600" 
              alt="Trainers Mayur & Eesha" 
              style={{ width: '100%', maxWidth: '480px', borderRadius: '24px', boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
            />
          </div>
        </div>
      </section>

      {/* 3. MEMBERSHIP PLANS COMPARISON SECTION (MATCHING SCREENSHOT 3 & 4) */}
      <section id="membership-plans" style={{ padding: '80px 40px', maxWidth: '1240px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#1e293b', textAlign: 'center', marginBottom: '48px' }}>
          Membership Plans
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          
          {/* 12 MONTHS PLAN CARD (MOST POPULAR) */}
          <div style={{ border: '2px solid #86efac', borderRadius: '24px', background: '#f0fdf4', padding: '32px 28px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 25px rgba(22, 101, 52, 0.08)' }}>
            <div style={{ position: 'absolute', top: '-16px', left: '24px', background: '#000000', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, padding: '4px 14px', borderRadius: '9999px' }}>
              Most Popular
            </div>

            <div>
              <div style={{ background: '#f97316', color: '#ffffff', display: 'inline-block', padding: '6px 20px', borderRadius: '9999px', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px' }}>
                12 Months
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#14532d' }}>₹4,999</span>
                <span style={{ fontSize: '1.1rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹14,999</span>
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px' }}>67% off</span>
              </div>

              {/* FEATURES CHECKLIST */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', fontSize: '0.9rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Unlimited Classes</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Monthly Sunday Masterclass</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Bonus E-Books</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> 3 Mini Programs</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Progress Tracking</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Community Support</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> 1 Month Access to AOL App</div>
              </div>
            </div>

            {/* LANGUAGE SELECTOR & GET STARTED BUTTON (MATCHING SCREENSHOT 4) */}
            <div>
              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <button
                  type="button"
                  onClick={() => setOpenLangCard(openLangCard === 'YOGA_12M' ? null : 'YOGA_12M')}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #a7f3d0', background: '#ffffff', fontSize: '0.9rem', fontWeight: 600, color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  Select Language: <strong>{selectedLanguage}</strong> <ChevronDown size={16} />
                </button>

                {openLangCard === 'YOGA_12M' && (
                  <div style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 20 }}>
                    {languages.map((lang) => (
                      <div
                        key={lang}
                        onClick={() => { setSelectedLanguage(lang); setOpenLangCard(null); }}
                        style={{ padding: '10px 16px', fontSize: '0.9rem', fontWeight: selectedLanguage === lang ? 700 : 500, color: selectedLanguage === lang ? '#2563eb' : '#334155', background: selectedLanguage === lang ? '#eff6ff' : '#ffffff', cursor: 'pointer' }}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleSelectPlanForLead(PLAN_SPECS[0])}
                style={{ width: '100%', padding: '14px', borderRadius: '9999px', background: '#ffffff', color: '#64748b', fontWeight: 700, border: '1px solid #cbd5e1', cursor: 'pointer', fontSize: '1rem' }}
              >
                Get started now
              </button>
            </div>

          </div>

          {/* 6 MONTHS PLAN CARD */}
          <div style={{ border: '1px solid #fed7aa', borderRadius: '24px', background: '#fffaf0', padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ background: '#f97316', color: '#ffffff', display: 'inline-block', padding: '6px 20px', borderRadius: '9999px', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px' }}>
                6 Months
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1e293b' }}>₹3,999</span>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>(₹666/month)</span>
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px' }}>50% off</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', fontSize: '0.9rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Unlimited Classes</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Monthly Sunday Masterclass</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Bonus E-Books</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> 3 Mini Programs</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Progress Tracking</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Community Support</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={18} color="#ef4444" /> 1 Month Access to AOL App</div>
              </div>
            </div>

            <div>
              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <button
                  type="button"
                  onClick={() => setOpenLangCard(openLangCard === 'YOGA_6M' ? null : 'YOGA_6M')}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.9rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  Select Language: <strong>{selectedLanguage}</strong> <ChevronDown size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPlanForLead(PLAN_SPECS[1])}
                style={{ width: '100%', padding: '14px', borderRadius: '9999px', background: '#ffffff', color: '#ea580c', fontWeight: 700, border: '1px solid #fed7aa', cursor: 'pointer', fontSize: '1rem' }}
              >
                Choose this plan
              </button>
            </div>

          </div>

          {/* 3 MONTHS PLAN CARD */}
          <div style={{ border: '1px solid #fed7aa', borderRadius: '24px', background: '#fffaf0', padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ background: '#f97316', color: '#ffffff', display: 'inline-block', padding: '6px 20px', borderRadius: '9999px', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px' }}>
                3 Months
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1e293b' }}>₹1,499</span>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>(₹500/month)</span>
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px' }}>Best Value</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', fontSize: '0.9rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Unlimited Classes</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Monthly Sunday Masterclass</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Bonus E-Books</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={18} color="#ef4444" /> 3 Mini Programs</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={18} color="#16a34a" /> Progress Tracking</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={18} color="#ef4444" /> Community Support</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={18} color="#ef4444" /> 1 Month Access to AOL App</div>
              </div>
            </div>

            <div>
              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <button
                  type="button"
                  onClick={() => setOpenLangCard(openLangCard === 'YOGA_3M' ? null : 'YOGA_3M')}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.9rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  Select Language: <strong>{selectedLanguage}</strong> <ChevronDown size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPlanForLead(PLAN_SPECS[2])}
                style={{ width: '100%', padding: '14px', borderRadius: '9999px', background: '#ffffff', color: '#ea580c', fontWeight: 700, border: '1px solid #fed7aa', cursor: 'pointer', fontSize: '1rem' }}
              >
                Choose this plan
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
