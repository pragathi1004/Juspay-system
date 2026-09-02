import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Plane, 
  HeartPulse, 
  Briefcase, 
  Users, 
  Sparkles, 
  Coffee, 
  MoreHorizontal,
  Info,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const PauseSubscriptionModal = () => {
  const {
    isPauseModalOpen,
    setIsPauseModalOpen,
    customer,
    handlePauseSubscriptionSubmit,
    addDays
  } = useApp();

  const sub = customer.subscription;
  const planCode = sub.planCode || 'YOGA_3M';
  
  // Total entitlement lookup: 3M = 15, 6M = 30, 12M = 45
  const getPlanMaxPauseDays = (code) => {
    if (code === 'YOGA_12M') return 45;
    if (code === 'YOGA_6M') return 30;
    return 15;
  };

  const maxPool = sub.totalPauseDays || getPlanMaxPauseDays(planCode);
  const remainingDays = sub.pauseDaysRemaining !== undefined ? sub.pauseDaysRemaining : maxPool;

  // Step state: 'CONFIG' | 'REVIEW'
  const [step, setStep] = useState('CONFIG');

  // Helper date formatters
  const toISODate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateDisplay = (dateInput) => {
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) return dateInput;
      const d = date.getDate();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const m = months[date.getMonth()];
      const y = date.getFullYear();
      return `${d} ${m} ${y}`;
    } catch (e) {
      return dateInput;
    }
  };

  const todayISO = toISODate(new Date());

  // Form selections
  const [selectedReason, setSelectedReason] = useState('Travelling');
  const [customReason, setCustomReason] = useState('');
  const [startDateISO, setStartDateISO] = useState(todayISO);
  const [durationDays, setDurationDays] = useState(Math.min(10, remainingDays > 0 ? remainingDays : 1));

  // Compute end date based on start date and duration
  const getEndDateISO = (startISO, days) => {
    const d = new Date(startISO);
    d.setDate(d.getDate() + (parseInt(days) || 1) - 1);
    return toISODate(d);
  };

  const [endDateISO, setEndDateISO] = useState(() => getEndDateISO(todayISO, Math.min(10, remainingDays > 0 ? remainingDays : 1)));

  // Reset form when modal opens
  useEffect(() => {
    if (isPauseModalOpen) {
      setStep('CONFIG');
      const initialDays = Math.min(10, remainingDays > 0 ? remainingDays : 1);
      setDurationDays(initialDays);
      setStartDateISO(todayISO);
      setEndDateISO(getEndDateISO(todayISO, initialDays));
      setSelectedReason('Travelling');
      setCustomReason('');
    }
  }, [isPauseModalOpen, remainingDays]);

  if (!isPauseModalOpen) return null;

  // Calculate days between two ISO dates inclusive
  const calculateDaysBetween = (startStr, endStr) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffTime = end.getTime() - start.getTime();
    return Math.round(diffTime / (1000 * 3600 * 24)) + 1;
  };

  // Handlers for date inputs
  const handleStartDateChange = (newStartISO) => {
    setStartDateISO(newStartISO);
    const newEnd = getEndDateISO(newStartISO, durationDays);
    setEndDateISO(newEnd);
  };

  const handleEndDateChange = (newEndISO) => {
    setEndDateISO(newEndISO);
    const diff = calculateDaysBetween(startDateISO, newEndISO);
    if (diff > 0) {
      setDurationDays(diff);
    }
  };

  const handleQuickDuration = (days) => {
    const validDays = Math.min(days, remainingDays);
    setDurationDays(validDays);
    setEndDateISO(getEndDateISO(startDateISO, validDays));
  };

  // Validation
  const calculatedDuration = calculateDaysBetween(startDateISO, endDateISO);
  const isDateRangeValid = calculatedDuration > 0 && new Date(startDateISO) >= new Date(todayISO);
  const isWithinAllowance = calculatedDuration <= remainingDays;
  const isReasonValid = selectedReason !== 'Other' || customReason.trim().length > 0;
  const canProceed = isDateRangeValid && isWithinAllowance && isReasonValid && remainingDays > 0;

  // Projection Calculations
  const oldEndDate = sub.endDate || '13 Jan 2027';
  const oldNextRenewalDate = sub.nextRenewalDate || '14 Jan 2027';
  const newEndDate = addDays(oldEndDate, durationDays);
  const newNextRenewalDate = addDays(oldNextRenewalDate, durationDays);
  const remainingAfterPause = Math.max(0, remainingDays - durationDays);

  const reasonsList = [
    { id: 'Travelling', label: 'Travelling', icon: <Plane size={18} color="#ea580c" /> },
    { id: 'Not feeling well', label: 'Not feeling well', icon: <HeartPulse size={18} color="#ea580c" /> },
    { id: 'Busy with work', label: 'Busy with work', icon: <Briefcase size={18} color="#ea580c" /> },
    { id: 'Personal commitments', label: 'Personal commitments', icon: <Users size={18} color="#ea580c" /> },
    { id: 'Festival / occasion', label: 'Festival / occasion', icon: <Sparkles size={18} color="#ea580c" /> },
    { id: 'Need a short break', label: 'Need a short break', icon: <Coffee size={18} color="#ea580c" /> },
    { id: 'Other', label: 'Other', icon: <MoreHorizontal size={18} color="#ea580c" /> }
  ];

  const handleConfirmPause = () => {
    if (!canProceed) return;
    handlePauseSubscriptionSubmit({
      pauseDays: durationDays,
      reason: selectedReason,
      customReason: customReason,
      startDate: formatDateDisplay(startDateISO),
      endDate: formatDateDisplay(endDateISO)
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
          border: '1px solid #f0e6d8',
          overflow: 'hidden',
          animation: 'slideUp 0.25s ease-out',
          margin: 'auto'
        }}
      >
        {/* ========================================================================= */}
        {/* HEADER                                                                   */}
        {/* ========================================================================= */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fdfbf7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {step === 'REVIEW' ? (
              <button
                type="button"
                onClick={() => setStep('CONFIG')}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#475569' }}
                title="Back to edit pause"
              >
                <ArrowLeft size={18} />
              </button>
            ) : (
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={20} />
              </div>
            )}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                {step === 'CONFIG' ? 'Pause Subscription' : 'Review your pause'}
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                {step === 'CONFIG' ? 'Temporarily pause daily classes & save your membership validity' : 'Please review and confirm your pause schedule'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPauseModalOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', color: '#94a3b8', borderRadius: '50%' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: CONFIGURATION SCREEN                                             */}
        {/* ========================================================================= */}
        {step === 'CONFIG' && (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '75vh', overflowY: 'auto' }}>
            
            {/* HERO MOTIVATION BANNER */}
            <div style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fffbf2 100%)', border: '1.5px solid #fed7aa', borderRadius: '18px', padding: '18px 20px' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#9a3412', marginBottom: '4px' }}>
                Taking a break from yoga?
              </div>
              <p style={{ fontSize: '0.85rem', color: '#7c2d12', margin: 0, lineHeight: 1.45 }}>
                Pause your subscription and save your remaining membership days for later.
              </p>
            </div>

            {/* PAUSE ENTITLEMENT DISPLAY */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {sub.planName || '3 Month Yoga Plan'}
                </span>
                <span style={{ background: remainingDays > 0 ? '#dcfce7' : '#fee2e2', color: remainingDays > 0 ? '#15803d' : '#b91c1c', fontSize: '0.78rem', fontWeight: 800, padding: '3px 10px', borderRadius: '9999px' }}>
                  {remainingDays > 0 ? 'Entitlement Active' : 'Allowance Exhausted'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Pause days remaining</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: remainingDays > 0 ? '#ea580c' : '#94a3b8' }}>
                    {remainingDays} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 600 }}>/ {maxPool} days</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#64748b', maxWidth: '200px' }}>
                  Unused pause days are available during this subscription period.
                </div>
              </div>
            </div>

            {/* ZERO PAUSE DAYS EDGE CASE */}
            {remainingDays <= 0 ? (
              <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', padding: '20px', borderRadius: '18px', display: 'flex', gap: '14px', color: '#991b1b' }}>
                <AlertCircle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '4px' }}>No pause days remaining</div>
                  <div style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
                    Your pause allowance ({maxPool} days) for this subscription has been fully used. Your pause entitlement will reset when your subscription renews.
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* 1. WHY ARE YOU PAUSING? */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', marginBottom: '10px' }}>
                    Why are you pausing? <span style={{ color: '#ea580c' }}>*</span>
                  </label>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '8px' }}>
                    {reasonsList.map((reason) => {
                      const isSelected = selectedReason === reason.id;
                      return (
                        <div
                          key={reason.id}
                          onClick={() => setSelectedReason(reason.id)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '12px',
                            border: isSelected ? '2px solid #ea580c' : '1px solid #e2e8f0',
                            background: isSelected ? '#fff7ed' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: isSelected ? '5px solid #ea580c' : '2px solid #cbd5e1', background: '#ffffff', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.85rem', fontWeight: isSelected ? 700 : 500, color: '#1e293b' }}>
                            {reason.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* OTHER CUSTOM REASON INPUT */}
                  {selectedReason === 'Other' && (
                    <div style={{ marginTop: '10px' }}>
                      <input
                        type="text"
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        placeholder="Please specify reason (e.g. Relocating, family event...)"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: '1.5px solid #ea580c',
                          outline: 'none',
                          fontSize: '0.88rem',
                          background: '#fffbf7',
                          color: '#1e293b'
                        }}
                        autoFocus
                      />
                    </div>
                  )}
                </div>

                {/* 2. DATE & DURATION SELECTION */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>
                      Select Dates & Duration <span style={{ color: '#ea580c' }}>*</span>
                    </label>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Maximum pause available: <strong style={{ color: '#ea580c' }}>{remainingDays} days</strong>
                    </span>
                  </div>

                  {/* QUICK PRESET PILLS */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {[5, 7, 10, 15, 30].filter(d => d <= remainingDays).map(days => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => handleQuickDuration(days)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          border: durationDays === days ? '1.5px solid #ea580c' : '1px solid #cbd5e1',
                          background: durationDays === days ? '#ffedd5' : '#ffffff',
                          color: durationDays === days ? '#c2410c' : '#475569',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {days} Days {days === remainingDays ? '(Max)' : ''}
                      </button>
                    ))}
                  </div>

                  {/* DATE INPUTS GRID */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>
                        Start Date
                      </span>
                      <input
                        type="date"
                        min={todayISO}
                        value={startDateISO}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '12px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: '#1e293b',
                          background: '#ffffff',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>
                        End Date
                      </span>
                      <input
                        type="date"
                        min={startDateISO}
                        value={endDateISO}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '12px',
                          border: calculatedDuration > remainingDays ? '1.5px solid #ef4444' : '1.5px solid #cbd5e1',
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: '#1e293b',
                          background: '#ffffff',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* DURATION BADGE & VALIDATION WARNING */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: isWithinAllowance ? '#f8fafc' : '#fef2f2', borderRadius: '12px', border: isWithinAllowance ? '1px solid #e2e8f0' : '1px solid #fca5a5' }}>
                    <span style={{ fontSize: '0.85rem', color: isWithinAllowance ? '#475569' : '#991b1b', fontWeight: 600 }}>
                      Selected Pause Duration:
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: isWithinAllowance ? '#ea580c' : '#dc2626' }}>
                      {calculatedDuration} {calculatedDuration === 1 ? 'Day' : 'Days'}
                    </span>
                  </div>

                  {!isWithinAllowance && (
                    <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#dc2626', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertCircle size={14} /> You have only {remainingDays} pause days remaining. Please select a shorter range.
                    </div>
                  )}
                </div>

                {/* 3. SUPPORTING POLICY BULLETS */}
                <div style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Your subscription validity will be extended by the number of days paused.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <Info size={16} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Upcoming yoga bookings during your pause period will be cancelled.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <ShieldCheck size={16} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>You can resume early anytime; any unused pause days will be immediately returned to your balance.</span>
                  </div>
                </div>
              </>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: REVIEW / CONFIRMATION SCREEN                                     */}
        {/* ========================================================================= */}
        {step === 'REVIEW' && (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '75vh', overflowY: 'auto' }}>
            
            {/* SUMMARY CARD */}
            <div style={{ background: '#fffbf5', border: '1.5px solid #fed7aa', borderRadius: '18px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#9a3412', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} color="#ea580c" /> Pause Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #fed7aa', paddingBottom: '8px' }}>
                  <span style={{ color: '#78350f' }}>Pause duration:</span>
                  <strong style={{ color: '#9a3412', fontSize: '1rem' }}>{durationDays} Days</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #fed7aa', paddingBottom: '8px' }}>
                  <span style={{ color: '#78350f' }}>Reason:</span>
                  <strong style={{ color: '#1e293b' }}>
                    {selectedReason === 'Other' && customReason ? customReason : selectedReason}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #fed7aa', paddingBottom: '8px' }}>
                  <span style={{ color: '#78350f' }}>Pause starts:</span>
                  <strong style={{ color: '#1e293b' }}>{formatDateDisplay(startDateISO)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #fed7aa', paddingBottom: '8px' }}>
                  <span style={{ color: '#78350f' }}>Pause ends:</span>
                  <strong style={{ color: '#1e293b' }}>{formatDateDisplay(endDateISO)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #fed7aa', paddingBottom: '8px' }}>
                  <span style={{ color: '#78350f' }}>Current subscription expiry:</span>
                  <span style={{ color: '#64748b', textDecoration: 'line-through' }}>{oldEndDate}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #fed7aa', paddingBottom: '8px' }}>
                  <span style={{ color: '#78350f', fontWeight: 700 }}>New subscription expiry:</span>
                  <strong style={{ color: '#15803d', fontSize: '1.05rem' }}>{newEndDate}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #fed7aa', paddingBottom: '8px' }}>
                  <span style={{ color: '#78350f' }}>Next auto-renewal date:</span>
                  <strong style={{ color: '#15803d' }}>{newNextRenewalDate}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                  <span style={{ color: '#78350f' }}>Pause days remaining after this:</span>
                  <strong style={{ color: '#ea580c' }}>{remainingAfterPause} / {maxPool} days</strong>
                </div>
              </div>
            </div>

            {/* IMPACT BULLETS */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 18px', fontSize: '0.84rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>• Your subscription will be paused for <strong>{durationDays} days</strong>.</div>
              <div>• Your subscription expiry will be extended by <strong>{durationDays} days</strong>.</div>
              <div>• Any existing yoga bookings during the pause period will be cancelled.</div>
              <div>• You can resume anytime — any unused pause days will be immediately returned.</div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* FOOTER ACTIONS                                                           */}
        {/* ========================================================================= */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px', justifyContent: 'flex-end', background: '#fdfbf7', alignItems: 'center' }}>
          
          {step === 'CONFIG' ? (
            <>
              <button
                type="button"
                onClick={() => setIsPauseModalOpen(false)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Keep Active
              </button>
              
              <button
                type="button"
                onClick={() => setStep('REVIEW')}
                disabled={!canProceed}
                style={{
                  padding: '10px 26px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: !canProceed ? '#cbd5e1' : '#ea580c',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: !canProceed ? 'not-allowed' : 'pointer',
                  boxShadow: !canProceed ? 'none' : '0 2px 8px rgba(234, 88, 12, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep('CONFIG')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Back to Edit
              </button>
              
              <button
                type="button"
                onClick={handleConfirmPause}
                style={{
                  padding: '10px 28px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: '#ea580c',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(234, 88, 12, 0.3)'
                }}
              >
                Confirm Pause
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
