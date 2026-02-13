export default function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/90 to-[#3B82F6]/70"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Protect Your Vision With Style
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-gray-100 leading-relaxed">
          Premium frames, modern lenses, professional eye care.
        </p>
        <button
          onClick={scrollToProducts}
          className="bg-white text-[#1E3A8A] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
        >
          Browse Collection
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
