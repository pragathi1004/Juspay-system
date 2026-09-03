import React, { useState } from 'react';
import { PLAN_SPECS } from '../../data/planSpecs';
import { CrmAnnounceProgram } from './CrmAnnounceProgram';
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
  Info,
  Edit2,
  Plus,
  Trash2,
  Save,
  CheckSquare,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';

export const PlansManagement = () => {
  const [activeView, setActiveView] = useState('CATALOG'); // 'CATALOG' | 'CRM_PORTAL' | 'ANNOUNCE'

  // Master list of all available features across Sri Sri Yoga programs
  const defaultMasterFeatures = [
    'Unlimited Classes',
    'Monthly Sunday Masterclass',
    'Bonus E-Books',
    '3 Mini Programs',
    'Progress Tracking',
    'Community Support',
    '1 Month Access to AOL App',
    'Physiotherapy Consultation'
  ];

  // Mock CRM Courses Data with Juspay Mapping & Detailed Included/Excluded Features
  const initialCourses = [
    {
      courseId: 'P114450',
      name: '3 Month Sri Sri Yoga Challenge Classes',
      status: 'Active',
      price: 1499,
      duration: '3 Months',
      juspayPlanCode: 'YOGA_3M',
      mandateStatus: 'Configured',
      registrationUrl: 'https://crmdev.artofliving.online/registration.php?event_id=93571&ct_id=877',
      teachers: 'Mayur & Eesha',
      billingFrequency: 'Quarterly',
      createdDate: '2026-01-15',
      features: [
        { text: 'Unlimited Classes', included: true },
        { text: 'Monthly Sunday Masterclass', included: true },
        { text: 'Bonus E-Books', included: true },
        { text: '3 Mini Programs', included: false },
        { text: 'Progress Tracking', included: true },
        { text: 'Community Support', included: false },
        { text: '1 Month Access to AOL App', included: false }
      ]
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
      createdDate: '2026-02-01',
      features: [
        { text: 'Unlimited Classes', included: true },
        { text: 'Monthly Sunday Masterclass', included: true },
        { text: 'Bonus E-Books', included: true },
        { text: '3 Mini Programs', included: true },
        { text: 'Progress Tracking', included: true },
        { text: 'Community Support', included: true },
        { text: '1 Month Access to AOL App', included: false }
      ]
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
      createdDate: '2026-01-10',
      features: [
        { text: 'Unlimited Classes', included: true },
        { text: 'Monthly Sunday Masterclass', included: true },
        { text: 'Bonus E-Books', included: true },
        { text: '3 Mini Programs', included: true },
        { text: 'Progress Tracking', included: true },
        { text: 'Community Support', included: true },
        { text: '1 Month Access to AOL App', included: true }
      ]
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
      createdDate: '2026-08-20',
      features: [
        { text: 'Unlimited Classes', included: true },
        { text: 'Progress Tracking', included: true },
        { text: 'Physiotherapy Consultation', included: false }
      ]
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
      createdDate: '2025-11-05',
      features: [
        { text: 'Govt. Certification', included: true },
        { text: '200 Hours Live Training', included: true },
        { text: 'Mentorship & Practice', included: true },
        { text: 'Lifetime Alumni Access', included: true }
      ]
    }
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  // Editing Form State inside Drawer
  const [editCourseName, setEditCourseName] = useState('');
  const [editPriceInput, setEditPriceInput] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editTeachers, setEditTeachers] = useState('');
  const [editFeatures, setEditFeatures] = useState([]);
  const [newFeatureText, setNewFeatureText] = useState('');
  const [editingPriceInlineId, setEditingPriceInlineId] = useState(null);
  const [inlinePriceInput, setInlinePriceInput] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Search & Filter State
  const [searchMode, setSearchMode] = useState('quick');
  const [selectedCourseType, setSelectedCourseType] = useState('ALL');
  const [courseIdQuery, setCourseIdQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Open Drawer to Edit Selected Course
  const handleOpenEditDrawer = (course) => {
    setSelectedCourse(course);
    setEditCourseName(course.name);
    setEditPriceInput(course.price.toString());
    setEditDuration(course.duration);
    setEditTeachers(course.teachers);
    setEditFeatures(course.features.map(f => ({ ...f })));
    setNewFeatureText('');
    setIsDetailDrawerOpen(true);
  };

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
      setSelectedCourse(prev => ({
        ...prev,
        juspayPlanCode: `YOGA_1M_JSP`,
        mandateStatus: 'Configured'
      }));
    }
  };

  // Inline Price Edit Save
  const handleSaveInlinePrice = (courseId) => {
    const parsedPrice = parseFloat(inlinePriceInput);
    if (!isNaN(parsedPrice) && parsedPrice > 0) {
      setCourses(prev => prev.map(c => {
        if (c.courseId === courseId) {
          // Sync with PLAN_SPECS if matched
          const spec = PLAN_SPECS.find(p => p.code === c.juspayPlanCode);
          if (spec) spec.price = parsedPrice;
          return { ...c, price: parsedPrice };
        }
        return c;
      }));
      triggerToast();
    }
    setEditingPriceInlineId(null);
  };

  // Save All Changes from Drawer (Name, Price, Duration, Teachers, Features)
  const handleSaveDrawerChanges = () => {
    if (!selectedCourse) return;
    const parsedPrice = parseFloat(editPriceInput);
    const validPrice = !isNaN(parsedPrice) && parsedPrice > 0 ? parsedPrice : selectedCourse.price;

    setCourses(prev => prev.map(c => {
      if (c.courseId === selectedCourse.courseId) {
        // Sync with PLAN_SPECS if matched
        const spec = PLAN_SPECS.find(p => p.code === c.juspayPlanCode);
        if (spec) {
          spec.price = validPrice;
          spec.features = editFeatures.map(f => ({ text: f.text, included: f.included }));
        }
        return {
          ...c,
          name: editCourseName,
          price: validPrice,
          duration: editDuration,
          teachers: editTeachers,
          features: editFeatures.map(f => ({ ...f }))
        };
      }
      return c;
    }));

    setSelectedCourse(prev => ({
      ...prev,
      name: editCourseName,
      price: validPrice,
      duration: editDuration,
      teachers: editTeachers,
      features: editFeatures.map(f => ({ ...f }))
    }));

    triggerToast();
  };

  // Add Custom New Feature (e.g. Physiotherapy)
  const handleAddFeature = () => {
    if (newFeatureText.trim() === '') return;
    setEditFeatures([...editFeatures, { text: newFeatureText.trim(), included: true }]);
    setNewFeatureText('');
  };

  // Toggle Feature Included / Excluded (✓ / ✕)
  const handleToggleFeatureIncluded = (index) => {
    setEditFeatures(prev => prev.map((f, idx) => {
      if (idx === index) {
        return { ...f, included: !f.included };
      }
      return f;
    }));
  };

  // Remove Feature
  const handleRemoveFeature = (index) => {
    setEditFeatures(editFeatures.filter((_, idx) => idx !== index));
  };

  // Trigger Toast Notification
  const triggerToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  // Handle New Announced Program from CRM
  const handleNewProgramAnnounced = (newCourse) => {
    setCourses(prev => [newCourse, ...prev]);
    // Also sync to PLAN_SPECS if needed
    triggerToast();
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
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative' }}>
      
      {/* SAVED NOTIFICATION TOAST */}
      {showSavedToast && (
        <div 
          style={{ 
            position: 'fixed', 
            top: '20px', 
            right: '20px', 
            zIndex: 99999, 
            background: '#15803d', 
            color: '#ffffff', 
            padding: '12px 20px', 
            borderRadius: '10px', 
            fontWeight: 700, 
            fontSize: '0.875rem', 
            boxShadow: '0 10px 25px rgba(21, 128, 61, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <CheckCircle2 size={18} /> Operation Successful! Courses & Mandates Synced.
        </div>
      )}

      {/* TOP SUB-NAV TABS FOR CRM VIEWS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setActiveView('CATALOG')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeView === 'CATALOG' ? '#0f172a' : '#f1f5f9',
              color: activeView === 'CATALOG' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BookOpen size={16} /> Courses Catalog & Mandates
          </button>


        </div>

        <button
          type="button"
          onClick={() => setActiveView('ANNOUNCE')}
          style={{
            padding: '8px 18px',
            borderRadius: '8px',
            border: 'none',
            background: '#ea580c',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)'
          }}
        >
          <Plus size={16} /> Announce Program (CRM)
        </button>
      </div>

      {/* VIEW: ANNOUNCE PROGRAM FORM */}
      {activeView === 'ANNOUNCE' && (
        <CrmAnnounceProgram
          onCancel={() => setActiveView('CATALOG')}
          onProgramAnnounced={(newCourse) => {
            handleNewProgramAnnounced(newCourse);
            setActiveView('CATALOG');
          }}
        />
      )}



      {/* VIEW: COURSES CATALOG & JUSPAY MAPPING */}
      {activeView === 'CATALOG' && (
        <>
          {/* PAGE HEADER */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={28} color="#d97706" /> Courses List & Pricing Catalog
              </h1>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
                Art of Living CRM Course Registry — Edit Course Prices, Features & Juspay Mandate Mapping
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '10px', padding: '6px 14px', fontSize: '0.8rem', fontWeight: 700, color: '#92400e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} /> CRM Source of Truth
              </div>
            </div>
          </div>

          {/* BACKEND ARCHITECTURE INFO BANNER */}
          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '14px', padding: '16px 20px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0369a1', fontWeight: 800, fontSize: '0.925rem', marginBottom: '6px' }}>
              <Info size={18} /> Backend Mandate Architecture: CRM Course ➔ Juspay Plan Mapping
            </div>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
              Click the <strong>Edit</strong> button on any course row below to edit its <strong>Price</strong> and <strong>Features List</strong> (add custom benefits like <i>Physiotherapy</i>, toggle included/excluded features, etc.). Or click <strong>Announce Program (CRM)</strong> to announce a new course.
            </p>

            {/* STEP DIAGRAM */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.78rem', fontWeight: 700 }}>
              <span style={{ background: '#ffffff', border: '1px solid #93c5fd', color: '#1e40af', padding: '4px 12px', borderRadius: '6px' }}>
                1. Announce / Select Course
              </span>
              <ArrowRight size={14} color="#0284c7" />
              <span style={{ background: '#ffffff', border: '1px solid #93c5fd', color: '#1e40af', padding: '4px 12px', borderRadius: '6px' }}>
                2. Edit Price & Features Checklist
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

          {/* CRM-STYLE SEARCH & FILTER AREA */}
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

      {/* HORIZONTAL CRM COURSE LIST TABLE WITH FEATURES & PRICE EDIT */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        
        {/* TABLE TITLE BAR */}
        <div style={{ background: '#fef3c7', padding: '14px 20px', borderBottom: '1px solid #fde68a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#78350f', margin: 0 }}>
            Course List ({filteredCourses.length} Courses Found)
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 600 }}>
            Click 'Edit' button on any row to edit course price and included/excluded features
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
                <th style={{ padding: '12px 16px' }}>Price (Editable)</th>
                <th style={{ padding: '12px 16px' }}>Duration</th>
                <th style={{ padding: '12px 16px' }}>Course Features</th>
                <th style={{ padding: '12px 16px' }}>Juspay Plan</th>
                <th style={{ padding: '12px 16px' }}>Mandate Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((c) => {
                const isConfigured = c.mandateStatus === 'Configured';
                const isEditingInline = editingPriceInlineId === c.courseId;
                const includedFeatures = c.features.filter(f => f.included);
                const excludedFeatures = c.features.filter(f => !f.included);

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
                    <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: 700, maxWidth: '240px' }}>
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

                    {/* PRICE WITH INLINE EDIT OPTION */}
                    <td style={{ padding: '14px 16px' }}>
                      {isEditingInline ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontWeight: 800 }}>₹</span>
                          <input
                            type="number"
                            value={inlinePriceInput}
                            onChange={(e) => setInlinePriceInput(e.target.value)}
                            style={{ width: '80px', padding: '4px 6px', borderRadius: '6px', border: '1.5px solid #d97706', fontSize: '0.85rem', fontWeight: 800 }}
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveInlinePrice(c.courseId)}
                            style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                            ₹{c.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => {
                              setEditingPriceInlineId(c.courseId);
                              setInlinePriceInput(c.price.toString());
                            }}
                            title="Edit Price Inline"
                            style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 5px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}
                          >
                            <Edit2 size={12} />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* DURATION */}
                    <td style={{ padding: '14px 16px', color: '#475569', fontWeight: 600 }}>
                      {c.duration}
                    </td>

                    {/* COURSE FEATURES SUMMARY BADGES (INCLUDED & EXCLUDED MATCHING SCREENSHOT) */}
                    <td style={{ padding: '14px 16px', maxWidth: '260px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.74rem' }}>
                        <div style={{ color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Check size={13} color="#16a34a" /> {includedFeatures.length} Included Features
                        </div>
                        {excludedFeatures.length > 0 && (
                          <div style={{ color: '#dc2626', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <X size={13} color="#ef4444" /> {excludedFeatures.length} Excluded Features
                          </div>
                        )}
                      </div>
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

                    {/* MANDATE STATUS */}
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

                    {/* ACTION BUTTON (EDIT) */}
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleOpenEditDrawer(c)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '6px',
                          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                          color: '#ffffff',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 6px rgba(217, 119, 6, 0.25)'
                        }}
                      >
                        <Edit2 size={13} /> Edit
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
      </>
      )}

      {/* COURSE DETAIL & FULL EDIT DRAWER (PRICE, FEATURES INCLUDED/EXCLUDED, NAME, TEACHERS) */}
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
              maxWidth: '620px', 
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
                  EDIT COURSE PROPERTIES & FEATURES
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                  {selectedCourse.courseId}: {selectedCourse.name}
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
              
              {/* UNCONFIGURED ALERT */}
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

              {/* 1. EDIT COURSE BASIC PROPERTIES (NAME, PRICE, DURATION, TEACHERS) */}
              <div style={{ border: '1.5px solid #fde68a', borderRadius: '14px', padding: '18px', background: '#fffdf5' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#78350f', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Edit2 size={16} color="#d97706" /> Edit Course Price & Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  
                  {/* COURSE NAME */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
                      Course Name:
                    </label>
                    <input
                      type="text"
                      value={editCourseName}
                      onChange={(e) => setEditCourseName(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', outline: 'none' }}
                    />
                  </div>

                  {/* COURSE PRICE (REQUIREMENT #1) */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
                      Course Price (₹ INR):
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '6px 12px' }}>
                      <span style={{ fontWeight: 800, color: '#0f172a' }}>₹</span>
                      <input
                        type="number"
                        value={editPriceInput}
                        onChange={(e) => setEditPriceInput(e.target.value)}
                        style={{ border: 'none', outline: 'none', fontSize: '1rem', fontWeight: 800, color: '#0f172a', width: '100%' }}
                      />
                    </div>
                  </div>

                  {/* DURATION */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
                      Duration:
                    </label>
                    <input
                      type="text"
                      value={editDuration}
                      onChange={(e) => setEditDuration(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', outline: 'none' }}
                    />
                  </div>

                  {/* TEACHERS */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
                      Assigned Teachers / Faculty:
                    </label>
                    <input
                      type="text"
                      value={editTeachers}
                      onChange={(e) => setEditTeachers(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', color: '#0f172a', outline: 'none' }}
                    />
                  </div>

                </div>
              </div>

              {/* 2. EDIT INCLUDED / EXCLUDED COURSE FEATURES SECTION (AUDIO REQUEST) */}
              <div style={{ border: '1.5px solid #bfdbfe', borderRadius: '14px', padding: '18px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="#2563eb" /> Edit Course Features & Benefits
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 700, background: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>
                    Toggle ✓ Included / ✕ Excluded
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0 0 14px 0' }}>
                  Manage feature list under this course. Click the checkmark/cross icon to toggle inclusion, or add custom features (e.g. <i>Physiotherapy</i>).
                </p>

                {/* CURRENT FEATURES LIST WITH TOGGLE & DELETE */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  {editFeatures.map((featObj, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        background: featObj.included ? '#f0fdf4' : '#fff5f5', 
                        border: featObj.included ? '1px solid #bbf7d0' : '1px solid #fecaca', 
                        borderRadius: '8px', 
                        padding: '8px 12px' 
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleFeatureIncluded(idx)}
                          title="Click to toggle Included / Excluded"
                          style={{
                            background: featObj.included ? '#16a34a' : '#ef4444',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '4px',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          {featObj.included ? <Check size={14} /> : <X size={14} />}
                        </button>

                        <span 
                          style={{ 
                            fontSize: '0.85rem', 
                            color: featObj.included ? '#14532d' : '#991b1b', 
                            fontWeight: featObj.included ? 700 : 500,
                            textDecoration: featObj.included ? 'none' : 'line-through'
                          }}
                        >
                          {featObj.text}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: featObj.included ? '#16a34a' : '#ef4444' }}>
                          {featObj.included ? 'Included (✓)' : 'Excluded (✕)'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                          title="Delete feature"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ADD NEW CUSTOM FEATURE INPUT (E.G. PHYSIOTHERAPY AS REQUESTED IN AUDIO) */}
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    + Add New Custom Feature (e.g. Physiotherapy Consultation):
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={newFeatureText}
                      onChange={(e) => setNewFeatureText(e.target.value)}
                      placeholder="Type new feature (e.g. Physiotherapy, Nutrition Plan)..."
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Plus size={16} /> Add Feature
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. COURSE CRM METADATA & JUSPAY MAPPING */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px 18px', background: '#ffffff' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  Juspay Plan Mapping Details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.825rem' }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Course ID</span>
                    <strong style={{ color: '#2563eb' }}>{selectedCourse.courseId}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Juspay Plan Code</span>
                    <strong style={{ fontFamily: 'monospace', color: selectedCourse.juspayPlanCode !== 'Not Configured' ? '#0f172a' : '#dc2626' }}>
                      {selectedCourse.juspayPlanCode}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Billing Frequency</span>
                    <strong style={{ color: '#334155' }}>{selectedCourse.billingFrequency}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Mandate Status</span>
                    <strong style={{ color: selectedCourse.mandateStatus === 'Configured' ? '#16a34a' : '#ea580c' }}>
                      🟢 {selectedCourse.mandateStatus === 'Configured' ? 'Active' : 'Pending'}
                    </strong>
                  </div>
                </div>
              </div>

            </div>

            {/* DRAWER FOOTER WITH SAVE BUTTON */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => setIsDetailDrawerOpen(false)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  background: '#f1f5f9',
                  color: '#475569',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleSaveDrawerChanges();
                  setIsDetailDrawerOpen(false);
                }}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save size={16} /> Save All Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
