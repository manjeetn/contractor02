import React from 'react';
import Hero from '../components/Hero.jsx';
import Services from '../components/Services.jsx';
import Portfolio from '../components/Portfolio.jsx';
import Testimonials from '../components/Testimonials.jsx';
import ContactForm from '../components/ContactForm.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import QuoteForm from '../components/QuoteForm.jsx';



const Home = () => {
  return (
      <div className="font-sans">
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <ContactForm />
      <QuoteForm />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
