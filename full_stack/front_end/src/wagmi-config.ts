// Import necessary functions and configurations from `connectkit` and `wagmi`
// `connectkit` is used to manage wallet connection, while `wagmi` handles Ethereum-related operations
import { getDefaultConfig } from "connectkit"; // Get the default configuration for WalletConnect
import { createConfig, http } from "wagmi"; // `createConfig` for creating wagmi config and `http` for API transport
import { mainnet, sepolia } from "wagmi/chains"; // Import network chains: mainnet and sepolia for different environments

// Create the wagmi config, which sets up Ethereum networks and wallet connection settings
export const config = createConfig(
  getDefaultConfig({
    // Specify the supported blockchain networks (here we're using Ethereum mainnet and Sepolia testnet)
    chains: [mainnet, sepolia],

    // Define custom transport (how to communicate with the blockchain) for each chain
    transports: {
      [mainnet.id]: http(), // Mainnet uses HTTP transport for communication
      [sepolia.id]: http(), // Sepolia testnet also uses HTTP transport
    },

    // Provide required API keys (these are used for WalletConnect service to establish connections)
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // WalletConnect project ID from environment variables

    // Set the application name for this configuration
    appName: "easy-start", // The name of the app as it will appear in WalletConnect and related services
  })
);

// Now, let's break this down into interactive steps for a clearer understanding:

/**
 * 1. **`chains`**:
 *    - We're defining two blockchain networks here: Ethereum Mainnet and Sepolia (a test network). 
 *    - **Mainnet** is the primary Ethereum network where real transactions occur.
 *    - **Sepolia** is a test network where developers can test contracts without using real ETH.
 *  
 *    Why two chains? 
 *    - Mainnet for live interactions with the blockchain.
 *    - Sepolia for safe, cost-free testing before deploying to the real world.

 * 2. **`transports`**:
 *    - This part defines the method by which we interact with the blockchain. In this case, we're using `http()` for both networks.
 *    - `http()` means all blockchain interactions will be via HTTP requests, a simple and widely-supported method.
 *    - Transport methods can also include WebSockets or other protocols, depending on the use case.
 *
 *    Why HTTP transport?
 *    - It's often the simplest and most reliable method for interacting with blockchain nodes.

 * 3. **`walletConnectProjectId`**:
 *    - This is a unique API key for WalletConnect. It allows our app to interact with different wallet providers (e.g., MetaMask, Trust Wallet) for signing transactions.
 *    - The ID is stored in environment variables to keep sensitive data secure.
 *  
 *    Why is this required?
 *    - WalletConnect Project ID connects our app to the WalletConnect infrastructure, which enables users to connect their wallets securely.
 *  
 * 4. **`appName`**:
 *    - This sets the name of the app that will appear when a user connects their wallet via WalletConnect.
 *    - It's a great way for users to know which app is requesting access to their wallets.
 *
 *    Why is this helpful?
 *    - It ensures that users are aware of which application is requesting their wallet connection, improving trust and security.
 */

