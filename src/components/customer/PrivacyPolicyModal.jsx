import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, Lock, ExternalLink } from 'lucide-react';

export const PrivacyPolicyModal = () => {
  const { isPrivacyModalOpen, setIsPrivacyModalOpen } = useApp();

  if (!isPrivacyModalOpen) return null;

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
      onClick={() => setIsPrivacyModalOpen(false)}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '720px',
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
            <div style={{ background: '#dbeafe', padding: '8px', borderRadius: '10px', color: '#2563eb', display: 'flex' }}>
              <Lock size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Privacy Policy
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                The Art of Living Data Protection & Privacy Commitment
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsPrivacyModalOpen(false)}
            aria-label="Close modal"
            style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* MODAL SCROLLABLE CONTENT */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, textAlign: 'left' }}>
          
          {/* SECTION I: INTRODUCTION */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              I. INTRODUCTION
            </h3>
            <p style={{ margin: '0 0 8px 0', color: '#475569' }}>
              This Privacy Policy is entered into by and between The Art of Living, India (the “Organisation”) and you.
            </p>
            <p style={{ margin: '0 0 8px 0', color: '#475569' }}>
              The organisation understands that your privacy is important to you and that you care about how your information is used and shared. We respect and value the privacy of everyone who visits our website and will only collect and use information in ways that are useful to you and in a manner consistent with your rights and our obligations under applicable law.
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              This Privacy Policy applies to our use of any and all data collected by us in relation to your use of our website. Please read this Privacy Policy carefully and ensure that you understand it. Your acceptance of our Privacy Policy is deemed to occur upon your first visit to our website. If you do not accept and agree to this Privacy Policy, you must stop using our website immediately.
            </p>
          </div>

          {/* SECTION II: PURPOSE */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              II. PURPOSE
            </h3>
            <p style={{ margin: 0, color: '#475569' }}>
              The Organisation is committed to international compliance with data protection laws. This Privacy Policy applies worldwide to the Organisation and is based on globally accepted, basic principles of data protection. The Privacy Policy provides one of the necessary framework conditions for cross-border data transmission among the Organisation.
            </p>
          </div>

          {/* SECTION III: APPLICATION OF NATIONAL LAWS */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              III. APPLICATION OF NATIONAL LAWS
            </h3>
            <p style={{ margin: 0, color: '#475569' }}>
              This Privacy Policy comprises the internationally accepted data privacy principles without replacing the existing national laws. It supplements the national data privacy laws. The relevant national law will take precedence in the event that it conflicts with this Privacy Policy, or it has stricter requirements than this Privacy Policy. The content of this Privacy Policy will be observed in the absence of corresponding national legislation. In the event of conflicts between national legislation and the Privacy Policy, the Organisation will work to find a practical solution that meets the purpose of the Privacy Policy.
            </p>
          </div>

          {/* SECTION IV: SCOPE */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              IV. SCOPE
            </h3>
            <p style={{ margin: '0 0 8px 0', color: '#475569' }}>
              This Privacy Policy applies only to your use of our website. It does not extend to any websites that are linked to from our website (whether we provide those links or whether they are shared by other users). We have no control over how your data is collected, stored or used by other websites and we advise you to check the privacy policies of any such websites before providing any data to them.
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              Our website is not intended for individuals under 18 years of age, without the valid consent of their parent or guardian. If we learn that we have collected or received personal information from an individual under age 18 without verification of legal guardian or parental consent, we will delete that information. If you believe that we might have any information from or about a child under age 18, please contact us at <a href="mailto:webmaster@artofliving.org" style={{ color: '#2563eb', fontWeight: 600 }}>webmaster@artofliving.org</a>.
            </p>
          </div>

          {/* SECTION V: DATA COLLECTION */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              V. DATA COLLECTION
            </h3>
            <p style={{ margin: 0, color: '#475569' }}>
              Some data will be collected automatically by our website, other data will only be collected if you voluntarily submit it and consent to us using it for the purposes set out herein. Automatically collected data includes (1) Information about the browser type and version used; User information: Frequency, recency, # sessions, page visits, usage details, clicks, traffic data, website navigation paths (2) your operating system; Platform/device (3) your Internet service provider; (4) your System, computer details and internet connection, IP address; (4) Internal searches: search terms and categories (5) Date and time of access, E-commerce transaction details if any (6) Session: Duration, bounce rates (7) Traffic sources (8) Adwords. In the event of abuse, we may block certain IP addresses.
            </p>
          </div>

          {/* SECTION VI: USE OF DATA */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              VI. USE OF DATA
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#475569' }}>
              <p style={{ margin: 0 }}><strong>a)</strong> All personal data is stored securely in a manner that reasonably protects it from misuse and loss and from unauthorized access, modification or disclosure.</p>
              <p style={{ margin: 0 }}><strong>b)</strong> We use your data for: (i) Providing and managing your account; (ii) Providing and managing your access to our website; (iii) Personalising and tailoring your experience on our website; (iv) Supplying our products and services to you; (v) Personalising and tailoring our products and services for you; (vi) Responding to communications from you; (vii) Supplying you with newsletters, alerts etc. via email, that you may have subscribed to and that you may unsubscribe or opt-out at any time by clicking on the unsubscribe link from such emails or from your account profile; (viii) Market research and (ix) Analysing your use of our website and gathering feedback to enable us to continually improve our website and your user experience.</p>
              <p style={{ margin: 0 }}><strong>c)</strong> In some cases, the collection of data may be a statutory or contractual requirement, and we will be limited in the products and services we can provide you without your consent for us to be able to use such data.</p>
              <p style={{ margin: 0 }}><strong>d)</strong> With your permission and/or where permitted by law, we may also use your data for marketing purposes which may include contacting you by email, telephone, text message, post and/or messaging services with information, news and offers on our products and/or services. We will not, however, send you any unsolicited marketing or spam and will take all reasonable steps to ensure that we fully protect your rights and comply with our obligations under the applicable relevant laws.</p>
              <p style={{ margin: 0 }}><strong>e)</strong> Advertisers whose content appears on our website may engage in what is known as “behavioural advertising” – advertising which is tailored to your preferences, based on your activity. Your activity is monitored using Cookies, as detailed in our Cookie Policy. Please note that we do not control the activities of such advertisers, nor the information they collect and use.</p>
              <p style={{ margin: 0 }}><strong>f)</strong> Legal basis: We will ensure that your personal data is processed lawfully, fairly, and transparently, without adversely affecting your rights. We will only process your personal data if at least one of the following basis applies: (i) you have given consent to the processing of your personal data for one or more specific purposes; (ii) processing is necessary for the performance of a contract to which you are a party or in order to take steps at the request of you prior to entering into a contract; (iii) processing is necessary for compliance with a legal obligation to which we are subject; (iv) processing is necessary to protect the vital interests of you or of another natural person; (v) processing is necessary for the performance of a task carried out in the public interest or in the exercise of official authority vested in the controller and/or processing is necessary for the purposes of the legitimate interests pursued by us or by a third party, except where such interests are overridden by the fundamental rights and freedoms of the data subject which require protection of personal data, in particular where the data subject is a child.</p>
              <p style={{ margin: 0 }}><strong>g)</strong> Sensitive Information: Sensitive information as defined under the relevant national data privacy laws, will be used by us only: (i) for the primary purpose for which it was obtained; and/or (ii) with your consent; or where required or authorized by applicable law.</p>
            </div>
          </div>

          {/* SECTION VII: STORAGE OF DATA */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              VII. STORAGE OF DATA
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#475569' }}>
              <p style={{ margin: 0 }}><strong>a)</strong> We only keep your data for as long as we need to in order to use it as described in the above section (Use of Data), and/or for as long as we have your permission to keep it. In any event, we will conduct an annual review to ascertain whether we need to keep your data. Your data will be deleted if we no longer need it for the purpose for which it was obtained, we will take reasonable steps to destroy or permanently de-identify your data.</p>
              <p style={{ margin: 0 }}><strong>b)</strong> Some or all of your data may be stored outside of your country of domicile. You accept and agree to this by using our website and submitting information to us. If we do store outside of your country of domicile, we will take all reasonable steps to ensure that your data is treated as safely and securely as it would be within your country of domicile.</p>
              <p style={{ margin: 0 }}><strong>c)</strong> Data security is of great importance to us, and to protect your data we have put in place suitable physical, electronic and managerial procedures to safeguard and secure data collected through our website. Notwithstanding the security measures that we take, it is important to remember that the transmission of data via the internet may not be completely secure and that you are advised to take suitable precautions when transmitting data to us via the internet.</p>
            </div>
          </div>

          {/* SECTION VIII: SHARING OF DATA */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              VIII. SHARING OF DATA
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#475569' }}>
              <p style={{ margin: 0 }}><strong>a)</strong> We may contract with third parties to supply products and services to you on our behalf. These may include payment processing, delivery of goods, search engine facilities, advertising, and marketing. In some cases, the third parties may require access to some or all of your data. Where any of your data is required for such a purpose, we will take all reasonable steps to ensure that your data will be handled safely, securely, and in accordance with your rights, our obligations, and the obligations of the third party under applicable relevant law.</p>
              <p style={{ margin: 0 }}><strong>b)</strong> We may compile statistics about the use of our website including data on traffic, usage patterns, user numbers, sales and other information. All such data will be anonymized and will not include any personally identifying information. We may from time to time share such data with third parties. Data will only be shared and used within the bounds of the law. In certain circumstances, we may be legally required to share certain data held by us, which may include your personal information, for example, where we are involved in legal proceedings, where we are complying with the requirements of legislation, a court order, or a governmental authority. We do not require any further consent from you in order to share your data in such circumstances and will comply as required by any legally binding request that is made of us.</p>
            </div>
          </div>

          {/* SECTION IX: USER OPTIONS */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              IX. USER OPTIONS
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#475569' }}>
              <p style={{ margin: 0 }}><strong>a)</strong> When you submit information via our website, you may be given options to restrict our use of your data. We aim to give you strong controls on our use of your data (including the ability to opt-out of receiving emails from us which you may do by unsubscribing using the links provided in our emails and by managing your account preferences).</p>
              <p style={{ margin: 0 }}><strong>b)</strong> You may also wish to sign up to one or more of the preference services operating in your country. These may help to prevent you receiving unsolicited marketing. Please note, however, that these services will not prevent you from receiving marketing communications that you have consented to receive.</p>
              <p style={{ margin: 0 }}><strong>c)</strong> It is important to us that your data is up to date. We will take reasonable steps to make sure that your data is accurate, complete and up to date. If you find that the information we have is not up to date or is inaccurate, please advise us as soon as practicable so we can update our records and ensure we can continue to provide quality services to you.</p>
            </div>
          </div>

          {/* SECTION X: RIGHT TO WITHDRAW INFORMATION */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              X. RIGHT TO WITHDRAW INFORMATION
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#475569' }}>
              <p style={{ margin: 0 }}><strong>a)</strong> You may access certain areas of our website without providing any data at all. However, to use all features and functions available on our website you may be required to submit or allow for the collection of certain data.</p>
              <p style={{ margin: 0 }}><strong>b)</strong> You may restrict your internet browser’s use of Cookies.</p>
              <p style={{ margin: 0 }}><strong>c)</strong> You may withdraw your consent for us to use your personal data at any time by deleting your account or by contacting us using the details set out herein below, and we will delete your data from our systems. However, you acknowledge this may limit our ability to provide the best possible products and services to you.</p>
            </div>
          </div>

          {/* SECTION XI: ACCESS TO DATA */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              XI. ACCESS TO DATA
            </h3>
            <p style={{ margin: '0 0 8px 0', color: '#475569' }}>
              You may access your personal data we hold about you and to update and/or correct it, subject to certain exceptions. If you wish to access your personal data, please access it through your account.
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              On request by you, we will not charge any fee for your access request but may charge an administrative fee for providing a copy of your personal data, unless otherwise requested by you, the information shall be provided in a commonly used electronic form. In order to protect your personal data, we may require identification from you before releasing the requested information.
            </p>
          </div>

          {/* SECTION XII: SUMMARY RIGHTS */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              XII. SUMMARY RIGHTS
            </h3>
            <p style={{ margin: 0, color: '#475569' }}>
              You have the right to: (i) request access to, deletion of or correction of, your personal data held by us; (ii) complain to a supervisory authority; (iii) be informed of what data processing is taking place; (iv) restrict processing; (v) data portability; (vi) object the processing of your personal data; (vii) automated decision-making and profiling.
            </p>
          </div>

          {/* SECTION XIII: AUTOMATED DECISION-MAKING AND PROFILING */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              XIII. AUTOMATED DECISION-MAKING AND PROFILING
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#475569' }}>
              <p style={{ margin: 0 }}><strong>a)</strong> In the event that we use personal data for the purposes of automated decision-making and those decisions have a legal (or similarly significant effect) on you, you have the right to challenge such decisions, requesting human intervention, expressing their own point of view, and obtaining an explanation of the decision from us.</p>
              <p style={{ margin: 0 }}><strong>b)</strong> The right described in the section above does not apply in the following circumstances: (i) the decision is necessary for the entry into, or performance of, a contract between you and us; (ii) the decision is authorized by law; or (iii) you have given your explicit consent.</p>
              <p style={{ margin: 0 }}><strong>c)</strong> Where we use your personal data for profiling purposes, the following shall apply: (i) clear information explaining the profiling will be provided, including its significance and the likely consequences; (ii) appropriate mathematical or statistical procedures will be used; (iii) technical and organisational measures necessary to minimise the risk of errors and to enable such errors to be easily corrected shall be implemented; and (iv) all personal data processed for profiling purposes shall be secured in order to prevent discriminatory effects arising out of profiling.</p>
            </div>
          </div>

          {/* SECTION XIV: CONTACT US */}
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e40af', marginBottom: '4px' }}>
              XIV. CONTACT US
            </h3>
            <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.875rem' }}>
              If you have any questions about our website or this Privacy Policy, please contact us by email at <a href="mailto:webmaster@artofliving.org" style={{ color: '#2563eb', fontWeight: 700 }}>webmaster@artofliving.org</a>. Please ensure that your query is clear, particularly if it is a request for information about the data we hold about you.
            </p>
          </div>

          {/* SECTION XV: CHANGES TO THE PRIVACY POLICY */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              XV. CHANGES TO THE PRIVACY POLICY
            </h3>
            <p style={{ margin: 0, color: '#475569' }}>
              We may change this Privacy Policy as we may deem necessary from time to time, or as may be required by law. Any changes will be immediately posted on our website and you will be deemed to have accepted the terms of the Privacy Policy on your first use of our website following the alterations. We recommend that you check this page regularly to keep up-to-date.
            </p>
          </div>

          {/* SECTION XVII: LANGUAGE */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              XVII. LANGUAGE
            </h3>
            <p style={{ margin: 0, color: '#475569' }}>
              This Privacy Policy was prepared and written in English. Any non-English translations of this Privacy Policy which may be made available are provided for convenience only and are not legally binding.
            </p>
          </div>

          {/* SECTION XVIII: EUROPEAN ECONOMIC AREA */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              XVIII. APPLICABLE FOR PERSONS FROM THE EUROPEAN ECONOMIC AREA
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#475569' }}>
              <p style={{ margin: 0 }}><strong>a) Legal Framework:</strong> It has been concluded by the European Commission that particular countries outside of the European Economic Area (the “EEA” which consists of all European Union member states, plus Norway, Iceland, and Liechtenstein) require to adequately protect personal data. Where data is being transferred from the EEA to other countries, we shall comply with legal frameworks that ascertain an equivalent level of protection with European Union law.</p>
              <p style={{ margin: 0 }}><strong>b) Privacy Shield Frameworks:</strong> We shall comply with the EU-US and Swiss-US Privacy Shield Frameworks as set forth by the US Department of Commerce regarding the collection, use, and retention of personal information from European Union member countries and Switzerland, respectively.</p>
              <p style={{ margin: 0 }}><strong>c) Model Contract Clauses:</strong> The Organisation shares personal information within the Organisation and to other trusted businesses or persons to process it for us, based on our guidelines and in compliance with this Privacy Policy and any other appropriate confidentiality and security measures. Your information may be transferred, or stored and processed in other countries outside of where you live for the purposes as described in this Privacy Policy.</p>
              <p style={{ margin: 0 }}><strong>d) Data Protection Officer (DPO):</strong> If, after contacting us, you feel that your concerns have not been addressed to your satisfaction, you can contact our data protection officer (“DPO”) at <a href="mailto:webmaster@artofliving.org" style={{ color: '#2563eb', fontWeight: 600 }}>webmaster@artofliving.org</a>.</p>
            </div>
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setIsPrivacyModalOpen(false)}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              background: '#2563eb',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
            }}
          >
            Close Privacy Policy
          </button>
        </div>

      </div>
    </div>
  );
};
