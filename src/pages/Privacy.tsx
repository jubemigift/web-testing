import React, { useState } from 'react';
import { Shield, Eye, Lock, FileText, Calendar, Mail } from 'lucide-react';

const Privacy = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms of Service', icon: FileText }
  ];

  const renderPrivacyPolicy = () => (
    <div className="prose prose-lg max-w-none">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Privacy is Our Priority</h3>
            <p className="text-blue-800">
              At Global Pathway Visa, we are committed to protecting your personal information with 
              the highest security standards. This policy explains how we collect, use, and safeguard your data.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Eye className="h-6 w-6 text-blue-600 mr-2" />
            Information We Collect
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Full name, date of birth, and nationality</li>
              <li>Contact information (email, phone number, address)</li>
              <li>Passport and identification documents</li>
              <li>Travel history and immigration status</li>
              <li>Financial information for visa requirements</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>IP address and browser information</li>
              <li>Device identifiers and operating system</li>
              <li>Website usage patterns and preferences</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Lock className="h-6 w-6 text-blue-600 mr-2" />
            How We Use Your Information
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Primary Uses</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Processing visa applications</li>
                  <li>Communicating about your application status</li>
                  <li>Providing customer support</li>
                  <li>Ensuring application accuracy and completeness</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Secondary Uses</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Improving our services and website</li>
                  <li>Fraud prevention and security</li>
                  <li>Legal compliance and reporting</li>
                  <li>Marketing (with your consent)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security Measures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Lock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">256-bit SSL Encryption</h3>
              <p className="text-gray-600 text-sm">All data transmissions are protected with bank-level encryption</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Secure Data Centers</h3>
              <p className="text-gray-600 text-sm">Information stored in certified, monitored facilities</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Eye className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Regular Audits</h3>
              <p className="text-gray-600 text-sm">Continuous security assessments and compliance checks</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="text-amber-800 mb-4">You have the following rights regarding your personal information:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="list-disc list-inside text-amber-800 space-y-2">
                <li><strong>Access:</strong> Request copies of your data</li>
                <li><strong>Rectification:</strong> Correct inaccurate information</li>
                <li><strong>Erasure:</strong> Request deletion of your data</li>
              </ul>
              <ul className="list-disc list-inside text-amber-800 space-y-2">
                <li><strong>Portability:</strong> Transfer data to another service</li>
                <li><strong>Restriction:</strong> Limit processing of your data</li>
                <li><strong>Objection:</strong> Opt out of certain data uses</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderTermsOfService = () => (
    <div className="prose prose-lg max-w-none">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-3">
          <FileText className="h-6 w-6 text-green-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">Terms of Service</h3>
            <p className="text-green-800">
              These terms govern your use of Global Pathway Visa services. By using our platform, 
              you agree to comply with these terms and conditions.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Global Pathway Visa provides professional visa application assistance services. We act as 
              intermediaries between clients and government agencies, helping to ensure applications are 
              complete and properly submitted.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Important Note</h4>
              <p className="text-blue-800 text-sm">
                We do not guarantee visa approval. Final decisions rest with the relevant embassy or 
                consulate. Our role is to maximize your chances through proper application preparation.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Responsibilities</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Information Accuracy</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide complete and truthful information</li>
                  <li>Submit all required documents</li>
                  <li>Notify us of any changes to your circumstances</li>
                  <li>Respond promptly to requests for additional information</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Compliance</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Follow all applicable laws and regulations</li>
                  <li>Meet embassy/consulate requirements</li>
                  <li>Pay all fees in a timely manner</li>
                  <li>Attend required interviews or appointments</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fees and Payment</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Fees</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Clearly disclosed before service begins</li>
                  <li>Due upon completion of application review</li>
                  <li>Non-refundable once application is submitted</li>
                  <li>Subject to change with 30 days notice</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Government Fees</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Set by respective government agencies</li>
                  <li>Paid directly to embassies/consulates</li>
                  <li>Non-refundable regardless of outcome</li>
                  <li>Subject to change without notice</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="font-semibold text-red-900 mb-3">Important Limitations</h4>
            <ul className="list-disc list-inside text-red-800 space-y-2">
              <li>We cannot guarantee visa approval or processing times</li>
              <li>Liability limited to the amount of service fees paid</li>
              <li>Not responsible for embassy/consulate decisions or delays</li>
              <li>Force majeure events beyond our control are excluded</li>
              <li>Indirect or consequential damages are not covered</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Any disputes arising from these terms will be resolved through:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Direct negotiation between parties</li>
              <li>Mediation through a neutral third party</li>
              <li>Binding arbitration if mediation fails</li>
              <li>Jurisdiction governed by New York State law</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Legal Information</h1>
          <p className="text-lg text-gray-600">
            Our commitment to transparency, security, and professional service standards.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {activeTab === 'privacy' ? renderPrivacyPolicy() : renderTermsOfService()}
        </div>

        {/* Last Updated & Contact */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>Last updated: January 15, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="text-gray-600">Questions? Contact us at </span>
              <a href="mailto:legal@globalpathwayvisa.com" className="text-blue-600 hover:underline">
                legal@globalpathwayvisa.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;