import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PLAN_SPECS } from '../../data/planSpecs';
import { DailyYogaAuthModal } from './DailyYogaAuthModal';
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
  Check,
  X,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import aolLogoSwans from '../../assets/aol_logo_swans.png';

export const YogaOnboardingSurvey = () => {
  const { setCustomerScreen, setRegForm, setSelectedPlanForCheckout, selectedLanguage, setSelectedLanguage, setUserFlow } = useApp();

  // Current screen stage: 1 | 2 | 3 | 4 (Choose Plan)
  const [currentStep, setCurrentStep] = useState(1);

  // User survey selections
  const [selectedBrings, setSelectedBrings] = useState(['flexibility', 'stress']);
  const [selectedExperience, setSelectedExperience] = useState('some');
  const [selectedTime, setSelectedTime] = useState('30-45');

  // Plan Selection stage (Step 4)
  const [selectedPlanCode, setSelectedPlanCode] = useState('YOGA_12M');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languages = [
    'English / हिन्दी',
    'Telugu (తెలుగు)',
    'Malayalam (മലയാളം)',
    'Gujarati (ગુજરાતી)',
    'Kannada (ಕನ್ನಡ)',
    'Tamil (தமிழ்)',
    'Marathi (मराठी)'
  ];

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
      // Save survey answers to context and move to Step 4 (Choose Plan & Language)
      setRegForm(prev => ({
        ...prev,
        surveyAnswers: {
          brings: selectedBrings,
          experience: selectedExperience,
          dailyTime: selectedTime
        }
      }));
      setCurrentStep(4);
    }
  };

  const handleSkip = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Skip questions and move directly to Step 4 (Choose Plan)
      setCurrentStep(4);
    }
  };

  const handleGetStartedFromPlan = () => {
    const chosenPlan = PLAN_SPECS.find(p => p.code === selectedPlanCode) || PLAN_SPECS[0];
    setSelectedPlanForCheckout(chosenPlan);
    setUserFlow('NEW_LEAD');
    setIsAuthModalOpen(true);
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
      
      {/* AUTH & REGISTRATION MODAL */}
      <DailyYogaAuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialStep="PHONE"
      />

      {/* ========================================================================= */}
      {/* SCREENS 1, 2, 3: ONBOARDING SURVEY QUESTIONS */}
      {/* ========================================================================= */}
      {currentStep <= 3 ? (
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
          
          {/* HEADER: BACK ARROW, AOL LOGO & STEP COUNTER */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ flex: 1, textAlign: 'left' }}>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', padding: 0 }}
                >
                  <ArrowLeft size={20} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCustomerScreen('PUBLIC_LANDING')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', padding: 0 }}
                  title="Back to Landing Page"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
            </div>
            <img 
              src={aolLogoSwans} 
              alt="The Art of Living" 
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
            />
            <div style={{ flex: 1, textAlign: 'right', fontSize: '0.9rem', fontWeight: 700, color: '#b47b2b' }}>
              {currentStep} / 3
            </div>
          </div>

          {/* SCREEN 1 / 3: WHAT BRINGS YOU TO SRI SRI YOGA? */}
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

          {/* SCREEN 2 / 3: WHAT IS YOUR CURRENT YOGA EXPERIENCE? */}
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

          {/* SCREEN 3 / 3: HOW MUCH TIME CAN YOU DEDICATE TO YOGA EACH DAY? */}
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

          {/* FOOTER BUTTONS: CONTINUE & SKIP FOR NOW */}
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
              Continue
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
      ) : (
        /* ========================================================================= */
        /* SCREEN 4: CHOOSE YOUR PLAN & LANGUAGE */
        /* ========================================================================= */
        <div style={{
          width: '100%',
          maxWidth: '1080px',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px 36px',
          boxShadow: '0 16px 48px rgba(180, 140, 90, 0.1)',
          border: '1px solid #f0e6d8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          
          {/* HEADER: LOGO, BACK & TITLE */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 600 }}
            >
              <ArrowLeft size={18} /> Back to questions
            </button>
            <img 
              src={aolLogoSwans} 
              alt="The Art of Living" 
              style={{ height: '44px', width: 'auto', objectFit: 'contain' }} 
            />
            <div style={{ width: '100px' }} />
          </div>

          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.2rem', fontWeight: 800, color: '#1a1a1a', textAlign: 'center', marginBottom: '6px' }}>
            Choose Your Plan
          </h1>
          <p style={{ fontSize: '1rem', color: '#666666', textAlign: 'center', marginBottom: '36px' }}>
            Start your yoga journey today
          </p>

          {/* 3 PLAN CARDS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', width: '100%', marginBottom: '32px' }}>
            
            {/* 12 MONTHS PLAN */}
            <div 
              onClick={() => setSelectedPlanCode('YOGA_12M')}
              style={{
                border: selectedPlanCode === 'YOGA_12M' ? '2.5px solid #16a34a' : '1px solid #e2e8f0',
                borderRadius: '20px',
                background: selectedPlanCode === 'YOGA_12M' ? '#f0fdf4' : '#ffffff',
                padding: '28px 24px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: selectedPlanCode === 'YOGA_12M' ? '0 8px 24px rgba(22, 163, 74, 0.12)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ position: 'absolute', top: '-14px', left: '20px', background: '#000000', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 12px', borderRadius: '9999px' }}>
                Most Popular
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>12 Months</span>
                  <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '9999px' }}>
                    14-Day Trial: FREE
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#14532d' }}>₹4,999</span>
                  <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹14,999</span>
                  <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 6px', borderRadius: '9999px' }}>67% off</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#334155' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={16} color="#16a34a" /> Unlimited Live Yoga Classes</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={16} color="#16a34a" /> Monthly Masterclass</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={16} color="#16a34a" /> Bonus E-Books</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={16} color="#16a34a" /> 3 Mini Programs</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={16} color="#16a34a" /> Progress Tracking</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={16} color="#16a34a" /> Community Support</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={16} color="#16a34a" /> 1 Month Access to AOL App</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 600 }}><Check size={16} color="#16a34a" /> Start free for 14 days. Then ₹4,999/year. Cancel anytime.</div>
                </div>
              </div>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '9999px',
                  background: selectedPlanCode === 'YOGA_12M' ? '#16a34a' : '#f1f5f9',
                  color: selectedPlanCode === 'YOGA_12M' ? '#ffffff' : '#64748b',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}>
                  {selectedPlanCode === 'YOGA_12M' ? 'Selected ✓' : 'Select Plan'}
                </div>
              </div>
            </div>

            {/* 6 MONTHS PLAN */}
            <div 
              onClick={() => setSelectedPlanCode('YOGA_6M')}
              style={{
                border: selectedPlanCode === 'YOGA_6M' ? '2.5px solid #ea580c' : '1px solid #fed7aa',
                borderRadius: '20px',
                background: selectedPlanCode === 'YOGA_6M' ? '#fffaf0' : '#ffffff',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: selectedPlanCode === 'YOGA_6M' ? '0 8px 24px rgba(234, 88, 12, 0.12)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>6 Months</span>
                  <span style={{ background: '#ffedd5', color: '#c2410c', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '9999px' }}>
                    14-Day Trial: FREE
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1e293b' }}>₹3,999</span>
                  <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 6px', borderRadius: '9999px' }}>50% off</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#334155' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> Unlimited Live Yoga Classes</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> Monthly Masterclass</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> Bonus E-Books</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> 3 Mini Programs</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> Progress Tracking</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> Community Support</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={16} color="#ef4444" /> 1 Month Access to AOL App</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> Start free for 14 days. Then ₹3,999/6 months. Cancel anytime.</div>
                </div>
              </div>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '9999px',
                  background: selectedPlanCode === 'YOGA_6M' ? '#ea580c' : '#f1f5f9',
                  color: selectedPlanCode === 'YOGA_6M' ? '#ffffff' : '#64748b',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}>
                  {selectedPlanCode === 'YOGA_6M' ? 'Selected ✓' : 'Select Plan'}
                </div>
              </div>
            </div>

            {/* 3 MONTHS PLAN */}
            <div 
              onClick={() => setSelectedPlanCode('YOGA_3M')}
              style={{
                border: selectedPlanCode === 'YOGA_3M' ? '2.5px solid #ea580c' : '1px solid #fed7aa',
                borderRadius: '20px',
                background: selectedPlanCode === 'YOGA_3M' ? '#fffaf0' : '#ffffff',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: selectedPlanCode === 'YOGA_3M' ? '0 8px 24px rgba(234, 88, 12, 0.12)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>3 Months</span>
                  <span style={{ background: '#ffedd5', color: '#c2410c', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '9999px' }}>
                    14-Day Trial: FREE
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1e293b' }}>₹2,999</span>
                  <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹7,999</span>
                  <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 6px', borderRadius: '9999px' }}>0% off</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#334155' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> Unlimited Live Yoga Classes</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> Monthly Masterclass</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> Bonus E-Books</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={16} color="#ef4444" /> 3 Mini Programs</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> Progress Tracking</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={16} color="#ef4444" /> Community Support</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'line-through' }}><X size={16} color="#ef4444" /> 1 Month Access to AOL App</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}><Check size={16} color="#16a34a" /> Start free for 14 days. Then ₹2,999/3 months. Cancel anytime.</div>
                </div>
              </div>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '9999px',
                  background: selectedPlanCode === 'YOGA_3M' ? '#ea580c' : '#f1f5f9',
                  color: selectedPlanCode === 'YOGA_3M' ? '#ffffff' : '#64748b',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}>
                  {selectedPlanCode === 'YOGA_3M' ? 'Selected ✓' : 'Select Plan'}
                </div>
              </div>
            </div>

          </div>

          {/* LANGUAGE DROPDOWN SELECTOR */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px', position: 'relative' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#374151' }}>
              Select Language:
            </span>
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '10px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  cursor: 'pointer',
                  minWidth: '200px',
                  justifyContent: 'space-between'
                }}
              >
                <span>{selectedLanguage || 'English / हिन्दी'}</span>
                <ChevronDown size={16} color="#64748b" />
              </button>

              {isLangDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  marginTop: '6px',
                  zIndex: 50,
                  overflow: 'hidden'
                }}>
                  {languages.map((lang) => (
                    <div
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLangDropdownOpen(false);
                      }}
                      style={{
                        padding: '10px 16px',
                        fontSize: '0.9rem',
                        color: selectedLanguage === lang ? '#ea580c' : '#334155',
                        fontWeight: selectedLanguage === lang ? 700 : 500,
                        background: selectedLanguage === lang ? '#fff7ed' : '#ffffff',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f1f5f9'
                      }}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* GET STARTED NOW CTA BUTTON */}
          <button
            type="button"
            onClick={handleGetStartedFromPlan}
            style={{
              width: '100%',
              maxWidth: '440px',
              padding: '16px',
              borderRadius: '9999px',
              background: '#e07a1e',
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(224, 122, 30, 0.35)',
              transition: 'all 0.15s ease',
              textAlign: 'center'
            }}
          >
            Get Started Now
          </button>

        </div>
      )}

    </div>
  );
};
