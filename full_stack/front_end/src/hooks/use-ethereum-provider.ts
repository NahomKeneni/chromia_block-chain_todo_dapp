import { useMemo } from "react";

// Import necessary hooks from Wagmi for handling Ethereum account and connectors
import { useAccount, useConnectors } from "wagmi";

/**
 * Custom hook that returns the Ethereum provider based on the active connector.
 * @returns {Provider | undefined} The Ethereum provider associated with the active connector.
 */
export const useEthereumProvider = () => {
  // Use Wagmi's `useAccount` hook to get the current account and active connector
  const { connector } = useAccount();

  // Use Wagmi's `useConnectors` hook to get the list of all available connectors
  const allConnectors = useConnectors();

  // Find the connector that matches the current active connector by its `id`
  const matchingConnector = allConnectors.find((c) => c.id === connector?.id);

  // Memoize the provider for performance optimization (only re-calculates when the `matchingConnector` changes)
  return useMemo(() => {
    // Return the Ethereum provider associated with the matched connector, or undefined if no match
    return matchingConnector?.getProvider();
  }, [matchingConnector]);
};
