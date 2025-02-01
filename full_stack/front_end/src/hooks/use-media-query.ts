import { useEffect, useState } from "react";

/**
 * Custom hook that listens for media query changes and returns whether the query matches.
 * 
 * @param query - A media query string to test against the viewport.
 * @returns {boolean} - A boolean indicating whether the media query matches the current viewport.
 */
export function useMediaQuery(query: string) {
  // State to store whether the media query matches the current viewport
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    // Create a MediaQueryList object for the given query
    const mediaQuery = window.matchMedia(query);

    // Listener function to update the `matches` state whenever the media query changes
    const listener = () => {
      setMatches(mediaQuery.matches);
    };

    // Add an event listener to listen for changes in the media query match
    mediaQuery.addEventListener("change", listener);

    // Cleanup function to remove the event listener when the component is unmounted or the query changes
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, [query]); // Re-run the effect if the query changes

  // Return whether the media query matches the current viewport size
  return matches;
}
