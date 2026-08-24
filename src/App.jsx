import React from 'react';
import { useApp } from './context/AppContext';
import { DemoControlBar } from './components/demo/DemoControlBar';
import { PublicLandingPage } from './components/customer/PublicLandingPage';
import { LandingPage } from './components/customer/LandingPage';
import { RegistrationModal } from './components/customer/RegistrationModal';
import { CrmRegistrationForm } from './components/customer/CrmRegistrationForm';
import { CrmRegistrationFormV2 } from './components/customer/CrmRegistrationFormV2';
import { JuspayCheckoutModal } from './components/customer/JuspayCheckoutModal';
import { ConfirmationScreen } from './components/customer/ConfirmationScreen';
import { ConfirmationScreenV2 } from './components/customer/ConfirmationScreenV2';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { ManageSubscriptionHub } from './components/customer/ManageSubscriptionHub';
import { CancelSubscriptionFlow } from './components/customer/CancelSubscriptionFlow';
import { ChangePlanFlow } from './components/customer/ChangePlanFlow';
import { EditPaymentFlow } from './components/customer/EditPaymentFlow';

import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SubscriptionManagement } from './components/admin/SubscriptionManagement';
import { SubscriptionDetailDrawer } from './components/admin/SubscriptionDetailDrawer';
import { RenewalsConsole } from './components/admin/RenewalsConsole';
import { PlansManagement } from './components/admin/PlansManagement';
import { PaymentsMandates } from './components/admin/PaymentsMandates';
import { CommunicationsCenter } from './components/admin/CommunicationsCenter';
import { JuspayWebhookLogs } from './components/admin/JuspayWebhookLogs';

export default function App() {
  const { appVersion, activeApp, customerScreen, adminTab } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Floating Stakeholder Review Control Bar */}
      <DemoControlBar />

      {activeApp === 'CUSTOMER' ? (
        /* EXPERIENCE A: CUSTOMER / YOGA PARTICIPANT JOURNEY */
        <div>
          {customerScreen === 'PUBLIC_LANDING' && <PublicLandingPage />}
          {customerScreen === 'LANDING' && <LandingPage />}
          {customerScreen === 'MANAGE_SUB' && <RegistrationModal />}
          {customerScreen === 'CRM_FORM' && (appVersion === 'v2' ? <CrmRegistrationFormV2 /> : <CrmRegistrationForm />)}
          {customerScreen === 'PAYMENT' && <JuspayCheckoutModal />}
          {customerScreen === 'CONFIRMATION' && <ConfirmationScreen />}
          {customerScreen === 'CONFIRMATION_V2' && <ConfirmationScreenV2 />}
          {customerScreen === 'DASHBOARD' && <CustomerDashboard />}
          {customerScreen === 'MANAGE_HUB' && <ManageSubscriptionHub />}
          {customerScreen === 'CANCEL_WIZARD' && <CancelSubscriptionFlow />}
          {customerScreen === 'CHANGE_PLAN_WIZARD' && <ChangePlanFlow />}
          {customerScreen === 'EDIT_PAYMENT_WIZARD' && <EditPaymentFlow />}
        </div>
      ) : (
        /* EXPERIENCE B: ADMIN / OPERATIONS CONSOLE */
        <AdminLayout>
          {adminTab === 'DASHBOARD' && <AdminDashboard />}
          {adminTab === 'SUBSCRIPTIONS' && <SubscriptionManagement />}
          {adminTab === 'RENEWALS' && <RenewalsConsole />}
          {adminTab === 'PLANS' && <PlansManagement />}
          {adminTab === 'PAYMENTS' && <PaymentsMandates />}
          {adminTab === 'COMMUNICATIONS' && <CommunicationsCenter />}
          {adminTab === 'EVENTS' && <JuspayWebhookLogs />}

          {/* Admin Drawers */}
          <SubscriptionDetailDrawer />
        </AdminLayout>
      )}
    </div>
  );
}
