import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Moon, Droplets, Sparkles, Heart, Sun, Check, ArrowRight } from 'lucide-react';
import aolLogoSwans from '../../assets/aol_logo_swans.png';

export const YogaOnboardingSurvey = () => {
  const { setCustomerScreen, setRegForm } = useApp();
  
  // Current screen stage: 0 (Multi-select goal) | 1 (Q1) | 2 (Q2) | 3 (Q3)
  const [currentStep, setCurrentStep] = useState(0);

  // User selections
  const [selectedBrings, setSelectedBrings] = useState([]);
  const [q1Frequency, setQ1Frequency] = useState('');
  const [q2Experience, setQ2Experience] = useState('');
  const [q3Feeling, setQ3Feeling] = useState('');

  const toggleBringOption = (optionId) => {
    if (selectedBrings.includes(optionId)) {
      setSelectedBrings(selectedBrings.filter(id => id !== optionId));
    } else {
      setSelectedBrings([...selectedBrings, optionId]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Save survey answers to context and proceed to CRM form
      setRegForm(prev => ({
        ...prev,
        surveyAnswers: {
          brings: selectedBrings,
          stressFrequency: q1Frequency,
          yogaExperience: q2Experience,
          desiredFeeling: q3Feeling
        }
      }));
      setCustomerScreen('CRM_FORM');
    }
  };

  const handleSkip = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCustomerScreen('CRM_FORM');
    }
  };

  // Step 0 Options (Multi-select) matching Calm screenshot 1
  const bringsOptions = [
    { id: 'sleep', label: 'Improve sleep quality', icon: <Moon size={20} color="#3b82f6" /> },
    { id: 'stress', label: 'Reduce stress or anxiety', icon: <Droplets size={20} color="#06b6d4" /> },
    { id: 'focus', label: 'Improve focus & clarity', icon: <Sparkles size={20} color="#a855f7" /> },
    { id: 'self', label: 'Self-improvement & mindfulness', icon: <Heart size={20} color="#ec4899" /> },
    { id: 'other', label: 'Something else', icon: <Sun size={20} color="#f97316" /> }
  ];

  // Question 1 Options
  const q1Options = [
    'Occasionally',
    'Frequently',
    'Every Day',
    'Never'
  ];

  // Question 2 Options
  const q2Options = [
    "I don't know how to",
    'I try different mindfulness techniques',
    'I distract myself',
    'None of the above'
  ];

  // Question 3 Options
  const q3Options = [
    'Calm and happy',
    'In control of my life',
    'More present',
    'All of the above'
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* AOL LOGO HEADER */}
      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img 
          src={aolLogoSwans} 
          alt="The Art of Living" 
          style={{ height: '48px', width: 'auto', marginBottom: '8px' }} 
        />
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Sri Sri School of Yoga • Personalization
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '560px', background: '#ffffff', borderRadius: '24px', padding: '36px 32px', boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)', border: '1px solid #e2e8f0' }}>
        
        {/* ========================================================================= */}
        {/* STEP 0: WHAT BRINGS YOU TO SRI SRI YOGA? (MULTI-SELECT) */}
        {/* ========================================================================= */}
        {currentStep === 0 && (
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', textAlign: 'center', marginBottom: '8px' }}>
              What brings you to Sri Sri Yoga?
            </h1>
            <p style={{ fontSize: '0.95rem', color: '#64748b', textAlign: 'center', marginBottom: '28px' }}>
              Select all that apply
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {bringsOptions.map((opt, idx) => {
                const isSelected = selectedBrings.includes(opt.id);
                // Vibrant border colors matching Calm style screenshot
                const borderColors = [
                  'linear-gradient(90deg, #4ade80, #38bdf8)',
                  'linear-gradient(90deg, #38bdf8, #818cf8)',
                  'linear-gradient(90deg, #818cf8, #c084fc)',
                  'linear-gradient(90deg, #c084fc, #f472b6)',
                  'linear-gradient(90deg, #f472b6, #fb7185)'
                ];
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleBringOption(opt.id)}
                    style={{
                      position: 'relative',
                      padding: '2px',
                      borderRadius: '9999px',
                      background: isSelected ? borderColors[idx % borderColors.length] : '#e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{
                      background: isSelected ? '#f0fdf4' : '#ffffff',
                      borderRadius: '9999px',
                      padding: '14px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {opt.icon}
                      </div>
                      <span style={{ flex: 1, fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>
                        {opt.label}
                      </span>
                      {isSelected && (
                        <div style={{ background: '#16a34a', color: '#ffffff', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 1: QUESTION 1 OF 3 */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ea580c', textAlign: 'center', marginBottom: '8px', letterSpacing: '0.5px' }}>
              Question 1 of 3
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', textAlign: 'center', marginBottom: '8px' }}>
              How often do you feel stressed?
            </h1>
            <p style={{ fontSize: '0.95rem', color: '#64748b', textAlign: 'center', marginBottom: '28px' }}>
              No pressure, there's no wrong answer 😇
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {q1Options.map((option) => {
                const isSelected = q1Frequency === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setQ1Frequency(option)}
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                      background: isSelected ? '#eff6ff' : '#ffffff',
                      color: isSelected ? '#1d4ed8' : '#1e293b',
                      fontSize: '1rem',
                      fontWeight: isSelected ? 700 : 500,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      <div style={{ background: '#2563eb', color: '#ffffff', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: QUESTION 2 OF 3 */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ea580c', textAlign: 'center', marginBottom: '8px', letterSpacing: '0.5px' }}>
              Question 2 of 3
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', textAlign: 'center', marginBottom: '8px' }}>
              How do you manage your stress now?
            </h1>
            <p style={{ fontSize: '0.95rem', color: '#64748b', textAlign: 'center', marginBottom: '28px' }}>
              You've come to the right place for help!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {q2Options.map((option) => {
                const isSelected = q2Experience === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setQ2Experience(option)}
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                      background: isSelected ? '#eff6ff' : '#ffffff',
                      color: isSelected ? '#1d4ed8' : '#1e293b',
                      fontSize: '1rem',
                      fontWeight: isSelected ? 700 : 500,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      <div style={{ background: '#2563eb', color: '#ffffff', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: QUESTION 3 OF 3 */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ea580c', textAlign: 'center', marginBottom: '8px', letterSpacing: '0.5px' }}>
              Question 3 of 3
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', textAlign: 'center', marginBottom: '8px' }}>
              How would you like to feel every day?
            </h1>
            <p style={{ fontSize: '0.95rem', color: '#64748b', textAlign: 'center', marginBottom: '28px' }}>
              Tip: Imagine if you didn't feel anxious or stressed.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {q3Options.map((option) => {
                const isSelected = q3Feeling === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setQ3Feeling(option)}
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                      background: isSelected ? '#eff6ff' : '#ffffff',
                      color: isSelected ? '#1d4ed8' : '#1e293b',
                      fontSize: '1rem',
                      fontWeight: isSelected ? 700 : 500,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      <div style={{ background: '#2563eb', color: '#ffffff', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FOOTER BUTTONS: CONTINUE & SKIP FOR NOW */}
        {/* ========================================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            type="button"
            onClick={handleNext}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              color: '#ffffff',
              fontSize: '1.05rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
              transition: 'all 0.15s ease'
            }}
          >
            {currentStep === 3 ? 'Continue to Registration' : 'Continue'}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '9999px',
              background: '#e2e8f0',
              color: '#475569',
              fontSize: '0.95rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Skip for now
          </button>
        </div>

      </div>
    </div>
  );
};
