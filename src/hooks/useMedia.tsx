import { useState, useEffect } from 'react';

export default function useMedia(breakPoint: number) {
  // checking window object to support server side rendering.
  const [isSmaller, setIsSmaller] = useState(typeof window !== 'undefined' ? window.innerWidth <= breakPoint : false);

  useEffect(() => {
    function screenResized() {
      // To make sure that the state is only being updated when it has to be
      if (isSmaller && window.innerWidth > breakPoint) {
        setIsSmaller(false);
      } else if (!isSmaller && window.innerWidth <= breakPoint) {
        setIsSmaller(true);
      }
    }
    if (typeof window !== 'undefined') window.addEventListener('resize', screenResized);

    // to remove the event listener when this component is unmounted.
    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('resize', screenResized);
    };
  }, [isSmaller]);

  // the return value should be true or false
  return isSmaller;
}
