import { useState } from 'react';
import { Button } from '../../../../components/ui/FormElements';

const ReviewStep = ({ formData, handleSubmit, prevStep, isSubmitting }) => {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    try {
      await handleSubmit(e);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // Format project type for display
  const getProjectType = () => {
    switch (formData.type) {
      case 'WEBSITE':
        return 'Website';
      case 'MOBILE_APP':
        return 'Mobile Application';
      case 'SOFTWARE':
        return 'Custom Software';
      case 'E_COMMERCE':
        return 'E-commerce';
      default:
        return 'Other';
    }
  };

  // Format website type for display
  const getWebsiteType = () => {
    if (formData.type !== 'WEBSITE') return 'N/A';
    
    switch (formData.websiteType) {
      case 'BUSINESS':
        return 'Business Website';
      case 'PORTFOLIO':
        return 'Portfolio';
      case 'LANDING_PAGE':
        return 'Landing Page';
      case 'BLOG':
        return 'Blog';
      default:
        return 'Not specified';
    }
  };

  // Format mobile platform for display
  const getMobilePlatform = () => {
    if (formData.type !== 'MOBILE_APP') return 'N/A';
    
    switch (formData.mobilePlatform) {
      case 'IOS':
        return 'iOS';
      case 'ANDROID':
        return 'Android';
      case 'CROSS_PLATFORM':
        return 'Cross-Platform';
      default:
        return 'Not specified';
    }
  };

  // Format software type for display
  const getSoftwareType = () => {
    if (formData.type !== 'SOFTWARE') return 'N/A';
    
    switch (formData.softwareType) {
      case 'DESKTOP':
        return 'Desktop Application';
      case 'ENTERPRISE':
        return 'Enterprise Software';
      case 'SAAS':
        return 'SaaS Application';
      case 'CUSTOM':
        return 'Custom Solution';
      default:
        return 'Not specified';
    }
  };

  // Format timeline for display
  const getTimeline = () => {
    if (!formData.timeline) return 'Not specified';
    
    switch (formData.timeline) {
      case 'URGENT':
        return 'ASAP (1-2 weeks)';
      case 'SHORT_TERM':
        return 'Short Term (2-4 weeks)';
      case 'MEDIUM_TERM':
        return 'Medium Term (1-3 months)';
      case 'LONG_TERM':
        return 'Long Term (3-6 months)';
      case 'FLEXIBLE':
        return 'Flexible (No specific deadline)';
      default:
        return formData.timeline;
    }
  };

  // Format budget for display
  const formatBudget = (budget) => {
    if (!budget) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(budget);
  };

  // Format boolean for display
  const formatBoolean = (value) => (value ? 'Yes' : 'No');

  const renderDetailRow = (label, value, isFirst = false) => (
    <div className={`py-4 flex flex-col sm:flex-row ${!isFirst ? 'border-t border-gray-100' : ''}`}>
      <dt className="text-sm font-medium text-gray-500 w-full sm:w-1/3">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:w-2/3">
        {value || 'Not specified'}
      </dd>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Project Request Summary
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please review your information before submitting
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {/* Project Information */}
          <div className="pb-4">
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Project Information</h4>
            {renderDetailRow('Project Type', getProjectType(), true)}
            {renderDetailRow('Project Title', formData.title)}
            {renderDetailRow('Description', formData.description)}
            {renderDetailRow('Budget', formatBudget(formData.budget))}
            {renderDetailRow('Timeline', getTimeline())}
          </div>



          {/* Type-specific details */}
          {formData.type === 'WEBSITE' && (
            <div className="py-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Website Details</h4>
              {renderDetailRow('Website Type', getWebsiteType(), true)}
              {renderDetailRow('Responsive Design', formatBoolean(formData.responsiveDesign))}
              {renderDetailRow('CMS Required', formatBoolean(formData.cmsRequired))}
            </div>
          )}

          {formData.type === 'MOBILE_APP' && (
            <div className="py-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Mobile App Details</h4>
              {renderDetailRow('Target Platform', getMobilePlatform(), true)}
              {formData.mobileFeatures?.length > 0 && (
                <div className="py-4 flex flex-col sm:flex-row border-t border-gray-100">
                  <dt className="text-sm font-medium text-gray-500 w-full sm:w-1/3">
                    Requested Features
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:w-2/3">
                    <div className="flex flex-wrap gap-2">
                      {formData.mobileFeatures.map((featureId) => {
                        const feature = [
                          { id: 'USER_AUTH', name: 'User Auth' },
                          { id: 'PUSH_NOTIFICATIONS', name: 'Push Notifications' },
                          { id: 'OFFLINE_ACCESS', name: 'Offline Access' },
                          { id: 'PAYMENT_PROCESSING', name: 'Payments' },
                          { id: 'LOCATION_SERVICES', name: 'Location' },
                          { id: 'CAMERA_ACCESS', name: 'Camera' },
                        ].find(f => f.id === featureId);
                        return (
                          <span 
                            key={featureId}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800"
                          >
                            {feature?.name || featureId}
                          </span>
                        );
                      })}
                    </div>
                  </dd>
                </div>
              )}
            </div>
          )}

          {formData.type === 'SOFTWARE' && (
            <div className="py-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Software Requirements</h4>
              {renderDetailRow('Software Type', getSoftwareType(), true)}
              {formData.integrationRequirements && 
                renderDetailRow('Integration Requirements', formData.integrationRequirements)}
              {formData.databaseRequirements && 
                renderDetailRow('Database Requirements', formData.databaseRequirements)}
            </div>
          )}

          {/* Company Information */}
          <div className="py-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Company Information</h4>
            {renderDetailRow('Company Name', formData.companyName, true)}
            {formData.companyMotto && renderDetailRow('Company Motto', formData.companyMotto)}
            {formData.domainName && renderDetailRow('Domain Name', formData.domainName)}
            {formData.companyHistory && renderDetailRow('Company Background', formData.companyHistory)}
          </div>

          {/* Contact Information */}
          <div className="py-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Contact Information</h4>
            {renderDetailRow('Contact Name', formData.clientName, true)}
            {renderDetailRow('Email', formData.clientEmail)}
            {renderDetailRow('Phone', formData.clientPhone)}
            {formData.businessPhone && renderDetailRow('Business Phone', formData.businessPhone)}
            {formData.address && renderDetailRow('Business Address', formData.address)}
          </div>

          {/* Additional Information */}
          <div className="py-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Additional Information</h4>
            {renderDetailRow('Content Ready', formatBoolean(formData.contentReady), true)}
            {renderDetailRow('Interested in Management', formatBoolean(formData.websiteManagement))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
        <Button
          type="button"
          onClick={prevStep}
          variant="secondary"
          className="px-6"
          disabled={isSubmitting || isSubmittingForm}
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button
          type="button"
          onClick={handleFormSubmit}
          className="px-6"
          disabled={isSubmitting || isSubmittingForm}
          isLoading={isSubmitting || isSubmittingForm}
        >
          Submit Request
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
