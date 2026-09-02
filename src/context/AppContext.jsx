import React, { createContext, useContext, useState } from 'react';
import { INITIAL_CUSTOMER, MOCK_SUBSCRIPTIONS, MOCK_PAYMENT_HISTORY, MOCK_WEBHOOK_LOGS } from '../data/initialData';
import { PLAN_SPECS } from '../data/planSpecs';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & View
  const [appVersion, setAppVersion] = useState('v2'); // 'v1' | 'v2'
  const [activeApp, setActiveApp] = useState('CUSTOMER'); // 'CUSTOMER' | 'ADMIN'
  const [userFlow, setUserFlow] = useState('NEW_LEAD'); // 'NEW_LEAD' | 'EXISTING_MEMBER'
  const [surveyMode, setSurveyMode] = useState('NEW_LEAD'); // 'NEW_LEAD' | 'FREE_TRIAL'
  const [customerScreen, setCustomerScreen] = useState('PUBLIC_LANDING'); 
  // CUSTOMER screens: 'PUBLIC_LANDING', 'PUBLIC_PLANS', 'MANAGE_SUB', 'CRM_FORM', 'CONFIRMATION', 'DASHBOARD', 'MANAGE_HUB', 'CANCEL_WIZARD', 'CHANGE_PLAN_WIZARD', 'EDIT_PAYMENT_WIZARD'
  
  // Selected Language for New Lead Plan
  const [selectedLanguage, setSelectedLanguage] = useState('English / Hindi');

  // Admin Navigation
  const [adminTab, setAdminTab] = useState('DASHBOARD');
  // ADMIN tabs: 'DASHBOARD', 'SUBSCRIPTIONS', 'RENEWALS', 'PLANS', 'PAYMENTS', 'COMMUNICATIONS', 'EVENTS', 'SETTINGS'

  // Modals & Drawers
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isJuspayModalOpen, setIsJuspayModalOpen] = useState(false);
  const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState(null);
  const [isTurnOffRenewalModalOpen, setIsTurnOffRenewalModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(PLAN_SPECS[0]); // 3 Months default ₹1,499
  const [selectedAdminSubDetail, setSelectedAdminSubDetail] = useState(null);
  const [selectedWebhookLog, setSelectedWebhookLog] = useState(null);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isBlockedSessionModalOpen, setIsBlockedSessionModalOpen] = useState(false);

  // Customer Data & State Simulation
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER);
  const [subscriptionsList, setSubscriptionsList] = useState(MOCK_SUBSCRIPTIONS);
  const [paymentHistory, setPaymentHistory] = useState(MOCK_PAYMENT_HISTORY);
  const [webhookLogs, setWebhookLogs] = useState(MOCK_WEBHOOK_LOGS);

  // Registration Form State (empty by default for new leads; populated for test account)
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: 'M',
    name: '',
    phone: '',
    email: '',
    age: '23',
    postalCode: '',
    cityState: '',
    termsAgreed: true,
    optOutAgreed: true,
    autoRenewalAgreed: true,
    otpSent: false,
    otp: '',
    otpError: '',
    phoneError: '',
    emailError: ''
  });

  // Simulator helper to force any Customer State for PM Reviewers
  const setSimulatedState = (stateKey) => {
    let updatedSub = { ...customer.subscription };

    switch (stateKey) {
      case 'PUBLIC_LANDING':
        setCustomerScreen('PUBLIC_LANDING');
        return;
      case 'CHALLENGE':
        setCustomerScreen('CHALLENGE');
        return;
      case 'ONBOARDING_SURVEY':
        setCustomerScreen('ONBOARDING_SURVEY');
        return;
      case 'CRM_FORM':
        setCustomerScreen('CRM_FORM');
        return;
      case 'JUSPAY':
        setCustomerScreen('CRM_FORM');
        setIsJuspayModalOpen(true);
        return;
      case 'PREPARATION':
        setCustomerScreen(appVersion === 'v2' ? 'CONFIRMATION_V2' : 'CONFIRMATION');
        return;
      case 'ACTIVE':
        updatedSub.status = 'ACTIVE';
        updatedSub.daysRemaining = 55;
        updatedSub.autopayStatus = 'ACTIVE';
        updatedSub.endDate = '13 Jan 2027';
        updatedSub.nextRenewalDate = '14 Jan 2027';
        updatedSub.renewalAmount = 1499;
        updatedSub.retryAttempt = 0;
        updatedSub.failureReason = null;
        updatedSub.isPaused = false;
        updatedSub.pausedAt = null;
        updatedSub.pauseEndDate = null;
        updatedSub.pauseDuration = 0;
        updatedSub.pauseReason = null;
        setCustomerScreen('DASHBOARD');
        break;
      case 'PAUSED':
        updatedSub.status = 'PAUSED';
        updatedSub.isPaused = true;
        updatedSub.pausedAt = '03 Sep 2026';
        updatedSub.pauseEndDate = '12 Sep 2026';
        updatedSub.pauseDuration = 10;
        updatedSub.pauseReason = 'Travelling';
        updatedSub.prevEndDate = '13 Jan 2027';
        updatedSub.prevNextRenewalDate = '14 Jan 2027';
        updatedSub.endDate = '23 Jan 2027';
        updatedSub.nextRenewalDate = '24 Jan 2027';
        updatedSub.totalPauseDays = 15;
        updatedSub.pauseDaysRemaining = 5;
        updatedSub.usedPauseDays = 10;
        setCustomerScreen('DASHBOARD');
        break;
      case 'AUTOPAY_OFF':
        updatedSub.status = 'ACTIVE';
        updatedSub.autopayStatus = 'OFF';
        updatedSub.nextRenewalDate = 'Not scheduled';
        updatedSub.renewalAmount = 0;
        updatedSub.endDate = '13 Jan 2027';
        updatedSub.daysRemaining = 55;
        setCustomerScreen('DASHBOARD');
        break;
      case 'RENEWAL_DUE':
        updatedSub.status = 'RENEWAL_DUE';
        updatedSub.daysRemaining = 1;
        updatedSub.nextRenewalDate = '14 Jan 2027 (Tomorrow)';
        updatedSub.autopayStatus = 'ACTIVE';
        updatedSub.renewalAmount = 1499;
        setCustomerScreen('DASHBOARD');
        break;
      case 'RENEWAL_SUCCESS':
        updatedSub.status = 'ACTIVE';
        updatedSub.daysRemaining = 90;
        updatedSub.startDate = '14 Jan 2027';
        updatedSub.endDate = '13 Apr 2027';
        updatedSub.nextRenewalDate = '14 Apr 2027';
        updatedSub.autopayStatus = 'ACTIVE';
        updatedSub.renewalAmount = 1499;
        updatedSub.isPaused = false;
        updatedSub.pausedAt = null;
        updatedSub.pauseEndDate = null;
        updatedSub.pauseDuration = 0;
        // Add new payment entry
        const newRenewPayment = {
          id: 'PAY_' + Math.floor(100000 + Math.random() * 900000),
          orderId: 'ORD_AUTO_' + Math.floor(1000 + Math.random() * 9000),
          subscriptionId: updatedSub.id,
          customerId: customer.id,
          date: '14 Jan 2027',
          time: '06:00 AM',
          description: 'Subscription Renewal (3 Months)',
          amount: 1499,
          paymentType: 'Auto-Renewal',
          method: 'UPI ••••1234',
          status: '✓ Paid',
          invoiceUrl: '#'
        };
        setPaymentHistory((prev) => [newRenewPayment, ...prev]);
        setCustomerScreen('DASHBOARD');
        break;
      case 'RENEWAL_FAILED':
        updatedSub.status = 'RENEWAL_FAILED';
        updatedSub.daysRemaining = 0;
        updatedSub.nextRenewalDate = '14 Jan 2027';
        updatedSub.retryAttempt = 1;
        updatedSub.failureReason = 'ZA504 (Juspay Transaction Timeout at Issuer)';
        updatedSub.nextRetryDate = '16 Jan 2027 (Retry #1 in 48h)';
        updatedSub.gracePeriodEndDate = '21 Jan 2027 (7-Day Grace Access Active)';
        setCustomerScreen('DASHBOARD');
        break;
      case 'EXPIRED':
        updatedSub.status = 'EXPIRED';
        updatedSub.daysRemaining = 0;
        updatedSub.nextRenewalDate = 'Expired';
        updatedSub.autopayStatus = 'REVOKED';
        updatedSub.retryAttempt = 3;
        updatedSub.failureReason = 'Max Auto-Retries Exhausted. Mandate Revoked.';
        updatedSub.isPaused = false;
        updatedSub.pauseDaysRemaining = 0;
        setCustomerScreen('DASHBOARD');
        break;
      default:
        break;
    }

    setCustomer((prev) => ({
      ...prev,
      subscription: updatedSub
    }));
  };

  const handleTurnOffAutoRenewalSubmit = () => {
    const updatedSub = {
      ...customer.subscription,
      autopayStatus: 'OFF',
      nextRenewalDate: 'Not scheduled',
      renewalAmount: 0,
      cancelledAt: new Date().toISOString().split('T')[0]
    };
    setCustomer((prev) => ({
      ...prev,
      subscription: updatedSub
    }));
    setIsTurnOffRenewalModalOpen(false);

    // Webhook log
    const revokeEvent = {
      id: 'EVT_' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString(),
      eventType: 'MANDATE_REVOKED',
      orderId: 'ORD_REVOKE_' + Math.floor(1000 + Math.random() * 9000),
      customerId: customer.id,
      subscriptionId: customer.subscription.id,
      mandateId: customer.subscription.mandateId,
      status: 'PROCESSED',
      payload: {
        event: 'MANDATE_REVOKED',
        reason: 'CUSTOMER_TURNED_OFF_FUTURE_RENEWAL',
        revoked_by: 'CUSTOMER_PORTAL',
        access_retained_until: customer.subscription.endDate
      }
    };
    setWebhookLogs((prev) => [revokeEvent, ...prev]);
  };

  const handleTurnOnAutoRenewalSubmit = () => {
    const updatedSub = {
      ...customer.subscription,
      autopayStatus: 'ACTIVE',
      nextRenewalDate: customer.subscription.endDate || '14 Jan 2027',
      renewalAmount: customer.subscription.amount || 1499
    };
    setCustomer((prev) => ({
      ...prev,
      subscription: updatedSub
    }));

    // Webhook log
    const enableEvent = {
      id: 'EVT_' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString(),
      eventType: 'MANDATE_UPDATED',
      orderId: 'ORD_ENABLE_' + Math.floor(1000 + Math.random() * 9000),
      customerId: customer.id,
      subscriptionId: customer.subscription.id,
      mandateId: customer.subscription.mandateId,
      status: 'PROCESSED',
      payload: {
        event: 'MANDATE_RE_ENABLED',
        status: 'ACTIVE'
      }
    };
    setWebhookLogs((prev) => [enableEvent, ...prev]);
  };

  // Safe Date Math Helpers
  const addDays = (dateStr, days) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      date.setDate(date.getDate() + parseInt(days));
      const d = date.getDate();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const m = months[date.getMonth()];
      const y = date.getFullYear();
      return `${d} ${m} ${y}`;
    } catch (e) {
      return dateStr;
    }
  };

  const handlePauseSubscriptionSubmit = (pauseData) => {
    const sub = customer.subscription;
    const planTotal = sub.totalPauseDays || (sub.planCode === 'YOGA_12M' ? 45 : sub.planCode === 'YOGA_6M' ? 30 : 15);
    const currentRemaining = sub.pauseDaysRemaining !== undefined ? sub.pauseDaysRemaining : planTotal;
    
    // Support both numeric argument and object argument
    const daysToPause = typeof pauseData === 'object' 
      ? Math.min(parseInt(pauseData.pauseDays) || 1, currentRemaining)
      : Math.min(parseInt(pauseData) || 1, currentRemaining);
    
    const reason = typeof pauseData === 'object' ? pauseData.reason : 'Personal break';
    const customReason = typeof pauseData === 'object' ? pauseData.customReason : '';
    const startDate = typeof pauseData === 'object' ? pauseData.startDate : null;
    const endDate = typeof pauseData === 'object' ? pauseData.endDate : null;

    const oldEndDate = sub.endDate || '13 Jan 2027';
    const oldNextRenewalDate = sub.nextRenewalDate || '14 Jan 2027';

    const newEndDate = addDays(oldEndDate, daysToPause);
    const newNextRenewalDate = addDays(oldNextRenewalDate, daysToPause);
    const effectiveReason = reason === 'Other' && customReason ? customReason : (reason || 'Personal break');
    
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const todayFormatted = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    const startFormatted = startDate || todayFormatted;
    const endFormatted = endDate || addDays(startFormatted, daysToPause);

    const pauseRecord = {
      id: 'PAUSE_' + Date.now(),
      startDate: startFormatted,
      endDate: endFormatted,
      pauseDays: daysToPause,
      reason: effectiveReason,
      pausedAt: new Date().toISOString(),
      resumedAt: null,
      resumedEarly: false,
      actualDaysPaused: daysToPause
    };

    const updatedSub = {
      ...sub,
      status: 'PAUSED',
      isPaused: true,
      pausedAt: startFormatted,
      pauseEndDate: endFormatted,
      pauseDuration: daysToPause,
      pauseReason: effectiveReason,
      prevEndDate: sub.prevEndDate || oldEndDate,
      prevNextRenewalDate: sub.prevNextRenewalDate || oldNextRenewalDate,
      endDate: newEndDate,
      nextRenewalDate: newNextRenewalDate,
      totalPauseDays: planTotal,
      usedPauseDays: (sub.usedPauseDays || 0) + daysToPause,
      pauseDaysRemaining: Math.max(0, currentRemaining - daysToPause),
      pauseHistory: [pauseRecord, ...(sub.pauseHistory || [])]
    };

    setCustomer((prev) => ({
      ...prev,
      subscription: updatedSub
    }));
    setIsPauseModalOpen(false);

    // Webhook log
    const pauseEvent = {
      id: 'EVT_' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString(),
      eventType: 'MANDATE_PAUSED',
      orderId: 'ORD_PAUSE_' + Math.floor(1000 + Math.random() * 9000),
      customerId: customer.id,
      subscriptionId: sub.id,
      mandateId: sub.mandateId,
      status: 'PROCESSED',
      payload: {
        event: 'MANDATE_PAUSED',
        paused_for_days: daysToPause,
        reason: effectiveReason,
        resumes_on: endFormatted,
        new_expiry_date: newEndDate,
        new_renewal_date: newNextRenewalDate
      }
    };
    setWebhookLogs((prev) => [pauseEvent, ...prev]);
  };

  const handleResumeSubscriptionSubmit = () => {
    const sub = customer.subscription;
    if (!sub.isPaused) return;

    let daysPausedActual = 1;
    if (sub.pausedAt) {
      const pausedAtDate = new Date(sub.pausedAt);
      if (!isNaN(pausedAtDate.getTime())) {
        const today = new Date();
        const msDiff = today.getTime() - pausedAtDate.getTime();
        daysPausedActual = Math.max(1, Math.ceil(msDiff / (1000 * 60 * 60 * 24)));
      }
    }
    const plannedDuration = sub.pauseDuration || 1;
    const actualDays = Math.min(daysPausedActual, plannedDuration);
    const unusedDays = Math.max(0, plannedDuration - actualDays);

    const planTotal = sub.totalPauseDays || (sub.planCode === 'YOGA_12M' ? 45 : sub.planCode === 'YOGA_6M' ? 30 : 15);
    const updatedPauseDaysRemaining = Math.min(planTotal, (sub.pauseDaysRemaining || 0) + unusedDays);
    const updatedUsedPauseDays = Math.max(0, (sub.usedPauseDays || plannedDuration) - unusedDays);

    const baseEndDate = sub.prevEndDate || '13 Jan 2027';
    const baseNextRenewalDate = sub.prevNextRenewalDate || '14 Jan 2027';

    const finalEndDate = addDays(baseEndDate, actualDays);
    const finalNextRenewalDate = addDays(baseNextRenewalDate, actualDays);

    const updatedHistory = (sub.pauseHistory || []).map((rec, idx) => {
      if (idx === 0) {
        return {
          ...rec,
          resumedAt: new Date().toISOString(),
          resumedEarly: unusedDays > 0,
          actualDaysPaused: actualDays,
          refundedPauseDays: unusedDays
        };
      }
      return rec;
    });

    const updatedSub = {
      ...sub,
      status: 'ACTIVE',
      isPaused: false,
      pausedAt: null,
      pauseEndDate: null,
      pauseDuration: 0,
      pauseReason: null,
      endDate: finalEndDate,
      nextRenewalDate: finalNextRenewalDate,
      pauseDaysRemaining: updatedPauseDaysRemaining,
      usedPauseDays: updatedUsedPauseDays,
      pauseHistory: updatedHistory
    };

    setCustomer((prev) => ({
      ...prev,
      subscription: updatedSub
    }));
    setIsResumeModalOpen(false);
    setIsBlockedSessionModalOpen(false);

    // Webhook log
    const resumeEvent = {
      id: 'EVT_' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString(),
      eventType: 'MANDATE_UPDATED',
      orderId: 'ORD_RESUME_' + Math.floor(1000 + Math.random() * 9000),
      customerId: customer.id,
      subscriptionId: sub.id,
      mandateId: sub.mandateId,
      status: 'PROCESSED',
      payload: {
        event: 'MANDATE_RESUMED',
        actual_days_paused: actualDays,
        unused_days_refunded: unusedDays,
        new_renewal_date: finalNextRenewalDate
      }
    };
    setWebhookLogs((prev) => [resumeEvent, ...prev]);
  };

  // Flow handlers
  const handleSelectPlan = (plan) => {
    setSelectedPlanForCheckout(plan);
    setIsRegisterModalOpen(true);
  };

  const handleCompleteRegistration = () => {
    setIsRegisterModalOpen(false);
    setIsJuspayModalOpen(true);
  };

  const handleJuspayPaymentSuccess = (paymentMethodChosen) => {
    setIsJuspayModalOpen(false);
    
    // Calculate new end date based on selected plan
    const months = selectedPlanForCheckout.durationMonths;
    const now = new Date();
    const future = new Date(now.setMonth(now.getMonth() + months));
    const endDateStr = future.toISOString().split('T')[0];
    const startDateStr = new Date().toISOString().split('T')[0];

    const newSubId = 'SUB_' + Math.floor(100000 + Math.random() * 900000);
    const newMandateId = 'MND_' + Math.floor(100000 + Math.random() * 900000);

    const updatedSub = {
      id: newSubId,
      planCode: selectedPlanForCheckout.code,
      planName: selectedPlanForCheckout.name,
      billingCycle: selectedPlanForCheckout.billingCycle,
      amount: selectedPlanForCheckout.price,
      status: 'ACTIVE',
      startDate: startDateStr,
      endDate: endDateStr,
      daysRemaining: months * 30,
      totalDays: months * 30,
      nextRenewalDate: endDateStr,
      autopayStatus: 'ACTIVE',
      paymentMethod: paymentMethodChosen || 'UPI',
      maskedPaymentDetail: paymentMethodChosen === 'CARD' ? 'HDFC Card (•••• 8912)' : 'priya***@upi',
      mandateId: newMandateId,
      maxAmount: selectedPlanForCheckout.price,
      frequency: selectedPlanForCheckout.billingCycle.toUpperCase(),
      retryAttempt: 0
    };

    setCustomer((prev) => ({
      ...prev,
      subscription: updatedSub
    }));

    // Add to webhook logs
    const newEvent1 = {
      id: 'EVT_' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString(),
      eventType: 'PAYMENT_SUCCESS',
      orderId: 'ORD_' + Math.floor(100000 + Math.random() * 900000),
      customerId: customer.id,
      subscriptionId: newSubId,
      mandateId: newMandateId,
      status: 'PROCESSED',
      payload: {
        event: 'PAYMENT_SUCCESS',
        amount: selectedPlanForCheckout.price,
        status: 'CHARGED',
        metadata: { plan_code: selectedPlanForCheckout.code }
      }
    };
    const newEvent2 = {
      id: 'EVT_' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString(),
      eventType: 'MANDATE_CREATED',
      orderId: newEvent1.orderId,
      customerId: customer.id,
      subscriptionId: newSubId,
      mandateId: newMandateId,
      status: 'PROCESSED',
      payload: {
        event: 'MANDATE_CREATED',
        mandate_id: newMandateId,
        max_amount: selectedPlanForCheckout.price,
        status: 'ACTIVE'
      }
    };

    setWebhookLogs((prev) => [newEvent1, newEvent2, ...prev]);
    setCustomerScreen(appVersion === 'v2' ? 'CONFIRMATION_V2' : 'CONFIRMATION');
  };

  const handleCancelSubscriptionSubmit = (reason, comments) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedSub = {
      ...customer.subscription,
      status: 'CANCELLED',
      autopayStatus: 'REVOKED',
      cancelledAt: today,
      cancelReason: reason || 'Not specified',
      cancellationAccessUntil: customer.subscription.endDate
    };
    setCustomer((prev) => ({
      ...prev,
      subscription: updatedSub
    }));

    // Webhook log
    const revokeEvent = {
      id: 'EVT_' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString(),
      eventType: 'MANDATE_REVOKED',
      orderId: 'ORD_REVOKE_' + Math.floor(1000 + Math.random() * 9000),
      customerId: customer.id,
      subscriptionId: customer.subscription.id,
      mandateId: customer.subscription.mandateId,
      status: 'PROCESSED',
      payload: {
        event: 'MANDATE_REVOKED',
        reason: reason || 'USER_REQUESTED',
        revoked_by: 'CUSTOMER_PORTAL'
      }
    };
    setWebhookLogs((prev) => [revokeEvent, ...prev]);
  };

  const handlePlanChangeSubmit = (newPlan) => {
    const updatedSub = {
      ...customer.subscription,
      planCode: newPlan.code,
      planName: newPlan.name,
      amount: newPlan.price,
      billingCycle: newPlan.billingCycle,
      status: 'ACTIVE',
      autopayStatus: 'ACTIVE'
    };
    setCustomer((prev) => ({
      ...prev,
      subscription: updatedSub
    }));

    // Webhook log
    const planChangeEvent = {
      id: 'EVT_' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString(),
      eventType: 'PLAN_CHANGED',
      orderId: 'ORD_CHANGE_' + Math.floor(1000 + Math.random() * 9000),
      customerId: customer.id,
      subscriptionId: customer.subscription.id,
      mandateId: customer.subscription.mandateId,
      status: 'PROCESSED',
      payload: {
        event: 'PLAN_CHANGED',
        new_plan: newPlan.code,
        new_amount: newPlan.price
      }
    };
    setWebhookLogs((prev) => [planChangeEvent, ...prev]);
  };

  const handleEditPaymentSubmit = (newMethodDetail) => {
    const updatedSub = {
      ...customer.subscription,
      maskedPaymentDetail: newMethodDetail,
      autopayStatus: 'ACTIVE'
    };
    setCustomer((prev) => ({
      ...prev,
      subscription: updatedSub
    }));

    const updatePayEvent = {
      id: 'EVT_' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString(),
      eventType: 'MANDATE_UPDATED',
      orderId: 'ORD_UPD_' + Math.floor(1000 + Math.random() * 9000),
      customerId: customer.id,
      subscriptionId: customer.subscription.id,
      mandateId: customer.subscription.mandateId,
      status: 'PROCESSED',
      payload: {
        event: 'MANDATE_UPDATED',
        new_payment_method: newMethodDetail
      }
    };
    setWebhookLogs((prev) => [updatePayEvent, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        appVersion,
        setAppVersion,
        activeApp,
        setActiveApp,
        userFlow,
        setUserFlow,
        surveyMode,
        setSurveyMode,
        selectedLanguage,
        setSelectedLanguage,
        customerScreen,
        setCustomerScreen,
        adminTab,
        setAdminTab,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        isJuspayModalOpen,
        setIsJuspayModalOpen,
        isPaymentHistoryOpen,
        setIsPaymentHistoryOpen,
        isTermsModalOpen,
        setIsTermsModalOpen,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        selectedPaymentDetail,
        setSelectedPaymentDetail,
        isTurnOffRenewalModalOpen,
        setIsTurnOffRenewalModalOpen,
        selectedPlanForCheckout,
        setSelectedPlanForCheckout,
        selectedAdminSubDetail,
        setSelectedAdminSubDetail,
        selectedWebhookLog,
        setSelectedWebhookLog,
        customer,
        setCustomer,
        subscriptionsList,
        setSubscriptionsList,
        paymentHistory,
        setPaymentHistory,
        webhookLogs,
        regForm,
        setRegForm,
        setSimulatedState,
        handleSelectPlan,
        handleCompleteRegistration,
        handleJuspayPaymentSuccess,
        handleCancelSubscriptionSubmit,
        handlePlanChangeSubmit,
        handleEditPaymentSubmit,
        handleTurnOffAutoRenewalSubmit,
        handleTurnOnAutoRenewalSubmit,
        isPauseModalOpen,
        setIsPauseModalOpen,
        isResumeModalOpen,
        setIsResumeModalOpen,
        isBlockedSessionModalOpen,
        setIsBlockedSessionModalOpen,
        addDays,
        handlePauseSubscriptionSubmit,
        handleResumeSubscriptionSubmit
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
