import React, { useState } from 'react';
import { Upload, FileText, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: ''
    },
    visaInfo: {
      destinationCountry: '',
      visaType: '',
      purposeOfTravel: '',
      travelDate: '',
      duration: ''
    },
    documents: []
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const steps = [
    { number: 1, title: 'Personal Information', icon: FileText },
    { number: 2, title: 'Visa Details', icon: Shield },
    { number: 3, title: 'Document Upload', icon: Upload },
    { number: 4, title: 'Review & Submit', icon: CheckCircle }
  ];

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.personalInfo.nationality}
            onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
          >
            <option value="">Select nationality</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Passport Number *</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.personalInfo.passportNumber}
            onChange={(e) => handleInputChange('personalInfo', 'passportNumber', e.target.value)}
            placeholder="Enter passport number"
          />
        </div>
      </div>
    </div>
  );

  const renderVisaInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination Country *</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.visaInfo.destinationCountry}
            onChange={(e) => handleInputChange('visaInfo', 'destinationCountry', e.target.value)}
          >
            <option value="">Select destination</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="JP">Japan</option>
            <option value="SG">Singapore</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type *</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.visaInfo.visaType}
            onChange={(e) => handleInputChange('visaInfo', 'visaType', e.target.value)}
          >
            <option value="">Select visa type</option>
            <option value="tourist">Tourist/Visitor</option>
            <option value="business">Business</option>
            <option value="student">Student</option>
            <option value="work">Work/Employment</option>
            <option value="family">Family Reunion</option>
            <option value="transit">Transit</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Travel *</label>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          value={formData.visaInfo.purposeOfTravel}
          onChange={(e) => handleInputChange('visaInfo', 'purposeOfTravel', e.target.value)}
          placeholder="Please describe the purpose of your travel..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Intended Travel Date *</label>
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.visaInfo.travelDate}
            onChange={(e) => handleInputChange('visaInfo', 'travelDate', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration of Stay *</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.visaInfo.duration}
            onChange={(e) => handleInputChange('visaInfo', 'duration', e.target.value)}
          >
            <option value="">Select duration</option>
            <option value="1-7 days">1-7 days</option>
            <option value="1-2 weeks">1-2 weeks</option>
            <option value="1 month">1 month</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Required Documents</h4>
            <ul className="mt-2 text-sm text-blue-700 space-y-1">
              <li>• Valid passport (color scan)</li>
              <li>• Recent passport-sized photograph</li>
              <li>• Proof of financial support</li>
              <li>• Travel itinerary or hotel bookings</li>
              <li>• Additional documents based on visa type</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
        <p className="text-gray-500 mb-4">Drag and drop files or click to browse</p>
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileUpload}
          className="hidden"
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors"
        >
          Choose Files
        </label>
        <p className="text-xs text-gray-400 mt-2">Maximum file size: 10MB. Accepted formats: PDF, JPG, PNG, DOC, DOCX</p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Uploaded Files ({uploadedFiles.length})</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderReview = () => (
    <div className="space-y-8">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <h4 className="font-medium text-green-800">Application Review</h4>
            <p className="text-sm text-green-700">Please review your information before submitting.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {formData.personalInfo.firstName} {formData.personalInfo.lastName}</p>
            <p><span className="font-medium">Email:</span> {formData.personalInfo.email}</p>
            <p><span className="font-medium">Phone:</span> {formData.personalInfo.phone}</p>
            <p><span className="font-medium">Date of Birth:</span> {formData.personalInfo.dateOfBirth}</p>
            <p><span className="font-medium">Nationality:</span> {formData.personalInfo.nationality}</p>
            <p><span className="font-medium">Passport:</span> {formData.personalInfo.passportNumber}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Visa Information</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Destination:</span> {formData.visaInfo.destinationCountry}</p>
            <p><span className="font-medium">Visa Type:</span> {formData.visaInfo.visaType}</p>
            <p><span className="font-medium">Travel Date:</span> {formData.visaInfo.travelDate}</p>
            <p><span className="font-medium">Duration:</span> {formData.visaInfo.duration}</p>
            <p><span className="font-medium">Purpose:</span> {formData.visaInfo.purposeOfTravel}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Uploaded Documents</h3>
        <div className="space-y-2">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <FileText className="h-4 w-4 text-gray-400" />
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="flex items-start space-x-3">
          <input type="checkbox" className="mt-1" />
          <span className="text-sm text-gray-700">
            I confirm that all the information provided is accurate and complete. I understand that providing false information may result in application rejection and potential legal consequences.
          </span>
        </label>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderVisaInfo();
      case 3:
        return renderDocumentUpload();
      case 4:
        return renderReview();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visa Application Portal</h1>
          <p className="text-lg text-gray-600">Complete your secure visa application in 4 simple steps</p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">SSL Encrypted & Secure</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="ml-3 hidden md:block">
                  <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'}`}>
                    Step {step.number}
                  </p>
                  <p className={`text-xs ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 ml-4 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            <button
              onClick={currentStep === 4 ? undefined : nextStep}
              className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                currentStep === 4
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {currentStep === 4 ? 'Submit Application' : 'Continue'}
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Security & Privacy</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your personal information and documents are protected with bank-level encryption. 
                We never share your data with third parties without your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;