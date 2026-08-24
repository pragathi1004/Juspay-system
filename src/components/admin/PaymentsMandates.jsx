import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, ShieldCheck, Lock, ArrowRight, Search, Filter } from 'lucide-react';

export const PaymentsMandates = () => {
  const { paymentHistory, subscriptionsList } = useApp();
  const [filterStatus, setFilterStatus] = useState('ALL');

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Payments & Mandates Traceability
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Full ledger linking Customer → Subscription → Order → Payment → Mandate.
        </p>
      </div>

      {/* FILTER BAR */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Filter size={16} color="#64748b" />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
        >
          <option value="ALL">All Payment Statuses</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="FAILED">FAILED</option>
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Subscription ID</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Mandate ID</th>
              <th>Mandate Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory
              .filter((p) => filterStatus === 'ALL' || p.status === filterStatus)
              .map((pmt) => (
                <tr key={pmt.id}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{pmt.id}</td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{pmt.orderId}</td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{pmt.customerId}</td>
                  <td style={{ fontSize: '0.8rem', fontWeight: 600 }}>{pmt.subscriptionId}</td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>₹{pmt.amount?.toLocaleString('en-IN')}</td>
                  <td style={{ fontSize: '0.85rem' }}>{pmt.method}</td>
                  <td>
                    <span className={`badge ${pmt.status === 'SUCCESS' ? 'badge-active' : 'badge-danger'}`}>
                      {pmt.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0369a1' }}>{pmt.mandateId}</td>
                  <td>
                    <span className="badge badge-active">ACTIVE</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
