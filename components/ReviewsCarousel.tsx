'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    text: "I come here every week after night shifts at the hospital. The 24-hour service is genuinely a lifesaver. Deep tissue massage that actually works — my back pain has been so much better.",
    name: "Kwame A.",
    initials: "KA",
    location: "Airport Residential",
    date: "January 2026",
    color: "bg-[#758467]"
  },
  {
    text: "The outcall service is unmatched in Accra. The therapist arrived on time, set up quickly, and delivered the most relaxing Swedish massage I've ever had right in my living room.",
    name: "Ama Mensah",
    initials: "AM",
    location: "Cantonments",
    date: "February 2026",
    color: "bg-[#CC7A60]"
  },
  {
    text: "Booking via WhatsApp was so seamless. I had a severe knot in my shoulder and they sent someone over within an hour. Excellent professionalism and care.",
    name: "David Osei",
    initials: "DO",
    location: "East Legon",
    date: "March 2026",
    color: "bg-[#8D7662]"
  },
  {
    text: "The ambiance at the spa and the quality of oils they use are premium. Left feeling completely rejuvenated. Highly recommended to everyone in Accra.",
    name: "Sarah B.",
    initials: "SB",
    location: "Spintex",
    date: "March 2026",
    color: "bg-[#6E565B]"
  },
  {
    text: "A truly 5-star experience from start to finish. Finding a reliable 24/7 spa in the city was hard until I found Silver Orchid. The hot stone massage was brilliant.",
    name: "Michael K.",
    initials: "MK",
    location: "Labone",
    date: "April 2026",
    color: "bg-[#A2BAA9]"
  },
  {
    text: "My go-to place for reflexology. The therapists really know what they are doing. Very private, serene, and clean environment.",
    name: "Jessica Appiah",
    initials: "JA",
    location: "Dzorwulu",
    date: "May 2026",
    color: "bg-[#758467]"
  },
  {
    text: "I booked a couples session for our anniversary and it was perfect. The attention to detail, the complimentary tea, and the seamless outcall arrangement made our day.",
    name: "Emmanuel & Grace",
    initials: "E&G",
    location: "Osu",
    date: "May 2026",
    color: "bg-[#CC7A60]"
  },
  {
    text: "Silver Orchid is the benchmark for massage therapy in Ghana. Consistently good, every single time. My therapist was extremely attentive to my stress points.",
    name: "Richard T.",
    initials: "RT",
    location: "Tema",
    date: "June 2026",
    color: "bg-[#8D7662]"
  },
  {
    text: "Best deep tissue massage! As an athlete, I need proper muscle recovery and these guys deliver exactly what my body needs. Professional staff and great scheduling flexibility.",
    name: "Prince Ofori",
    initials: "PO",
    location: "Achimota",
    date: "June 2026",
    color: "bg-[#6E565B]"
  },
  {
    text: "Incredible outcall service. Being able to get a high-quality massage at 11 PM without leaving my house is an absolute luxury. Thank you Silver Orchid!",
    name: "Nana Yaa",
    initials: "NY",
    location: "East Legon Hills",
    date: "July 2026",
    color: "bg-[#A2BAA9]"
  },
  {
    text: "Very luxurious and peaceful sanctuary. The aromatherapy session helped cure my insomnia. I've become a regular client.",
    name: "Kofi Ansah",
    initials: "KA",
    location: "Roman Ridge",
    date: "July 2026",
    color: "bg-[#758467]"
  },
  {
    text: "Fantastic service! The booking bot was so helpful, and the actual massage was deeply relaxing. They really listen to feedback.",
    name: "Linda N.",
    initials: "LN",
    location: "Nungua",
    date: "August 2026",
    color: "bg-[#CC7A60]"
  },
  {
    text: "Outstanding customer service and the most tranquil environment. They make you forget all the noise of Accra the moment you step in.",
    name: "Yao M.",
    initials: "YM",
    location: "Teshie",
    date: "August 2026",
    color: "bg-[#8D7662]"
  },
  {
    text: "Top tier wellness center. The therapist was incredibly talented. My chronic neck pain has drastically reduced after just two sessions.",
    name: "Akua Danso",
    initials: "AD",
    location: "Dansoman",
    date: "September 2026",
    color: "bg-[#6E565B]"
  },
  {
    text: "I was looking for a late-night stress relief option and found them online. 2 AM outcall arranged within minutes. Absolute lifesavers.",
    name: "James C.",
    initials: "JC",
    location: "Airport City",
    date: "September 2026",
    color: "bg-[#A2BAA9]"
  },
  {
    text: "Beautiful aesthetics, clean towels, and highly skilled staff. The prenatal massage was exceptionally comforting during my third trimester.",
    name: "Cynthia G.",
    initials: "CG",
    location: "Ridge",
    date: "October 2026",
    color: "bg-[#758467]"
  },
  {
    text: "Value for money is undeniable. You get premium 5-star hotel treatment but with more personalized care. I recommend them highly.",
    name: "Bernard A.",
    initials: "BA",
    location: "Cantonments",
    date: "October 2026",
    color: "bg-[#CC7A60]"
  },
  {
    text: "Used their service for corporate wellness day for our team. The therapists were punctual and wonderful. Great productivity boost for the staff.",
    name: "TechHub Ghana",
    initials: "TG",
    location: "Osu",
    date: "November 2026",
    color: "bg-[#8D7662]"
  },
  {
    text: "From the WhatsApp consultation to the final stretch, everything was perfect. They use high-end oils that leave your skin feeling amazing.",
    name: "Eunice F.",
    initials: "EF",
    location: "Madina",
    date: "November 2026",
    color: "bg-[#6E565B]"
  },
  {
    text: "The combination of hot stones and Swedish massage is heavenly. Easily the best massage spa experience I've had in West Africa.",
    name: "Daniel W.",
    initials: "DW",
    location: "East Legon",
    date: "December 2026",
    color: "bg-[#A2BAA9]"
  }
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const currentReview = REVIEWS[currentIndex];

  return (
    <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 md:p-14 shadow-sm border border-[#EBE5D9] relative text-left overflow-hidden h-[450px] md:h-[400px] flex flex-col justify-between">
      <div className="text-[#E9E4D9] absolute top-2 left-2 md:top-8 md:left-8 opacity-40 md:opacity-100 transform scale-75 md:scale-100 transition-opacity">
        <svg width="60" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>
      
      <div className="relative z-10 pt-4 md:pt-0">
        <div className="flex text-[#D4AF37] mb-6">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
        
        <div className="relative h-[200px] md:h-[160px] overflow-hidden">
          <div
            className="absolute inset-0 transition-all duration-500 ease-in-out"
            style={{ opacity: 1, transform: 'translateY(0)' }}
          >
            <p className="text-lg md:text-xl text-[#3A352F] leading-relaxed mb-8 font-medium line-clamp-4">
              {currentReview.text}
            </p>
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${currentReview.color} rounded-full flex items-center justify-center font-serif text-white font-medium text-xl shadow-sm`}>
                {currentReview.initials}
              </div>
              <div>
                <h4 className="font-serif text-xl text-[#3A352F]">{currentReview.name}</h4>
                <p className="text-sm text-[#706B64] mt-0.5">{currentReview.location} · {currentReview.date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-6 mt-10 pt-8 border-t border-[#F8F5F0] relative z-20">
        <button onClick={prevReview} className="w-12 h-12 rounded-full border border-[#EBE5D9] flex items-center justify-center text-[#5A554F] hover:bg-[#F8F5F0] transition-colors bg-white shadow-sm">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          {REVIEWS.map((_, idx) => (
             <div 
               key={idx} 
               onClick={() => setCurrentIndex(idx)}
               className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'bg-[#CC7A60] w-4' : 'bg-[#EBE5D9] hover:bg-[#DEDCD2]'}`}
             ></div>
          ))}
        </div>
        <button onClick={nextReview} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#EBE5D9] flex items-center justify-center text-[#5A554F] hover:bg-[#F8F5F0] transition-colors bg-white shadow-sm">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
}
