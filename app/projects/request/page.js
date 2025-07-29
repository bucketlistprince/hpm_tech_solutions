'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import NoInternet from '../../../components/NoInternet';

// Form steps components
import ProjectTypeStep from './components/ProjectTypeStep';
import ProjectDetailsStep from './components/ProjectDetailsStep';
import ContactInfoStep from './components/ContactInfoStep';
import ReviewStep from './components/ReviewStep';
import SuccessModal from './components/SuccessModal';

const ProjectRequestPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof window !== 'undefined' ? navigator.onLine : true);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Project Type
    type: '',
    
    // Step 2: Project Details
    title: '',
    description: '',
    budget: '',
    timeline: '',
    preferredFeatures: '',
    
    // Website specific
    websiteType: '',
    responsiveDesign: false,
    cmsRequired: false,
    domainName: '',
    contentReady: false,
    websiteManagement: false,
    
    // Mobile App specific
    mobilePlatform: '',
    mobileFeatures: [],
    appStoreRequirements: '',
    
    // Custom Software specific
    softwareType: '',
    integrationRequirements: '',
    databaseRequirements: '',
    developmentEnvironment: '',
    testingEnvironment: '',
    deploymentEnvironment: '',
    
    // Purchase Software specific
    softwareName: '',
    licenseType: '',
    
    // Company/Client Info
    companyName: '',
    companyMotto: '',
    companyHistory: '',
    clientName: session?.user?.name || '',
    clientEmail: session?.user?.email || '',
    clientPhone: '',
    businessPhone: '',
    address: '',
    
    // Project Management
    startDate: '',
    endDate: '',
    estimatedHours: '',
    actualHours: '',
    progress: 0,
    milestones: '',
    supportDuration: '',
    supportHours: '',
    maintenancePeriod: '',
    
    // Additional Fields
    specialFeatures: '',
    logoStatus: 'NEEDED', // NEEDED, IN_PROGRESS, COMPLETED
    dataProtection: false,
    accessibility: false,
    performanceRequirements: '',
    deadline: '',
    priority: 3, // 1: High, 2: Medium, 3: Low
    notes: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle next step
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  // Handle previous step
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Validate required fields
  const validateForm = () => {
    const requiredFields = [
      'title',
      'description',
      'type',
      'companyName',
      'clientName',
      'clientEmail',
      'clientPhone'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(', ')}`);
      return false;
    }

    return true;
  };

  // Handle online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isOnline) {
      toast.error('You are currently offline. Please check your internet connection and try again.');
      return;
    }
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Prepare the project data according to the schema
      const projectData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        status: 'PENDING',
        budget: formData.budget ? parseInt(formData.budget) : null,
        timeline: formData.timeline,
        preferredFeatures: formData.preferredFeatures,
        platform: formData.mobilePlatform, // For mobile projects
        technologyStack: formData.technologyStack,
        mobilePlatform: formData.mobilePlatform,
        mobileFeatures: formData.mobileFeatures.join(','), // Convert array to string
        appStoreRequirements: formData.appStoreRequirements,
        websiteType: formData.websiteType,
        responsiveDesign: formData.responsiveDesign,
        cmsRequired: formData.cmsRequired,
        companyName: formData.companyName,
        companyMotto: formData.companyMotto,
        companyHistory: formData.companyHistory,
        domainName: formData.domainName,
        specialFeatures: formData.specialFeatures,
        contentReady: formData.contentReady,
        websiteManagement: formData.websiteManagement,
        logoStatus: formData.logoStatus,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        businessPhone: formData.businessPhone,
        address: formData.address,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : null,
        actualHours: formData.actualHours ? parseInt(formData.actualHours) : null,
        progress: formData.progress || 0,
        milestones: formData.milestones,
        developmentEnvironment: formData.developmentEnvironment,
        testingEnvironment: formData.testingEnvironment,
        deploymentEnvironment: formData.deploymentEnvironment,
        supportDuration: formData.supportDuration ? parseInt(formData.supportDuration) : null,
        supportHours: formData.supportHours,
        maintenancePeriod: formData.maintenancePeriod ? parseInt(formData.maintenancePeriod) : null,
        dataProtection: formData.dataProtection,
        accessibility: formData.accessibility,
        performanceRequirements: formData.performanceRequirements,
        softwareType: formData.softwareType,
        integrationRequirements: formData.integrationRequirements,
        databaseRequirements: formData.databaseRequirements,
        softwareName: formData.softwareName,
        licenseType: formData.licenseType,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
        priority: formData.priority || 3,
        notes: formData.notes,
        clientId: session?.user?.id,
      };

      // Remove undefined values
      Object.keys(projectData).forEach(key => {
        if (projectData[key] === undefined) {
          delete projectData[key];
        }
      });

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit project');
      }

      // Show success modal
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Error submitting project:', error);
      toast.error(error.message || 'Failed to submit project');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close success modal and redirect
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/projects');
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProjectTypeStep 
            formData={formData} 
            handleChange={handleChange} 
            nextStep={nextStep} 
          />
        );
      case 2:
        return (
          <ProjectDetailsStep 
            formData={formData} 
            handleChange={handleChange}
            handleMultiSelectChange={handleMultiSelectChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <ContactInfoStep 
            formData={formData} 
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <ReviewStep 
            formData={formData}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  // Handle offline state
  if (!isOnline) {
    return <NoInternet onRetry={() => setIsOnline(navigator.onLine)} />;
  }

  return (
    <div className="relative min-h-screen pt-16 sm:pt-24 overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.1),transparent_50%)]" />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-2xl rotate-12 blur-sm"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-sm"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-xl -rotate-45 blur-sm"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
              {currentStep === 1 && 'Project Type'}
              {currentStep === 2 && 'Project Details'}
              {currentStep === 3 && 'Contact Information'}
              {currentStep === 4 && 'Review & Submit'}
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {currentStep === 1 && 'Select the type of project you need'}
            {currentStep === 2 && 'Tell us more about your project'}
            {currentStep === 3 && 'How can we reach you?'}
            {currentStep === 4 && 'Please review your information before submitting'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step}
                className={`flex-1 flex flex-col items-center transition-all duration-300 ${currentStep >= step ? 'text-cyan-600' : 'text-gray-400'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep > step ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md' : 
                  currentStep === step ? 'bg-white text-cyan-700 border-2 border-cyan-500 shadow-lg' : 
                  'bg-gray-100 text-gray-400 border-2 border-gray-200'
                }`}>
                  {step}
                </div>
                <span className="text-sm font-medium mt-2">
                  {step === 1 && 'Type'}
                  {step === 2 && 'Details'}
                  {step === 3 && 'Contact'}
                  {step === 4 && 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
          
          <form onSubmit={handleSubmit} className="relative z-10">
            {renderStep()}
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={handleSuccessClose} 
      />
    </div>
  );
};

export default ProjectRequestPage;
