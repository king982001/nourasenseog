import { useEffect } from 'react';

/**
 * Hook that alerts when you click outside of the passed ref
 * @param {React.RefObject} ref - The ref object to detect clicks outside of
 * @param {Function} callback - The callback function to invoke when clicked outside
 */
export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick; 