import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Search, 
  Filter, 
  X, 
  Eye, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp, 
  Layers, 
  User, 
  Calendar,
  FileText
} from 'lucide-react';

export const PaymentsMandates = () => {
  const { paymentHistory } = useApp();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('ALL');
  const [selectedEventType, setSelectedEventType] = useState('ALL');
  const [selectedMethodFilter, setSelectedMethodFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState('ALL');

  // Detail Drawer State
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter Logic
  const filteredPayments = paymentHistory.filter((pmt) => {
    // 1. Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = 
        (pmt.id && pmt.id.toLowerCase().includes(q)) ||
        (pmt.orderId && pmt.orderId.toLowerCase().includes(q)) ||
        (pmt.subscriptionId && pmt.subscriptionId.toLowerCase().includes(q)) ||
        (pmt.customerId && pmt.customerId.toLowerCase().includes(q)) ||
        (pmt.customerName && pmt.customerName.toLowerCase().includes(q)) ||
        (pmt.customerPhone && pmt.customerPhone.toLowerCase().includes(q)) ||
        (pmt.mandateId && pmt.mandateId.toLowerCase().includes(q)) ||
        (pmt.description && pmt.description.toLowerCase().includes(q));
      if (!matchSearch) return false;
    }

    // 2. Plan / Course Filter
    if (selectedPlanFilter !== 'ALL') {
      if (pmt.planCode !== selectedPlanFilter && pmt.planName !== selectedPlanFilter) {
        return false;
      }
    }

    // 3. Event / Transaction Type Filter
    if (selectedEventType !== 'ALL') {
      if (pmt.paymentType !== selectedEventType) return false;
    }

    // 4. Payment Method Filter
    if (selectedMethodFilter !== 'ALL') {
      if (selectedMethodFilter === 'UPI' && !pmt.method?.includes('UPI')) return false;
      if (selectedMethodFilter === 'Card' && !pmt.method?.includes('Card')) return false;
      if (selectedMethodFilter === 'NetBanking' && !pmt.method?.includes('NetBanking')) return false;
    }

    // 5. Payment Status Filter
    if (selectedStatusFilter !== 'ALL') {
      if (selectedStatusFilter === 'PAID' && !pmt.status?.includes('Paid') && pmt.status !== 'SUCCESS') return false;
      if (selectedStatusFilter === 'FAILED' && !pmt.status?.includes('Failed') && pmt.status !== 'FAILED') return false;
    }

    // 6. Customer Filter
    if (selectedCustomerFilter !== 'ALL') {
      if (pmt.customerId !== selectedCustomerFilter) return false;
    }

    return true;
  });

  // Calculate Metrics for Filtered Set
  const totalVolume = filteredPayments.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const paidCount = filteredPayments.filter(p => p.status?.includes('Paid') || p.status === 'SUCCESS').length;
  const upgradeCount = filteredPayments.filter(p => p.paymentType?.includes('Upgrade')).length;
  const failedCount = filteredPayments.filter(p => p.status?.includes('Failed') || p.status === 'FAILED').length;

  // Clear All Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPlanFilter('ALL');
    setSelectedEventType('ALL');
    setSelectedMethodFilter('ALL');
    setSelectedStatusFilter('ALL');
    setSelectedCustomerFilter('ALL');
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedPlanFilter !== 'ALL' || 
    selectedEventType !== 'ALL' || 
    selectedMethodFilter !== 'ALL' || 
    selectedStatusFilter !== 'ALL' ||
    selectedCustomerFilter !== 'ALL';

  // Get all customer transactions for traceability in drawer
  const getCustomerHistory = (customerId) => {
    return paymentHistory.filter(p => p.customerId === customerId);
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* PAGE HEADER */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CreditCard size={28} color="#d97706" /> Payments & Mandates Traceability
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
          End-to-end transaction ledger linking Customer ➔ Subscription ➔ Plan Upgrades ➔ Payment ➔ Mandate Reference.
        </p>
      </div>

      {/* METRICS SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Filtered Transactions</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>{filteredPayments.length} Entries</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Total Volume</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>₹{totalVolume.toLocaleString('en-IN')}</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Paid Transactions</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>{paidCount} Paid</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Plan Upgrades</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>{upgradeCount} Upgrades</div>
        </div>
      </div>

      {/* FILTER CONTROLS PANEL (AUDIO REQUEST) */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '20px', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
            <Filter size={18} color="#d97706" /> Filter Payments & Mandates
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <RotateCcw size={13} /> Reset All Filters
            </button>
          )}
        </div>

        {/* 1. SEARCH INPUT */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Customer Name, Phone, Customer ID, Sub ID, Order ID, Payment ID, or Mandate Ref..."
              style={{
                width: '100%',
                padding: '10px 14px 10px 42px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* 2. DROPDOWN FILTERS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          
          {/* CUSTOMER FILTER */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
              Customer:
            </label>
            <select
              value={selectedCustomerFilter}
              onChange={(e) => setSelectedCustomerFilter(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
            >
              <option value="ALL">All Customers</option>
              <option value="CUST_6688891">Pragathi (CUST_6688891)</option>
              <option value="CUST_7719201">Rajesh Sharma (CUST_7719201)</option>
              <option value="CUST_8830192">Anita Deshmukh (CUST_8830192)</option>
            </select>
          </div>

          {/* COURSE / PLAN FILTER */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
              Course / Plan:
            </label>
            <select
              value={selectedPlanFilter}
              onChange={(e) => setSelectedPlanFilter(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
            >
              <option value="ALL">All Courses / Plans</option>
              <option value="YOGA_3M">3 Month Sri Sri Yoga Challenge</option>
              <option value="YOGA_6M">6 Month Sri Sri Yoga Challenge</option>
              <option value="YOGA_12M">12 Month Sri Sri Yoga Challenge</option>
            </select>
          </div>

          {/* EVENT / TRANSACTION TYPE FILTER */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
              Transaction Type / Event:
            </label>
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
            >
              <option value="ALL">All Transaction Types</option>
              <option value="Initial Purchase">Initial Purchase</option>
              <option value="Plan Upgrade">Plan Upgrade</option>
              <option value="Auto-Renewal">Auto-Renewal</option>
            </select>
          </div>

          {/* PAYMENT METHOD FILTER */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
              Payment Method:
            </label>
            <select
              value={selectedMethodFilter}
              onChange={(e) => setSelectedMethodFilter(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
            >
              <option value="ALL">All Payment Methods</option>
              <option value="UPI">UPI Auto-debit</option>
              <option value="Card">Credit / Debit Card</option>
              <option value="NetBanking">NetBanking</option>
            </select>
          </div>

          {/* PAYMENT STATUS FILTER */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
              Payment Status:
            </label>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff' }}
            >
              <option value="ALL">All Payment Statuses</option>
              <option value="PAID">✓ Paid / Successful</option>
              <option value="FAILED">✕ Failed</option>
            </select>
          </div>

        </div>

        {/* ACTIVE FILTER TAGS BAR */}
        {hasActiveFilters && (
          <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: '#64748b' }}>Active Filters:</span>
            {searchQuery && (
              <span style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                Query: "{searchQuery}"
              </span>
            )}
            {selectedCustomerFilter !== 'ALL' && (
              <span style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                Customer: {selectedCustomerFilter}
              </span>
            )}
            {selectedPlanFilter !== 'ALL' && (
              <span style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                Plan: {selectedPlanFilter}
              </span>
            )}
            {selectedEventType !== 'ALL' && (
              <span style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                Event: {selectedEventType}
              </span>
            )}
            {selectedMethodFilter !== 'ALL' && (
              <span style={{ background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                Method: {selectedMethodFilter}
              </span>
            )}
            {selectedStatusFilter !== 'ALL' && (
              <span style={{ background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                Status: {selectedStatusFilter}
              </span>
            )}
          </div>
        )}

      </div>

      {/* PAYMENTS TABLE */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                <th style={{ padding: '12px 16px' }}>Payment ID</th>
                <th style={{ padding: '12px 16px' }}>Customer Details</th>
                <th style={{ padding: '12px 16px' }}>Subscription ID & Plan</th>
                <th style={{ padding: '12px 16px' }}>Event Type</th>
                <th style={{ padding: '12px 16px' }}>Amount</th>
                <th style={{ padding: '12px 16px' }}>Payment Method</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Mandate Ref</th>
                <th style={{ padding: '12px 16px' }}>Date & Time</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                    No payment records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((pmt) => {
                  const isPaid = pmt.status?.includes('Paid') || pmt.status === 'SUCCESS';
                  const isUpgrade = pmt.paymentType?.includes('Upgrade');

                  return (
                    <tr key={pmt.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      {/* PAYMENT ID */}
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0f172a' }}>
                        {pmt.id}
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 400 }}>{pmt.orderId}</div>
                      </td>

                      {/* CUSTOMER DETAILS */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{pmt.customerName || 'Pragathi'}</div>
                        <div style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 600 }}>{pmt.customerId}</div>
                      </td>

                      {/* SUBSCRIPTION ID & PLAN */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#0369a1' }}>{pmt.subscriptionId}</div>
                        <div style={{ fontSize: '0.72rem', color: '#475569', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {pmt.planName || pmt.description}
                        </div>
                      </td>

                      {/* EVENT TYPE BADGE */}
                      <td style={{ padding: '14px 16px' }}>
                        <span 
                          style={{
                            background: isUpgrade ? '#eff6ff' : '#f8fafc',
                            color: isUpgrade ? '#2563eb' : '#334155',
                            border: isUpgrade ? '1px solid #bfdbfe' : '1px solid #cbd5e1',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {isUpgrade && <TrendingUp size={12} />}
                          {pmt.paymentType || 'Initial Purchase'}
                        </span>
                      </td>

                      {/* AMOUNT */}
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0f172a' }}>
                        ₹{pmt.amount?.toLocaleString('en-IN')}
                      </td>

                      {/* PAYMENT METHOD */}
                      <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 600, fontSize: '0.8rem' }}>
                        {pmt.method}
                      </td>

                      {/* STATUS */}
                      <td style={{ padding: '14px 16px' }}>
                        <span 
                          style={{
                            background: isPaid ? '#dcfce7' : '#fee2e2',
                            color: isPaid ? '#15803d' : '#b91c1c',
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {isPaid ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                          {pmt.status}
                        </span>
                      </td>

                      {/* MANDATE REFERENCE */}
                      <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontWeight: 700, color: '#0369a1', fontSize: '0.8rem' }}>
                        {pmt.mandateId}
                      </td>

                      {/* DATE & TIME */}
                      <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '0.78rem' }}>
                        {pmt.date}
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{pmt.time}</div>
                      </td>

                      {/* ACTION BUTTON */}
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            setSelectedPayment(pmt);
                            setIsDrawerOpen(true);
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            background: '#f1f5f9',
                            color: '#1e293b',
                            border: '1px solid #cbd5e1',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Eye size={13} /> View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRACEABILITY DETAIL DRAWER */}
      {isDrawerOpen && selectedPayment && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 9999, 
            background: 'rgba(15, 23, 42, 0.5)', 
            display: 'flex', 
            justifyContent: 'flex-end',
            backdropFilter: 'blur(2px)'
          }}
          onClick={() => setIsDrawerOpen(false)}
        >
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '560px', 
              height: '100%', 
              background: '#ffffff', 
              boxShadow: '-10px 0 30px rgba(0,0,0,0.15)', 
              display: 'flex', 
              flexDirection: 'column',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* DRAWER HEADER */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  END-TO-END LEDGER TRACEABILITY
                </span>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                  Payment {selectedPayment.id}
                </h2>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* DRAWER BODY */}
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* LEDGER FLOW DIAGRAM */}
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '14px', padding: '16px', fontSize: '0.8rem' }}>
                <div style={{ fontWeight: 800, color: '#0369a1', marginBottom: '8px' }}>
                  Ledger Link Traceability Chain
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#1e293b', fontWeight: 600 }}>
                  <div>👤 <strong>Customer:</strong> {selectedPayment.customerName || 'Pragathi'} ({selectedPayment.customerId})</div>
                  <div>📄 <strong>Subscription:</strong> {selectedPayment.subscriptionId}</div>
                  <div>🛒 <strong>Order ID:</strong> {selectedPayment.orderId}</div>
                  <div>💳 <strong>Payment Ref:</strong> {selectedPayment.id}</div>
                  <div>🔐 <strong>Juspay Mandate:</strong> {selectedPayment.mandateId}</div>
                </div>
              </div>

              {/* CUSTOMER TRANSACTION TRAIL FOR MULTI-PLAN HISTORY */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', background: '#ffffff' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                  Customer Transaction & Upgrade History ({selectedPayment.customerName || 'Pragathi'})
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {getCustomerHistory(selectedPayment.customerId).map((histPmt, idx) => (
                    <div 
                      key={histPmt.id}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: histPmt.id === selectedPayment.id ? '#fff9f0' : '#f8fafc',
                        border: histPmt.id === selectedPayment.id ? '1.5px solid #f59e0b' : '1px solid #e2e8f0',
                        fontSize: '0.8rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                        <span style={{ color: '#0f172a' }}>{histPmt.planName || histPmt.description}</span>
                        <span style={{ color: '#d97706' }}>₹{histPmt.amount}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.72rem', marginTop: '4px' }}>
                        <span>Sub: {histPmt.subscriptionId} ({histPmt.paymentType})</span>
                        <span>{histPmt.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GATEWAY METADATA */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px', background: '#ffffff' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                  Juspay Payment Gateway Response Details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
                  <div><span style={{ color: '#64748b' }}>Status:</span> <strong>{selectedPayment.status}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Method:</span> <strong>{selectedPayment.method}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Amount:</span> <strong>₹{selectedPayment.amount}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Mandate Ref:</span> <strong>{selectedPayment.mandateId}</strong></div>
                </div>
              </div>

            </div>

            {/* DRAWER FOOTER */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={{ padding: '8px 20px', borderRadius: '8px', background: '#334155', color: '#ffffff', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: 'pointer' }}
              >
                Close Traceability View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
