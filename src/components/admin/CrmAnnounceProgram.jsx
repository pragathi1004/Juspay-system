import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Calendar,
  User,
  Users,
  CheckCircle2,
  AlertCircle,
  Link,
  MessageCircle,
  ExternalLink,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

export const CrmAnnounceProgram = ({ onCancel, onProgramAnnounced, defaultValues = {} }) => {
  // Accordion open/collapse states
  const [openSections, setOpenSections] = useState({
    details: true,
    contact: false,
    when: true,
    whatsapp: false,
    where: true,
    notifications: false
  });

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Form State matching the Art of Living CRM Screenshots
  const [formData, setFormData] = useState({
    programCategory: 'General Program', // General Program | Institutional Program | Free Program
    organizeType: 'A Self Program', // A Self Program | A Combined Program | For Another Teacher?
    programType: defaultValues.programType || 'Sri Sri Yoga Challenge Classes (AutoPay Recurring)',
    teacher: 'MP0803 - Deekshant Sharma',
    teachingAssistant: '',
    organizers: '',
    volunteers: '',
    language: 'English / Hindi',
    projectId: '',
    leadId: '',

    // Contact Person
    contactName: 'Deekshant Sharma',
    contactPhone: '+91 98765 43210',
    contactEmail: 'deekshant.s@artofliving.org',

    // When
    batch: 'Morning Batch (6:00 AM - 7:15 AM)',
    startDate: '2026-09-15',
    endDate: '2026-10-15',
    weekdayTimingsFrom: '06:00',
    weekdayTimingsTo: '07:15',
    weekendTimingsFrom: '07:00',
    weekendTimingsTo: '08:30',

    // WhatsApp
    whatsappLink: 'https://chat.whatsapp.com/SriSriYogaChallenge2026',

    // Where & Program Contribution
    venueChoice: 'Create New Venue', // Create New Venue | Use Existing Venue | Gnana Kshetra | Prison
    pincode: '560082',
    address: 'Sri Sri Gurukul, 21st KM Kanakapura Road',
    locality: 'Udayapura',
    city: 'Bengaluru',
    contribution: '1499',
    durationMonths: '3',
    apex: 'Apex Karnataka',
    ic: 'IC South Bangalore',

    // Notifications
    sendSms: true,
    sendEmail: true,
    notifyVolunteers: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [announcedSuccess, setAnnouncedSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `P${Math.floor(100000 + Math.random() * 900000)}`;
    const newCourseObj = {
      courseId: generatedId,
      name: formData.programType,
      status: 'Active',
      price: parseFloat(formData.contribution) || 1499,
      duration: `${formData.durationMonths || 3} Months`,
      juspayPlanCode: `YOGA_${formData.durationMonths || 3}M`,
      mandateStatus: 'Configured',
      registrationUrl: `https://crmdev.artofliving.online/registration.php?event_id=${Math.floor(90000 + Math.random() * 10000)}&ct_id=${Math.floor(500 + Math.random() * 500)}`,
      teachers: formData.teacher.replace(/^[A-Z0-9]+\s*-\s*/, ''),
      language: formData.language,
      batch: formData.batch,
      startDate: formData.startDate,
      endDate: formData.endDate,
      city: formData.city,
      billingFrequency: formData.durationMonths === '12' ? 'Annual' : formData.durationMonths === '6' ? 'Semi-Annual' : 'Quarterly',
      createdDate: new Date().toISOString().split('T')[0],
      features: [
        { text: 'Unlimited Classes', included: true },
        { text: 'Monthly Sunday Masterclass', included: true },
        { text: 'Bonus E-Books', included: true },
        { text: '3 Mini Programs', included: true },
        { text: 'Progress Tracking', included: true },
        { text: 'Community Support', included: true },
        { text: '1 Month Access to AOL App', included: true }
      ]
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setAnnouncedSuccess(newCourseObj);
      if (onProgramAnnounced) {
        onProgramAnnounced(newCourseObj);
      }
    }, 600);
  };

  if (announcedSuccess) {
    return (
      <div style={{ background: '#ffffff', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
          <CheckCircle2 size={36} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', margin: '0 0 8px 0' }}>
          Program Successfully Announced!
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '24px' }}>
          Your course has been registered in the Art of Living CRM and mapped to the Juspay AutoPay recurring mandate system.
        </p>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', textAlign: 'left', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Program ID</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7' }}>{announcedSuccess.courseId}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Program Name</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>{announcedSuccess.name}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Contribution</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ea580c' }}>₹{announcedSuccess.price.toLocaleString('en-IN')} / {announcedSuccess.duration}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Juspay Mandate Status</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={16} /> Configured & Live
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
              Public Registration & AutoPay Link:
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                readOnly
                value={announcedSuccess.registrationUrl}
                style={{ flex: 1, padding: '8px 12px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', color: '#334155' }}
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(announcedSuccess.registrationUrl);
                  alert('Registration URL copied to clipboard!');
                }}
                style={{ padding: '8px 14px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={() => setAnnouncedSuccess(null)}
            style={{ padding: '10px 20px', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
          >
            Announce Another Program
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '10px 24px', background: '#ea580c', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
          >
            Back to Courses Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Header / Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{ background: 'none', border: 'none', padding: 0, color: '#0284c7', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <ArrowLeft size={16} /> Back
            </button>
            <span style={{ color: '#94a3b8' }}>/</span>
            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Art of Living CRM</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Announce Program
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Logged in as: <strong>MP0803 - Deekshant Sharma</strong></span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* ================= SECTION 1: PROGRAM DETAILS ================= */}
        <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div
            onClick={() => toggleSection('details')}
            style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: openSections.details ? '1px solid #e2e8f0' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
              Program Details
            </div>
            {openSections.details ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
          </div>

          {openSections.details && (
            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Category & Organize Radios */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', paddingBottom: '16px', borderBottom: '1px dashed #e2e8f0' }}>
                <div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {['General Program', 'Institutional Program', 'Free Program'].map(cat => (
                      <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#334155', cursor: 'pointer', fontWeight: formData.programCategory === cat ? 600 : 400 }}>
                        <input
                          type="radio"
                          name="programCategory"
                          checked={formData.programCategory === cat}
                          onChange={() => setFormData({ ...formData, programCategory: cat })}
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>Organize</div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {['A Self Program', 'A Combined Program', 'For Another Teacher?'].map(org => (
                      <label key={org} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#334155', cursor: 'pointer', fontWeight: formData.organizeType === org ? 600 : 400 }}>
                        <input
                          type="radio"
                          name="organizeType"
                          checked={formData.organizeType === org}
                          onChange={() => setFormData({ ...formData, organizeType: org })}
                        />
                        {org}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 1: Program Type, Teacher, Teaching Assistant */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Program Type *
                  </label>
                  <select
                    value={formData.programType}
                    onChange={(e) => {
                      const val = e.target.value;
                      let defPrice = '1499';
                      let defDur = '3';
                      if (val.includes('6 Month')) { defPrice = '3999'; defDur = '6'; }
                      else if (val.includes('12 Month')) { defPrice = '4999'; defDur = '12'; }
                      else if (val.includes('Free')) { defPrice = '0'; defDur = '1'; }
                      setFormData({ ...formData, programType: val, contribution: defPrice, durationMonths: defDur });
                    }}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', background: '#fff' }}
                    required
                  >
                    <option value="Sri Sri Yoga Challenge Classes (AutoPay Recurring)">Sri Sri Yoga Challenge Classes (AutoPay Recurring)</option>
                    <option value="3 Month Sri Sri Yoga Challenge Classes">3 Month Sri Sri Yoga Challenge Classes</option>
                    <option value="6 Month Sri Sri Yoga Challenge Classes">6 Month Sri Sri Yoga Challenge Classes</option>
                    <option value="12 Month Sri Sri Yoga Challenge Classes">12 Month Sri Sri Yoga Challenge Classes</option>
                    <option value="Online Meditation and Breath Workshop">Online Meditation and Breath Workshop</option>
                    <option value="Happiness Program">Happiness Program</option>
                    <option value="Sri Sri Yoga Level 1">Sri Sri Yoga Level 1</option>
                    <option value="Sri Sri Yoga Level 2">Sri Sri Yoga Level 2</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Teacher * ⓘ
                  </label>
                  <input
                    type="text"
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', background: '#f8fafc' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Teaching Assistant ⓘ
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Teaching Assistant Art of Living ID"
                    value={formData.teachingAssistant}
                    onChange={(e) => setFormData({ ...formData, teachingAssistant: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              {/* Row 2: Organizers & Volunteers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Organizers ⓘ
                  </label>
                  <input
                    type="text"
                    placeholder="Organizers ID or Name"
                    value={formData.organizers}
                    onChange={(e) => setFormData({ ...formData, organizers: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Volunteers ⓘ
                  </label>
                  <input
                    type="text"
                    placeholder="Volunteers ID or Name"
                    value={formData.volunteers}
                    onChange={(e) => setFormData({ ...formData, volunteers: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              {/* Helper Note matching screenshot */}
              <div style={{ fontSize: '0.8rem', color: '#0284c7', background: '#f0f9ff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                <strong>Note:</strong> A new Organiser or Volunteer can create his/her ArtOfLiving ID by signing up at <a href="https://my.artofliving.org" target="_blank" rel="noreferrer" style={{ color: '#0284c7', textDecoration: 'underline' }}>my.artofliving.org</a>
              </div>

              {/* Row 3: Language, Project ID, Lead ID */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Language of Instruction *
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', background: '#fff' }}
                    required
                  >
                    <option value="English / Hindi">English / Hindi</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Marathi">Marathi</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Project ID ⓘ
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PRJ-2026-YOGA"
                    value={formData.projectId}
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Lead ID ⓘ
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. LEAD-4491"
                    value={formData.leadId}
                    onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= SECTION 2: CONTACT PERSON ================= */}
        <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div
            onClick={() => toggleSection('contact')}
            style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: openSections.contact ? '1px solid #e2e8f0' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
              Contact Person For Enquiries (Also Visible On Website)
            </div>
            {openSections.contact ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
          </div>

          {openSections.contact && (
            <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Contact Name *
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Contact Mobile *
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ================= SECTION 3: WHEN? ================= */}
        <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div
            onClick={() => toggleSection('when')}
            style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: openSections.when ? '1px solid #e2e8f0' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
              When?
            </div>
            {openSections.when ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
          </div>

          {openSections.when && (
            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Batch, Start Date, End Date */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Batch *
                  </label>
                  <select
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', background: '#fff' }}
                    required
                  >
                    <option value="Morning Batch (6:00 AM - 7:15 AM)">Morning Batch (6:00 AM - 7:15 AM)</option>
                    <option value="Evening Batch (6:00 PM - 7:15 PM)">Evening Batch (6:00 PM - 7:15 PM)</option>
                    <option value="Weekend Special (7:00 AM - 8:30 AM)">Weekend Special (7:00 AM - 8:30 AM)</option>
                    <option value="Flexible AutoPay All-Access">Flexible AutoPay All-Access</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                    required
                  />
                </div>
              </div>

              {/* Timings matching Screenshot 6 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Weekday Timings From *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="time"
                      value={formData.weekdayTimingsFrom}
                      onChange={(e) => setFormData({ ...formData, weekdayTimingsFrom: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Weekday Timings To *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="time"
                      value={formData.weekdayTimingsTo}
                      onChange={(e) => setFormData({ ...formData, weekdayTimingsTo: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Weekend Timings From
                  </label>
                  <input
                    type="time"
                    value={formData.weekendTimingsFrom}
                    onChange={(e) => setFormData({ ...formData, weekendTimingsFrom: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Weekend Timings To
                  </label>
                  <input
                    type="time"
                    value={formData.weekendTimingsTo}
                    onChange={(e) => setFormData({ ...formData, weekendTimingsTo: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= SECTION 4: WHATSAPP GROUP INVITE LINK ================= */}
        <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div
            onClick={() => toggleSection('whatsapp')}
            style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: openSections.whatsapp ? '1px solid #e2e8f0' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
              WhatsApp Group Invite Link
            </div>
            {openSections.whatsapp ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
          </div>

          {openSections.whatsapp && (
            <div style={{ padding: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                WhatsApp Group Link
              </label>
              <input
                type="url"
                placeholder="https://chat.whatsapp.com/..."
                value={formData.whatsappLink}
                onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
              />
            </div>
          )}
        </div>

        {/* ================= SECTION 5: WHERE & PROGRAM CONTRIBUTION ================= */}
        <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div
            onClick={() => toggleSection('where')}
            style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: openSections.where ? '1px solid #e2e8f0' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
              Where & Program Contribution?
            </div>
            {openSections.where ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
          </div>

          {openSections.where && (
            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Choose Venue Radios matching Screenshot 5 */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                  Choose Venue *
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {['Create New Venue', 'Use Existing Venue', 'Gnana Kshetra', 'Prison'].map(ven => (
                    <label key={ven} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#334155', cursor: 'pointer', fontWeight: formData.venueChoice === ven ? 600 : 400 }}>
                      <input
                        type="radio"
                        name="venueChoice"
                        checked={formData.venueChoice === ven}
                        onChange={() => setFormData({ ...formData, venueChoice: ven })}
                      />
                      {ven}
                    </label>
                  ))}
                </div>
              </div>

              {/* Row: Pincode, Address, Area/Locality/Sector */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Area/Locality/Sector *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a location"
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                    required
                  />
                </div>
              </div>

              {/* Row: City & Program Contribution & Mandate Duration */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    City/Town/Village *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Program Contribution (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.contribution}
                    onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 700 }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Juspay AutoPay Cycle *
                  </label>
                  <select
                    value={formData.durationMonths}
                    onChange={(e) => setFormData({ ...formData, durationMonths: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', background: '#fff' }}
                  >
                    <option value="3">3 Months Recurring (Quarterly)</option>
                    <option value="6">6 Months Recurring (Semi-Annual)</option>
                    <option value="12">12 Months Recurring (Annual)</option>
                    <option value="1">1 Month / Single Cycle</option>
                  </select>
                </div>
              </div>

              {/* Administrative Location: Apex & IC matching Screenshot 5 */}
              <div style={{ paddingTop: '12px', borderTop: '1px dashed #e2e8f0' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '12px' }}>
                  Administrative Location
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Apex *
                    </label>
                    <select
                      value={formData.apex}
                      onChange={(e) => setFormData({ ...formData, apex: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', background: '#fff' }}
                      required
                    >
                      <option value="Apex Karnataka">Apex Karnataka</option>
                      <option value="Apex Maharashtra">Apex Maharashtra</option>
                      <option value="Apex Delhi NCR">Apex Delhi NCR</option>
                      <option value="Apex AP & Telangana">Apex AP & Telangana</option>
                      <option value="Apex Tamil Nadu">Apex Tamil Nadu</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      IC *
                    </label>
                    <select
                      value={formData.ic}
                      onChange={(e) => setFormData({ ...formData, ic: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem', background: '#fff' }}
                      required
                    >
                      <option value="IC South Bangalore">IC South Bangalore</option>
                      <option value="IC North Bangalore">IC North Bangalore</option>
                      <option value="IC Central Bangalore">IC Central Bangalore</option>
                      <option value="IC Mumbai">IC Mumbai</option>
                      <option value="IC Hyderabad">IC Hyderabad</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= SECTION 6: NOTIFICATIONS (OPTIONAL) ================= */}
        <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div
            onClick={() => toggleSection('notifications')}
            style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: openSections.notifications ? '1px solid #e2e8f0' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>
              Notifications (Optional)
            </div>
            {openSections.notifications ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
          </div>

          {openSections.notifications && (
            <div style={{ padding: '20px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.sendSms}
                  onChange={(e) => setFormData({ ...formData, sendSms: e.target.checked })}
                />
                Send SMS Confirmation to Teacher & Volunteers
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.sendEmail}
                  onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
                />
                Send Email Broadcast to Registered Leads
              </label>
            </div>
          )}
        </div>

        {/* ================= BOTTOM ACTION BUTTONS MATCHING SCREENSHOT 3 ================= */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '12px', marginBottom: '32px' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '12px 28px',
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isSubmitting ? 'Announcing Program...' : 'Announce Program'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '12px 24px',
              background: '#f87171',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
