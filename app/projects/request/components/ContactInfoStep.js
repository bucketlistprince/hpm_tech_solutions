import { useState } from 'react';
import { FormSection, Input, Textarea, Button } from '../../../../components/ui/FormElements';

const ContactInfoStep = ({
  formData = {},
  handleChange = () => {},
  nextStep = () => {},
  prevStep = () => {},
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.clientName) newErrors.clientName = 'Your name is required';

    if (!formData.clientEmail) {
      newErrors.clientEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Please enter a valid email address';
    }

    if (!formData.clientPhone) newErrors.clientPhone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      nextStep();
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleChange({
      target: { name, value: checked, type: 'checkbox' },
    });
  };

  return (
    <div className="space-y-8">
      {/* Company Info */}
      <FormSection
        title="Company Information"
        description="Tell us about your company"
        className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            name="companyName"
            value={formData.companyName || ''}
            onChange={handleChange}
            placeholder="Your company name"
            error={errors.companyName}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domain Name (if applicable)
            </label>
            <div className="flex rounded-lg overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent transition-shadow">
              <span className="inline-flex items-center px-3 bg-gray-50 text-gray-500 text-sm border-r border-gray-200">
                https://
              </span>
              <input
                type="text"
                name="domainName"
                value={formData.domainName || ''}
                onChange={handleChange}
                className="flex-1 min-w-0 block w-full px-3 py-2.5 border-0 focus:ring-0 sm:text-sm"
                placeholder="yourdomain.com"
              />
            </div>
          </div>
        </div>

        <Input
          label="Company Tagline or Motto"
          name="companyMotto"
          value={formData.companyMotto || ''}
          onChange={handleChange}
          placeholder="e.g., Innovation at its best"
          className="mt-4"
        />

        <Textarea
          label="Brief Company Background"
          name="companyHistory"
          value={formData.companyHistory || ''}
          onChange={handleChange}
          placeholder="Tell us about your company..."
          rows={3}
          className="mt-4"
        />
      </FormSection>

      {/* Contact Info */}
      <FormSection
        title="Contact Information"
        description="How can we reach you?"
        className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Your Full Name"
            name="clientName"
            value={formData.clientName || ''}
            onChange={handleChange}
            placeholder="John Doe"
            error={errors.clientName}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="clientEmail"
            value={formData.clientEmail || ''}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.clientEmail}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Input
            label="Phone Number"
            type="tel"
            name="clientPhone"
            value={formData.clientPhone || ''}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            error={errors.clientPhone}
            required
          />

          <Input
            label="Business Phone (optional)"
            type="tel"
            name="businessPhone"
            value={formData.businessPhone || ''}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <Textarea
          label="Business Address"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          placeholder="123 Business St, City, State, ZIP"
          rows={2}
          className="mt-4"
        />
      </FormSection>

      {/* Additional Info */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="contentReady"
              name="contentReady"
              type="checkbox"
              checked={!!formData.contentReady}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="contentReady" className="ml-2 block text-sm text-gray-700">
              I have all the content ready (text, images, etc.)
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="websiteManagement"
              name="websiteManagement"
              type="checkbox"
              checked={!!formData.websiteManagement}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="websiteManagement" className="ml-2 block text-sm text-gray-700">
              I'm interested in website maintenance/management services
            </label>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
        <Button
          type="button"
          onClick={prevStep}
          variant="secondary"
          className="px-6"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="px-6"
        >
          Next: Review
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ContactInfoStep;
