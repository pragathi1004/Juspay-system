export const COMMUNICATION_TOUCHPOINTS = [
  {
    id: 1,
    name: 'Subscription Confirmation',
    phase: 'Phase 1',
    trigger: 'Payment success',
    email: true,
    whatsapp: true,
    keyContent: 'Plan name, start/end date, amount paid, mandate ID, welcome message',
    status: 'Active',
    lastSent: '2 mins ago',
    deliveryRate: '99.4%',
    templatePreview: {
      subject: 'Welcome to Sri Sri Yoga! Your subscription is active 🙏',
      body: 'Dear {{Name}},\n\nWelcome to daily Sri Sri Yoga! Your subscription to the {{PlanName}} (₹{{Amount}}) has been activated successfully.\n\nSubscription Details:\n• Subscription ID: {{SubscriptionID}}\n• Start Date: {{StartDate}}\n• Renewal Date: {{EndDate}}\n• Mandate Status: Active (Auto-renews automatically)\n\nAccess your personalized dashboard now to start your daily yoga journey.',
      waMessage: '🙏 Welcome {{Name}}! Your {{PlanName}} subscription for Sri Sri Yoga is activated. Start date: {{StartDate}}. Manage your subscription anytime here: {{ManageLink}}'
    }
  },
  {
    id: 2,
    name: 'Renewal Reminder (T-1 day)',
    phase: 'Phase 1',
    trigger: 'Scheduled job (1 day before end date)',
    email: true,
    whatsapp: true,
    keyContent: 'Upcoming charge amount, renewal date, plan name, manage subscription link',
    status: 'Active',
    lastSent: '15 mins ago',
    deliveryRate: '98.8%',
    templatePreview: {
      subject: 'Reminder: Your Sri Sri Yoga Subscription auto-renews tomorrow 🧘‍♀️',
      body: 'Dear {{Name}},\n\nYour {{PlanName}} Sri Sri Yoga subscription is set to automatically renew tomorrow on {{RenewalDate}} for ₹{{Amount}} via your authorized payment mandate ({{PaymentMethod}}).\n\nIf you wish to manage your payment method or plan, please visit your subscription portal: {{ManageLink}}',
      waMessage: '🧘‍♀️ Hi {{Name}}, your Sri Sri Yoga {{PlanName}} will renew tomorrow for ₹{{Amount}}. Need to change plan or update payment? Manage here: {{ManageLink}}'
    }
  },
  {
    id: 3,
    name: 'Renewal Success',
    phase: 'Phase 1',
    trigger: 'Juspay webhook (PAYMENT_SUCCESS)',
    email: true,
    whatsapp: true,
    keyContent: 'New end date, amount charged, payment receipt, plan name',
    status: 'Active',
    lastSent: '1 hour ago',
    deliveryRate: '99.1%',
    templatePreview: {
      subject: 'Payment Successful: Sri Sri Yoga Subscription Renewed! 🎉',
      body: 'Dear {{Name}},\n\nYour payment of ₹{{Amount}} for Sri Sri Yoga {{PlanName}} was processed successfully via auto-debit.\n\n• Payment ID: {{PaymentID}}\n• New Subscription Period: {{StartDate}} to {{NewEndDate}}\n• Autopay Status: Active\n\nThank you for continuing your wellness journey with Art of Living!',
      waMessage: '🎉 Renewal successful! ₹{{Amount}} charged for your {{PlanName}} Sri Sri Yoga. Your new valid date is {{NewEndDate}}. Receipt: {{ReceiptURL}}'
    }
  },
  {
    id: 4,
    name: 'Renewal Failed (per retry)',
    phase: 'Phase 1',
    trigger: 'Juspay webhook (PAYMENT_FAILED)',
    email: true,
    whatsapp: true,
    keyContent: 'Failure reason, next retry date, update payment link, support contact',
    status: 'Active',
    lastSent: '3 hours ago',
    deliveryRate: '97.5%',
    templatePreview: {
      subject: 'Action Needed: Auto-renewal failed for Sri Sri Yoga ⚠️',
      body: 'Dear {{Name}},\n\nWe were unable to process the automatic renewal of ₹{{Amount}} for your {{PlanName}} subscription due to: {{FailureReason}}.\n\nDon\'t worry — your yoga access remains ACTIVE during the 7-day grace period. Next retry attempt: {{NextRetryDate}} (Attempt {{AttemptCount}}/3).\n\nPlease update your payment method or retry manually: {{UpdatePaymentLink}}',
      waMessage: '⚠️ We couldn\'t renew your Sri Sri Yoga subscription (Reason: {{FailureReason}}). Access is active during grace period. Retry or update payment now: {{UpdatePaymentLink}}'
    }
  },
  {
    id: 5,
    name: 'Subscription Expired',
    phase: 'Phase 1',
    trigger: 'Grace period end event',
    email: true,
    whatsapp: true,
    keyContent: 'Expiry notice, re-subscribe link, plan options, what was lost',
    status: 'Active',
    lastSent: '1 day ago',
    deliveryRate: '96.9%',
    templatePreview: {
      subject: 'Your Sri Sri Yoga Subscription has Expired 🧘',
      body: 'Dear {{Name}},\n\nYour {{PlanName}} subscription and grace period have ended as of {{ExpiryDate}}. Your daily live class access and masterclass recordings are currently paused.\n\nRe-subscribe today to continue your yoga practice without losing progress: {{ResubscribeLink}}',
      waMessage: '🧘 Your Sri Sri Yoga access has expired. Resume daily live classes and community masterclasses anytime here: {{ResubscribeLink}}'
    }
  },
  {
    id: 6,
    name: 'Cancellation Confirmation',
    phase: 'Phase 2',
    trigger: 'User confirms cancellation',
    email: true,
    whatsapp: true,
    keyContent: 'Cancellation date, access-until date, re-subscribe link, feedback acknowledgment',
    status: 'Active',
    lastSent: '4 hours ago',
    deliveryRate: '99.5%',
    templatePreview: {
      subject: 'Sri Sri Yoga Subscription Cancelled',
      body: 'Dear {{Name}},\n\nYour subscription auto-renewal has been cancelled as requested. Your payment mandate has been revoked with Juspay.\n\n• Access valid until: {{EndDate}}\n• Auto-debit status: Disabled\n\nWe hope to see you back on the mat soon!',
      waMessage: 'Your auto-renewal for Sri Sri Yoga has been cancelled. You retain full access until {{EndDate}}. Re-enable anytime: {{ResubscribeLink}}'
    }
  },
  {
    id: 7,
    name: 'Plan Change Confirmation',
    phase: 'Phase 2',
    trigger: 'Plan change payment success',
    email: true,
    whatsapp: true,
    keyContent: 'Old plan > new plan, amount charged/credited, new end date, new mandate details',
    status: 'Active',
    lastSent: '6 hours ago',
    deliveryRate: '99.2%',
    templatePreview: {
      subject: 'Plan Change Confirmed: Sri Sri Yoga {{NewPlanName}} 🚀',
      body: 'Dear {{Name}},\n\nYour subscription plan has been changed from {{OldPlanName}} to {{NewPlanName}}.\n\n• Price Difference Paid: ₹{{ProratedAmount}}\n• New Mandate Amount: ₹{{NewMandateAmount}}\n• New Subscription End Date: {{NewEndDate}}\n\nEnjoy all benefits of your upgraded plan!',
      waMessage: '🚀 You have successfully upgraded to {{NewPlanName}}! New end date: {{NewEndDate}}. View updated benefits in your dashboard: {{DashboardLink}}'
    }
  },
  {
    id: 8,
    name: 'Payment Method Updated',
    phase: 'Phase 2',
    trigger: 'Juspay mandate replaced',
    email: true,
    whatsapp: true,
    keyContent: 'New payment method (masked), mandate status, confirmation',
    status: 'Active',
    lastSent: '12 hours ago',
    deliveryRate: '98.9%',
    templatePreview: {
      subject: 'Payment Method Updated for Sri Sri Yoga Mandate',
      body: 'Dear {{Name}},\n\nYour payment method for automatic renewal has been updated successfully.\n\n• New Payment Method: {{MaskedPaymentMethod}}\n• Mandate Status: Active\n• Previous Mandate: Revoked\n\nNo further action is required.',
      waMessage: '✅ Payment method updated successfully! Future renewals will use {{MaskedPaymentMethod}}. Manage subscription: {{ManageLink}}'
    }
  },
  {
    id: 9,
    name: 'Manage Subscription Link',
    phase: 'Phase 2',
    trigger: 'On demand / periodic request',
    email: true,
    whatsapp: true,
    keyContent: 'Tokenized manage link (24h expiry), current plan summary, quick action prompts',
    status: 'Active',
    lastSent: 'Just now',
    deliveryRate: '99.8%',
    templatePreview: {
      subject: 'Secure Link to Manage Your Sri Sri Yoga Subscription',
      body: 'Dear {{Name}},\n\nHere is your secure link to manage your Sri Sri Yoga subscription (Change Plan, Edit Payment, or Cancel):\n\n🔗 {{TokenizedLink}}\n(Valid for 24 hours)',
      waMessage: '🔗 Here is your secure link to manage your Sri Sri Yoga subscription: {{TokenizedLink}} (Valid 24h).'
    }
  },
  {
    id: 10,
    name: 'Win-back (Post Cancellation)',
    phase: 'Phase 2',
    trigger: '7 days after cancellation date',
    email: true,
    whatsapp: true,
    keyContent: 'Special offer (if applicable), re-subscribe CTA, benefits reminder',
    status: 'Active',
    lastSent: '2 days ago',
    deliveryRate: '94.2%',
    templatePreview: {
      subject: 'We miss you on the mat! 15% off Sri Sri Yoga 🧘',
      body: 'Dear {{Name}},\n\nWe miss your presence in our daily yoga sessions! Re-join Sri Sri Yoga today and enjoy 15% off your next subscription plan.\n\nUse Code: YOGABACK15\nRe-subscribe now: {{ResubscribeLink}}',
      waMessage: '🧘 We miss you! Re-join Sri Sri Yoga today with code YOGABACK15 for 15% off. Re-subscribe here: {{ResubscribeLink}}'
    }
  }
];
