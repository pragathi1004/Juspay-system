import React, { useState } from 'react';
import { COMMUNICATION_TOUCHPOINTS } from '../../data/communicationTouchpoints';
import { MessageSquare, Mail, Eye, X, Send, CheckCircle2, ChevronRight } from 'lucide-react';

export const CommunicationsCenter = () => {
  const [selectedTouchpoint, setSelectedTouchpoint] = useState(null);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Communications Center (10 Touchpoints)
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Automated Email & WhatsApp notifications mapped across Phase 1 & Phase 2 lifecycle triggers.
        </p>
      </div>

      {/* TOUCHPOINTS TABLE */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Touchpoint Name</th>
              <th>Phase</th>
              <th>Trigger Event</th>
              <th>Channels</th>
              <th>Delivery Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {COMMUNICATION_TOUCHPOINTS.map((tp) => (
              <tr key={tp.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedTouchpoint(tp)}>
                <td style={{ fontWeight: 700, color: '#64748b' }}>{tp.id}.0</td>
                <td>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{tp.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{tp.keyContent}</div>
                </td>
                <td>
                  <span className={`badge ${tp.phase === 'Phase 1' ? 'badge-info' : 'badge-warning'}`}>
                    {tp.phase}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem', color: '#334155', fontWeight: 600 }}>{tp.trigger}</td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {tp.email && (
                      <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <Mail size={12} /> Email
                      </span>
                    )}
                    {tp.whatsapp && (
                      <span style={{ background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <MessageSquare size={12} /> WhatsApp
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ fontWeight: 700, color: '#16a34a' }}>{tp.deliveryRate}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTouchpoint(tp);
                    }}
                    style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Eye size={14} /> Preview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TEMPLATE PREVIEW DRAWER */}
      {selectedTouchpoint && (
        <div className="drawer-overlay">
          <div className="drawer-content" style={{ maxWidth: '640px', overflowY: 'auto', maxHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
              <div>
                <span className="badge badge-info">{selectedTouchpoint.phase}</span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                  {selectedTouchpoint.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedTouchpoint(null)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Email Template Preview Box */}
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#1d4ed8', fontWeight: 700, fontSize: '0.9rem' }}>
                <Mail size={18} /> Email Notification Template
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '12px' }}>
                Subject: {selectedTouchpoint.templatePreview.subject}
              </div>

              <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, background: '#fcfcfc', padding: '14px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                {selectedTouchpoint.templatePreview.body}
              </div>
            </div>

            {/* WhatsApp Template Preview Box */}
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#047857', fontWeight: 700, fontSize: '0.9rem' }}>
                <MessageSquare size={18} /> WhatsApp Notification Template
              </div>

              <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: '#064e3b', lineHeight: 1.5, background: '#ffffff', padding: '14px', borderRadius: '8px', border: '1px solid #6ee7b7' }}>
                {selectedTouchpoint.templatePreview.waMessage}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
