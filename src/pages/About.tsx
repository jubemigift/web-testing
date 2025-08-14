import React from 'react';
import { Users, Award, Globe, Shield, Clock, HeartHandshake } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Countries Served', value: '150+', icon: Globe },
    { label: 'Applications Processed', value: '50,000+', icon: Users },
    { label: 'Success Rate', value: '98%', icon: Award },
    { label: 'Years of Experience', value: '15+', icon: Clock }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We employ the highest security standards to protect your personal information and documents throughout the entire process.'
    },
    {
      icon: HeartHandshake,
      title: 'Personal Service',
      description: 'Every client receives dedicated support from our expert consultants who understand the unique challenges of immigration.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Our commitment to excellence has earned us recognition as a leading visa service provider globally.'
    }
  ];

  return (
    <div className="py-12">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Global Pathway Visa</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For over 15 years, we've been helping individuals and families navigate the complex world of immigration 
              with secure, professional, and personalized visa services.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Global Pathway Visa was founded in 2010 with a simple mission: to make international immigration 
                accessible, secure, and stress-free for everyone. What started as a small consultancy has grown 
                into a trusted global platform serving clients in over 150 countries.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our founder, Maria Rodriguez, experienced the challenges of immigration firsthand when she moved 
                from Spain to the United States. The complex paperwork, confusing requirements, and lack of 
                personalized guidance inspired her to create a better solution.
              </p>
              <p className="text-lg text-gray-600">
                Today, our team of certified immigration consultants, legal experts, and technology professionals 
                work together to provide the most comprehensive and secure visa application service in the industry.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional team meeting"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              These principles guide everything we do and shape how we serve our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <value.icon className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your immigration success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Maria Rodriguez"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Maria Rodriguez</h3>
              <p className="text-blue-600 font-medium mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">15+ years in immigration law and international business development.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="David Chen"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">David Chen</h3>
              <p className="text-blue-600 font-medium mb-2">Head of Operations</p>
              <p className="text-gray-600 text-sm">Expert in process optimization and client experience management.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src="https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sarah Johnson"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
              <p className="text-blue-600 font-medium mb-2">Chief Legal Officer</p>
              <p className="text-gray-600 text-sm">Certified immigration attorney specializing in complex visa cases.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;