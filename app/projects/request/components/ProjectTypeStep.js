import { useState } from 'react';
import { Button, FormSection } from '../../../../components/ui/FormElements';

const projectTypes = [
  {
    id: 'WEBSITE',
    name: 'Website',
    description: 'A custom website for your business or personal use',
    icon: '🌐',
  },
  {
    id: 'MOBILE',
    name: 'Mobile App',
    description: 'iOS or Android mobile application',
    icon: '📱',
  },
  {
    id: 'CUSTOM_SOFTWARE',
    name: 'Custom Software',
    description: 'Tailored software solution for your business needs',
    icon: '💻',
  },
  {
    id: 'PURCHASE_SOFTWARE',
    name: 'Purchase Software',
    description: 'Ready-made software purchase and setup',
    icon: '🛒',
  },
];

const ProjectTypeStep = ({ formData, handleChange, nextStep }) => {
  const [selectedType, setSelectedType] = useState(formData.type);
  const [error, setError] = useState('');

  const handleSelect = (type) => {
    setSelectedType(type);
    setError('');
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!selectedType) {
      setError('Please select a project type');
      return;
    }
    handleChange({ target: { name: 'type', value: selectedType } });
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-800">Select Project Type</h2>
        <p className="text-gray-500">Choose the type of project that best fits your needs</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {projectTypes.map((type) => (
          <div
            key={type.id}
            className={`relative p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer group overflow-hidden ${
              selectedType === type.id 
                ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-white shadow-lg' 
                : 'border-gray-200 bg-white/80 hover:border-cyan-300 hover:shadow-md'
            }`}
            onClick={() => handleSelect(type.id)}
          >
            {/* Selection indicator */}
            <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
              selectedType === type.id 
                ? 'bg-cyan-500 text-white' 
                : 'border-2 border-gray-300 group-hover:border-cyan-400'
            }`}>
              {selectedType === type.id && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            
            <div className="flex items-start">
              <div className={`p-3 rounded-lg mr-4 ${
                selectedType === type.id 
                  ? 'bg-cyan-100 text-cyan-600' 
                  : 'bg-gray-100 text-gray-500 group-hover:bg-cyan-50 group-hover:text-cyan-500'
              }`}>
                <span className="text-2xl">{type.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{type.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{type.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-2 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start">
          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedType}
          className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
            selectedType
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:shadow-cyan-500/20 hover:from-cyan-600 hover:to-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Details
          <svg className="w-4 h-4 ml-2 -mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectTypeStep;
