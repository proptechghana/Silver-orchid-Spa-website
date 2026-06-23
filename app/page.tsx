'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Menu, Phone, MapPin, Clock, Star, ChevronLeft, ChevronRight, MessageCircle, ChevronDown, X } from 'lucide-react';
import Chatbot from '@/components/Chatbot';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import FadeIn from '@/components/FadeIn';

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#EBE5D9]">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
      >
        <span className="font-semibold text-lg text-[#3A352F]">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-[#3A352F] hover:text-[#CC7A60] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#5A554F] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Prevent auto scroll on load
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <main className="min-h-screen bg-[#F8F5F0] text-[#3A352F] font-sans selection:bg-[#CC7A60] selection:text-white pb-0">
      <nav className="w-full bg-[#F5F2EF] border-b-0 shadow-sm relative z-50">
        <div className="px-6 md:px-12 h-20 flex items-center justify-between font-sans relative z-50 bg-[#F5F2EF]">
          <div className="flex items-center gap-3 text-[#2C382A]">
            <span className="font-serif text-2xl font-medium tracking-wide">
              Silver Orchid
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-[#4A453F]">
            <span className="cursor-pointer hover:text-[#C97A5E] transition-colors" onClick={() => scrollToSection('services')}>Services</span>
            <span className="cursor-pointer hover:text-[#C97A5E] transition-colors" onClick={() => scrollToSection('reviews')}>Reviews</span>
            <span className="cursor-pointer hover:text-[#C97A5E] transition-colors" onClick={() => scrollToSection('faq')}>FAQ</span>
            <span className="cursor-pointer hover:text-[#C97A5E] transition-colors" onClick={() => scrollToSection('contact')}>Contact</span>
          </div>

          <button onClick={() => scrollToSection('chatbot')} className="hidden md:block bg-[#C97A5E] text-white px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-[#B3694F] transition-colors">
            Book Now
          </button>
          
          <button className="md:hidden text-[#4A453F]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-0 w-full h-[calc(100dvh-80px)] bg-[#F5F2EF] z-40 flex flex-col px-6 pb-6 md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-6 text-2xl font-serif text-[#2C382A] mt-8">
                <span className="cursor-pointer hover:text-[#C97A5E] transition-colors border-b border-[#EBE7DF] pb-4" onClick={() => scrollToSection('services')}>Services</span>
                <span className="cursor-pointer hover:text-[#C97A5E] transition-colors border-b border-[#EBE7DF] pb-4" onClick={() => scrollToSection('reviews')}>Reviews</span>
                <span className="cursor-pointer hover:text-[#C97A5E] transition-colors border-b border-[#EBE7DF] pb-4" onClick={() => scrollToSection('faq')}>FAQ</span>
                <span className="cursor-pointer hover:text-[#C97A5E] transition-colors border-b border-[#EBE7DF] pb-4" onClick={() => scrollToSection('contact')}>Contact</span>
              </div>
              
              <button className="mt-8 bg-[#C97A5E] text-white px-7 py-4 rounded-full text-lg font-semibold tracking-wide hover:bg-[#B3694F] transition-colors w-full" onClick={() => scrollToSection('chatbot')}>
                Book Now
              </button>
              
              <div className="mt-auto pt-8 border-t border-[#EBE7DF] flex gap-4 text-[#73826C] justify-center items-center">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Open 24/7 Hours</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[100svh] min-h-[700px] overflow-hidden flex flex-col justify-between -mt-20 pt-20">
         <Image 
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000"
            alt="Hot stone massage therapy"
            fill
            className="object-cover"
            priority
         />
         <div className="absolute inset-0 bg-white/20 mix-blend-overlay z-0"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2EF]/60 via-[#F5F2EF]/40 to-[#F5F2EF]/60 z-0"></div>
         
         <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 text-center mt-2 sm:mt-8">
            <FadeIn delay={0.1} duration={0.8}>
              <div className="bg-[#EBE7DF]/90 backdrop-blur-md rounded-full py-2 px-4 sm:py-2.5 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 shadow-sm border border-[#EBE7DF]/50 max-w-full">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7C8B72] shrink-0"></div>
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#4A453F] uppercase truncate">OPEN NOW — 24/7 IN ACCRA</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} duration={0.8}>
              <h1 className="font-serif text-[#C97A5E] text-[2.75rem] leading-none sm:text-5xl md:text-7xl lg:text-[6rem] mb-2 drop-shadow-sm px-2">
                Silver Orchid
              </h1>
            </FadeIn>
            <FadeIn delay={0.35} duration={0.8}>
              <h2 className="font-serif text-[#1F2C22] text-[2.5rem] leading-[1.1] sm:text-5xl md:text-7xl lg:text-[5.5rem] mb-2 drop-shadow-sm text-center px-2">
                <span className="font-serif">24Hours Massage</span><br/>
                <span className="italic font-serif block mt-1 sm:mt-2">& Spa</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.5} duration={0.7}>
              <p className="font-serif text-[#C97A5E] text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 mb-6 sm:mb-8 drop-shadow-sm">
                Accra, Ghana
              </p>
            </FadeIn>
            
            <FadeIn delay={0.6} duration={0.7}>
              <p className="text-white text-sm sm:text-lg md:text-xl font-medium max-w-lg text-center leading-relaxed drop-shadow-md px-2 sm:px-4">
                Certified therapists. Serene ambience. Your personal schedule, always honoured.
              </p>
            </FadeIn>

            <FadeIn delay={0.75} duration={0.7}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 w-full max-w-xs sm:max-w-lg mx-auto">
                <button onClick={() => scrollToSection('chatbot')} className="bg-[#C97A5E] text-white px-6 sm:px-8 py-3.5 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold hover:bg-[#B3694F] transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm tracking-wide">
                   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                   </svg>
                   Chat with Us
                </button>
                <button onClick={() => scrollToSection('services')} className="bg-[#DEDCD2] text-[#2C382A] px-6 sm:px-10 py-3.5 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold hover:bg-[#D1CFB5] transition-colors w-full sm:w-auto shadow-sm tracking-wide">
                   View Treatments
                </button>
              </div>
            </FadeIn>
         </div>

         <div className="relative z-10 flex flex-col items-center pb-6 sm:pb-8 mt-auto shrink-0 px-4">
            <FadeIn delay={1.0} duration={0.6} direction="none">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase mb-0.5">Explore</span>
              <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-white/90 mb-3 sm:mb-4 animate-bounce mx-auto" />
              
              <div className="bg-[#EBE7DF]/90 backdrop-blur-md rounded-full py-2 px-4 sm:py-2.5 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 shadow-sm border border-[#EBE7DF]/50 max-w-full">
                 <div className="flex text-[#D99A45] shrink-0">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />)}
                 </div>
                 <span className="text-[10px] sm:text-xs font-semibold text-[#4A453F] truncate">
                   4.8 · <span className="hidden sm:inline">203 </span>Reviews · #1 in Legon
                 </span>
              </div>
            </FadeIn>
         </div>

         {/* Floating WhatsApp Button */}
         <div className="fixed bottom-6 right-6 z-50">
           <button onClick={() => scrollToSection('chatbot')} className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform border-4 border-white/20">
             <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
             </svg>
           </button>
         </div>
      </section>

      {/* Treatments Section */}
      <section id="services" className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <FadeIn delay={0}>
              <h3 className="text-xs font-bold tracking-[0.2em] text-[#CC7A60] uppercase mb-4">Our Treatments</h3>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[#3A352F]">Crafted for Your<br/><span className="italic">Wellbeing</span></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[#5A554F] max-w-xl mx-auto text-lg leading-relaxed">
                Six expertly delivered treatments — from ancient Ghanaian tradition to modern therapeutic techniques. Every session customizable to your body&apos;s needs.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Relaxation",
                desc: "A gentle, flowing full-body massage designed to melt away tension and restore deep calm. Perfect for first-time guests.",
                time: "60 / 90 min",
                img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800"
              },
              {
                title: "Deep Tissue",
                desc: "Targeted pressure on chronic muscle tension and knots. Ideal for athletes and those with persistent pain.",
                time: "60 / 90 min",
                img: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=800"
              },
              {
                title: "Hot Stone",
                desc: "Smooth volcanic stones heated to the perfect temperature, gliding across the body to release deep muscular tension.",
                time: "75 min",
                img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800"
              },
              {
                title: "Traditional Ghanaian",
                desc: "Experience Ghana's ancient healing art. Organic shea butter, moringa oils and time-honoured West African techniques.",
                time: "90 min",
                img: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=800"
              },
              {
                title: "Facial",
                desc: "Revitalising facial treatments tailored to your skin type. Deep cleanse, exfoliation, and nourishing masks.",
                time: "45 / 60 min",
                img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800"
              },
              {
                title: "Pedicure",
                desc: "Luxurious foot and nail care with softening soaks, exfoliation, and a relaxing foot massage to finish.",
                time: "45 min",
                img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800"
              }
            ].map((treatment, i) => (
              <FadeIn key={i} delay={i * 0.1} duration={0.6}>
                <div className="group relative rounded-3xl overflow-hidden h-[360px] shadow-sm">
                  <Image src={treatment.img} alt={treatment.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2420]/90 via-[#2A2420]/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-left">
                    <h3 className="font-serif text-3xl mb-3">{treatment.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">
                      {treatment.desc}
                    </p>
                    <div className="bg-[#CC7A60] self-start inline-flex rounded-full px-5 py-2 text-sm font-semibold shadow-sm">
                      {treatment.time}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.2} className="mt-12 text-center">
            <button onClick={() => scrollToSection('chatbot')} className="w-full sm:w-auto bg-[#CC7A60] hover:bg-[#B86B52] text-white px-10 py-5 rounded-full text-lg font-medium shadow-md transition-all">
              Book Any Treatment
            </button>
            <p className="text-[#706B64] text-sm mt-5">All sessions customizable · Available 24 hours</p>
          </FadeIn>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-4 md:px-6 mb-10">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <FadeIn>
                <h3 className="text-xs font-bold tracking-[0.2em] text-[#CC7A60] uppercase mb-4">What Guests Say</h3>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-serif text-4xl md:text-5xl text-[#3A352F] mb-6"><span className="italic">Stories of</span> Renewal</h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex items-center justify-center gap-2 text-[#5A554F]">
                  <div className="flex text-[#D4AF37]">
                     <Star className="w-5 h-5 fill-current"/>
                     <Star className="w-5 h-5 fill-current"/>
                     <Star className="w-5 h-5 fill-current"/>
                     <Star className="w-5 h-5 fill-current"/>
                     <Star className="w-5 h-5 fill-current"/>
                  </div>
                  <span className="text-sm font-medium ml-2">4.8 average · 203 verified reviews</span>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.3}>
              <ReviewsCarousel />
            </FadeIn>
         </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 md:px-6 bg-[#F5F2EF]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <FadeIn>
              <h3 className="text-xs font-bold tracking-[0.2em] text-[#6E565B] uppercase mb-4">Good to know</h3>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2C382A]">Frequently asked.</h2>
            </FadeIn>
          </div>
          
          <div className="border-t border-[#EBE5D9]">
            <FadeIn delay={0.15}>
              <FAQItem 
                question="Are you really open 24 hours?" 
                answer="Yes, our doors are open around the clock. We understand that wellness needs don't follow a 9-to-5 schedule. Whether it's a late-arriving flight or working a night shift, our specialized therapists are available to bring you complete relaxation at any hour."
              />
            </FadeIn>
            <FadeIn delay={0.25}>
              <FAQItem 
                question="Can I book a massage at my home or hotel?" 
                answer="Yes. Our outcall service brings the same trained therapists and equipment to your location anywhere in Accra."
              />
            </FadeIn>
            <FadeIn delay={0.35}>
              <FAQItem 
                question="Can two of us book a session together?" 
                answer="Absolutely! We have a dedicated couples suite equipped for joint treatments. Simply mention it when booking your session so we can reserve the appropriate space for you and your companion."
              />
            </FadeIn>
            <FadeIn delay={0.45}>
              <FAQItem 
                question="I don't know which massage I need. Can you help?" 
                answer="Of course. Our expert therapists provide complimentary consultations before every session. We'll discuss your specific pain points, stress levels, and comfort preferences to assign the perfect customized treatment."
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Find Us / Book Section */}
      <section id="contact" className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <h3 className="text-xs font-bold tracking-[0.2em] text-[#CC7A60] uppercase mb-4">Find Us</h3>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl text-[#3A352F] mb-6">Begin Your <span className="italic">Journey</span></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[#5A554F] text-lg font-medium">We&apos;re always open — reach out any hour of the day.</p>
            </FadeIn>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Col: Contact Info & Map */}
            <FadeIn delay={0.15} direction="left">
              <div className="space-y-6">
                <div className="h-[250px] w-full rounded-3xl overflow-hidden bg-white border border-[#EBE5D9] shadow-sm relative">
                  <a 
                    href="https://www.google.com/maps/place/Silver+Orchid+24hours+Massage+and+Spa+Accra+Ghana/@5.6260891,-0.1700633,17z/data=!3m1!4b1!4m6!3m5!1s0xfdf9b191c3a8315:0x246c760dcf1ee9a8!8m2!3d5.6260891!4d-0.1700633!16s%2Fg%2F11flc3b7gk?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg text-sm font-medium shadow-md text-blue-600 z-10 flex items-center gap-2"
                  >
                    Open in Maps
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                  <div className="absolute inset-0 flex items-center justify-center bg-[#E5E3DF] text-[#706B64] font-medium z-0">
                    <div className="flex flex-col items-center">
                      <MapPin className="w-8 h-8 mb-2" />
                      Interactive Map Loading...
                    </div>
                  </div>
                  <iframe 
                    src="https://maps.google.com/maps?q=Silver%20Orchid%2024hours%20Massage%20and%20Spa%20Accra%20Ghana&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{border:0, filter: 'grayscale(0.5)'}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    className="relative z-0"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white border border-[#EBE5D9] rounded-[1.5rem] p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm text-center sm:text-left">
                    <div className="bg-[#EFEADD] p-4 rounded-full text-[#CC7A60]">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-[0.1em] text-[#706B64] uppercase mb-1">Location</h4>
                      <p className="text-[#3A352F] font-medium text-lg">Opey Street, Legon, Accra, Ghana</p>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-[#EBE5D9] rounded-[1.5rem] p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm text-center sm:text-left">
                    <div className="bg-[#EFEADD] p-4 rounded-full text-[#CC7A60]">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-[0.1em] text-[#706B64] uppercase mb-1">Phone</h4>
                      <p className="text-[#3A352F] font-medium text-lg">+233 234 534 533</p>
                    </div>
                  </div>

                  <div className="bg-white border border-[#EBE5D9] rounded-[1.5rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm cursor-pointer hover:border-[#CC7A60] transition-colors text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="bg-[#EFEADD] p-4 rounded-full text-[#CC7A60]">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold tracking-[0.1em] text-[#706B64] uppercase mb-1">WhatsApp</h4>
                        <p className="text-[#3A352F] font-medium text-lg">+233 123 456 789</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#A69F94] hidden sm:block" />
                  </div>

                  <div className="bg-white border border-[#EBE5D9] rounded-[1.5rem] p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm text-center sm:text-left">
                    <div className="bg-[#EFEADD] p-4 rounded-full text-[#CC7A60]">
                       <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-[0.1em] text-[#706B64] uppercase mb-1">Hours</h4>
                      <p className="text-[#3A352F] font-medium text-lg">Open 24 Hours • 7 Days a Week</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right Col: Chatbot */}
            <FadeIn delay={0.25} direction="right">
              <div id="chatbot" className="flex flex-col h-[600px] lg:h-auto lg:min-h-[700px]">
                 <Chatbot />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B3B25] text-[#EFEADD] pt-24 pb-8 px-6 rounded-t-[3rem] mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-left">
          <FadeIn className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
               <span className="font-serif text-3xl tracking-wide font-medium">
                 Silver Orchid
               </span>
            </div>
            <p className="text-[#A2BAA9] leading-relaxed max-w-sm mb-8 text-sm">
              Accra&apos;s premier 24-hour certified massage and spa. Delivering excellence in wellness, round the clock.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-[#2D5A3C] flex items-center justify-center hover:bg-[#2D5A3C] hover:text-white transition-colors text-[#A2BAA9]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-[#2D5A3C] flex items-center justify-center hover:bg-[#2D5A3C] hover:text-white transition-colors text-[#A2BAA9]">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
               <a href="#" className="w-12 h-12 rounded-full border border-[#2D5A3C] flex items-center justify-center hover:bg-[#2D5A3C] hover:text-white transition-colors text-[#A2BAA9]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                 </svg>
              </a>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} direction="right">
            <div>
              <h4 className="text-xs font-bold tracking-[0.1em] text-[#A2BAA9] uppercase mb-6">Navigate</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors text-[#EFEADD]">Services</button></li>
                <li><button onClick={() => scrollToSection('reviews')} className="hover:text-white transition-colors text-[#EFEADD]">Reviews</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors text-[#EFEADD]">FAQ</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors text-[#EFEADD]">Contact</button></li>
              </ul>
            </div>
          </FadeIn>
        </div>
        
        <FadeIn delay={0.3} direction="none">
          <div className="max-w-7xl mx-auto pt-8 border-t border-[#2D5A3C] text-sm text-[#A2BAA9] text-center font-medium">
            © {new Date().getFullYear()} Silver Orchid. All rights reserved.
          </div>
        </FadeIn>
      </footer>
    </main>
  );
}
