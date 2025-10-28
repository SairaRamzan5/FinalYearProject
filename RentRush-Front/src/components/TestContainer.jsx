import { useState, useEffect } from "react";
import Testimonial from "./Testominial";
function TestContainer() {
  const reviews = [
    {
      name: "Fatima",
      city: "Islamabad",
      desc: "RentRush made my car rental experience so easy! The online booking was seamless, and I loved the flexibility in pick-up locations. Highly recommended!",
    },
    {
      name: "Saif",
      city: "Lahore",
      desc: "Fantastic service! I loved the variety of cars available and the quick booking process. RentRush is my go-to for rentals!",
    },
    {
      name: "Abdullah",
      city: "Karachi",
      desc: "I couldn't be happier with my experience at RentRush. The team was friendly, and I found the perfect car at an unbeatable price!",
    },
    {
      name: "Sara",
      city: "Quetta",
      desc: "The rental experience was excellent, the car was in perfect condition, and the process was quick and easy.",
    },
    {
      name: "Hassan",
      city: "Peshawar",
      desc: "Great service, affordable prices, and the booking was smooth! I'll definitely use RentRush again.",
    },
    {
      name: "Ayesha",
      city: "Multan",
      desc: "RentRush saved my day! I needed a car urgently, and the service was fast and reliable. Highly recommend!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialsPerPage, setTestimonialsPerPage] = useState(
    window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setTestimonialsPerPage(
        window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex + testimonialsPerPage < reviews.length && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(currentIndex + testimonialsPerPage);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - testimonialsPerPage >= 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(currentIndex - testimonialsPerPage);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const goToPage = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index * testimonialsPerPage);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        What Our Customers Say
      </h2>
      
      <div className="relative">
        <div 
          className={`flex transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
        >
          {reviews
            .slice(currentIndex, currentIndex + testimonialsPerPage)
            .map((card, index) => (
              <div 
                key={`${currentIndex}-${index}`} 
                className={`w-full px-4 ${testimonialsPerPage === 1 ? "md:w-full" : testimonialsPerPage === 2 ? "md:w-1/2" : "md:w-1/3"}`}
              >
                <Testimonial 
                  name={card.name} 
                  city={card.city} 
                  desc={card.desc} 
                />
              </div>
            ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0 || isTransitioning}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          aria-label="Previous testimonials"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex + testimonialsPerPage >= reviews.length || isTransitioning}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors ${currentIndex + testimonialsPerPage >= reviews.length ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          aria-label="Next testimonials"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          {Array.from({
            length: Math.ceil(reviews.length / testimonialsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-3 w-3 rounded-full transition-all ${currentIndex === index * testimonialsPerPage ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to testimonial set ${index + 1}`}
              aria-current={currentIndex === index * testimonialsPerPage ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestContainer;
