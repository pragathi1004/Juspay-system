import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PLAN_SPECS } from '../../data/planSpecs';
import { DailyYogaAuthModal } from './DailyYogaAuthModal';
import { Check, X, Globe, Search, User, Users, Calendar, Heart, ArrowRight, MessageCircle, ExternalLink, CheckCircle, ArrowLeft } from 'lucide-react';
import aolLogoSwans from '../../assets/aol_logo_swans.png';

export const YogaChallengeScreen = () => {
  const { setSelectedPlanForCheckout, setCustomerScreen, setUserFlow, regForm, setRegForm } = useApp();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCity, setFormCity] = useState('');

  // Challenge Flow Stages: 'LANDING' | 'WHATSAPP_CONFIRM' | 'WHATSAPP_REDIRECT'
  const [challengeStage, setChallengeStage] = useState('LANDING');
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  // Countdown timer for Namaste screen
  useEffect(() => {
    let timer;
    if (challengeStage === 'WHATSAPP_CONFIRM' && redirectCountdown > 0) {
      timer = setInterval(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
    } else if (challengeStage === 'WHATSAPP_CONFIRM' && redirectCountdown === 0) {
      setChallengeStage('WHATSAPP_REDIRECT');
    }
    return () => clearInterval(timer);
  }, [challengeStage, redirectCountdown]);

  const handleChallengeSubmit = (e) => {
    e?.preventDefault();
    const finalName = formName.trim() || 'Pragathi';
    const finalPhone = formPhone.trim() || '7780672142';
    const finalCity = formCity.trim() || 'Bengaluru';

    setRegForm((prev) => ({
      ...prev,
      name: finalName,
      firstName: finalName,
      phone: finalPhone,
      cityState: finalCity,
      phoneVerified: true
    }));

    // Transition to WhatsApp Confirmation screen (Screen 1 in user's request)
    setRedirectCountdown(3);
    setChallengeStage('WHATSAPP_CONFIRM');
  };

  const handleSelectPlanForLead = (plan) => {
    setSelectedPlanForCheckout(plan);
    setUserFlow('NEW_LEAD');
    if (regForm?.phoneVerified) {
      setCustomerScreen('CRM_FORM');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const scrollToPlans = () => {
    const el = document.getElementById('challenge-membership-plans');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#4b4c4e', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#ffffff' }}>
      
      {/* AUTH & REGISTRATION MODAL */}
      <DailyYogaAuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* TOP GLOBAL NAVIGATION BAR */}
      <nav style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50, color: '#334155' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setCustomerScreen('PUBLIC_LANDING')}>
            <img 
              src={aolLogoSwans} 
              alt="The Art of Living" 
              style={{ height: '44px', width: 'auto' }} 
            />
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#166534' }}>Sri Sri School of Yoga</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.9rem', fontWeight: 600 }}>
            <button
              type="button"
              onClick={() => { setChallengeStage('LANDING'); setCustomerScreen('PUBLIC_LANDING'); }}
              style={{ background: 'transparent', border: 'none', color: '#475569', fontWeight: 700, cursor: 'pointer' }}
            >
              Main Landing Page
            </button>
            <button
              type="button"
              onClick={scrollToPlans}
              style={{ background: '#f97316', color: '#ffffff', padding: '8px 20px', borderRadius: '9999px', border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              Membership Plans
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* STAGE 1: NAMASTE PRAGATHI JI! WHATSAPP RECEIVE DETAILS SCREEN (SCREENSHOT 1) */}
      {/* ========================================================================= */}
      {challengeStage === 'WHATSAPP_CONFIRM' && (
        <div style={{ background: '#5d5d5d', minHeight: 'calc(100vh - 68px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '40px 20px', textAlign: 'center' }}>
          
          <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
            <div style={{ fontSize: '1.6rem', color: '#f59e0b', fontWeight: 500, marginBottom: '6px' }}>
              Namaste
            </div>
            <div style={{ fontSize: '2.2rem', color: '#facc15', fontWeight: 900, marginBottom: '28px' }}>
              {formName || 'Pragathi'} Ji!
            </div>

            <div style={{ fontSize: '1.25rem', color: '#facc15', fontWeight: 700, marginBottom: '32px', lineHeight: 1.4 }}>
              Receive your session details on Whatsapp
            </div>

            <button
              type="button"
              onClick={() => setChallengeStage('WHATSAPP_REDIRECT')}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'transparent',
                border: 'none',
                color: '#facc15',
                fontWeight: 800,
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '16px'
              }}
            >
              <div style={{ background: '#25D366', color: '#ffffff', borderRadius: '50%', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={22} fill="#ffffff" />
              </div>
              <span>Send me session link on WhatsApp</span>
            </button>

            <div style={{ fontSize: '1.05rem', color: '#fbbf24', fontWeight: 600, marginBottom: '40px' }}>
              Redirecting in {redirectCountdown} sec...
            </div>
          </div>

          {/* MAYUR & EESHA TRAINERS PHOTO AT BOTTOM */}
          <div style={{ maxWidth: '440px', width: '100%', marginTop: 'auto' }}>
            <img 
              src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600" 
              alt="Mayur & Eesha Yoga Trainers" 
              style={{ width: '100%', height: 'auto', borderRadius: '24px 24px 0 0', objectFit: 'cover' }}
            />
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: WHATSAPP WEB VERIFY REDIRECT PAGE (SCREENSHOT 2) */}
      {/* ========================================================================= */}
      {challengeStage === 'WHATSAPP_REDIRECT' && (
        <div style={{ background: '#ffffff', minHeight: 'calc(100vh - 68px)', color: '#111827', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          
          {/* WHATSAPP TOP HEADER BAR */}
          <header style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: '#25D366', color: '#ffffff', borderRadius: '50%', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={24} fill="#ffffff" color="#25D366" />
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#25D366', letterSpacing: '-0.5px' }}>WhatsApp</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.9rem', color: '#374151', fontWeight: 500 }}>
                <span>Features ▾</span>
                <span>Privacy</span>
                <span>Blog</span>
                <span>Apps</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>Help Center <ExternalLink size={12} /></span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>For Business <ExternalLink size={12} /></span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{ background: '#ffffff', border: '1px solid #111827', borderRadius: '9999px', padding: '8px 18px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                Log In ›
              </button>
              <button style={{ background: '#25D366', border: 'none', borderRadius: '9999px', padding: '8px 18px', color: '#ffffff', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}>
                Download ↓
              </button>
            </div>
          </header>

          {/* MAIN WHATSAPP CHANNEL CARD */}
          <div style={{ maxWidth: '520px', margin: '60px auto 40px auto', textAlign: 'center', padding: '0 20px' }}>
            
            {/* AOL LOGO EMBLEM */}
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <img 
                src={aolLogoSwans} 
                alt="The Art of Living" 
                style={{ height: '56px', width: 'auto' }} 
              />
            </div>

            {/* CHANNEL NAME & VERIFIED BADGE */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '1.4rem', fontWeight: 800, color: '#111827', marginBottom: '24px' }}>
              <span>The Art of Living</span>
              <div style={{ background: '#0284c7', color: '#ffffff', borderRadius: '50%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={14} strokeWidth={3} />
              </div>
            </div>

            {/* PRE-FILLED MESSAGE BOX */}
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', fontSize: '1rem', color: '#374151', marginBottom: '24px', fontWeight: 500 }}>
              verify
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '340px', margin: '0 auto 32px auto' }}>
              <button
                type="button"
                onClick={() => setCustomerScreen('PUBLIC_LANDING')}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '9999px',
                  background: '#25D366',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                }}
              >
                Open app
              </button>

              <button
                type="button"
                onClick={() => setCustomerScreen('PUBLIC_LANDING')}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '9999px',
                  background: '#ffffff',
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer'
                }}
              >
                Continue to WhatsApp Web
              </button>
            </div>

            <button
              type="button"
              onClick={() => setChallengeStage('LANDING')}
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', margin: '0 auto' }}
            >
              <ArrowLeft size={16} /> Back to 14-Day Challenge Page
            </button>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 0: MAIN 14-DAY YOGA CHALLENGE LANDING FORM (SCREENSHOT 3) */}
      {/* ========================================================================= */}
      {challengeStage === 'LANDING' && (
        <>
          {/* 1. SRI SRI YOGA 14 DAYS FREE CHALLENGE HERO CARD (MATCHING SCREENSHOT 3) */}
          <div style={{ maxWidth: '480px', margin: '30px auto', background: '#3b3c3e', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid #525356' }}>
            
            {/* TRAINERS BANNER IMAGE */}
            <div style={{ position: 'relative', textAlign: 'center', background: 'linear-gradient(180deg, #736c61 0%, #3b3c3e 100%)', padding: '24px 20px 0 20px' }}>
              <img 
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600" 
                alt="Mayur & Eesha - Art of Living Yoga Trainers" 
                style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
              />
              <div style={{ background: '#fbbf24', color: '#18181b', padding: '6px 16px', borderRadius: '9999px', display: 'inline-block', fontWeight: 800, fontSize: '0.85rem', position: 'relative', marginTop: '-20px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                MAYUR & EESHA
              </div>
              <div style={{ fontSize: '0.72rem', color: '#fbbf24', marginTop: '4px', fontWeight: 600 }}>
                International Faculty - Art of Living | Govt. Certified Yoga Trainers
              </div>
            </div>

            {/* HEADINGS & DATE */}
            <div style={{ padding: '24px 24px 12px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#ffffff' }}>
                14 DAYS ONLINE
              </div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#facc15', lineHeight: 1.1, margin: '4px 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                FREE YOGA
              </div>
              <div style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#e4e4e7', marginBottom: '8px' }}>
                #Yoga Karo, Swasth Raho!
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: '12px', display: 'inline-block' }}>
                10 - 23 October
              </div>
            </div>

            {/* INLINE REGISTRATION FORM */}
            <div style={{ padding: '0 24px 24px 24px' }}>
              <form onSubmit={handleChallengeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                <div>
                  <input 
                    type="text" 
                    placeholder="Enter Your Name *" 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: 'none', background: '#ffffff', color: '#18181b', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '10px' }}>
                  <div style={{ background: '#ffffff', color: '#18181b', borderRadius: '12px', padding: '14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 700, fontSize: '0.95rem' }}>
                    <span>IN +91</span>
                  </div>
                  <input 
                    type="tel" 
                    placeholder="WhatsApp Number *" 
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: 'none', background: '#ffffff', color: '#18181b', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>

                <div>
                  <input 
                    type="text" 
                    placeholder="City (e.g. Bengaluru)" 
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: 'none', background: '#ffffff', color: '#18181b', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '14px',
                    background: '#facc15',
                    color: '#18181b',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(250, 204, 21, 0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  JOIN FOR FREE
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#e4e4e7', fontWeight: 600 }}>
                  8,74,186+ people have joined
                </div>
              </form>
            </div>

            {/* BATCH TIMES BOX */}
            <div style={{ padding: '0 20px 24px 20px' }}>
              <div style={{ background: '#ffffff', color: '#18181b', borderRadius: '16px', padding: '20px', border: '2px solid #facc15' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 800, marginBottom: '10px' }}>
                  <span>☀️</span>
                  <span>Mor: 6 AM | 7 AM | 8 AM | 11 AM</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 800, marginBottom: '12px' }}>
                  <span>🌙</span>
                  <span>Eve: 5 PM | 6 PM | 7 PM</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#4b5563', textAlign: 'center', fontWeight: 600, borderTop: '1px dashed #e5e7eb', paddingTop: '8px' }}>
                  45 Minutes Session | Join any Batch
                </div>
              </div>
            </div>

          </div>

          {/* 2. PROGRAM BENEFIT CARDS */}
          <div style={{ maxWidth: '480px', margin: '0 auto 40px auto', padding: '0 16px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '24px', color: '#ffffff' }}>
              In these <span style={{ color: '#facc15' }}>14 Days</span> you will do
            </h2>

            {/* Pranayama Card */}
            <div style={{ background: '#ffffff', color: '#18181b', borderRadius: '20px', padding: '24px', marginBottom: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '2.2rem' }}>😊</span>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#18181b' }}>Pranayama</div>
                  <div style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 600 }}>Breathe your way to vitality</div>
                </div>
              </div>
              <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.95rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 500 }}>
                <li>Boost stamina & lung capacity</li>
                <li>Balance emotions & calm the mind</li>
                <li>Detox & feel lighter from within</li>
              </ul>
            </div>

            {/* Asanas Card */}
            <div style={{ background: '#ffffff', color: '#18181b', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '2.2rem' }}>🧘</span>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#18181b' }}>Asanas</div>
                  <div style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 600 }}>Strength, Flexibility & Balance</div>
                </div>
              </div>
              <ul style={{ paddingLeft: '20px', margin: '0 0 20px 0', fontSize: '0.95rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 500 }}>
                <li>Tone & strengthen muscles</li>
                <li>Improve posture & mobility</li>
              </ul>

              <button
                type="button"
                onClick={handleChallengeSubmit}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  background: '#facc15',
                  color: '#18181b',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                JOIN FREE CHALLENGE
              </button>
            </div>
          </div>

          {/* 3. FULL MEMBERSHIP PLANS SECTION */}
          <div id="challenge-membership-plans" style={{ background: '#FFF8E8', color: '#1e293b', padding: '80px 40px' }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
              
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>
                  Daily Yoga Membership Plans
                </h2>
                <p style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 500, margin: 0 }}>
                  Continue your yoga journey after the 14-day challenge with our popular subscription plans
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
                
                {/* 12 MONTHS PLAN CARD */}
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', fontSize: '0.9rem', color: '#334155' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Unlimited Live Yoga Classes</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Monthly Sunday Masterclass</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Bonus E-Books</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> 3 Mini Programs</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Progress Tracking</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> Community Support</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={18} color="#16a34a" /> 1 Month Access to AOL App</div>
                    </div>
                  </div>
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
                    <div style={{ background: '#f97316', color: '#ffffff', display: 'inline-block', padding: '6px 20px', borderRadius: '9999px', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px' }}>
                      6 Months
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
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
                    </div>
                  </div>
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
                    <div style={{ background: '#f97316', color: '#ffffff', display: 'inline-block', padding: '6px 20px', borderRadius: '9999px', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px' }}>
                      3 Months
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
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
                    </div>
                  </div>
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
            </div>
          </div>

          {/* 4. OUR MEMBERS STORIES SECTION */}
          <div style={{ background: '#ffffff', color: '#1e293b', padding: '60px 40px 80px 40px' }}>
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
                <div style={{ background: '#fffaf0', borderRadius: '16px', border: '1px solid #fed7aa', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
                    "Yoga has improved my posture and flexibility. My back pain is gone and I feel light and energetic every day."
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>Jamuna Sharma</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Homemaker | Pune</div>
                  </div>
                </div>
                {/* Quote 2 */}
                <div style={{ background: '#fffaf0', borderRadius: '16px', border: '1px solid #fed7aa', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
                    "After yoga, my energy levels are up and I can manage my work and home much more peacefully."
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>Manoj Verma</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Business Owner | Delhi</div>
                  </div>
                </div>
                {/* Quote 3 */}
                <div style={{ background: '#fffaf0', borderRadius: '16px', border: '1px solid #fed7aa', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
                    "I sleep better, feel calmer and my mind is more focused since I started daily yoga practice."
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>Minakshi Iyer</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Working Professional | Bengaluru</div>
                  </div>
                </div>
                {/* Quote 4 */}
                <div style={{ background: '#fffaf0', borderRadius: '16px', border: '1px solid #fed7aa', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
                    "Yoga helped me manage my weight and stay active even with a busy lifestyle."
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>Seema Patil</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Teacher | Mumbai</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};
