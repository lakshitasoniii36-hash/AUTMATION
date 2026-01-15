'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function Enquiry() {
    const sectionRef = useRef<HTMLElement>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [submitted, setSubmitted] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [30, 0, 0, -30]);

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Partial<FormData> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Form submitted:', formData);
        setSubmitted(true);

        setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{
                position: 'relative',
                padding: '8rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh'
            }}
        >
            <motion.div
                style={{ opacity, y, maxWidth: '42rem', width: '100%' }}
            >
                <h2
                    style={{
                        fontSize: 'clamp(3rem, 6vw, 4rem)',
                        fontWeight: 700,
                        color: '#f8f8f8',
                        textAlign: 'center',
                        marginBottom: '3rem',
                        letterSpacing: '-0.02em'
                    }}
                >
                    Get in Touch
                </h2>

                {/* Animated Box Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ position: 'relative' }}
                >
                    {/* Form container */}
                    <div
                        className="contact-box"
                        style={{
                            position: 'relative',
                            borderRadius: '1rem',
                            padding: '2.5rem',
                            background: 'rgba(10, 10, 10, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(248, 248, 248, 0.05)'
                        }}
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    textAlign: 'center',
                                    padding: '3rem 0'
                                }}
                            >
                                <div
                                    style={{
                                        width: '4rem',
                                        height: '4rem',
                                        margin: '0 auto 1.5rem',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <svg
                                        style={{ width: '2rem', height: '2rem', color: '#f8f8f8' }}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#f8f8f8', marginBottom: '1rem' }}>
                                    Message Sent
                                </h3>
                                <p style={{ color: 'rgba(248, 248, 248, 0.6)' }}>
                                    We'll get back to you shortly.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label
                                        htmlFor="name"
                                        style={{
                                            display: 'block',
                                            color: 'rgba(248, 248, 248, 0.8)',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        style={{
                                            display: 'block',
                                            color: 'rgba(248, 248, 248, 0.8)',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        style={{
                                            display: 'block',
                                            color: 'rgba(248, 248, 248, 0.8)',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your project..."
                                        rows={5}
                                        className={errors.message ? 'border-red-500' : ''}
                                    />
                                    {errors.message && (
                                        <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        fontWeight: 600,
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '0.75rem',
                                        background: '#f8f8f8',
                                        color: '#0a0a0a',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(248, 248, 248, 0.9)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#f8f8f8';
                                    }}
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
