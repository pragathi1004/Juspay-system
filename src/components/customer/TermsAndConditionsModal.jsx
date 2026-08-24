import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, FileText } from 'lucide-react';

export const TermsAndConditionsModal = () => {
  const { isTermsModalOpen, setIsTermsModalOpen } = useApp();

  if (!isTermsModalOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={() => setIsTermsModalOpen(false)}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#fef3c7', padding: '8px', borderRadius: '10px', color: '#d97706', display: 'flex' }}>
              <FileText size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Terms & Conditions
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                The Art of Living Program Participation & Subscription Terms
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsTermsModalOpen(false)}
            aria-label="Close modal"
            style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* MODAL SCROLLABLE CONTENT */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, textAlign: 'left' }}>
          
          {/* SECTION 1: PROGRAM PARTICIPATION & DECLARATION */}
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '14px', padding: '16px 18px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#92400e', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={18} color="#d97706" /> Program Participation Declaration
            </h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#78350f', lineHeight: 1.55 }}>
              I am participating in this ‘Art of Living’ program of my own interest and I take full responsibility for my participation. I release The Art of Living, all its organisers, teachers and assistants in this program from all damages whatsoever, and waive all rights to compensation in case of injury. I declare that I am physically and mentally fit to participate in this program. I will not teach any techniques of the program unless I have been fully personally trained by Gurudev Sri Sri Ravi Shankar. I will keep the contents of the program and the techniques revealed to me during the program confidential.
            </p>
          </div>

          {/* SECTION 2: COMMUNICATIONS & WHATSAPP */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
              Communication & Updates Consent
            </h4>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.875rem' }}>
              I would like to receive updates & communication related to this program from The Art of Living on WhatsApp for the mobile number provided during the registration. This will not be applicable if the provided mobile number is not registered with WhatsApp, instead will receive confirmation through SMS.
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px dashed #cbd5e1', margin: '20px 0' }} />

          {/* SECTION 3: SUBSCRIPTIONS AND AUTOMATIC RENEWAL */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Subscriptions and Automatic Renewal
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
            This section sets out the terms that apply to paid subscriptions for Daily Yoga services (the “Subscription”).
          </p>

          {/* SUB-SECTIONS A THROUGH H */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                a. Recurring Subscriptions
              </h4>
              <p style={{ margin: 0, color: '#475569' }}>
                If you purchase a recurring Daily Yoga Subscription (“Recurring Subscription”), your Subscription will remain active for the subscription period you select and will automatically renew for another subscription period of the same duration unless you cancel it before the renewal date.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                By purchasing a Recurring Subscription and authorizing automatic renewal, you authorize Daily Yoga and its authorized payment service provider to charge your selected payment method for the applicable subscription fee at the beginning of each renewal period, together with any applicable taxes or fees.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                The renewal amount will be the then-current price applicable to your selected Subscription plan. If the Subscription price changes, we will provide notice of the change before the applicable renewal, where required.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                Recurring payments will be processed through the applicable payment method and recurring-payment or e-mandate mechanism supported by our payment service provider. You may receive a pre-debit notification or other payment communication before a scheduled renewal, as required by applicable law and payment-system rules.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                If we are unable to successfully process the renewal payment, your Subscription may not renew or your access may be suspended until the outstanding payment is successfully completed. You remain responsible for any applicable unpaid amounts.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                b. Subscription Period and Access
              </h4>
              <p style={{ margin: 0, color: '#475569' }}>
                Your Subscription provides access to the Daily Yoga services included in the plan you selected for the applicable subscription period. The Subscription period may be monthly, quarterly, annual, or any other period offered by Daily Yoga at the time of purchase.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                Your access will continue until the end of the paid subscription period, unless your Subscription is suspended or terminated in accordance with these Terms.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                c. Cancellation of Automatic Renewal
              </h4>
              <p style={{ margin: 0, color: '#475569' }}>
                You may cancel your Recurring Subscription at any time before the next scheduled renewal to prevent the Subscription from automatically renewing. To avoid being charged for the next subscription period, you must cancel your Subscription before the renewal date or within the cancellation period specified during the purchase process.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                If you purchased your Subscription through Daily Yoga’s website, you may cancel automatic renewal through your account or the subscription-management option provided by Daily Yoga. If you purchased your Subscription through a third-party platform or payment provider, you may be required to cancel the recurring payment or subscription through that platform.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                Cancellation of automatic renewal does not immediately terminate your current paid Subscription. If you cancel after a renewal payment has been successfully processed, you will generally continue to have access to the Subscription until the end of the applicable paid subscription period, subject to our refund policy.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                d. Renewal Payments
              </h4>
              <p style={{ margin: 0, color: '#475569' }}>
                At the time of purchase, you will be shown the applicable Subscription price, billing frequency, and automatic-renewal terms. When your Subscription reaches its renewal date, the applicable renewal amount will be charged automatically to your authorized payment method, subject to applicable payment-system requirements.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                You are responsible for ensuring that your payment method remains valid and capable of processing the renewal payment. If a renewal payment fails, Daily Yoga may notify you and may provide an opportunity to update your payment method or complete the payment manually. If payment remains unsuccessful, your Subscription may expire or access to paid features may be restricted.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                e. Changes to Subscription or Pricing
              </h4>
              <p style={{ margin: 0, color: '#475569' }}>
                Daily Yoga may modify its Subscription plans, features, pricing, or billing periods from time to time. If there is a material change to the price or other important terms of your Recurring Subscription, we will provide notice in advance where required by applicable law.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                If you do not wish to continue your Subscription following a price or material-term change, you may cancel your automatic renewal before the next renewal date.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                f. Refunds
              </h4>
              <p style={{ margin: 0, color: '#475569' }}>
                Subscription payments are generally non-refundable once a subscription period has started, except where a refund is required by applicable law or is otherwise provided under Daily Yoga’s refund policy. Cancellation of automatic renewal will prevent future renewal charges but does not, by itself, create a right to a refund for the current subscription period.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                g. Promotional Offers and Free Trials
              </h4>
              <p style={{ margin: 0, color: '#475569' }}>
                From time to time, Daily Yoga may offer promotional pricing, discounted subscriptions, introductory offers, or free trials. Unless otherwise stated at the time of purchase, a promotional or trial subscription may automatically convert into a paid Recurring Subscription at the end of the promotional or trial period.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                The applicable renewal price, renewal date, subscription duration, and automatic-renewal terms will be displayed before or during the purchase process. You may cancel before the end of the promotional or trial period to prevent the subsequent charge, subject to the cancellation requirements communicated at the time of purchase.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                h. Payment Authorization
              </h4>
              <p style={{ margin: 0, color: '#475569' }}>
                By selecting a Recurring Subscription and completing the payment authorization process, you confirm that you understand and agree that the Subscription will automatically renew until cancelled.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                You authorize Daily Yoga and its authorized payment service provider to process recurring payments in accordance with the applicable payment authorization, subject to applicable laws, regulations, and payment-network requirements.
              </p>
              <p style={{ marginTop: '8px', color: '#475569' }}>
                You can withdraw or cancel the recurring payment authorization by cancelling your Subscription through the applicable subscription-management mechanism, subject to the terms described above.
              </p>
            </div>

          </div>

        </div>

        {/* MODAL FOOTER */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setIsTermsModalOpen(false)}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(234, 88, 12, 0.25)'
            }}
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
