import { useCallback, useState } from "react";

// Import Chromia FT4 functionality for account management and authentication
import {
  AuthFlag,
  createSingleSigAuthDescriptorRegistration,
  registerAccount,
  registrationStrategy,
} from "@chromia/ft4";
// Import Chromia React hooks and utilities
import {
  createChromiaHooks,
  useEvmKeyStore,
  useFtAccounts,
  usePostchainClient,
} from "@chromia/react";
import { IClient } from "postchain-client";
import { useAccount } from "wagmi";

// Import the public client configuration
import { publicClientConfig as clientConfig } from "@/utils/generate-client-config";

// Initialize Chromia hooks with default blockchain configuration
const { useChromiaQuery, useChromiaImmutableQuery } = createChromiaHooks({
  defaultClientConfig: {
    blockchainRid: process.env.NEXT_PUBLIC_BRID,
    directoryNodeUrlPool: process.env.NEXT_PUBLIC_NODE_URL,
  },
});

export { useChromiaImmutableQuery, useChromiaQuery };

/**
 * Custom hook for managing Chromia account creation and checking account status.
 * @param onAccountCreated - Optional callback to trigger after account creation.
 * @returns Object containing account management functions and current account status.
 */
export const useChromiaAccount = ({
  onAccountCreated,
}: {
  onAccountCreated?: () => void;
} = {}) => {
  const [isLoading, setIsLoading] = useState(false); // Tracks if account creation is in progress
  const [tried, setTried] = useState(false); // Tracks if account creation has been attempted

  const { address: ethAddress } = useAccount(); // Retrieve the Ethereum address using wagmi hook
  const { data: client } = usePostchainClient({ config: clientConfig }); // Initialize Postchain client
  const { data: keyStore } = useEvmKeyStore(); // Get the Ethereum key store for authentication
  const { mutate, data: ftAccounts } = useFtAccounts({ clientConfig }); // Manage FT4 accounts

  /**
   * Creates a new Chromia account with transfer capabilities.
   * Registers the account on the blockchain after authentication.
   */
  const createAccount = useCallback(async () => {
    try {
      setIsLoading(true); // Set loading state to true during the account creation process

      // Ensure necessary data (Ethereum address, key store, client) is available before proceeding
      if (!ethAddress || !keyStore || !client) return;

      // Create the authentication descriptor for account and transfer permissions
      const authDescriptor = createSingleSigAuthDescriptorRegistration(
        [AuthFlag.Account, AuthFlag.Transfer, "0"],
        keyStore.id
      );

      // Register the account with the Chromia blockchain
      await registerAccount(
        client as IClient,
        keyStore,
        registrationStrategy.open(authDescriptor) // Open the registration strategy with the auth descriptor
      );

      // Refresh the list of FT4 accounts after registration
      await mutate();

      // Execute the optional callback if provided
      onAccountCreated?.();
    } catch (error) {
      console.error(error); // Log any error that occurs during account creation
    } finally {
      setIsLoading(false); // Set loading state to false when done
      setTried(true); // Mark that account creation was attempted
    }
  }, [client, ethAddress, keyStore, mutate, onAccountCreated]);

  // Return an interface with account management functions and status
  return {
    createAccount,     // Function to create a new account
    isLoading,         // Indicates if the account creation process is in progress
    tried,             // Indicates if the user has tried creating an account
    account: ftAccounts?.[0], // The first account in the list (if available)
    hasAccount: !!ftAccounts?.length, // Boolean indicating whether the user has an account
  };
};
