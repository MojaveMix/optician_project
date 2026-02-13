import { Award, Eye, Clock, Shield } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1E3A8A] mb-6">
              About VisionPro Optics
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              With over 15 years of experience in optical care, VisionPro Optics has been serving the community with premium eyewear and professional eye care services. We pride ourselves on offering the finest selection of frames and lenses from world-renowned brands.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our team of certified opticians is dedicated to helping you find the perfect eyewear that combines style, comfort, and optimal vision correction. We offer comprehensive eye examinations and personalized fitting services to ensure your complete satisfaction.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-[#3B82F6] rounded-lg p-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E3A8A] mb-1">15+ Years</h3>
                  <p className="text-sm text-gray-600">Of Excellence</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#3B82F6] rounded-lg p-3">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E3A8A] mb-1">Free Eye Test</h3>
                  <p className="text-sm text-gray-600">Professional Service</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#3B82F6] rounded-lg p-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E3A8A] mb-1">100% Authentic</h3>
                  <p className="text-sm text-gray-600">Guaranteed Quality</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-[#3B82F6] rounded-lg p-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E3A8A] mb-1">1 Year Warranty</h3>
                  <p className="text-sm text-gray-600">On All Products</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Optician store interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
