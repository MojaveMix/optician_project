import { Award, Users, DollarSign, Truck } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: 'Quality Frames',
      description: 'Premium eyewear from world-renowned brands with authentic guarantee'
    },
    {
      icon: Users,
      title: 'Professional Service',
      description: 'Expert opticians providing personalized consultation and fitting'
    },
    {
      icon: DollarSign,
      title: 'Affordable Prices',
      description: 'Competitive pricing with flexible payment options available'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick turnaround time for orders with reliable delivery service'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Experience the difference with VisionPro Optics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:-translate-y-2 border border-white/20"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6">
                  <Icon className="h-8 w-8 text-[#1E3A8A]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-blue-100">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
