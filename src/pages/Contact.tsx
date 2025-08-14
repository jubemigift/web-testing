import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+1 (555) 123-4567',
      subDetails: 'Mon-Fri: 8AM-8PM EST',
      description: 'Speak directly with our visa consultants'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'info@globalpathwayvisa.com',
      subDetails: 'Response within 24 hours',
      description: 'Get detailed assistance via email'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: '123 Business Avenue',
      subDetails: 'New York, NY 10001',
      description: 'Visit us for in-person consultations'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday',
      subDetails: '8:00 AM - 8:00 PM EST',
      description: 'Extended hours for your convenience'
    }
  ];

  const urgencyOptions = [
    { value: 'low', label: 'General Inquiry', description: 'Response within 48 hours' },
    { value: 'normal', label: 'Standard', description: 'Response within 24 hours' },
    { value: 'high', label: 'Urgent', description: 'Response within 4 hours' },
    { value: 'critical', label: 'Emergency', description: 'Immediate attention required' }
  ];

  if (isSubmitted) {
    return (
      <div className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <MessageCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting Global Pathway Visa. We've received your message and will respond 
              according to the priority level you selected.
            </p>
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Our team will review your inquiry within the specified timeframe</li>
                <li>• You'll receive a confirmation email with a reference number</li>
                <li>• A specialist will contact you with personalized assistance</li>
              </ul>
            </div>
            <button
              onClick={() => {setIsSubmitted(false); setFormData({name: '', email: '', phone: '', subject: '', message: '', urgency: 'normal'})}}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with our visa experts. We're here to help you navigate your immigration journey 
            with professional guidance and support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <info.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{info.title}</h3>
                    <p className="text-gray-600">{info.details}</p>
                    <p className="text-sm text-gray-500">{info.subDetails}</p>
                    <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Notice */}
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-2">Urgent Travel?</h4>
              <p className="text-sm text-amber-700">
                For emergency visa services or travel within 72 hours, please call us directly 
                at <span className="font-medium">+1 (555) 123-4567</span> for immediate assistance.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Level *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.urgency}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                    >
                      {urgencyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      {urgencyOptions.find(opt => opt.value === formData.urgency)?.description}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Please provide detailed information about your visa requirements, destination country, travel dates, and any specific questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  ) : (
                    <Send className="h-5 w-5 mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Extended Support Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-gray-900">Phone Support</h4>
                <p className="text-gray-600">Mon-Fri: 8AM-8PM EST</p>
                <p className="text-gray-600">Weekends: 10AM-6PM EST</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Email Support</h4>
                <p className="text-gray-600">24/7 Availability</p>
                <p className="text-gray-600">Responses within 24hrs</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Live Chat</h4>
                <p className="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
                <p className="text-gray-600">Instant responses</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Emergency Line</h4>
                <p className="text-gray-600">24/7 for urgent cases</p>
                <p className="text-gray-600">Travel within 72hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;