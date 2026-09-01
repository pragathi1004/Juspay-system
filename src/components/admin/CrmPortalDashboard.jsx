import React, { useState } from 'react';
import {
  Search,
  ThumbsUp,
  Bell,
  RefreshCw,
  PlusCircle,
  Calendar,
  FileText,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  Users,
  ChevronRight,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const CrmPortalDashboard = ({ onNavigateToAnnounce, onSelectCourse, courses = [] }) => {
  const [activeSubTab, setActiveSubTab] = useState('Home');

  const statCards = [
    { title: 'Upcoming Programs', value: courses.length || 5, color: '#3b82f6', active: true },
    { title: 'Pending Participant Upload', value: 0, color: '#64748b' },
    { title: 'Submit CRF', value: 3, color: '#3b82f6', active: true },
    { title: 'Honorarium Pending', value: 0, color: '#64748b' },
    { title: 'Online Interested Leads', value: 14, color: '#3b82f6', active: true },
    { title: 'Approve Volunteer', value: 0, color: '#64748b' },
    { title: 'Recommendation for VTP', value: 0, color: '#64748b' },
    { title: 'Recommendation for TTP', value: 0, color: '#64748b' },
  ];

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* AOL CRM TOP NAV BAR MATCHING SCREENSHOT 2 */}
      <div style={{ background: '#1e293b', borderRadius: '10px', padding: '12px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#f97316', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.5px' }}>
              THE ART OF LIVING
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Program"
              style={{ padding: '6px 12px', border: '1px solid #475569', borderRadius: '4px 0 0 4px', fontSize: '0.85rem', background: '#0f172a', color: '#fff', outline: 'none' }}
            />
            <button
              type="button"
              style={{ padding: '6px 14px', background: '#0284c7', border: 'none', borderRadius: '0 4px 4px 0', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Search
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ThumbsUp size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
          <Bell size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid #334155', paddingLeft: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
              DS
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Welcome! Deekshant Sharma</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Last login : 31 Aug 2026 14:55:42</div>
            </div>
          </div>
        </div>
      </div>

      {/* CRM SECONDARY MENU TABS */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '24px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>
        {['Home', 'Programs ▾', 'Activities ▾', '₹ ▾', 'People ▾', 'Projects ▾', 'Resources ▾', 'Reports ▾'].map((item) => (
          <span
            key={item}
            onClick={() => setActiveSubTab(item.replace(' ▾', ''))}
            style={{
              cursor: 'pointer',
              color: activeSubTab === item.replace(' ▾', '') ? '#0284c7' : '#475569',
              borderBottom: activeSubTab === item.replace(' ▾', '') ? '2px solid #0284c7' : 'none',
              paddingBottom: '10px',
              paddingLeft: '4px',
              paddingRight: '4px'
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '20px' }}>
        Home
      </div>

      {/* MAIN CRM GRID MATCHING SCREENSHOT 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: QUICK LINKS & PROGRAM CALENDAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* QUICK LINKS BOX */}
          <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '14px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: 700, fontSize: '0.85rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Quick Links
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.875rem' }}>
              <a href="#donation" onClick={(e) => e.preventDefault()} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#0284c7', textDecoration: 'none' }}>
                Your Personal Donation Link
              </a>
              
              {/* PRIMARY ACTION: ANNOUNCE PROGRAM */}
              <button
                type="button"
                onClick={onNavigateToAnnounce}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f1f5f9',
                  color: '#ea580c',
                  fontWeight: 800,
                  textDecoration: 'none',
                  background: '#fff7ed',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
              >
                <span>✨ Announce Program</span>
                <span style={{ fontSize: '0.75rem', background: '#ea580c', color: '#fff', padding: '2px 8px', borderRadius: '12px' }}>+ New</span>
              </button>

              <a href="#crfs" onClick={(e) => e.preventDefault()} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#0284c7', textDecoration: 'none' }}>
                List of CRFs Submitted
              </a>
              <a href="#ftt" onClick={(e) => e.preventDefault()} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#0284c7', textDecoration: 'none' }}>
                FTT Application Request
              </a>
              <a href="#crfs-rec" onClick={(e) => e.preventDefault()} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#0284c7', textDecoration: 'none' }}>
                CRFs Pending Reconciliation
              </a>
              <a href="#status" onClick={(e) => e.preventDefault()} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#0284c7', textDecoration: 'none' }}>
                Participant Form Status
              </a>
              <a href="#faq" onClick={(e) => e.preventDefault()} style={{ padding: '12px 16px', color: '#0284c7', textDecoration: 'none' }}>
                Frequently Asked Questions
              </a>
            </div>
          </div>

          {/* PROGRAM CALENDAR */}
          <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '14px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#475569', textTransform: 'uppercase' }}>Program Calendar</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>Aug-2026 ▾</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                    <th style={{ padding: '8px 12px' }}>Program ID</th>
                    <th style={{ padding: '8px 12px' }}>Program Type</th>
                    <th style={{ padding: '8px 12px' }}>Start Date</th>
                    <th style={{ padding: '8px 12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 12px', color: '#0284c7', fontWeight: 700 }}>P130208</td>
                    <td style={{ padding: '10px 12px', color: '#334155' }}>Online Meditation and Breath Workshop</td>
                    <td style={{ padding: '10px 12px', color: '#64748b' }}>06 Aug 2026</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ background: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>Completed</span>
                    </td>
                  </tr>
                  {courses.slice(0, 3).map((c, i) => (
                    <tr key={c.courseId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', color: '#0284c7', fontWeight: 700 }}>{c.courseId}</td>
                      <td style={{ padding: '10px 12px', color: '#334155' }}>{c.name}</td>
                      <td style={{ padding: '10px 12px', color: '#64748b' }}>{c.createdDate || '14 Oct 2026'}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 2x4 STAT CARDS GRID MATCHING SCREENSHOT 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {statCards.map((card, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '24px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.9rem', color: card.active ? '#1e293b' : '#64748b', fontWeight: card.active ? 700 : 500, marginBottom: '8px' }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: card.active ? '#0284c7' : '#94a3b8' }}>
                  {card.value}
                </div>
              </div>
              <div style={{ background: '#e0f2fe', width: '36px', height: '36px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                <RefreshCw size={18} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
