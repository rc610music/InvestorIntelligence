import { useState, useEffect } from "react";

export function useOnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowTour, setShouldShowTour] = useState(false);

  useEffect(() => {
    // Check if user has completed the tour
    const hasCompletedTour = localStorage.getItem('stocksense-tour-completed');
    const hasSeenTour = localStorage.getItem('stocksense-tour-seen');
    
    // Show tour if user hasn't completed it and hasn't seen it in this session
    if (!hasCompletedTour && !hasSeenTour) {
      setShouldShowTour(true);
      // Add a small delay to let the app load
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('stocksense-tour-seen', 'true');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const startTour = () => {
    setIsOpen(true);
    localStorage.setItem('stocksense-tour-seen', 'true');
  };

  const closeTour = () => {
    setIsOpen(false);
  };

  const resetTour = () => {
    localStorage.removeItem('stocksense-tour-completed');
    localStorage.removeItem('stocksense-tour-seen');
    localStorage.removeItem('stocksense-tour-category');
    setIsOpen(true);
  };

  return {
    isOpen,
    shouldShowTour,
    startTour,
    closeTour,
    resetTour
  };
}