import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail, Lock, User, X, KeyRound } from 'lucide-react';

// Define Zod schemas for login and registration forms for validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// A reusable input component for the forms
const FormInput = ({ id, type, placeholder, register, icon: Icon, error }) => (
    <div className="relative flex flex-col">
        <div className="relative flex items-center">
            <Icon className="absolute left-4 h-5 w-5 text-gray-400" />
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(id)}
                className={`w-full rounded-lg border bg-gray-50 py-3 pl-12 pr-4 text-gray-800 transition-colors duration-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200'}`}
            />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500">{error.message}</p>}
    </div>
);

// A reusable button for form submission
const SubmitButton = ({ isLoading, text }) => (
    <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
    >
        {isLoading ? (
            <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : (
            <Lock className="h-5 w-5" />
        )}
        <span>{text}</span>
    </button>
);


export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // 'login' or 'register'
  const [authMode, setAuthMode] = useState('login');

  // React Hook Form setup for login
  const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // React Hook Form setup for registration
  const { register: registerRegister, handleSubmit: handleRegisterSubmit, formState: { errors: registerErrors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Handle login submission
  const onLogin = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      // First, try to authenticate with credentials
      const signInResult = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      });

      if (signInResult?.error) {
        throw new Error(signInResult.error || 'Login failed. Please check your credentials.');
      }

      // Call the onAuthSuccess callback if provided
      if (onAuthSuccess) {
        onAuthSuccess();
      } else {
        // Fallback behavior if onAuthSuccess is not provided
        onClose();
        window.location.href = '/projects';
      }
    } catch (err) {
        setError(err.message || 'An unexpected error occurred.');
    } finally {
        setIsLoading(false);
    }
  };

  // Handle registration submission
  const onRegister = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed.');
      }
      
      // Switch to login view after successful registration
      setAuthMode('login');
      // Optionally, you could automatically log the user in here
      // For now, we'll just let them know they can log in.
      // You might want to add a success message here.

    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to handle body scroll when modal is open/closed
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true"></div>
        <div 
            className="relative z-10 grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Left Panel: Branding and Welcome Message */}
            <div className="relative hidden flex-col justify-center bg-gray-900 p-12 text-white md:flex" style={{backgroundImage: 'url(https://placehold.co/600x800/0f172a/ffffff?text=Your\nLogo)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent"></div>
                 <div className="relative z-10">
                    <h2 className="text-4xl font-bold tracking-tighter">Welcome to Our Platform</h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Sign in or create an account to unlock exclusive features and manage your projects with ease.
                    </p>
                 </div>
            </div>

            {/* Right Panel: Form */}
            <div className="flex flex-col justify-center p-8 sm:p-12">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                </button>

                <div className="w-full">
                    <div className="mb-6 text-center">
                         <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            {authMode === 'login' ? 'Welcome Back!' : 'Create an Account'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            {authMode === 'login' ? 'Enter your credentials to access your account.' : 'Join us today! It only takes a minute.'}
                        </p>
                    </div>

                    {/* Segmented Control for Login/Register */}
                    <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">
                        <button onClick={() => setAuthMode('login')} className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${authMode === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
                            Sign In
                        </button>
                        <button onClick={() => setAuthMode('register')} className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${authMode === 'register' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
                            Sign Up
                        </button>
                    </div>

                    {/* Error Message Display */}
                    {error && (
                        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-center">
                            <p className="text-sm font-medium text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Conditional rendering of Login or Register Form */}
                    {authMode === 'login' ? (
                        <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4 pt-4">
                            <FormInput id="email" type="email" placeholder="email@example.com" register={loginRegister} icon={Mail} error={loginErrors.email} />
                            <FormInput id="password" type="password" placeholder="••••••••" register={loginRegister} icon={Lock} error={loginErrors.password} />
                            <div className="pt-2">
                                <SubmitButton isLoading={isLoading} text="Sign In" />
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4 pt-4">
                            <FormInput id="name" type="text" placeholder="Your Name" register={registerRegister} icon={User} error={registerErrors.name} />
                            <FormInput id="email" type="email" placeholder="email@example.com" register={registerRegister} icon={Mail} error={registerErrors.email} />
                            <FormInput id="password" type="password" placeholder="Create a password" register={registerRegister} icon={Lock} error={registerErrors.password} />
                            <FormInput id="confirmPassword" type="password" placeholder="Confirm password" register={registerRegister} icon={KeyRound} error={registerErrors.confirmPassword} />
                            <div className="pt-2">
                                <SubmitButton isLoading={isLoading} text="Create Account" />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
