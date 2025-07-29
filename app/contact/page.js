'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone as PhoneIcon, MapPin as LocationIcon, Globe as GlobeIcon, Send as SendIcon } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  inquiryType: z.enum(['general', 'project', 'career', 'partnership'], {
    errorMap: () => ({ message: 'Please select an inquiry type' })
  }),
  budget: z.enum(['under_10k', '10k_50k', '50k_100k', 'over_100k'], {
    errorMap: () => ({ message: 'Please select your budget range' })
  }).optional(),
  timeline: z.enum(['immediate', '1_3_months', '3_6_months', '6_months_plus'], {
    errorMap: () => ({ message: 'Please select your timeline' })
  }).optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  attachments: z.array(z.string()).optional()
});

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to submit the form
      // For now, we'll just show a success message
      setSubmissionSuccess(true);
      setTimeout(() => setSubmissionSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team to discuss your project or learn more about our services.
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <Mail className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">contact@hpmtech.com</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <PhoneIcon className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <LocationIcon className="w-12 h-12 text-pink-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-600">123 Tech Street, Silicon Valley, CA</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Send Us a Message
          </h2>
          
          {submissionSuccess && (
            <div className="bg-green-50 p-4 rounded-md mb-8 text-center">
              <p className="text-green-700 font-medium">
                <span className="text-xl">✓</span> Your message has been sent successfully!
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="(Optional) Your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  {...register('company')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.company ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="(Optional) Your company name"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">
                Type of Inquiry
              </label>
              <select
                id="inquiryType"
                {...register('inquiryType')}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.inquiryType ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              >
                <option value="">Select inquiry type</option>
                <option value="general">General Inquiry</option>
                <option value="project">Project Consultation</option>
                <option value="career">Career Opportunities</option>
                <option value="partnership">Business Partnership</option>
              </select>
              {errors.inquiryType && (
                <p className="text-red-500 text-sm mt-1">{errors.inquiryType.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Range
                </label>
                <select
                  id="budget"
                  {...register('budget')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.budget ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option value="">(Optional) Select budget range</option>
                  <option value="under_10k">Under $10,000</option>
                  <option value="10k_50k">$10,000 - $50,000</option>
                  <option value="50k_100k">$50,000 - $100,000</option>
                  <option value="over_100k">Over $100,000</option>
                </select>
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Timeline
                </label>
                <select
                  id="timeline"
                  {...register('timeline')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.timeline ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option value="">(Optional) Select timeline</option>
                  <option value="immediate">Immediate</option>
                  <option value="1_3_months">1-3 Months</option>
                  <option value="3_6_months">3-6 Months</option>
                  <option value="6_months_plus">6+ Months</option>
                </select>
                {errors.timeline && (
                  <p className="text-red-500 text-sm mt-1">{errors.timeline.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                {...register('subject')}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                {...register('message')}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Tell us more about your project..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* File Upload Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
                  Attach Files
                </label>
                <span className="text-sm text-gray-500">
                  Max 5 files, 10MB each
                </span>
              </div>
              <div className="flex flex-col space-y-2">
                <input
                  type="file"
                  id="attachments"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  {...register('attachments')}
                />
                <label
                  htmlFor="attachments"
                  className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 cursor-pointer"
                >
                  <span className="text-sm">Drag and drop files here or click to upload</span>
                </label>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-1/2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">...</span>
                    Sending
                  </>
                ) : (
                  <>
                    <SendIcon className="mr-2 w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Find Us On The Map
        </h2>
        <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg">
          {/* Replace with actual map embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.723848576736!2d-122.0841200846457!3d37.42240817982443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb6e500970000%3A0x2000000000000000!2sGoogleplex!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Follow Us
        </h2>
        <div className="flex justify-center space-x-8">
          <a
            href="#"
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <GlobeIcon className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <GlobeIcon className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <GlobeIcon className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <GlobeIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
