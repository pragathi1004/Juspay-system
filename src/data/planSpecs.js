export const PLAN_SPECS = [
  {
    id: 'YOGA_3M',
    code: 'YOGA_3M',
    name: '3 Months Plan',
    durationMonths: 3,
    price: 1499,
    originalPrice: 2999,
    discountPercent: 50,
    effectiveMonthly: 499,
    badge: 'Current Choice',
    popular: true,
    billingCycle: 'Quarterly',
    courseId: '941425',
    features: [
      { text: 'Unlimited Classes', included: true },
      { text: 'Monthly Sunday Masterclass', included: true },
      { text: 'Bonus E-Books', included: true },
      { text: 'Progress Tracking', included: true }
    ]
  },
  {
    id: 'YOGA_6M',
    code: 'YOGA_6M',
    name: '6 Months Plan',
    durationMonths: 6,
    price: 3999,
    originalPrice: 7999,
    discountPercent: 50,
    effectiveMonthly: 666,
    popular: false,
    billingCycle: 'Semi-Annual',
    courseId: '941426',
    features: [
      { text: 'Unlimited Classes', included: true },
      { text: 'Monthly Sunday Masterclass', included: true },
      { text: 'Bonus E-Books', included: true },
      { text: '3 Mini Programs', included: true },
      { text: 'Progress Tracking', included: true },
      { text: 'Community Support', included: true }
    ]
  },
  {
    id: 'YOGA_12M',
    code: 'YOGA_12M',
    name: '12 Months Plan',
    durationMonths: 12,
    price: 4999,
    originalPrice: 14999,
    discountPercent: 67,
    effectiveMonthly: 416,
    badge: 'Best Value',
    popular: false,
    billingCycle: 'Annual',
    courseId: '941427',
    features: [
      { text: 'Unlimited Classes', included: true },
      { text: 'Monthly Sunday Masterclass', included: true },
      { text: 'Bonus E-Books', included: true },
      { text: '3 Mini Programs', included: true },
      { text: 'Progress Tracking', included: true },
      { text: 'Community Support', included: true },
      { text: '1 Month Access to AOL App', included: true }
    ]
  }
];

