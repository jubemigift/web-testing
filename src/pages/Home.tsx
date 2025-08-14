import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Globe, Users, Award, CheckCircle } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Process',
      description: 'End-to-end encryption and secure document handling for your peace of mind.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Processing visas for over 150+ countries with expert knowledge of requirements.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Dedicated immigration consultants guiding you through every step.'
    },
    {
      icon: Award,
      title: '98% Success Rate',
      description: 'Proven track record with thousands of successful applications.'
    }
  ];

  const steps = [
    { number: '01', title: 'Complete Application', description: 'Fill out our secure online form with your details' },
    { number: '02', title: 'Upload Documents', description: 'Securely upload all required documentation' },
    { number: '03', title: 'Expert Review', description: 'Our team reviews and optimizes your application' },
    { number: '04', title: 'Submit & Track', description: 'We submit your application and provide tracking updates' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Your Trusted
                <span className="text-amber-400"> Global Pathway</span>
                <br />to New Opportunities
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Secure, professional visa application services with expert guidance. 
                Start your journey to global opportunities today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/apply"
                  className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center group"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Global passport and travel"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-blue-800 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-semibold">15,000+ Visas Processed</p>
                    <p className="text-sm text-gray-600">This Year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Global Pathway Visa?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge security with expert immigration knowledge to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              From application to approval, we make the visa process straightforward and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl font-bold text-blue-600 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have successfully obtained their visas through our secure platform.
          </p>
          <Link
            to="/apply"
            className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center group"
          >
            Start Your Application
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;