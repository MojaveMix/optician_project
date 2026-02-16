import { Gem, UserCheck, DollarSign, Truck } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Gem,
      title: 'Premium Quality Frames',
      description: 'Handpicked collection of premium eyewear from world-renowned brands. Every frame meets strict quality standards.',
      color: 'bg-blue-500',
    },
    {
      icon: UserCheck,
      title: 'Certified Eye Specialists',
      description: 'Our licensed optometrists provide expert consultations and precise prescriptions for optimal vision.',
      color: 'bg-green-500',
    },
    {
      icon: DollarSign,
      title: 'Affordable Luxury',
      description: 'Premium eyewear at competitive prices. Quality vision care accessible to everyone.',
      color: 'bg-amber-500',
    },
    {
      icon: Truck,
      title: 'Fast & Secure Delivery',
      description: 'Safe packaging and prompt delivery across Morocco. Your eyewear arrives in perfect condition.',
      color: 'bg-red-500',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose OptiVision?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of medical expertise, premium quality, and exceptional service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`${reason.color} w-16 h-16 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Upgrade Your Vision?</h3>
          <p className="text-xl mb-8 text-gray-100">
            Join thousands of satisfied customers who trust OptiVision for their eye care needs.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('products');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-[#1E3A8A] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Explore Our Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
