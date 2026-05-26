import { useEffect, useState } from "react";

type DeviceType = { 
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useDeviceType = (): DeviceType => {
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      '(min-width: 320px) and (max-width: 743px)'
    );
    const tabletQuery = window.matchMedia(
      '(min-width: 744px) and (max-width: 1279px)'
    );

    const handleChange = () => {
      setIsMobile(mobileQuery.matches);
      setIsTablet(tabletQuery.matches);
    }

    handleChange();

    mobileQuery.addEventListener('change', handleChange);
    tabletQuery.addEventListener('change', handleChange);

    return () => {
      mobileQuery.removeEventListener('change', handleChange);
      tabletQuery.removeEventListener('change', handleChange);
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
  }
}