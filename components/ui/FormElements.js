'use client';

export const Input = ({ label, name, type = 'text', value, onChange, placeholder, error, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border ${
          error ? 'border-red-300' : 'border-gray-200'
        } bg-white/80 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 outline-none`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export const Textarea = ({ label, name, value, onChange, placeholder, error, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className={`w-full px-4 py-2.5 rounded-xl border ${
          error ? 'border-red-300' : 'border-gray-200'
        } bg-white/80 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 outline-none`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export const Select = ({ label, name, value, onChange, options, error, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        name={name}
        id={name}
        value={value || ''}
        onChange={onChange}
        className={`w-full py-2.5 px-4 rounded-xl border ${
          error ? 'border-red-300' : 'border-gray-200'
        } bg-white/80 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 outline-none appearance-none bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.5em_1.5em]`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export const Checkbox = ({ label, name, checked, onChange, className = '', ...props }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked || false}
        onChange={onChange}
        className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 focus:ring-offset-0"
        {...props}
      />
      <label htmlFor={name} className="ml-3 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

export const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  isLoading = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500';
  
  const variants = {
    primary: `bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:shadow-cyan-500/20 hover:from-cyan-600 hover:to-blue-700 ${
      disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
    }`,
    secondary: `bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 ${
      disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
    }`,
    danger: `bg-red-600 text-white hover:bg-red-700 ${
      disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
    }`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className} relative`}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export const FormSection = ({ title, description, children, className = '' }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
