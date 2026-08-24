import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  X, 
  ArrowRight, 
  ExternalLink, 
  Sliders, 
  Download,
  Check,
  RefreshCw,
  Info
} from 'lucide-react';

export const PlansManagement = () => {
  // Mock CRM Courses Data with Juspay Mapping
  const initialCourses = [
    {
      courseId: 'P114450',
      name: '3 Month Sri Sri Yoga Challenge Classes',
      status: 'Active',
      price: 1499,
      duration: '3 Months',
      juspayPlanCode: 'YOGA_3M',
      mandateStatus: 'Configured', // 'Configured' | 'Pending'
      registrationUrl: 'https://crmdev.artofliving.online/registration.php?event_id=93571&ct_id=877',
      teachers: 'Mayur & Eesha',
      billingFrequency: 'Quarterly',
      createdDate: '2026-01-15'
    },
    {
      courseId: 'P114509',
      name: '6 Month Sri Sri Yoga Challenge Classes',
      status: 'Active',
      price: 3999,
      duration: '6 Months',
      juspayPlanCode: 'YOGA_6M',
      mandateStatus: 'Configured',
      registrationUrl: 'https://crmdev.artofliving.online/registration.php?event_id=93569&ct_id=636',
      teachers: 'Swami Kaushik',
      billingFrequency: 'Semi-Annual',
      createdDate: '2026-02-01'
    },
    {
      courseId: 'P114584',
      name: '12 Month Sri Sri Yoga Challenge Classes',
      status: 'Active',
      price: 4999,
      duration: '12 Months',
      juspayPlanCode: 'YOGA_12M',
      mandateStatus: 'Configured',
      registrationUrl: 'https://crmdev.artofliving.online/registration.php?event_id=93580&ct_id=898',
      teachers: 'Swami Suryapada',
      billingFrequency: 'Annual',
      createdDate: '2026-01-10'
    },
    {
      courseId: 'P114620',
      name: '1 Month Sri Sri Yoga Challenge Classes',
      status: 'Active',
      price: 999,
      duration: '1 Month',
      juspayPlanCode: 'Not Configured',
      mandateStatus: 'Pending',
      registrationUrl: 'https://crmdev.artofliving.online/registration.php?event_id=93601&ct_id=902',
      teachers: 'To Be Decided',
      billingFrequency: 'Monthly',
      createdDate: '2026-08-20'
    },
    {
      courseId: 'P114455',
      name: '200H Yoga Teacher Training Course',
      status: 'Completed',
      price: 25000,
      duration: '12 Months',
      juspayPlanCode: 'YTT_200H',
      mandateStatus: 'Configured',
      registrationUrl: 'https://crmdev.artofliving.online/registration.php?event_id=93500&ct_id=500',
      teachers: 'Senior AOL Faculty',
      billingFrequency: 'Annual',
      createdDate: '2025-11-05'
    }
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  // Search & Filter State
  const [searchMode, setSearchMode] = useState('quick');
  const [selectedCourseType, setSelectedCourseType] = useState('ALL');
  const [courseIdQuery, setCourseIdQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Configure Juspay Action Handler for Pending Course
  const handleConfigureJuspay = (courseId) => {
    setCourses(prev => prev.map(c => {
      if (c.courseId === courseId) {
        return {
          ...c,
          juspayPlanCode: `YOGA_1M_JSP`,
          mandateStatus: 'Configured'
        };
      }
      return c;
    }));
    if (selectedCourse && selectedCourse.courseId === courseId) {
      setSelectedCourse({
        ...selectedCourse,
        juspayPlanCode: `YOGA_1M_JSP`,
        mandateStatus: 'Configured'
      });
    }
  };

  // Filtered Courses List
  const filteredCourses = courses.filter(c => {
    if (selectedCourseType !== 'ALL' && !c.name.toLowerCase().includes(selectedCourseType.toLowerCase())) {
      return false;
    }
    if (courseIdQuery.trim() !== '' && !c.courseId.toLowerCase().includes(courseIdQuery.toLowerCase().trim())) {
      return false;
    }
    if (statusFilter !== 'ALL' && c.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* PAGE HEADER */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={28} color="#d97706" /> Courses List
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
            Art of Living CRM Course Registry & Juspay Recurring Mandate Mapping
          </p>
        </div>

        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '10px', padding: '6px 14px', fontSize: '0.8rem', fontWeight: 700, color: '#92400e', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={16} /> CRM Source of Truth
        </div>
      </div>

      {/* BACKEND ARCHITECTURE INFO BANNER (REQUIREMENT #10 & #14 & #20) */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '14px', padding: '16px 20px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0369a1', fontWeight: 800, fontSize: '0.925rem', marginBottom: '6px' }}>
          <Info size={18} /> Backend Mandate Architecture: CRM Course ➔ Juspay Plan Mapping
        </div>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
          In the internal CRM, a <strong>Course</strong> represents the product/program subscribed to by participants. Whenever a new course is created in the CRM, a corresponding <strong>Juspay Plan</strong> must be configured and mapped so that recurring payment mandates can be executed during participant registration.
        </p>

        {/* STEP DIAGRAM */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.78rem', fontWeight: 700 }}>
          <span style={{ background: '#ffffff', border: '1px solid #93c5fd', color: '#1e40af', padding: '4px 12px', borderRadius: '6px' }}>
            1. CRM Course Created
          </span>
          <ArrowRight size={14} color="#0284c7" />
          <span style={{ background: '#ffffff', border: '1px solid #93c5fd', color: '#1e40af', padding: '4px 12px', borderRadius: '6px' }}>
            2. Create Juspay Plan
          </span>
          <ArrowRight size={14} color="#0284c7" />
          <span style={{ background: '#ffffff', border: '1px solid #93c5fd', color: '#1e40af', padding: '4px 12px', borderRadius: '6px' }}>
            3. Map Plan to Course
          </span>
          <ArrowRight size={14} color="#0284c7" />
          <span style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '4px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Check size={14} /> 4. Recurring Mandate Ready
          </span>
        </div>
      </div>

      {/* CRM-STYLE SEARCH & FILTER AREA (MATCHING CRM SCREENSHOT - REQUIREMENT #4) */}
      <div 
        style={{ 
          background: '#fffdf5', 
          border: '1px solid #fef08a', 
          borderRadius: '16px', 
          padding: '20px 24px', 
          marginBottom: '20px', 
          boxShadow: '0 2px 10px rgba(217, 119, 6, 0.04)' 
        }}
      >
        {/* RADIO SEARCH OPTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px', fontSize: '0.875rem', fontWeight: 700, color: '#78350f' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="searchMode" 
              checked={searchMode === 'quick'} 
              onChange={() => setSearchMode('quick')} 
              style={{ accentColor: '#d97706' }} 
            /> 
            Quick Search
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="searchMode" 
              checked={searchMode === 'advanced'} 
              onChange={() => setSearchMode('advanced')} 
              style={{ accentColor: '#d97706' }} 
            /> 
            Advanced Search
          </label>
        </div>

        {/* SEARCH FORM GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'end' }}>
          
          {/* COURSE TYPE */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#78350f', marginBottom: '6px' }}>
              Course Type:
            </label>
            <select
              value={selectedCourseType}
              onChange={(e) => setSelectedCourseType(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.85rem', color: '#1e293b', outline: 'none' }}
            >
              <option value="ALL">- Select All -</option>
              <option value="1 Month">1 Month Sri Sri Yoga Challenge Classes</option>
              <option value="3 Month">3 Month Sri Sri Yoga Challenge Classes</option>
              <option value="6 Month">6 Month Sri Sri Yoga Challenge Classes</option>
              <option value="12 Month">12 Month Sri Sri Yoga Challenge Classes</option>
              <option value="200H">200H Yoga Teacher Training Course</option>
            </select>
          </div>

          {/* COURSE ID */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#78350f', marginBottom: '6px' }}>
              Course ID:
            </label>
            <input
              type="text"
              value={courseIdQuery}
              onChange={(e) => setCourseIdQuery(e.target.value)}
              placeholder="e.g. P114450"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.85rem', color: '#1e293b', outline: 'none' }}
            />
          </div>

          {/* COURSE STATUS */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#78350f', marginBottom: '6px' }}>
              Course Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontSize: '0.85rem', color: '#1e293b', outline: 'none' }}
            >
              <option value="ALL">Select All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="crf submitted">CRF Submitted</option>
            </select>
          </div>

          {/* SEARCH BUTTON */}
          <div>
            <button
              type="button"
              style={{
                padding: '8px 24px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(217, 119, 6, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                height: '37px'
              }}
            >
              <Search size={16} /> Search
            </button>
          </div>

        </div>

        {/* CSV EXPORT ROW */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px border #fde68a', paddingTop: '12px' }}>
          <button
            type="button"
            style={{ background: '#d97706', color: '#ffffff', border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Download size={12} /> Export To CSV
          </button>
          <span style={{ fontSize: '0.72rem', color: '#92400e', fontStyle: 'italic' }}>
            Note: The limit set for "Export to CSV" cannot exceed 1 Lakh course records at a time.
          </span>
        </div>
      </div>

      {/* HORIZONTAL CRM COURSE LIST TABLE (REQUIREMENT #5, #7, #8, #11, #12) */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        
        {/* TABLE TITLE BAR */}
        <div style={{ background: '#fef3c7', padding: '14px 20px', borderBottom: '1px solid #fde68a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#78350f', margin: 0 }}>
            Course List ({filteredCourses.length} Courses Found)
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 600 }}>
            Primary Entity: CRM Course | Secondary Entity: Juspay Plan Mapping
          </span>
        </div>

        {/* HORIZONTAL SCROLLABLE TABLE */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                <th style={{ padding: '12px 16px' }}>Course ID</th>
                <th style={{ padding: '12px 16px' }}>Course Name / Type</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Price</th>
                <th style={{ padding: '12px 16px' }}>Duration</th>
                <th style={{ padding: '12px 16px' }}>Juspay Plan</th>
                <th style={{ padding: '12px 16px' }}>Mandate Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((c) => {
                const isConfigured = c.mandateStatus === 'Configured';
                return (
                  <tr 
                    key={c.courseId} 
                    style={{ borderBottom: '1px solid #f1f5f9', background: isConfigured ? '#ffffff' : '#fffdf5', transition: 'background 0.15s' }}
                  >
                    {/* COURSE ID */}
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#2563eb' }}>
                      {c.courseId}
                    </td>

                    {/* COURSE NAME */}
                    <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: 700, maxWidth: '280px' }}>
                      {c.name}
                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 400 }}>
                        Teachers: {c.teachers}
                      </div>
                    </td>

                    {/* STATUS */}
                    <td style={{ padding: '14px 16px' }}>
                      <span 
                        style={{
                          background: c.status === 'Active' ? '#dcfce7' : '#f1f5f9',
                          color: c.status === 'Active' ? '#166534' : '#475569',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          display: 'inline-block'
                        }}
                      >
                        {c.status}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0f172a' }}>
                      ₹{c.price.toLocaleString('en-IN')}
                    </td>

                    {/* DURATION */}
                    <td style={{ padding: '14px 16px', color: '#475569', fontWeight: 600 }}>
                      {c.duration}
                    </td>

                    {/* JUSPAY PLAN CODE */}
                    <td style={{ padding: '14px 16px' }}>
                      {isConfigured ? (
                        <span style={{ fontFamily: 'monospace', fontWeight: 700, background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px', color: '#0f172a', fontSize: '0.8rem' }}>
                          {c.juspayPlanCode}
                        </span>
                      ) : (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem', fontWeight: 700 }}>
                          Not Configured
                        </span>
                      )}
                    </td>

                    {/* MANDATE STATUS (REQUIREMENT #11) */}
                    <td style={{ padding: '14px 16px' }}>
                      {isConfigured ? (
                        <span style={{ color: '#16a34a', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                          <CheckCircle2 size={15} /> Active
                        </span>
                      ) : (
                        <span style={{ color: '#d97706', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', background: '#fef3c7', padding: '2px 8px', borderRadius: '6px' }}>
                          <AlertTriangle size={14} /> Pending
                        </span>
                      )}
                    </td>

                    {/* ACTION BUTTON */}
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => {
                          setSelectedCourse(c);
                          setIsDetailDrawerOpen(true);
                        }}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '6px',
                          background: isConfigured ? '#eff6ff' : '#fff7ed',
                          color: isConfigured ? '#2563eb' : '#ea580c',
                          border: isConfigured ? '1px solid #bfdbfe' : '1px solid #fed7aa',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Eye size={14} /> {isConfigured ? 'View' : 'View / Map'}
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div style={{ padding: '12px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#64748b' }}>
          <div>Showing 1 - {filteredCourses.length} of {filteredCourses.length} course records</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Rows per page: 15 | 30 | 45</span>
          </div>
        </div>

      </div>

      {/* COURSE DETAIL & JUSPAY MAPPING DRAWER / MODAL (REQUIREMENT #13 & #15) */}
      {isDetailDrawerOpen && selectedCourse && (
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
          onClick={() => setIsDetailDrawerOpen(false)}
        >
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '540px', 
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
                  CRM COURSE INTEGRATION STATUS
                </span>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                  {selectedCourse.name}
                </h2>
              </div>
              <button 
                onClick={() => setIsDetailDrawerOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* DRAWER BODY */}
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* UNCONFIGURED ALERT (REQUIREMENT #15) */}
              {selectedCourse.mandateStatus !== 'Configured' && (
                <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '16px', color: '#9a3412' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.9rem', marginBottom: '6px' }}>
                    <AlertTriangle size={18} color="#ea580c" /> ⚠ Juspay Plan Not Configured
                  </div>
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.825rem', color: '#7c2d12', lineHeight: 1.45 }}>
                    This CRM course cannot create recurring payment mandates until a corresponding Juspay Plan is configured and mapped.
                  </p>
                  <button
                    onClick={() => handleConfigureJuspay(selectedCourse.courseId)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      background: '#ea580c',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <RefreshCw size={16} /> Configure Juspay Integration
                  </button>
                </div>
              )}

              {/* 1. COURSE INFORMATION (CRM ENTITY) */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px 18px', background: '#ffffff' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  Course Information (CRM Source of Truth)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.825rem' }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Course ID</span>
                    <strong style={{ color: '#2563eb' }}>{selectedCourse.courseId}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Course Status</span>
                    <strong style={{ color: '#16a34a' }}>{selectedCourse.status}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Course Price</span>
                    <strong style={{ color: '#0f172a' }}>₹{selectedCourse.price.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Course Duration</span>
                    <strong style={{ color: '#0f172a' }}>{selectedCourse.duration}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Assigned Teachers</span>
                    <strong style={{ color: '#334155' }}>{selectedCourse.teachers}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Created Date</span>
                    <strong style={{ color: '#334155' }}>{selectedCourse.createdDate}</strong>
                  </div>
                </div>
              </div>

              {/* 2. JUSPAY CONFIGURATION */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px 18px', background: '#ffffff' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  Juspay Payment Configuration
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.825rem' }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Juspay Plan Code</span>
                    <strong style={{ fontFamily: 'monospace', color: selectedCourse.juspayPlanCode !== 'Not Configured' ? '#0f172a' : '#dc2626' }}>
                      {selectedCourse.juspayPlanCode}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Juspay Plan Status</span>
                    <strong style={{ color: selectedCourse.mandateStatus === 'Configured' ? '#16a34a' : '#ea580c' }}>
                      🟢 {selectedCourse.mandateStatus === 'Configured' ? 'Active' : 'Pending'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Mandate Support</span>
                    <strong style={{ color: selectedCourse.mandateStatus === 'Configured' ? '#16a34a' : '#dc2626' }}>
                      {selectedCourse.mandateStatus === 'Configured' ? 'Supported' : 'Not Supported'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Billing Frequency</span>
                    <strong style={{ color: '#334155' }}>{selectedCourse.billingFrequency}</strong>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ color: '#64748b', display: 'block' }}>Autopay Amount</span>
                    <strong style={{ color: '#0f172a', fontSize: '1rem' }}>₹{selectedCourse.price.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              {/* 3. INTEGRATION CHECKLIST (REQUIREMENT #13) */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px 18px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                  Integration Readiness Checklist
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.825rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#475569' }}>CRM Course Status</span>
                    <span style={{ color: '#16a34a', fontWeight: 700 }}>✓ Active</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#475569' }}>Juspay Plan Created</span>
                    <span style={{ color: selectedCourse.mandateStatus === 'Configured' ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
                      {selectedCourse.mandateStatus === 'Configured' ? '✓ Created' : '⚠ Pending'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#475569' }}>Course ↔ Juspay Mapping</span>
                    <span style={{ color: selectedCourse.mandateStatus === 'Configured' ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
                      {selectedCourse.mandateStatus === 'Configured' ? '✓ Connected' : '⚠ Not Connected'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#475569' }}>Recurring Mandate Ready</span>
                    <span style={{ color: selectedCourse.mandateStatus === 'Configured' ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
                      {selectedCourse.mandateStatus === 'Configured' ? '✓ Available' : '❌ Unavailable'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* DRAWER FOOTER */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsDetailDrawerOpen(false)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  background: '#334155',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
