import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, Eye, ChevronLeft, ChevronRight, Download } from 'lucide-react';

export const SubscriptionManagement = () => {
  const { subscriptionsList, setSelectedAdminSubDetail } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [planFilter, setPlanFilter] = useState('ALL');

  const filteredSubs = subscriptionsList.filter((sub) => {
    const matchesSearch =
      sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.phone.includes(searchTerm) ||
      sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.mandateId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || sub.status === statusFilter;
    const matchesPlan = planFilter === 'ALL' || sub.planCode === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
            Subscription Management
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Master subscriber database with real-time Juspay mandate status tracking.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting subscriber database CSV...')}
          className="btn-secondary"
          style={{ background: '#ffffff', fontSize: '0.85rem' }}
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* FILTER & SEARCH STRIP */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '10px' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Name, Email, Phone, Subscription ID, Mandate ID..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Filter size={16} color="#64748b" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="RENEWAL_DUE">Renewal Due</option>
            <option value="RENEWAL_FAILED">Renewal Failed</option>
            <option value="EXPIRED">Expired</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
          >
            <option value="ALL">All Plans</option>
            <option value="YOGA_12M">12 Months (₹4,999)</option>
            <option value="YOGA_6M">6 Months (₹3,999)</option>
            <option value="YOGA_3M">3 Months (₹1,499)</option>
          </select>
        </div>
      </div>

      {/* MASTER DATA TABLE */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subscriber</th>
              <th>Subscription ID</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Autopay Status</th>
              <th>Next Renewal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubs.map((sub) => (
              <tr key={sub.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedAdminSubDetail(sub)}>
                <td>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{sub.customerName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sub.email}</div>
                </td>
                <td style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>{sub.id}</td>
                <td>{sub.planName}</td>
                <td>
                  <span
                    className={`badge ${
                      sub.status === 'ACTIVE'
                        ? 'badge-active'
                        : sub.status === 'RENEWAL_FAILED'
                        ? 'badge-danger'
                        : 'badge-warning'
                    }`}
                  >
                    {sub.status}
                  </span>
                </td>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>₹{sub.amount?.toLocaleString('en-IN')}</td>
                <td>
                  <span className={`badge ${sub.autopayStatus === 'ACTIVE' ? 'badge-active' : 'badge-danger'}`}>
                    {sub.autopayStatus}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem', fontWeight: 600 }}>{sub.nextRenewal}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAdminSubDetail(sub);
                    }}
                    style={{
                      background: '#f1f5f9',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
