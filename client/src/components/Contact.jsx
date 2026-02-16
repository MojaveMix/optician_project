import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1E3A8A] mb-4">
            Visit Our Store
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Come see our collection in person and get expert advice
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#1E3A8A] mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#3B82F6] rounded-lg p-3">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Address
                    </h4>
                    <p className="text-gray-600">123 Boulevard Mohammed V</p>
                    <p className="text-gray-600">Casablanca, Morocco</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#3B82F6] rounded-lg p-3">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">+212 600 000 000</p>
                    <p className="text-sm text-gray-500">WhatsApp available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#3B82F6] rounded-lg p-3">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">info@visionpro.ma</p>
                    <p className="text-gray-600">support@visionpro.ma</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#3B82F6] rounded-lg p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Opening Hours
                    </h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 7:00 PM
                    </p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
              <h4 className="font-bold text-green-900 mb-2">
                Order via WhatsApp
              </h4>
              <p className="text-green-800 mb-4">
                Browse our products and order directly through WhatsApp for
                quick and easy service!
              </p>
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hello! I'd like to learn more about your products.",
                  );
                  window.open(
                    `https://wa.me/212645134395?text=${message}`,
                    "_blank",
                  );
                }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors w-full"
              >
                Chat on WhatsApp
              </button>
            </div>
          </div>

          <div className="h-[600px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.7376872787456!2d-7.6204873!3d33.5731104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2812f7c7d0d%3A0x2c0c1b6f1f6b1f6f!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="VisionPro Optics Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
