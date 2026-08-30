import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Calendar, PhoneCall, Check, ArrowLeft, RefreshCw, AlertCircle, X, Lock, ChevronDown } from 'lucide-react';

export const CrmRegistrationForm = () => {
  const { regForm, setRegForm, setCustomerScreen, selectedPlanForCheckout, setIsJuspayModalOpen, setIsTermsModalOpen, selectedLanguage, setSelectedLanguage } = useApp();

  const [termsAgreed, setTermsAgreed] = useState(regForm.termsAgreed);
  const [optOutAgreed, setOptOutAgreed] = useState(regForm.optOutAgreed);
  const [showError, setShowError] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const languages = ['English / Hindi', 'Malayalam', 'Gujarati', 'Kannada'];

  const currentPrice = selectedPlanForCheckout?.price || 1499;
  const currentPlanName = selectedPlanForCheckout?.name || '3 Months Plan';
  const currentBillingCycle = selectedPlanForCheckout?.billingCycle || 'Quarterly';

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!termsAgreed) {
      alert('Please agree to the Terms & Conditions of program participation to continue.');
      return;
    }
    setShowError(false);
    setIsJuspayModalOpen(true);
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* BACK NAVIGATION BAR */}
      <div style={{ background: '#f8fafc', padding: '12px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            type="button"
            onClick={() => setCustomerScreen('LANDING')}
            style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={16} /> Back to Sri Sri Yoga Overview
          </button>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706', letterSpacing: '0.5px' }}>
            STEP 1 OF 3: PARTICIPANT REGISTRATION & AUTOPAY CONSENT
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '340px 1fr', minHeight: 'calc(100vh - 50px)' }}>
        
        {/* LEFT SIDEBAR: PROGRAM INFORMATION (MATCHING CURRENT SCREENSHOT) */}
        <div style={{ background: '#f5f5f7', padding: '40px 28px', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* AOL Sun Logo */}
          <div>
            <img 
              src="https://srisrischoolofyoga.org/in/app/uploads-yoga/2024/06/SSSYLogo_Orange.png" 
              alt="Sri Sri School of Yoga" 
              style={{ height: '56px', width: 'auto', marginBottom: '20px' }} 
            />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
              Program Information
            </h3>
          </div>

          {/* Yoga Icon & Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '2rem' }}>🧘</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>
              {currentPlanName} Sri Sri Yoga Challenge Classes (English, Hindi)
            </div>
            <div style={{ fontSize: '1.1rem', color: '#ea580c', fontWeight: 800 }}>
              Contribution = ₹{currentPrice.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Subscription Start Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
            <Calendar size={22} color="#ea580c" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Subscription start date:</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>14 Oct 2026</div>
            </div>
          </div>

          {/* Automatic Renewal Badge Info */}
          <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '16px', lineHeight: 1.5 }}>
            You'll be charged ₹{currentPrice.toLocaleString('en-IN')} once every {selectedPlanForCheckout?.durationMonths || 3} months until you cancel
          </div>

          {/* Contact Support */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: 'auto' }}>
            <PhoneCall size={20} color="#6b7280" style={{ marginTop: '2px' }} />
            <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
              <div style={{ fontWeight: 600, color: '#111827' }}>Sri Sri School of Yoga Support</div>
              <a href="tel:9035501942" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>9035501942</a>
              <br />
              <a href="mailto:classes@srisrischoolofyoga.org" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.8rem' }}>
                classes@srisrischoolofyoga.org
              </a>
            </div>
          </div>
        </div>

        {/* MAIN RIGHT COLUMN: PERSONAL DETAILS & MANDATORY AUTOPAY CONSENT */}
        <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
              Personal Details
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '24px' }}>
              Have a voucher / gift card? <a href="#voucher" onClick={(e) => { e.preventDefault(); alert('Voucher code AOLSPECIAL10 applied!'); }} style={{ color: '#ea580c', fontWeight: 700, textDecoration: 'underline' }}>Redeem here</a>
            </p>

            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '660px' }}>
              
              {/* Name (single field, pre-filled from OTP login) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={regForm.name || regForm.firstName || ''}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value, firstName: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f9fafb', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  required
                />
              </div>

              {/* WhatsApp / Phone Number (read-only — verified via OTP) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  WhatsApp Number * <span style={{ color: '#16a34a', fontSize: '0.75rem', fontWeight: 500 }}>(verified ✓)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    value={regForm.phone}
                    readOnly
                    style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f3f4f6', fontSize: '0.95rem', color: '#6b7280', cursor: 'not-allowed', boxSizing: 'border-box' }}
                  />
                  <Lock size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f9fafb', fontSize: '0.95rem' }}
                  required
                />
              </div>

              {/* Age & Postal Code */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Age *
                  </label>
                  <input
                    type="number"
                    value={regForm.age}
                    onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={regForm.postalCode}
                    onChange={(e) => {
                      const val = e.target.value;
                      let computedCityState = regForm.cityState;
                      if (val === '560082') computedCityState = 'Bengaluru Urban, Karnataka';
                      else if (val === '110001') computedCityState = 'New Delhi, Delhi';
                      else if (val === '400001') computedCityState = 'Mumbai, Maharashtra';
                      else if (val.length === 6) computedCityState = 'India';
                      else if (val.length === 0) computedCityState = '';
                      setRegForm({ ...regForm, postalCode: val, cityState: computedCityState });
                    }}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
                    placeholder="e.g. 560082"
                    required
                  />
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
                    {regForm.cityState}
                  </div>
                </div>
              </div>

              {/* Language Preference (moved from plan cards) */}
              <div style={{ position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Class Language *
                </label>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f9fafb', fontSize: '0.95rem', color: selectedLanguage ? '#111827' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxSizing: 'border-box' }}
                >
                  <span>{selectedLanguage || 'Select a language'}</span>
                  <ChevronDown size={18} color="#9ca3af" />
                </button>
                {langDropdownOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#ffffff', border: '1px solid #d1d5db', borderRadius: '6px', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 30 }}>
                    {languages.map((lang) => (
                      <div
                        key={lang}
                        onClick={() => { setSelectedLanguage(lang); setLangDropdownOpen(false); }}
                        style={{ padding: '11px 14px', fontSize: '0.9rem', fontWeight: selectedLanguage === lang ? 700 : 500, color: selectedLanguage === lang ? '#ea580c' : '#374151', background: selectedLanguage === lang ? '#fff7ed' : '#ffffff', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' }}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* EXISTING CONSENT CHECKBOXES */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="termsCheck"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#ea580c', cursor: 'pointer', marginTop: '2px' }}
                  />
                  <label htmlFor="termsCheck" style={{ fontSize: '0.85rem', color: '#374151', lineHeight: 1.4 }}>
                    I agree to the <a href="#terms" onClick={(e) => { e.preventDefault(); setIsTermsModalOpen(true); }} style={{ color: '#2563eb', textDecoration: 'underline' }}>Terms & Conditions</a> of my program participation, which includes automatic subscription renewal until cancelled.
                  </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="optCheck"
                    checked={optOutAgreed}
                    onChange={(e) => setOptOutAgreed(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#ea580c', cursor: 'pointer', marginTop: '2px' }}
                  />
                  <label htmlFor="optCheck" style={{ fontSize: '0.85rem', color: '#374151', lineHeight: 1.4 }}>
                    I agree to receive information from The Art of Living and its affiliate organizations through various media, including print and digital, with a facility to opt out.
                  </label>
                </div>
              </div>

              {/* Concise Payment Redirect Notice */}
              <p style={{ fontSize: '0.85rem', color: '#4b5563', fontStyle: 'italic', margin: '4px 0' }}>
                By continuing, you will be redirected to the secure payment gateway to complete your payment of ₹{currentPrice.toLocaleString('en-IN')} and authorize automatic renewal.
              </p>

              {/* REGISTER & CONTINUE TO PAYMENT BUTTON */}
              <div style={{ textAlign: 'right', marginTop: '8px' }}>
                <button
                  type="submit"
                  disabled={!termsAgreed}
                  style={{
                    background: termsAgreed ? '#facc15' : '#e5e7eb',
                    color: termsAgreed ? '#111827' : '#9ca3af',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    padding: '14px 44px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: termsAgreed ? 'pointer' : 'not-allowed',
                    boxShadow: termsAgreed ? '0 4px 12px rgba(250, 204, 21, 0.4)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  Register & Continue to Payment
                </button>
              </div>

            </form>
          </div>

          {/* FOOTER BADGES */}
          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0284c7', color: '#ffffff', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
              <ShieldCheck size={16} /> digicert VERIFIED | JUSPAY AUTOPAY SECURED
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              © 2026 | The Art of Living | v6.0.1<br />
              Privacy statement | Terms of Use | Subscription Refund Policy
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

