import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import useScrollTrigger from '../../hooks/useScrollTrigger';
import gsap from 'gsap';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [submitState, setSubmitState] = useState('idle'); // 'idle' | 'success' | 'error'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useScrollTrigger(sectionRef, () => {
    gsap.fromTo(
      [leftRef.current, rightRef.current],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );
  });

  const onSubmit = async (formData) => {
    try {
      setSubmitState('idle');
      const response = await fetch('https://formsubmit.co/ajax/patelmanan074@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact - ${formData.name}`,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitState('success');
      reset();
    } catch {
      setSubmitState('error');
    }
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: '#1C1C2E',
    border: '1px solid #1C1C2E',
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    color: '#F1F5F9',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const focusStyle = { borderColor: '#7C3AED' };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        {/* Heading */}
        <h2
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: 'Syne, sans-serif',
            background: 'linear-gradient(to right, #F1F5F9, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Get In Touch
        </h2>
        <div className="w-16 h-1 rounded mb-12" style={{ backgroundColor: '#7C3AED' }} />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column */}
          <div ref={leftRef} className="flex flex-col gap-6">
            <p
              className="text-xl font-bold"
              style={{ fontFamily: 'Syne, sans-serif', color: '#A78BFA' }}
            >
              Let's work together
            </p>
            <p style={{ color: '#94A3B8' }}>
              I'm open to new opportunities, collaborations, and interesting projects. Feel free to
              reach out!
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Mail size={16} style={{ color: '#7C3AED' }} />
                <span className="text-sm" style={{ color: '#94A3B8' }}>
                  patelmanan074@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} style={{ color: '#7C3AED' }} />
                <span className="text-sm" style={{ color: '#94A3B8' }}>
                  +91 8511781612
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} style={{ color: '#7C3AED' }} />
                <span className="text-sm" style={{ color: '#94A3B8' }}>
                  Vadodara, India
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/Ragnarok-Doom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="transition-opacity hover:opacity-70"
                style={{ color: '#94A3B8' }}
              >
                <Github size={22} />
              </a>
              <a
                href="https://linkedin.com/in/manan-patel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="transition-opacity hover:opacity-70"
                style={{ color: '#94A3B8' }}
              >
                <Linkedin size={22} />
              </a>
            </div>

            {/* Location image */}
            <div style={{ borderRadius: '0.75rem', overflow: 'hidden', marginTop: '0.5rem', position: 'relative', height: '140px' }}>
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
                alt="Vadodara, India"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,10,15,0.85) 0%, transparent 60%)',
              }} />
              <p style={{
                position: 'absolute', bottom: '0.75rem', left: '1rem',
                fontSize: '0.8rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                <MapPin size={12} style={{ color: '#7C3AED' }} /> Vadodara, India
              </p>
            </div>
          </div>

          {/* Right column: form */}
          <div ref={rightRef}>
            {submitState === 'success' ? (
              <div
                className="flex flex-col items-center justify-center gap-4 rounded-xl p-10 text-center"
                style={{ backgroundColor: '#12121A', border: '1px solid #1C1C2E' }}
              >
                <CheckCircle size={40} style={{ color: '#10B981' }} />
                <p style={{ color: '#F1F5F9' }}>
                  Message sent! I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: '#94A3B8' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: '#1C1C2E' })}
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    })}
                  />
                  {errors.name && (
                    <p className="text-xs mt-1" style={{ color: '#F87171' }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: '#94A3B8' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: '#1C1C2E' })}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: EMAIL_REGEX, message: 'Enter a valid email address' },
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs mt-1" style={{ color: '#F87171' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: '#94A3B8' }}>
                    Message
                  </label>
                  <textarea
                    rows={5}
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: '#1C1C2E' })}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    })}
                  />
                  {errors.message && (
                    <p className="text-xs mt-1" style={{ color: '#F87171' }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {submitState === 'error' && (
                  <p className="text-sm" style={{ color: '#F87171' }}>
                    Something went wrong. Please email directly at patelmanan074@gmail.com
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
