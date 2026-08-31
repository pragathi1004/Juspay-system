import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Smile, 
  Dumbbell, 
  Droplets, 
  Scale, 
  Activity, 
  Compass, 
  Sun, 
  UserCheck, 
  Users, 
  Sparkles, 
  Award, 
  Clock, 
  Check 
} from 'lucide-react';
import aolLogoSwans from '../../assets/aol_logo_swans.png';

export const YogaOnboardingSurvey = () => {
  const { setCustomerScreen, setRegForm } = useApp();

  // Current screen stage: 1 | 2 | 3
  const [currentStep, setCurrentStep] = useState(1);

  // User selections
  const [selectedBrings, setSelectedBrings] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

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
      // Save survey answers to context and proceed to Membership Plans view
      setRegForm(prev => ({
        ...prev,
        surveyAnswers: {
          brings: selectedBrings,
          experience: selectedExperience,
          dailyTime: selectedTime
        }
      }));
      setCustomerScreen('PUBLIC_LANDING');
      setTimeout(() => {
        const el = document.getElementById('membership-plans');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSkip = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCustomerScreen('PUBLIC_LANDING');
      setTimeout(() => {
        const el = document.getElementById('membership-plans');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Step 1 / 3: What brings you to Sri Sri Yoga? (Multi-select)
  const bringsOptions = [
    { id: 'flexibility', label: 'Improve flexibility & mobility', icon: <Smile size={20} color="#16a34a" /> },
    { id: 'strength', label: 'Build strength & stamina', icon: <Dumbbell size={20} color="#ea580c" /> },
    { id: 'stress', label: 'Reduce stress & anxiety', icon: <Droplets size={20} color="#0284c7" /> },
    { id: 'weight', label: 'Weight management', icon: <Scale size={20} color="#9333ea" /> },
    { id: 'pain', label: 'Relieve body pain', icon: <Activity size={20} color="#ec4899" /> },
    { id: 'mindfulness', label: 'Self-improvement & mindfulness', icon: <Compass size={20} color="#0d9488" /> },
    { id: 'other', label: 'Something else', icon: <Sun size={20} color="#f97316" /> }
  ];

  // Step 2 / 3: What is your current yoga experience? (Single-select)
  const experienceOptions = [
    {
      id: 'beginner',
      title: 'Complete Beginner',
      subtitle: 'New to yoga or just getting started',
      icon: <UserCheck size={24} color="#d97706" />
    },
    {
      id: 'some',
      title: 'Some Experience',
      subtitle: 'I have tried yoga before',
      icon: <Users size={24} color="#d97706" />
    },
    {
      id: 'regular',
      title: 'Regular Practitioner',
      subtitle: 'I practice yoga regularly',
      icon: <Sparkles size={24} color="#d97706" />
    },
    {
      id: 'advanced',
      title: 'Advanced Yogi',
      subtitle: 'I have been practicing for a long time',
      icon: <Award size={24} color="#d97706" />
    }
  ];

  // Step 3 / 3: How much time can you dedicate to yoga each day? (Single-select)
  const timeOptions = [
    { id: '15-20', label: '15–20 Minutes' },
    { id: '30-45', label: '30–45 Minutes' },
    { id: '45-60', label: '45–60 Minutes' },
    { id: '60+', label: '60+ Minutes' }
  ];

  return (
    <div style={{ background: '#fcf8f2', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* MAIN QUESTIONNAIRE CONTAINER CARD (MATCHING SCREENSHOTS 1, 2 & 3) */}
      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: '#ffffff',
        borderRadius: '24px',
        padding: '28px 24px',
        boxShadow: '0 12px 36px rgba(180, 140, 90, 0.08)',
        border: '1px solid #f0e6d8',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* HEADER: AOL LOGO & STEP COUNTER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ flex: 1 }} />
          <img 
            src={aolLogoSwans} 
            alt="The Art of Living" 
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
          />
          <div style={{ flex: 1, textAlign: 'right', fontSize: '0.9rem', fontWeight: 700, color: '#b47b2b' }}>
            {currentStep} / 3
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCREEN 1 / 3: WHAT BRINGS YOU TO SRI SRI YOGA? */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', textAlign: 'center', marginBottom: '6px', lineHeight: 1.25 }}>
              What brings you to Sri Sri Yoga?
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#666666', textAlign: 'center', marginBottom: '20px', marginTop: 0 }}>
              Select all that apply
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {bringsOptions.map((opt) => {
                const isSelected = selectedBrings.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleBringOption(opt.id)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid #e07a1e' : '1px solid #f0e6d8',
                      background: isSelected ? '#fffbf5' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {opt.icon}
                    </div>
                    <span style={{ flex: 1, fontSize: '0.92rem', fontWeight: isSelected ? 700 : 600, color: '#1a1a1a' }}>
                      {opt.label}
                    </span>
                    {isSelected && (
                      <div style={{ background: '#e07a1e', color: '#ffffff', borderRadius: '50%', padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 2 / 3: WHAT IS YOUR CURRENT YOGA EXPERIENCE? */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', textAlign: 'center', marginBottom: '6px', lineHeight: 1.25 }}>
              What is your current yoga experience?
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#666666', textAlign: 'center', marginBottom: '24px', marginTop: 0 }}>
              No pressure, there's no right or wrong answer
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {experienceOptions.map((opt) => {
                const isSelected = selectedExperience === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedExperience(opt.id)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid #e07a1e' : '1px solid #f0e6d8',
                      background: isSelected ? '#fffbf5' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {opt.icon}
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '2px' }}>
                        {opt.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#777777' }}>
                        {opt.subtitle}
                      </div>
                    </div>
                    {isSelected && (
                      <div style={{ background: '#e07a1e', color: '#ffffff', borderRadius: '50%', padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 3 / 3: HOW MUCH TIME CAN YOU DEDICATE TO YOGA EACH DAY? */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', textAlign: 'center', marginBottom: '6px', lineHeight: 1.25 }}>
              How much time can you dedicate to yoga each day?
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#666666', textAlign: 'center', marginBottom: '24px', marginTop: 0 }}>
              Choose what works best for you
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {timeOptions.map((opt) => {
                const isSelected = selectedTime === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedTime(opt.id)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid #e07a1e' : '1px solid #f0e6d8',
                      background: isSelected ? '#fffbf5' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Clock size={22} color="#b47b2b" />
                    </div>
                    <span style={{ flex: 1, fontSize: '0.98rem', fontWeight: 700, color: '#1a1a1a', textAlign: 'left' }}>
                      {opt.label}
                    </span>
                    {isSelected && (
                      <div style={{ background: '#e07a1e', color: '#ffffff', borderRadius: '50%', padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FOOTER BUTTONS: CONTINUE & SKIP FOR NOW */}
        {/* ========================================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={handleNext}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              background: '#e07a1e',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(224, 122, 30, 0.25)',
              transition: 'all 0.15s ease'
            }}
          >
            {currentStep === 3 ? 'Continue to Plans' : 'Continue'}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '14px',
              background: '#f7f1e5',
              color: '#a87832',
              fontSize: '0.9rem',
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
