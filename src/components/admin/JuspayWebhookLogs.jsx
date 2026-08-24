import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Webhook, Eye, X, Code, CheckCircle, AlertTriangle, RefreshCcw } from 'lucide-react';

export const JuspayWebhookLogs = () => {
  const { webhookLogs } = useApp();
  const [selectedLog, setSelectedLog] = useState(null);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Juspay Events & Webhook Logs
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Technical event stream visualization for Juspay recurring billing, mandates & payment webhooks.
        </p>
      </div>

      {/* WEBHOOK EVENT STREAM TABLE */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event Type</th>
              <th>Event ID</th>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Mandate ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {webhookLogs.map((log) => (
              <tr key={log.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedLog(log)}>
                <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{log.timestamp}</td>
                <td>
                  <span
                    className={`badge ${
                      log.eventType.includes('SUCCESS') || log.eventType.includes('CREATED')
                        ? 'badge-active'
                        : log.eventType.includes('FAILED')
                        ? 'badge-danger'
                        : 'badge-info'
                    }`}
                    style={{ fontSize: '0.7rem' }}
                  >
                    {log.eventType}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem', fontWeight: 600 }}>{log.id}</td>
                <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{log.orderId}</td>
                <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{log.customerId}</td>
                <td style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7' }}>{log.mandateId}</td>
                <td>
                  <span className={`badge ${log.status === 'PROCESSED' ? 'badge-active' : 'badge-warning'}`}>
                    {log.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLog(log);
                    }}
                    style={{ background: '#0f172a', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Code size={13} /> Inspect JSON
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* JSON PAYLOAD INSPECTOR DRAWER */}
      {selectedLog && (
        <div className="drawer-overlay">
          <div className="drawer-content" style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                  Juspay Webhook Payload Inspector
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                  {selectedLog.eventType}
                </h2>
              </div>

              <button
                onClick={() => setSelectedLog(null)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={18} color="#64748b" />
              </button>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px', marginBottom: '20px', fontSize: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div><span style={{ color: '#64748b' }}>Event ID:</span> <strong>{selectedLog.id}</strong></div>
                <div><span style={{ color: '#64748b' }}>Order ID:</span> <strong>{selectedLog.orderId}</strong></div>
                <div><span style={{ color: '#64748b' }}>Customer ID:</span> <strong>{selectedLog.customerId}</strong></div>
                <div><span style={{ color: '#64748b' }}>Mandate ID:</span> <strong>{selectedLog.mandateId}</strong></div>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Raw Webhook Request Payload (JSON)
            </div>

            <pre
              style={{
                background: '#0f172a',
                color: '#38bdf8',
                padding: '20px',
                borderRadius: '14px',
                fontSize: '0.825rem',
                overflowX: 'auto',
                fontFamily: 'monospace',
                lineHeight: 1.5,
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)'
              }}
            >
              {JSON.stringify(selectedLog.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
