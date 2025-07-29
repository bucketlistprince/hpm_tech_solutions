import { useState } from 'react';
import { Button, FormSection, Input, Textarea, Select, Checkbox } from '../../../../components/ui/FormElements';

// Options for different project types
const websiteTypes = [
  { id: 'BUSINESS', name: 'Business Website' },
  { id: 'E_COMMERCE', name: 'E-commerce' },
  { id: 'PORTFOLIO', name: 'Portfolio' },
  { id: 'LANDING_PAGE', name: 'Landing Page' },
  { id: 'BLOG', name: 'Blog' },
  { id: 'CORPORATE', name: 'Corporate Website' },
];

const mobilePlatforms = [
  { id: 'IOS', name: 'iOS' },
  { id: 'ANDROID', name: 'Android' },
  { id: 'CROSS_PLATFORM', name: 'Cross-Platform' },
];

const mobileFeatures = [
  { id: 'USER_AUTH', name: 'User Authentication' },
  { id: 'PUSH_NOTIFICATIONS', name: 'Push Notifications' },
  { id: 'OFFLINE_ACCESS', name: 'Offline Access' },
  { id: 'PAYMENT_PROCESSING', name: 'Payment Processing' },
  { id: 'LOCATION_SERVICES', name: 'Location Services' },
  { id: 'CAMERA_ACCESS', name: 'Camera Access' },
  { id: 'SOCIAL_MEDIA', name: 'Social Media Integration' },
  { id: 'IN_APP_PURCHASES', name: 'In-App Purchases' },
];

const softwareTypes = [
  { id: 'BUSINESS', name: 'Business Management' },
  { id: 'INVENTORY', name: 'Inventory Management' },
  { id: 'ACCOUNTING', name: 'Accounting Software' },
  { id: 'CRM', name: 'Customer Relationship Management' },
  { id: 'ERP', name: 'Enterprise Resource Planning' },
  { id: 'CUSTOM', name: 'Custom Solution' },
];

const licenseTypes = [
  { id: 'PERPETUAL', name: 'Perpetual License' },
  { id: 'SUBSCRIPTION', name: 'Subscription' },
  { id: 'CONCURRENT', name: 'Concurrent Users' },
  { id: 'SITE', name: 'Site License' },
  { id: 'FLOATING', name: 'Floating License' },
];

const ProjectDetailsStep = ({
  formData = {},
  handleChange = () => {},
  handleMultiSelectChange = () => {},
  nextStep = () => {},
  prevStep = () => {},
}) => {
  const [features, setFeatures] = useState(formData.mobileFeatures || []);
  const [errors, setErrors] = useState({});

  const toggleFeature = (featureId) => {
    const newFeatures = features.includes(featureId)
      ? features.filter((id) => id !== featureId)
      : [...features, featureId];
    setFeatures(newFeatures);
    handleMultiSelectChange('mobileFeatures', newFeatures);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleChange({
      target: { name, value: checked, type: 'checkbox' },
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Project title is required';
    if (!formData.description) newErrors.description = 'Project description is required';

    if (formData.type === 'WEBSITE' && !formData.websiteType) {
      newErrors.websiteType = 'Please select a website type';
    }

    if (formData.type === 'MOBILE_APP' && !formData.mobilePlatform) {
      newErrors.mobilePlatform = 'Please select a mobile platform';
    }

    if (formData.type === 'CUSTOM_SOFTWARE' && !formData.softwareType) {
      newErrors.softwareType = 'Please select a software type';
    }

    if (formData.type === 'PURCHASE_SOFTWARE') {
      if (!formData.softwareName) newErrors.softwareName = 'Software name is required';
      if (!formData.licenseType) newErrors.licenseType = 'License type is required';
      if (!formData.numberOfUsers) newErrors.numberOfUsers = 'Please enter number of users/licenses';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      nextStep();
    }
  };

  const renderTypeSpecificFields = () => {
    switch (formData.type) {
      case 'WEBSITE':
        return (
          <FormSection title="Website Details" description="Tell us more about your website requirements">
            <Select
              label="Type of Website"
              name="websiteType"
              value={formData.websiteType || ''}
              onChange={handleChange}
              options={websiteTypes}
              error={errors.websiteType}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Checkbox label="Responsive Design" name="responsiveDesign" checked={!!formData.responsiveDesign} onChange={handleCheckboxChange} />
              <Checkbox label="CMS Required" name="cmsRequired" checked={!!formData.cmsRequired} onChange={handleCheckboxChange} />
              <Checkbox label="Content Ready" name="contentReady" checked={!!formData.contentReady} onChange={handleCheckboxChange} />
              <Checkbox label="Need Website Management" name="websiteManagement" checked={!!formData.websiteManagement} onChange={handleCheckboxChange} />
            </div>
            <Input
              label="Domain Name (if available)"
              name="domainName"
              value={formData.domainName || ''}
              onChange={handleChange}
              placeholder="example.com"
            />
          </FormSection>
        );

      case 'MOBILE_APP':
        return (
          <FormSection title="Mobile App Details" description="Tell us about your mobile app requirements">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Target Platform
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {mobilePlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      formData.mobilePlatform === platform.id
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                    onClick={() => handleChange({ target: { name: 'mobilePlatform', value: platform.id }})}
                  >
                    <div className="flex items-center">
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                        formData.mobilePlatform === platform.id
                          ? 'bg-cyan-500 border-cyan-600'
                          : 'border-gray-300'
                      }`}>
                        {formData.mobilePlatform === platform.id && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              {errors.mobilePlatform && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {errors.mobilePlatform}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Desired Features
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mobileFeatures.map((feature) => (
                  <div 
                    key={feature.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      features.includes(feature.id)
                        ? 'bg-cyan-50 border-cyan-200'
                        : 'bg-white border-gray-200 hover:border-cyan-300'
                    }`}
                    onClick={() => toggleFeature(feature.id)}
                  >
                    <div className="flex items-center">
                      <div className={`h-5 w-5 rounded border flex items-center justify-center mr-3 flex-shrink-0 ${
                        features.includes(feature.id)
                          ? 'bg-cyan-500 border-cyan-600'
                          : 'border-gray-300'
                      }`}>
                        {features.includes(feature.id) && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{feature.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Textarea
              label="App Store Requirements"
              name="appStoreRequirements"
              value={formData.appStoreRequirements || ''}
              onChange={handleChange}
              placeholder="Any specific requirements for app store submission"
              className="mb-4"
            />
          </FormSection>
        );

      case 'CUSTOM_SOFTWARE':
        return (
          <FormSection title="Software Details" description="Tell us more about your custom software needs">
            <Select
              label="Software Type"
              name="softwareType"
              value={formData.softwareType || ''}
              onChange={handleChange}
              options={softwareTypes}
              error={errors.softwareType}
              required
            />

            <Textarea
              label="Integration Requirements"
              name="integrationRequirements"
              value={formData.integrationRequirements || ''}
              onChange={handleChange}
              placeholder="List any systems or services that need to be integrated"
              className="mb-4"
            />

            <Input
              label="Database Requirements"
              name="databaseRequirements"
              value={formData.databaseRequirements || ''}
              onChange={handleChange}
              placeholder="e.g., MySQL, MongoDB, PostgreSQL"
            />

            <Input
              label="Development Environment"
              name="developmentEnvironment"
              value={formData.developmentEnvironment || ''}
              onChange={handleChange}
              placeholder="e.g., Node.js, .NET, Java"
            />
          </FormSection>
        );

      case 'PURCHASE_SOFTWARE':
        return (
          <FormSection title="Software Purchase Details" description="Tell us about the software you'd like to purchase">
            <Input
              label="Software Name"
              name="softwareName"
              value={formData.softwareName || ''}
              onChange={handleChange}
              placeholder="e.g., Microsoft Office, Adobe Creative Cloud"
              required
              error={errors.softwareName}
              className="mb-4"
            />

            <Select
              label="License Type"
              name="licenseType"
              value={formData.licenseType || ''}
              onChange={handleChange}
              options={licenseTypes}
              required
              error={errors.licenseType}
            />

            <Input
              label="Number of Users/Licenses"
              name="numberOfUsers"
              value={formData.numberOfUsers || ''}
              onChange={handleChange}
              type="number"
              min="1"
              required
              error={errors.numberOfUsers}
            />

            <Textarea
              label="Special Requirements"
              name="specialRequirements"
              value={formData.specialRequirements || ''}
              onChange={handleChange}
              placeholder="Any special configurations or requirements"
            />
          </FormSection>
        );

      default:
        return (
          <FormSection title="Project Requirements" description="Tell us more about your project requirements">
            <Textarea
              label="Project Requirements"
              name="specialFeatures"
              value={formData.specialFeatures || ''}
              onChange={handleChange}
              placeholder="Please provide as much detail as possible about your project requirements..."
              required
              className="mb-4"
            />
          </FormSection>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
        <p className="mt-1 text-gray-500">Provide more details about your project requirements.</p>
      </div>

      <FormSection title="Basic Information">
        <Input
          label="Project Title"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          placeholder="e.g., Company Website Redesign"
          error={errors.title}
          required
          className="mb-4"
        />

        <Textarea
          label="Project Description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Describe your project in detail..."
          error={errors.description}
          required
        />
      </FormSection>

      {renderTypeSpecificFields()}

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
          Next: Contact
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetailsStep;
