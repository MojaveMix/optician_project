import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProductGrid />
      <About />
      <WhyChooseUs />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
