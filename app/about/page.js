import React from 'react';
import { Sparkles, Users, ShieldCheck, Award, Clock } from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: '/team/john.jpg',
      description: 'Visionary leader with 15+ years of experience in technology and business development.'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      image: '/team/sarah.jpg',
      description: 'Expert in software architecture and team management with a passion for innovation.'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Development',
      image: '/team/mike.jpg',
      description: 'Technical genius specializing in full-stack development and system optimization.'
    },
    {
      name: 'Emily Davis',
      role: 'UX Designer',
      image: '/team/emily.jpg',
      description: 'Crafts intuitive and beautiful user experiences that delight our clients.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Us
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our story, values, and the team behind HPM Tech Solutions.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <Sparkles className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
            <p className="text-gray-600">
              We constantly push boundaries to deliver cutting-edge solutions that transform businesses.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <Users className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">People First</h3>
            <p className="text-gray-600">
              Our success is built on strong relationships with clients and team members alike.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <ShieldCheck className="w-12 h-12 text-pink-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Security</h3>
            <p className="text-gray-600">
              We prioritize data protection and implement the highest security standards in all our solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full h-48 mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <p className="text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Our Journey
        </h2>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 w-0.5 h-full bg-gray-200" />
          
          {/* Timeline Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative">
              <div className="absolute -left-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">2015 - Foundation</h3>
                <p className="text-gray-600">
                  Founded by industry veterans with a vision to revolutionize digital solutions.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-3 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">2018 - Expansion</h3>
                <p className="text-gray-600">
                  Expanded our services to include mobile development and cloud solutions.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-3 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">2021 - Innovation</h3>
                <p className="text-gray-600">
                  Launched AI-powered solutions and enhanced security protocols.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">2023 - Growth</h3>
                <p className="text-gray-600">
                  Achieved global recognition and expanded our client base worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Join Our Journey
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Ready to work with a team that values innovation, excellence, and client satisfaction?
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Contact Us
          <Sparkles className="ml-3 w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
