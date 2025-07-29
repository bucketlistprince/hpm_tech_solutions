import React from 'react';
import { ArrowRight, Code, Smartphone, Rocket, Database, ShieldCheck } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, features }) => (
  <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4">
      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{title}</span>
    </h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <ShieldCheck className="w-4 h-4 text-purple-600 mr-2" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
    <a
      href="#"
      className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors group-hover:translate-x-1"
    >
      Learn More
      <ArrowRight className="ml-2 w-4 h-4" />
    </a>
  </div>
);

const ServicesPage = () => {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Crafting modern, responsive websites that convert visitors into customers.',
      features: [
        'Custom website design & development',
        'SEO optimization',
        'Mobile-first approach',
        'Performance optimization',
        '24/7 support'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Creating native and cross-platform mobile applications for iOS and Android.',
      features: [
        'Native app development',
        'Cross-platform solutions',
        'Push notifications',
        'In-app purchases',
        'Performance monitoring'
      ]
    },
    {
      icon: Rocket,
      title: 'Custom Software',
      description: 'Tailored software solutions to automate your business processes.',
      features: [
        'Enterprise solutions',
        'Custom integrations',
        'Scalable architecture',
        'Data security',
        'Regular updates'
      ]
    },
    {
      icon: Database,
      title: 'Cloud Solutions',
      description: 'Secure and scalable cloud infrastructure for your business needs.',
      features: [
        'Cloud migration',
        'Data backup',
        'Scalable storage',
        'Security monitoring',
        'Disaster recovery'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive technology solutions to help your business grow and succeed in the digital age.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white/80 backdrop-blur-sm rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              150+
            </div>
            <div className="text-gray-600">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              95%
            </div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Contact us today to discuss how we can help your business grow with our cutting-edge technology solutions.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Get Started
          <ArrowRight className="ml-3 w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default ServicesPage;
