import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      category: 'General Information',
      faqs: [
        {
          question: 'What is Global Pathway Visa?',
          answer: 'Global Pathway Visa is a professional visa application service that helps individuals and businesses navigate the complex process of obtaining visas for travel, work, study, and immigration purposes. We provide secure, expert-guided assistance for visa applications to over 150 countries worldwide.'
        },
        {
          question: 'How long does the visa application process take?',
          answer: 'Processing times vary depending on the destination country, visa type, and current embassy workloads. Tourist visas typically take 5-15 business days, while work and student visas may take 4-12 weeks. We provide estimated timelines for each country and visa type during your application.'
        },
        {
          question: 'What makes your service different from applying directly?',
          answer: 'We provide expert guidance to ensure your application is complete and accurate, reducing the risk of rejection. Our team stays updated on changing requirements, pre-reviews all documents, provides personalized support, and offers application tracking throughout the process.'
        }
      ]
    },
    {
      category: 'Application Process',
      faqs: [
        {
          question: 'What documents do I need for my visa application?',
          answer: 'Required documents vary by destination and visa type, but commonly include: valid passport, passport photos, completed application forms, proof of financial support, travel itinerary, and purpose-specific documents (invitation letters, enrollment certificates, etc.). We provide a detailed checklist for your specific application.'
        },
        {
          question: 'Can I edit my application after submission?',
          answer: 'Once submitted to the embassy or consulate, applications typically cannot be modified. However, before final submission, you can update your information during our review process. We carefully review all applications before submission to minimize errors.'
        },
        {
          question: 'Do you handle urgent or expedited applications?',
          answer: 'Yes, we offer expedited services where available. Many countries provide fast-track processing for an additional fee. Contact us to discuss urgent travel needs, and we\'ll advise on the fastest available options for your destination.'
        }
      ]
    },
    {
      category: 'Fees and Payment',
      faqs: [
        {
          question: 'How much does your service cost?',
          answer: 'Our service fees vary based on the complexity of the application and destination country. Fees typically range from $99-$299 for our service, plus government visa fees. We provide transparent pricing upfront with no hidden charges.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and digital payment methods. All payments are processed through secure, encrypted channels to protect your financial information.'
        },
        {
          question: 'Do you offer refunds if my visa is denied?',
          answer: 'Government visa fees are non-refundable regardless of the outcome. Our service fees are refundable if the denial was due to an error on our part. We maintain a 98% approval rate and provide pre-application consultation to minimize rejection risk.'
        }
      ]
    },
    {
      category: 'Security and Privacy',
      faqs: [
        {
          question: 'How do you protect my personal information?',
          answer: 'We use bank-level encryption (256-bit SSL) to protect all data transmissions and storage. Your information is stored on secure servers with multiple layers of protection. We never share personal data with third parties without explicit consent and comply with international data protection regulations.'
        },
        {
          question: 'What happens to my documents after processing?',
          answer: 'Digital copies of your documents are securely stored for 7 years as required by immigration authorities, then permanently deleted. You can request document deletion earlier if desired. Physical documents submitted to embassies are handled according to their retention policies.'
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap((category, categoryIndex) =>
    category.faqs.map((faq, faqIndex) => ({
      ...faq,
      categoryIndex,
      faqIndex,
      globalIndex: categoryIndex * 100 + faqIndex
    }))
  );

  const filteredFaqs = searchQuery
    ? allFaqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderFaqItem = (faq: any, index: number) => (
    <div key={index} className="border border-gray-200 rounded-lg mb-4">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
        onClick={() => toggleFaq(index)}
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        {openIndex === index ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {openIndex === index && (
        <div className="px-6 pb-4 text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our visa application services, 
            processes, and requirements.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Content */}
        {filteredFaqs ? (
          // Search Results
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Search Results ({filteredFaqs.length})
            </h2>
            {filteredFaqs.length > 0 ? (
              <div>
                {filteredFaqs.map((faq) => renderFaqItem(faq, faq.globalIndex))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try different keywords or browse our categories below.
                </p>
              </div>
            )}
          </div>
        ) : (
          // Category View
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {category.category}
                </h2>
                <div>
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    return renderFaqItem({ ...faq }, globalIndex);
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our expert consultants are here to help you with personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Support
            </a>
            <a
              href="tel:+15551234567"
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;