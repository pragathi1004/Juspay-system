import React, { createContext, useContext, useState } from 'react';
import { INITIAL_CUSTOMER, MOCK_SUBSCRIPTIONS, MOCK_PAYMENT_HISTORY, MOCK_WEBHOOK_LOGS } from '../data/initialData';
import { PLAN_SPECS } from '../data/planSpecs';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & View
  const [appVersion, setAppVersion] = useState('v2'); // 'v1' | 'v2'
  const [activeApp, setActiveApp] = useState('CUSTOMER'); // 'CUSTOMER' | 'ADMIN'
  const [userFlow, setUserFlow] = useState('NEW_LEAD'); // 'NEW_LEAD' | 'EXISTING_MEMBER'
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
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState(null);
  const [isTurnOffRenewalModalOpen, setIsTurnOffRenewalModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(PLAN_SPECS[0]); // 3 Months default ₹1,499
  const [selectedAdminSubDetail, setSelectedAdminSubDetail] = useState(null);
  const [selectedWebhookLog, setSelectedWebhookLog] = useState(null);

  // Customer Data & State Simulation
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER);
  const [subscriptionsList, setSubscriptionsList] = useState(MOCK_SUBSCRIPTIONS);
  const [paymentHistory, setPaymentHistory] = useState(MOCK_PAYMENT_HISTORY);
  const [webhookLogs, setWebhookLogs] = useState(MOCK_WEBHOOK_LOGS);

  // Registration Form State (Pragathi)
  const [regForm, setRegForm] = useState({
    firstName: 'PRAGATHI',
    lastName: '',
    name: 'PRAGATHI',
    phone: '9920656992',
    email: 'pragathi@gmail.com',
    age: '38',
    postalCode: '560082',
    cityState: 'Bengaluru Urban, Karnataka',
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
          mandateId: updatedSub.mandateId,
          receiptUrl: '#',
          details: {
            paymentId: 'PAY_' + Math.floor(100000 + Math.random() * 900000),
            orderId: 'ORD_AUTO_' + Math.floor(1000 + Math.random() * 9000),
            subscriptionId: updatedSub.id,
            date: '14 Jan 2027, 06:00 AM',
            amount: '₹1,499',
            paymentMethod: 'UPI ••••1234',
            paymentType: 'Auto-Renewal',
            status: '✓ Successful'
          }
        };
        setPaymentHistory(prev => [newRenewPayment, ...prev]);
        setCustomerScreen('DASHBOARD');
        break;
      case 'RENEWAL_FAILED':
      case 'RENEWAL_FAILED_1':
        updatedSub.status = 'RENEWAL_FAILED';
        updatedSub.retryAttempt = 1;
        updatedSub.failureReason = 'Card / Mandate Debit Declined by Bank (Insufficient Funds)';
        updatedSub.nextRetryDate = 'In 2 days (16 Jan 2027)';
        updatedSub.gracePeriodEndDate = '19 Jan 2027';
        setCustomerScreen('DASHBOARD');
        break;
      case 'EXPIRED':
        updatedSub.status = 'EXPIRED';
        updatedSub.daysRemaining = 0;
        updatedSub.autopayStatus = 'EXPIRED';
        updatedSub.endDate = '13 Jan 2027';
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
        handleTurnOnAutoRenewalSubmit
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
