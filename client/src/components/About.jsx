import { Award, Users, Eye, Shield } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Award,
      title: '12+ Years Experience',
      description: 'Over a decade of trusted optical expertise serving thousands of satisfied customers.',
    },
    {
      icon: Users,
      title: 'Certified Opticians',
      description: 'Our team of licensed professionals provides expert eye care consultations.',
    },
    {
      icon: Eye,
      title: 'Advanced Technology',
      description: 'State-of-the-art lens technology and precision eye testing equipment.',
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '100% authentic products with comprehensive warranty and quality assurance.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About OptiVision Premium</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for premium eyewear and professional eye care services.
            We combine medical precision with modern style to protect your vision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-[#1E3A8A] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Professional Eye Care Services
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At OptiVision Premium, we offer comprehensive eye examinations using the latest
                diagnostic technology. Our certified optometrists provide personalized consultations
                to ensure you receive the perfect prescription and eyewear solution.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#3B82F6] rounded-full mr-3"></div>
                  Comprehensive eye examinations
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#3B82F6] rounded-full mr-3"></div>
                  Contact lens fitting and consultation
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#3B82F6] rounded-full mr-3"></div>
                  Blue light protection lenses
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#3B82F6] rounded-full mr-3"></div>
                  Progressive and bifocal solutions
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5752287/pexels-photo-5752287.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Eye examination"
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
