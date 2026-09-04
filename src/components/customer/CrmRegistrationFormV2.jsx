import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Calendar, PhoneCall, Check, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import aolLogoSwans from '../../assets/aol_logo_swans.png';

export const CrmRegistrationFormV2 = () => {
  const { regForm, setRegForm, setCustomerScreen, selectedPlanForCheckout, setIsTermsModalOpen, setIsPrivacyModalOpen } = useApp();

  const [optOutAgreed, setOptOutAgreed] = useState(regForm.optOutAgreed);
  const [showError, setShowError] = useState(false);

  const currentPrice = selectedPlanForCheckout?.price || 1499;
  const currentPlanName = selectedPlanForCheckout?.name || '3 Months Plan';
  const currentBillingCycle = selectedPlanForCheckout?.billingCycle || 'Quarterly';

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setShowError(false);
    setCustomerScreen('PAYMENT');
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
              src={aolLogoSwans} 
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
            You'll be charged ₹{currentPrice.toLocaleString('en-IN')} once every {selectedPlanForCheckout?.durationMonths || 3} months until you cancel. You can cancel anytime.
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
              
              {/* Class Language — shown FIRST so user picks language upfront */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Language *
                </label>
                <select
                  value={regForm.language || 'English / Hindi'}
                  onChange={(e) => setRegForm({ ...regForm, language: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f9fafb', fontSize: '0.95rem', cursor: 'pointer', appearance: 'auto' }}
                >
                  <option value="English / Hindi">English / Hindi</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Gujarati">Gujarati</option>
                </select>
              </div>

              {/* First Name + Last Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={regForm.firstName || ''}
                    onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value, name: `${e.target.value} ${regForm.lastName || ''}`.trim() })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f9fafb', fontSize: '0.95rem', boxSizing: 'border-box' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={regForm.lastName || ''}
                    onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value, name: `${regForm.firstName || ''} ${e.target.value}`.trim() })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f9fafb', fontSize: '0.95rem', boxSizing: 'border-box' }}
                    required
                  />
                </div>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  value={regForm.phone}
                  onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f9fafb', fontSize: '0.95rem' }}
                  required
                />
              </div>


              {/* Concise Payment Redirect Notice */}
              <p style={{ fontSize: '0.85rem', color: '#4b5563', fontStyle: 'italic', margin: '4px 0 8px 0' }}>
                By continuing, you agree to the <button type="button" onClick={(e) => { e.preventDefault(); setIsTermsModalOpen(true); }} style={{ background: 'none', border: 'none', padding: 0, color: '#2563eb', textDecoration: 'underline', cursor: 'pointer', fontSize: 'inherit' }}>Terms of Service</button> and <button type="button" onClick={(e) => { e.preventDefault(); setIsPrivacyModalOpen(true); }} style={{ background: 'none', border: 'none', padding: 0, color: '#2563eb', textDecoration: 'underline', cursor: 'pointer', fontSize: 'inherit' }}>Privacy Policy</button>.
                You will be redirected to the secure payment gateway to complete your payment of ₹{currentPrice.toLocaleString('en-IN')} and authorize automatic renewal.
              </p>

              {/* REGISTER & CONTINUE TO PAYMENT BUTTON */}
              <div style={{ textAlign: 'right', marginTop: '8px' }}>
                <button
                  type="submit"
                  style={{
                    background: '#facc15',
                    color: '#111827',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    padding: '14px 44px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(250, 204, 21, 0.4)',
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
              <button type="button" onClick={() => setIsTermsModalOpen(true)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', textDecoration: 'underline', fontSize: 'inherit' }}>Privacy statement | Terms of Use | Subscription Refund Policy</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

