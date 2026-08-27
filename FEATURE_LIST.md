# Sri Sri Yoga — Juspay AutoPay Subscription System
## Comprehensive Feature List & System Architecture Document

---

### 1. Executive Summary
The **Sri Sri Yoga Juspay AutoPay Subscription System** is an end-to-end recurring membership and automated mandate management platform built for **The Art of Living (Sri Sri School of Yoga)** in integration with **Juspay's Recurring Payment Gateway**. 

The system powers a seamless experience across the entire customer lifecycle—from public plan selection, multi-channel lead authentication, CRM registration, and Juspay AutoPay mandate authorization, through to active member daily class access and self-serve subscription management—while providing administrators with a powerful operations console.

---

### 2. Core User Experiences & Personas

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SRI SRI YOGA PLATFORM                           │
├──────────────────────────────────┬─────────────────────────────────────┤
│   EXPERIENCE A: MEMBER / LEAD    │     EXPERIENCE B: ADMIN / OPS       │
│  • Public Plans & Benefits       │  • Operations Dashboard & Metrics   │
│  • Multi-Channel Auth & Login    │  • Master Subscriber Registry       │
│  • CRM Details & Autopay Consent │  • Juspay Mandate Tracking          │
│  • Live Class Dashboard          │  • Smart Retry & Renewals Console   │
│  • Self-Serve Subscription Hub   │  • Communications Center (10 TPs)   │
│  • Change Plan / Payment / Cancel│  • Real-Time Juspay Webhook Logs    │
└──────────────────────────────────┴─────────────────────────────────────┘
```

---

### 3. Customer & Member Journey Features

#### 3.1. Public Landing Page & Pricing Catalog
* **Hero Banner & Trust Metrics**: Highlighting live daily classes, expert instructors, and community impact.
* **Tiered Membership Plans**:
  * **12 Months Plan (Most Popular)**: ₹4,999 (₹14,999 value • 67% discount) with all-inclusive bonus masterclasses, e-books, and 1-month app access.
  * **6 Months Plan**: ₹3,999 (50% discount) with core live classes and programs.
  * **3 Months Plan (Best Value)**: ₹1,499 with essential daily yoga access.
* **Language Customization**: In-card interactive language selector (`English / Hindi`, `Tamil`, `Telugu`, `Kannada`, `Marathi`, `Gujarati`).
* **Member Transformation Stories Grid**: 7 real practitioner testimonials with quotes and location badges, plus a dynamic CTA tile.
* **Trust & Quality Badges**: 4-pillar trust banner (50,000+ members, daily live sessions, holistic lifestyle, conscious community).

#### 3.2. Multi-Channel Authentication & Subscriber Login
* **Modal-Based Secure Auth**:
  * **Phone OTP Flow**: 10-digit mobile verification with automated timer countdown and OTP fill helper.
  * **Social Authentication**: Google, Facebook, WhatsApp direct auth, and Email OTP fallback.
* **Existing Subscriber Access ("Get Daily Link" Flow)**:
  * Dedicated login view with dual branding (**Sri Sri School of Yoga | The Art of Living**).
  * **Direct Dashboard Access**: Registered name and WhatsApp number input for immediate access without OTP barrier.
  * **OTP Fallback**: Option for members who forgot their number or require OTP verification.

#### 3.3. CRM Registration & Mandate Consent (Step 1 of 3)
* **Program Information Sidebar**: Live calculation of contribution amount, billing cycle (Quarterly, Half-Yearly, Annual), and support contact details.
* **Participant Details Capture**: First name, last name, phone, email, age, and 6-digit postal code with instant city/state resolution (e.g., `560082` → `Bengaluru Urban, Karnataka`).
* **Autopay Legal Disclaimers**: Explicit notice regarding automatic renewal terms and RBI-compliant recurring mandate authorization.

#### 3.4. Juspay AutoPay Checkout Modal (Step 2 of 3)
* **Supported Payment Methods**:
  * **UPI AutoPay**: Google Pay, PhonePe, Paytm, BHIM, and Custom UPI ID verification with instant mandate confirmation.
  * **Debit / Credit Cards**: Tokenized recurring mandates with CVV and 3D Secure 2.0 authorization.
  * **Net Banking & e-Mandates**: Supported across major Indian banks.
* **Order & Mandate Summary**: Transparent breakdown of first charge and recurring schedule amount.
* **Security Badges**: 256-bit encryption, Digicert certified, and Juspay secure infrastructure.

#### 3.5. Mandate Confirmation Screen (Step 3 of 3)
* **Real-Time Mandate Receipt**: Displays generated `Mandate ID`, `Subscription ID`, and authorized auto-debit schedule.
* **Pre-Class Checklist**: WhatsApp group join link, device orientation guide, and calendar invite generator.
* **Instant Dashboard Redirection**: Seamless transition into the active member experience.

#### 3.6. Active Member Live Class Dashboard
* **Next Live Session Timer**: Real-time countdown clock counting down to upcoming 5:00 AM, 6:00 AM, 7:00 AM, 8:00 AM, 11:00 AM, 4:00 PM, 5:00 PM, 6:00 PM, 7:00 PM, 8:00 PM IST batches.
* **Embedded YouTube Live Player**: Direct access to daily yoga streaming.
* **Membership Health Widget**: Displays subscription status, expiry date, lifetime practice days, and remaining validity.
* **Upcoming Masterclasses & Weekly Q&A**: Schedule of specialized sessions (e.g., Dental Health, Pranayama, Posture Correction).
* **Gamified Milestones & Rewards**: Unlocked achievement badges (e.g., 7-Day Streak, 14-Day Challenge, Target Badges).

#### 3.7. Self-Service Subscription Management Hub
* **Active Plan & Mandate Overview**: Detailed card displaying next auto-debit date, payment method on file, and mandate reference.
* **Change Plan Wizard**: Seamless plan upgrading/downgrading with automatic mandate re-calculation.
* **Edit Payment Method Wizard**: Update card details or replace UPI ID with a fresh 1-click verification.
* **Cancel Subscription Wizard**:
  * Step 1: Retention benefits & pause subscription option (15 or 30 days).
  * Step 2: Feedback and reason capture.
  * Step 3: Cancellation confirmation with guaranteed continued access until the current paid period ends.

---

### 4. Admin & Operations Console Features

#### 4.1. Operations Dashboard
* **Executive Metric Cards**:
  * Monthly Recurring Revenue (MRR).
  * Active Subscriptions & New Joinees.
  * Auto-Renewal Success Rate (94%+ benchmark).
  * Mandate Failure Rate & Retries in queue.
* **Auto-Renewal Performance Graph**: Monthly auto-debit success rate tracking across past and current billing cycles with clear color-coded legends.
* **Operational Alerts Feed**: Immediate action items for failed charges, expired mandates, or retry bottlenecks.

#### 4.2. Master Subscription Database
* **Real-Time Data Table**: Lists subscriber name, contact details, plan type, status (`ACTIVE`, `RENEWAL_DUE`, `RENEWAL_FAILED`, `CANCELLED`, `EXPIRED`), mandate status, and next renewal date.
* **Multi-Parameter Search & Filters**: Search by Name, Email, Phone, Subscription ID, or Mandate ID; filter by status and duration tier.
* **CSV Export**: One-click subscriber export capability.

#### 4.3. Interactive Subscriber Detail Drawer
* **Overview Tab**: Personal contact info, Juspay mandate specs, and one-click admin actions (**Manual Retry Payment** & **Revoke Mandate**).
* **Payments Tab**: Historical transaction receipts with status, method, and transaction IDs.
* **Communications Tab**: Complete delivery audit of automated emails and WhatsApp notifications.
* **Lifecycle Timeline Tab**: Step-by-step audit log from lead creation to mandate activation and renewals.

#### 4.4. Renewals & Failed Retries Console
* **T-24h Pre-Debit Notification Queue**: Tracking compliance with RBI pre-debit notifications sent via SMS and WhatsApp.
* **Smart Retry Engine**:
  * 3-tier exponential backoff retries for failed auto-debits (Days 1, 3, and 5).
  * Error categorization (e.g., `INSUFFICIENT_FUNDS`, `BANK_SERVER_DOWN`, `MANDATE_SUSPENDED`).
* **Grace Period Monitor**: Configurable 7-day grace period ensuring members retain daily class access while payment is recovered.

#### 4.5. CRM Course Registry & Mandate Mapping (Courses)
* **Course Catalog Management**: Edit pricing, toggle included/excluded features, and define duration.
* **Backend Mandate Mapping**: Maps CRM course IDs to Juspay recurring plan IDs for automated webhook processing.

#### 4.6. Payments & Mandates Registry
* **Transaction Ledger**: Complete audit of first charges, renewal debits, refunds, and adjustments.
* **Mandate Status Tracking**: Real-time status sync (`ACTIVE`, `PAUSED`, `REVOKED`, `EXPIRED`) with issuing banks.

#### 4.7. Communications Center (10 Touchpoint Lifecycle Map)
Automated Email & WhatsApp template management across 10 critical subscriber milestones:
1. **Subscription Confirmation (1.0)**: Start/end date, amount, mandate ID, welcome video link.
2. **Renewal Reminder T-1 Day (2.0)**: Mandatory pre-debit notice, renewal amount, manage link.
3. **Renewal Success (3.0)**: Updated end date, payment receipt.
4. **Renewal Failed - Per Retry (4.0)**: Failure diagnosis, next retry date, payment update link.
5. **Subscription Expired (5.0)**: Grace period expiry, re-subscribe options.
6. **Cancellation Confirmation (6.0)**: Access-until date confirmation, feedback acknowledgment.
7. **Payment Method Updated (7.0)**: Confirmation of newly linked card/UPI mandate.
8. **Plan Upgraded / Downgraded (8.0)**: New plan terms and revised auto-debit schedule.
9. **Subscription Paused (9.0)**: Resume date and frozen billing notification.
10. **Subscription Resumed (10.0)**: Welcome back message and upcoming schedule.

* **Template Preview Drawer**: Interactive preview drawer displaying both **Email HTML templates** (subject + formatted body) and **WhatsApp message templates** in an auto-scrollable inspector.

#### 4.8. Real-Time Juspay Webhook Logs
* **Live Event Stream**: Incoming webhook listeners capturing `MANDATE_CREATED`, `PAYMENT_SUCCESS`, `RENEWAL_SUCCESS`, `PAYMENT_FAILED`, `MANDATE_REVOKED`.
* **Payload Inspector**: JSON viewer to debug raw payload responses from Juspay gateway.
* **Header Notification Bell**: Top-bar notification bell linked directly to real-time webhook logs.

---

### 5. Stakeholder & Demo Simulator Tooling

* **Floating Stakeholder Review Bar**:
  * **Role Switcher**: 1-click toggle between **Yoga Participant (Customer)** and **Operations Lead (Admin)**.
  * **State Simulator Dropdown**: Instantly jump to any lifecycle scenario:
    * `Public Landing & Plans`
    * `CRM Registration & Consent`
    * `Juspay AutoPay Payment Gateway`
    * `Active Subscription Dashboard`
    * `Autopay Disabled (Manual Mode)`
    * `Renewal Due (T-24h Warning)`
    * `Auto-Debit Failed & Retry Queue`
    * `Grace Period & Expired Plan`
    * `Manage Subscription Hub`

---

### 6. Technical Stack & Architecture

| Layer | Technology |
|---|---|
| **Core Framework** | React 18 (Hooks, Context API for centralized state management) |
| **Bundler & Build Tool** | Vite 6 |
| **Styling & Design System** | Modern Vanilla CSS, Glassmorphism, CSS Grid/Flexbox, Custom Art of Living color tokens (`--aol-orange`, `--aol-cream-bg`, `--aol-mint-bg`) |
| **Iconography** | Lucide React |
| **Payment Gateway Integration** | Juspay AutoPay Mandates API simulation (UPI AutoPay, Cards, e-Mandates) |
| **Version Control** | Git & GitHub (`main` branch) |

---

*Document compiled for Art of Living & Juspay Integration Stakeholders.*
