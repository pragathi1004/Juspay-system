import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Calendar, PhoneCall, Check, ArrowLeft, RefreshCw, AlertCircle, X } from 'lucide-react';

export const CrmRegistrationForm = () => {
  const { regForm, setRegForm, setCustomerScreen, selectedPlanForCheckout, setIsJuspayModalOpen } = useApp();

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const [termsAgreed, setTermsAgreed] = useState(regForm.termsAgreed);
  const [optOutAgreed, setOptOutAgreed] = useState(regForm.optOutAgreed);
  const [showError, setShowError] = useState(false);

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
              
              {/* First Name & Last Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={regForm.firstName}
                    onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f9fafb', fontSize: '0.95rem' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={regForm.lastName}
                    onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#f9fafb', fontSize: '0.95rem' }}
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
                    onChange={(e) => setRegForm({ ...regForm, postalCode: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
                    required
                  />
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
                    {regForm.cityState}
                  </div>
                </div>
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

      {/* TERMS AND CONDITIONS MODAL */}
      {isTermsModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.5)', padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>Terms & Conditions</h2>
              <button onClick={() => setIsTermsModalOpen(false)} style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4b5563' }}>
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Body (Scrollable) */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>1. Subscription Terms</h3>
              <p style={{ marginBottom: '16px' }}>
                <strong>1.1. Billing Cycle and Payment Terms.</strong> Your Sri Sri Yoga subscription will continue until terminated. To purchase a subscription, you will need to add one or more Payment Methods to your account. "Payment Method" means a current, valid, accepted method of payment, as may be updated from time to time.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Unless you cancel your subscription before your billing date, you authorize us to charge the subscription fee for the next billing cycle to your Payment Method (see "Cancellation" below). The subscription fee and any other charges you may incur in connection with your use of the service, such as taxes and possible transaction fees, will be charged to your Payment Method on the specific payment date indicated on your dashboard.
              </p>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '12px', marginTop: '24px' }}>2. Cancellation</h3>
              <p style={{ marginBottom: '16px' }}>
                <strong>2.1. Cancellation.</strong> You can cancel your Sri Sri Yoga subscription at any time. To cancel, go to your Participant Dashboard and follow the instructions for cancellation ("Turn Off Future Renewal"). The cancellation will take effect at the end of the current billing period.
              </p>
              <p style={{ marginBottom: '16px' }}>
                To the extent permitted by the applicable law, payments are non-refundable and we do not provide refunds or credits for any partial subscription periods or unused content. You can see when your subscription will end on your dashboard.
              </p>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '12px', marginTop: '24px' }}>3. E-Mandate / Autopay</h3>
              <p style={{ marginBottom: '16px' }}>
                By checking the agreement box on the registration form, you authorize Sri Sri School of Yoga and our payment partner (Juspay) to automatically debit your chosen payment method (Credit/Debit Card, UPI, or NetBanking) upon subscription expiry according to RBI E-Mandate / Standing Instruction guidelines. Pre-debit notifications will be sent via SMS & Email 3 days prior to the debit date.
              </p>
            </div>
            
            {/* Modal Footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', background: '#f9fafb', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', flexShrink: 0 }}>
              <button onClick={() => setIsTermsModalOpen(false)} style={{ background: '#facc15', color: '#111827', fontWeight: 700, padding: '10px 24px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                I Understand
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

