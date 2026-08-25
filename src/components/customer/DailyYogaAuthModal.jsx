import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ChevronDown, User, ChevronRight, Mail, ArrowLeft, CheckCircle2, RefreshCw, KeyRound, Check } from 'lucide-react';
import aolLogoSwans from '../../assets/aol_logo_swans.png';

export const DailyYogaAuthModal = ({ isOpen, onClose }) => {
  const { regForm, setRegForm, setCustomerScreen, setUserFlow, setIsTermsModalOpen, setIsPrivacyModalOpen } = useApp();
  
  const [phoneNumber, setPhoneNumber] = useState(regForm?.phone || '9920656992');
  const [countryCode, setCountryCode] = useState('+91');
  const [emailInput, setEmailInput] = useState(regForm?.email || 'pragathi@gmail.com');
  const [whatsAppNumber, setWhatsAppNumber] = useState(regForm?.phone || '9920656992');
  
  // Modal Steps: 'PHONE' | 'OTP' | 'GOOGLE' | 'WHATSAPP' | 'EMAIL' | 'FACEBOOK'
  const [step, setStep] = useState('PHONE');
  const [otp, setOtp] = useState(['4', '8', '2', '9']);
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [pendingAuth, setPendingAuth] = useState(null); // { type: string, extraDetails: object }

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const getOtpDestinationText = () => {
    const type = pendingAuth?.type;
    if (type === 'Google') {
      return `your Google account (${pendingAuth.extraDetails?.email || 'pragathi@gmail.com'})`;
    }
    if (type === 'Facebook') {
      return `your Facebook connected device`;
    }
    if (type === 'Email OTP') {
      return `your email address (${emailInput})`;
    }
    if (type === 'WhatsApp') {
      return `your WhatsApp number (${whatsAppNumber})`;
    }
    return `${countryCode} ${phoneNumber}`;
  };

  useEffect(() => {
    let interval;
    if ((step === 'OTP' || step === 'WHATSAPP' || step === 'EMAIL') && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e) => {
    e?.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setPendingAuth({
      type: 'Mobile OTP',
      extraDetails: { phone: phoneNumber }
    });
    setTimer(30);
    setStep('OTP');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleFillTestOtp = () => {
    setOtp(['4', '8', '2', '9']);
  };

  // Complete Login / Registration
  const finishAuth = (authType, extraDetails = {}) => {
    setIsVerifying(true);

    const enteredPhone = extraDetails.phone || phoneNumber || '';
    const cleanPhone = enteredPhone.replace(/\D/g, '');
    const enteredEmail = (extraDetails.email || '').toLowerCase();

    // Check if the login matches the test Pragathi account (9920656992 / pragathi@gmail.com)
    const isPragathiTestAccount = cleanPhone.includes('9920656992') || enteredEmail.includes('pragathi');

    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      setSuccessMessage(`Authenticated via ${authType}!`);

      if (isPragathiTestAccount) {
        // Pre-fill test details ONLY for test Pragathi account
        setRegForm(prev => ({
          ...prev,
          firstName: extraDetails.firstName || 'PRAGATHI',
          lastName: extraDetails.lastName || 'M',
          name: extraDetails.name || 'PRAGATHI',
          phone: '9920656992',
          email: extraDetails.email || 'pragathi@gmail.com',
          age: '23',
          postalCode: '560082',
          cityState: 'Bengaluru Urban, Karnataka',
          phoneVerified: true
        }));
      } else {
        // NEW LEAD WITH ANY OTHER NUMBER: Leave registration fields EMPTY for manual entry
        setRegForm(prev => ({
          ...prev,
          firstName: extraDetails.firstName || '',
          lastName: extraDetails.lastName || '',
          name: extraDetails.name || (extraDetails.firstName ? `${extraDetails.firstName} ${extraDetails.lastName || ''}`.trim() : ''),
          phone: enteredPhone,
          email: extraDetails.email || '',
          age: '',
          postalCode: '',
          cityState: '',
          phoneVerified: true
        }));
      }

      setUserFlow('NEW_LEAD');

      setTimeout(() => {
        setVerifiedSuccess(false);
        setStep('PHONE');
        onClose();
        // Redirect new lead to landing page membership plans
        setCustomerScreen('PUBLIC_LANDING');
        
        setTimeout(() => {
          const plansEl = document.getElementById('membership-plans');
          if (plansEl) {
            plansEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }, 700);
    }, 700);
  };

  const handleVerifyOtp = (e) => {
    e?.preventDefault();
    const currentOtp = otp.join('');
    if (currentOtp !== '4829') {
      alert('Invalid OTP. Please enter the test OTP: 4829');
      return;
    }
    const authType = pendingAuth?.type || 'Mobile OTP';
    const details = pendingAuth?.extraDetails || { phone: phoneNumber };
    finishAuth(authType, details);
  };

  const handleGoogleAccountSelect = (account) => {
    setPendingAuth({
      type: 'Google',
      extraDetails: {
        name: account.name,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email
      }
    });
    setTimer(30);
    setStep('OTP');
  };

  const handleFacebookLoginSubmit = () => {
    setPendingAuth({
      type: 'Facebook',
      extraDetails: {
        name: 'PRAGATHI',
        firstName: 'PRAGATHI',
        lastName: '',
        email: 'pragathi@gmail.com'
      }
    });
    setTimer(30);
    setStep('OTP');
  };

  const handleWhatsAppVerify = (e) => {
    e?.preventDefault();
    setPendingAuth({
      type: 'WhatsApp',
      extraDetails: { phone: whatsAppNumber }
    });
    setTimer(30);
    setStep('OTP');
  };

  const handleEmailVerify = (e) => {
    e?.preventDefault();
    setPendingAuth({
      type: 'Email OTP',
      extraDetails: { email: emailInput }
    });
    setTimer(30);
    setStep('OTP');
  };

  const handleAlreadySubscribedClick = () => {
    setUserFlow('EXISTING_MEMBER');
    onClose();
    setCustomerScreen('DASHBOARD');
  };

  const handleModalClose = () => {
    setStep('PHONE');
    setVerifiedSuccess(false);
    setPendingAuth(null);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={handleModalClose}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '430px',
          height: 'auto',
          maxHeight: '94vh',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          margin: 'auto',
          boxSizing: 'border-box',
          border: '1px solid #f1f5f9'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP CONTROLS: BACK & CLOSE */}
        <div style={{ position: 'absolute', top: '18px', left: '18px', right: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          {step !== 'PHONE' ? (
            <button
              onClick={() => setStep('PHONE')}
              aria-label="Back"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={18} /> Back
            </button>
          ) : <div />}

          <button
            onClick={handleModalClose}
            aria-label="Close"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#1e293b',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* MODAL CONTENT */}
        <div style={{ padding: '24px 28px 16px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          
          {/* THE ART OF LIVING EMBLEM LOGO */}
          <div style={{ marginBottom: '8px', marginTop: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src={aolLogoSwans} 
              alt="The Art of Living" 
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }} 
            />
          </div>

          {/* LOTUS DECORATIVE DIVIDER */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', marginBottom: '10px' }}>
            <div style={{ flex: 1, height: '1.5px', background: '#eab308' }}></div>
            <svg width="26" height="18" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C14 8 10 14 6 18C11 18 14 16 16 12C18 16 21 18 26 18C22 14 18 8 16 2Z" stroke="#eab308" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 8C13 13 8 18 2 20C7 21 12 19 16 16C20 19 25 21 30 20C24 18 19 13 16 8Z" stroke="#eab308" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ flex: 1, height: '1.5px', background: '#eab308' }}></div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 1: MAIN ENTRY - PHONE NUMBER INPUT */}
          {/* ========================================================================= */}
          {step === 'PHONE' && (
            <>
              {/* SUBTITLE */}
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.4, margin: '0 0 16px 0', maxWidth: '340px' }}>
                Join the world's largest yoga community and experience authentic wellness
              </p>

              {/* PHONE INPUT FORM */}
              <form onSubmit={handlePhoneSubmit} style={{ width: '100%' }}>
                
                {/* INPUT GROUP WITH COUNTRY CODE */}
                <div style={{ display: 'flex', alignItems: 'stretch', border: '1.5px solid #cbd5e1', borderRadius: '12px', background: '#ffffff', overflow: 'hidden', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 14px', background: '#ffffff', borderRight: '1.5px solid #e2e8f0', color: '#1e293b', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>
                    <span>{countryCode}</span>
                    <ChevronDown size={18} color="#64748b" />
                  </div>

                  <input 
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      padding: '12px 14px',
                      fontSize: '0.95rem',
                      color: '#1e293b',
                      background: 'transparent'
                    }}
                    required
                  />
                </div>

                {/* CONTINUE BUTTON */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    margin: '0 auto',
                    display: 'block',
                    padding: '10px 18px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.4px',
                    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.25)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  CONTINUE
                </button>
              </form>

              {/* OTP NOTICE SUBTEXT */}
              <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '8px 0 12px 0' }}>
                We will send you an OTP to verify your number
              </p>

              {/* OR DIVIDER */}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '16px', margin: '0 0 6px 0' }}>
                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.5px' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
              </div>

              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', margin: '0 0 8px 0' }}>
                Continue with
              </p>

              {/* 4 SOCIAL LOGIN BUTTONS ROW */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', width: '100%', marginBottom: '14px' }}>
                
                {/* GOOGLE */}
                <button
                  type="button"
                  onClick={() => setStep('GOOGLE')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '6px', padding: '10px 6px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: '#ffffff', cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span style={{ fontSize: '0.75rem', color: '#1e293b', fontWeight: 600 }}>Google</span>
                </button>

                {/* FACEBOOK */}
                <button
                  type="button"
                  onClick={() => setStep('FACEBOOK')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '6px', padding: '10px 6px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: '#ffffff', cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span style={{ fontSize: '0.75rem', color: '#1e293b', fontWeight: 600 }}>Facebook</span>
                </button>

                {/* WHATSAPP */}
                <button
                  type="button"
                  onClick={() => setStep('WHATSAPP')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '6px', padding: '10px 6px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: '#ffffff', cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M12.031 0C5.396 0 .016 5.379.016 12.015c0 2.115.553 4.183 1.603 6.002L.016 24l6.148-1.613c1.75 1.008 3.754 1.54 5.867 1.54 6.634 0 12.015-5.38 12.015-12.015C24.046 5.38 18.665 0 12.031 0zm.016 21.99a9.96 9.96 0 0 1-5.077-1.385l-.364-.216-3.771.989 1.006-3.676-.237-.378a9.967 9.967 0 0 1-1.533-5.31c0-5.503 4.478-9.98 9.98-9.98 5.503 0 9.98 4.478 9.98 9.98 0 5.503-4.478 9.98-9.983 9.98zm5.474-7.464c-.3-.15-1.776-.876-2.05-.975-.276-.1-.476-.15-.676.15-.2.3-.776.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.488-.893-.796-1.496-1.78-1.671-2.08-.175-.3-.019-.462.13-.611.136-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.925-2.23-.243-.585-.49-.506-.675-.515-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375s-1.05 1.025-1.05 2.5 1.075 2.898 1.225 3.098c.15.2 2.115 3.23 5.124 4.531.716.31 1.275.495 1.71.634.719.229 1.373.197 1.89.12.577-.086 1.776-.726 2.026-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
                  </svg>
                  <span style={{ fontSize: '0.75rem', color: '#1e293b', fontWeight: 600 }}>WhatsApp</span>
                </button>

                {/* EMAIL */}
                <button
                  type="button"
                  onClick={() => setStep('EMAIL')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '6px', padding: '10px 6px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: '#ffffff', cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  <div style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b' }}>
                    <Mail size={20} strokeWidth={2.2} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#1e293b', fontWeight: 600 }}>Email</span>
                </button>

              </div>

              {/* DIVIDER LINE BEFORE SUBSCRIBER ROW */}
              <div style={{ width: '100%', height: '1px', background: '#e2e8f0', marginBottom: '10px' }}></div>

              {/* I'VE ALREADY SUBSCRIBED ROW */}
              <button
                type="button"
                onClick={handleAlreadySubscribedClick}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  marginBottom: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={18} strokeWidth={2.2} />
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>
                    I've Already Subscribed!
                  </span>
                </div>
                <ChevronRight size={18} color="#64748b" />
              </button>
            </>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: PHONE OTP VERIFICATION */}
          {/* ========================================================================= */}
          {step === 'OTP' && (
            <div style={{ width: '100%', marginTop: '10px' }}>
              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '16px', padding: '16px 20px', marginBottom: '20px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#9a3412', fontWeight: 700 }}>
                    Enter OTP for Verification
                  </span>
                  <button
                    type="button"
                    onClick={handleFillTestOtp}
                    style={{ background: '#ffedd5', color: '#c2410c', border: '1px solid #fdba74', padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <KeyRound size={12} /> Fill Test OTP: 4829
                  </button>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                  We sent a 4-digit code to <strong style={{ color: '#0f172a' }}>{getOtpDestinationText()}</strong>
                </div>
              </div>

              <form onSubmit={handleVerifyOtp}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={inputRefs[idx]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      style={{
                        width: '44px',
                        height: '48px',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        textAlign: 'center',
                        borderRadius: '8px',
                        border: '1.5px solid #d97706',
                        background: '#ffffff',
                        color: '#d97706',
                        outline: 'none',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                      }}
                      required
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isVerifying || verifiedSuccess}
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    margin: '0 auto',
                    padding: '11px 18px',
                    borderRadius: '10px',
                    background: verifiedSuccess ? '#16a34a' : 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.4px',
                    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" /> Verifying OTP...
                    </>
                  ) : verifiedSuccess ? (
                    <>
                      <CheckCircle2 size={16} /> Verified! Opening Plans...
                    </>
                  ) : (
                    'VERIFY & CONTINUE TO PLANS'
                  )}
                </button>
              </form>

              <div style={{ marginTop: '18px', fontSize: '0.85rem', color: '#64748b' }}>
                {timer > 0 ? (
                  <span>Resend OTP in <strong style={{ color: '#ea580c' }}>{timer}s</strong></span>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setTimer(30); alert(`New OTP sent to ${phoneNumber}: 4829`); }}
                    style={{ background: 'none', border: 'none', color: '#ea580c', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Resend OTP Code
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: GOOGLE SIGN-IN DIALOG */}
          {/* ========================================================================= */}
          {step === 'GOOGLE' && (
            <div style={{ width: '100%', textAlign: 'left', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                  Sign in with Google
                </h3>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center', marginBottom: '20px' }}>
                Choose an account to continue to Daily Sri Sri Yoga
              </p>

              {/* ACCOUNT 1 */}
              <button
                type="button"
                onClick={() => handleGoogleAccountSelect({
                  name: 'PRAGATHI',
                  firstName: 'PRAGATHI',
                  lastName: '',
                  email: 'pragathi@gmail.com'
                })}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem' }}>
                  P
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b' }}>Pragathi</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>pragathi@gmail.com</div>
                </div>
                <ChevronRight size={18} color="#94a3b8" />
              </button>

              {/* ACCOUNT 2 */}
              <button
                type="button"
                onClick={() => handleGoogleAccountSelect({
                  name: 'PRIYA SHARMA',
                  firstName: 'PRIYA',
                  lastName: 'SHARMA',
                  email: 'priya.sharma@gmail.com'
                })}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  marginBottom: '16px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem' }}>
                  PS
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b' }}>Priya Sharma</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>priya.sharma@gmail.com</div>
                </div>
                <ChevronRight size={18} color="#94a3b8" />
              </button>

              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', lineHeight: 1.4 }}>
                To continue, Google will share your name, email address, and profile picture with Daily Sri Sri Yoga.
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: WHATSAPP VERIFICATION DIALOG */}
          {/* ========================================================================= */}
          {step === 'WHATSAPP' && (
            <div style={{ width: '100%', textAlign: 'left', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', justifyContent: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M12.031 0C5.396 0 .016 5.379.016 12.015c0 2.115.553 4.183 1.603 6.002L.016 24l6.148-1.613c1.75 1.008 3.754 1.54 5.867 1.54 6.634 0 12.015-5.38 12.015-12.015C24.046 5.38 18.665 0 12.031 0zm.016 21.99a9.96 9.96 0 0 1-5.077-1.385l-.364-.216-3.771.989 1.006-3.676-.237-.378a9.967 9.967 0 0 1-1.533-5.31c0-5.503 4.478-9.98 9.98-9.98 5.503 0 9.98 4.478 9.98 9.98 0 5.503-4.478 9.98-9.983 9.98zm5.474-7.464c-.3-.15-1.776-.876-2.05-.975-.276-.1-.476-.15-.676.15-.2.3-.776.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.488-.893-.796-1.496-1.78-1.671-2.08-.175-.3-.019-.462.13-.611.136-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.925-2.23-.243-.585-.49-.506-.675-.515-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375s-1.05 1.025-1.05 2.5 1.075 2.898 1.225 3.098c.15.2 2.115 3.23 5.124 4.531.716.31 1.275.495 1.71.634.719.229 1.373.197 1.89.12.577-.086 1.776-.726 2.026-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
                </svg>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                  WhatsApp Quick Login
                </h3>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '14px 16px', marginBottom: '18px' }}>
                <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 700, marginBottom: '2px' }}>
                  Verify on WhatsApp:
                </div>
                <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 700 }}>
                  +91 {whatsAppNumber}
                </div>
              </div>

              <form onSubmit={handleWhatsAppVerify}>
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Enter 4-digit code received on WhatsApp:
                  </label>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        style={{ width: '44px', height: '48px', fontSize: '1.25rem', fontWeight: 700, textAlign: 'center', borderRadius: '8px', border: '1.5px solid #d97706', background: '#ffffff', color: '#d97706', outline: 'none', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  style={{ width: '100%', padding: '15px', borderRadius: '12px', background: '#16a34a', color: '#ffffff', fontWeight: 800, fontSize: '1.05rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)' }}
                >
                  <Check size={18} /> Verify via WhatsApp
                </button>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 5: EMAIL OTP LOGIN DIALOG */}
          {/* ========================================================================= */}
          {step === 'EMAIL' && (
            <div style={{ width: '100%', textAlign: 'left', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', justifyContent: 'center' }}>
                <Mail size={24} color="#ea580c" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                  Continue with Email
                </h3>
              </div>

              <form onSubmit={handleEmailVerify}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Email Address:
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Enter 4-digit Email OTP:
                  </label>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        style={{ width: '44px', height: '48px', fontSize: '1.25rem', fontWeight: 700, textAlign: 'center', borderRadius: '8px', border: '1.5px solid #d97706', background: '#ffffff', color: '#d97706', outline: 'none', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  style={{ width: '100%', padding: '15px', borderRadius: '12px', background: '#ea580c', color: '#ffffff', fontWeight: 800, fontSize: '1.05rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(234, 88, 12, 0.3)' }}
                >
                  VERIFY EMAIL & PROCEED
                </button>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 6: FACEBOOK LOGIN DIALOG */}
          {/* ========================================================================= */}
          {step === 'FACEBOOK' && (
            <div style={{ width: '100%', textAlign: 'center', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', justifyContent: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                  Log In With Facebook
                </h3>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', marginBottom: '20px', background: '#f8fafc' }}>
                <div style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '14px' }}>
                  Sri Sri Yoga will receive your name, profile picture, and email address.
                </div>
                <button
                  type="button"
                  onClick={handleFacebookLoginSubmit}
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', background: '#1877F2', color: '#ffffff', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  Continue as Pragathi
                </button>
              </div>
            </div>
          )}

          {/* DIVIDER LINE BEFORE FOOTER */}
          <div style={{ width: '100%', height: '1px', background: '#f1f5f9', margin: '10px 0 10px 0' }}></div>

          {/* TERMS & PRIVACY FOOTER NOTE */}
          <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
            By continuing, you are agreeing to our<br />
            <button type="button" onClick={(e) => { e.preventDefault(); setIsTermsModalOpen(true); }} style={{ background: 'none', border: 'none', padding: 0, color: '#ea580c', fontWeight: 700, textDecoration: 'none', cursor: 'pointer', fontSize: 'inherit' }}>
              Terms & Conditions
            </button>
            {' '}and{' '}
            <button type="button" onClick={(e) => { e.preventDefault(); setIsPrivacyModalOpen(true); }} style={{ background: 'none', border: 'none', padding: 0, color: '#ea580c', fontWeight: 700, textDecoration: 'none', cursor: 'pointer', fontSize: 'inherit' }}>
              Privacy Policy
            </button>
          </p>

        </div>

        {/* BOTTOM DECORATIVE WARM WAVE GRADIENT (MATCHING SCREENSHOT) */}
        <div style={{ height: '36px', width: '100%', background: 'linear-gradient(to top, #ffedd5 0%, #fff7ed 60%, #ffffff 100%)', pointerEvents: 'none' }} />

      </div>
    </div>
  );
};
