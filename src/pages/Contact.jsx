import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import CtaFooter from '../components/sections/CtaFooter';

const serviceOptions = [
  'Ads Shoot (Commercial & TVC)',
  'Reels Production (Viral Social Content)',
  'Short Films Making (Narrative & Directing)',
  'Video Editing & ACES Color Grading',
  'Editorial & Commercial Photography',
  'Full Campaign Production',
];

const budgetRanges = [
  '₹1 Lakh – ₹3 Lakhs',
  '₹3 Lakhs – ₹8 Lakhs',
  '₹8 Lakhs – ₹20 Lakhs',
  '₹20 Lakhs+',
  'Custom Enterprise',
];

const inputStyle = {
  width: '100%',
  padding: '1rem 1.25rem',
  borderRadius: '0.85rem',
  backgroundColor: 'rgba(16,40,44,0.85)',
  border: '1px solid rgba(107,149,153,0.3)',
  color: 'var(--cloud)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.25s ease',
  boxSizing: 'border-box',
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceOptions[0],
    budget: budgetRanges[1],
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name or brand.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = 'Please provide a valid email address.';
    if (!formData.message.trim() || formData.message.length < 15)
      errs.message = 'Please share at least a short brief about your project.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const field = (name) => ({
    ...inputStyle,
    borderColor: focused === name ? 'var(--yellow)' : errors[name] ? '#f87171' : 'rgba(107,149,153,0.3)',
  });

  return (
    <div style={{ width: '100%', backgroundColor: 'var(--deep)' }}>
      <main
        id="main-content"
        style={{
          minHeight: '100vh',
          paddingTop: '8rem',
          paddingBottom: '4rem',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Header - FULL WIDTH */}
        <div
          style={{
            width: '100%',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            marginBottom: '4rem',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--yellow)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600 }}>
              Direct Transmission // Project Inquiries
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'var(--cloud)',
              marginBottom: '1.25rem',
            }}
          >
            Initiate <span style={{ color: 'var(--yellow)' }}>Contact.</span>
          </h1>
          <p
            style={{
              maxWidth: '52rem',
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
              lineHeight: 1.75,
              color: 'var(--teal)',
              opacity: 0.9,
            }}
          >
            Tell us about the story you want to bring to life. We review all production briefs within 24 hours.
          </p>
        </div>

        {/* Grid - FULL WIDTH */}
        <div
          style={{
            width: '100%',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'start',
            marginBottom: '4rem',
            boxSizing: 'border-box',
          }}
        >
          {/* Form or Success */}
          <div>
            {isSubmitted ? (
              <SuccessState
                name={formData.name}
                email={formData.email}
                onReset={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', service: serviceOptions[0], budget: budgetRanges[1], message: '' });
                }}
              />
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  padding: 'clamp(2rem, 4vw, 3.5rem)',
                  borderRadius: '1.75rem',
                  border: '1px solid rgba(107,149,153,0.25)',
                  backgroundColor: 'var(--mid)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                }}
              >
                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <FormGroup label="Name / Company *" error={errors.name}>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      placeholder="e.g. Priya Sharma / Aurum"
                      style={field('name')}
                    />
                  </FormGroup>
                  <FormGroup label="Email Address *" error={errors.email}>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      placeholder="priya@domain.com"
                      style={field('email')}
                    />
                  </FormGroup>
                </div>

                {/* Phone */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <FormGroup label="Phone (Optional)">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused('')}
                      placeholder="+91 98765 43210"
                      style={field('phone')}
                    />
                  </FormGroup>
                </div>

                {/* Service + Budget */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <FormGroup label="Discipline Needed">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{ ...field('service'), cursor: 'pointer' }}
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} style={{ backgroundColor: 'var(--deep)' }}>{opt}</option>
                      ))}
                    </select>
                  </FormGroup>
                  <FormGroup label="Estimated Budget Range">
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      style={{ ...field('budget'), cursor: 'pointer' }}
                    >
                      {budgetRanges.map((b) => (
                        <option key={b} value={b} style={{ backgroundColor: 'var(--deep)' }}>{b}</option>
                      ))}
                    </select>
                  </FormGroup>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <FormGroup label="Project Brief & Story Arc *" error={errors.message}>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      placeholder="Tell us about the narrative, location, mood, reference films, or specific deliverables you require..."
                      style={{ ...field('message'), resize: 'none' }}
                    />
                  </FormGroup>
                </div>

                {/* Submit */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1.1rem 2.8rem',
                      borderRadius: '100px',
                      border: 'none',
                      backgroundColor: 'var(--yellow)',
                      color: 'var(--deep)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '0.925rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: isSubmitting ? 'default' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      boxShadow: '0 8px 32px rgba(242,211,79,0.35)',
                    }}
                    onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            border: '2px solid var(--deep)',
                            borderTopColor: 'transparent',
                            display: 'inline-block',
                            animation: 'spin 0.6s linear infinite',
                          }}
                        />
                        Transmitting...
                      </>
                    ) : (
                      <>Transmit Brief →</>
                    )}
                  </button>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600 }}>
                    SLATE // 24H RESPONSE
                  </span>
                </div>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>
            )}
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* WhatsApp */}
            <div
              style={{
                padding: 'clamp(2rem, 3.5vw, 3rem)',
                borderRadius: '1.5rem',
                border: '1px solid rgba(37,211,102,0.35)',
                backgroundColor: 'rgba(37,211,102,0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem' }}>💬</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--cloud)', margin: 0 }}>
                  Need An Immediate Response?
                </h3>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.925rem', lineHeight: 1.7, color: 'var(--teal)', marginBottom: '1.5rem' }}>
                Connect directly with our executive producer on WhatsApp for rapid turnaround and availability checks.
              </p>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20SNAPIT%20STUDIOZ,%20I'd%20like%20to%20discuss%20an%20urgent%20production`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '100px',
                  backgroundColor: '#25D366',
                  color: '#000',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Chat on WhatsApp ↗
              </a>
            </div>

            {/* Studio Info */}
            <div
              style={{
                padding: 'clamp(2rem, 3.5vw, 3rem)',
                borderRadius: '1.5rem',
                border: '1px solid rgba(107,149,153,0.25)',
                backgroundColor: 'var(--mid)',
              }}
            >
              {[
                {
                  label: 'Studio Headquarters',
                  content: (
                    <>
                      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--cloud)', marginBottom: '0.25rem' }}>SNAPIT STUDIOZ</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--teal)' }}>Natham, Dindigul District, Tamil Nadu — 624401</p>
                    </>
                  ),
                },
                {
                  label: 'Electronic Mail',
                  content: (
                    <a
                      href={`mailto:${siteConfig.email}`}
                      style={{ fontFamily: 'var(--font-body)', fontSize: '0.925rem', color: 'var(--cloud)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--yellow)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--cloud)'}
                    >
                      {siteConfig.email}
                    </a>
                  ),
                },
                {
                  label: 'Direct Telephony',
                  content: (
                    <a
                      href={`tel:${siteConfig.phone}`}
                      style={{ fontFamily: 'var(--font-body)', fontSize: '0.925rem', color: 'var(--cloud)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--yellow)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--cloud)'}
                    >
                      {siteConfig.phone}
                    </a>
                  ),
                },
                {
                  label: 'Office Hours',
                  content: (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--teal)', lineHeight: 1.6, margin: 0 }}>
                      Monday – Saturday: 09:30 – 19:30 IST<br />
                      Shoots: 24/7 on call
                    </p>
                  ),
                },
              ].map(({ label, content }, i, arr) => (
                <div
                  key={label}
                  style={{
                    paddingBottom: i < arr.length - 1 ? '1.4rem' : 0,
                    marginBottom: i < arr.length - 1 ? '1.4rem' : 0,
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(107,149,153,0.18)' : 'none',
                  }}
                >
                  <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: '0.5rem', fontWeight: 700 }}>
                    {label}
                  </h4>
                  {content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Directory Footer (showCta={false} since user is already on contact form) */}
      <CtaFooter showCta={false} />
    </div>
  );
}

/* Sub-components */
function FormGroup({ label, error, children }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--yellow)',
          marginBottom: '0.6rem',
          fontWeight: 700,
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#f87171', marginTop: '0.4rem', margin: '0.4rem 0 0' }}>
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessState({ name, email, onReset }) {
  return (
    <div
      style={{
        padding: 'clamp(2.5rem, 5vw, 4.5rem)',
        borderRadius: '1.75rem',
        border: '1px solid rgba(242,211,79,0.4)',
        backgroundColor: 'var(--mid)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '5.5rem',
          height: '5.5rem',
          borderRadius: '50%',
          backgroundColor: 'var(--yellow)',
          color: 'var(--deep)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.2rem',
          fontWeight: 900,
          margin: '0 auto 1.75rem',
          boxShadow: '0 8px 32px rgba(242,211,79,0.4)',
        }}
      >
        ✓
      </div>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--yellow)',
          display: 'block',
          marginBottom: '0.6rem',
          fontWeight: 700,
        }}
      >
        SCENE RECORDED // SLATE #01
      </span>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
          color: 'var(--cloud)',
          marginBottom: '1rem',
        }}
      >
        Brief Received, {name}!
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          lineHeight: 1.75,
          color: 'var(--teal)',
          maxWidth: '32rem',
          margin: '0 auto 2.5rem',
        }}
      >
        Our creative directors are already reviewing your project parameters. Expect a direct transmission at{' '}
        <strong style={{ color: 'var(--cloud)' }}>{email}</strong> within one working day.
      </p>
      <button
        onClick={onReset}
        style={{
          padding: '0.75rem 1.8rem',
          borderRadius: '100px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          border: '1px solid rgba(107,149,153,0.3)',
          color: 'var(--cloud)',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          transition: 'all 0.25s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--yellow)';
          e.currentTarget.style.color = 'var(--yellow)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(107,149,153,0.3)';
          e.currentTarget.style.color = 'var(--cloud)';
        }}
      >
        Send Another Inquiry ↺
      </button>
    </div>
  );
}
