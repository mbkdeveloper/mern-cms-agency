import { createContext } from "react";
import useTestimonial from "../hooks/useTestimonial";

export const TestimonialContext = createContext(null);

export const TestimonialProvider = ({ children }) => {
  const Testimonial = useTestimonial();

  return (
    <TestimonialContext.Provider value={Testimonial}>
      {children}
    </TestimonialContext.Provider>
  );
};
