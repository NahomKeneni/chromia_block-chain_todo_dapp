import { PropsWithChildren, useCallback } from "react";

import type { createWeb3ProviderEvmKeyStore } from "@chromia/ft4";
import { FtProvider as FtProviderChromia } from "@chromia/react";
import { useAccount } from "wagmi";

import { useEthereumProvider } from "@/hooks/use-ethereum-provider";
import { generateClientConfig } from "@/utils/generate-client-config";

const config = generateClientConfig();

export function FtProvider({ children }: PropsWithChildren) {
  const ethProvider = useEthereumProvider();
  const getEthereumProvider = useCallback(() => {
    return ethProvider;
  }, [ethProvider]);

  return (
    <FtProviderChromia
      useEthereumProvider={
        getEthereumProvider as () => Promise<
          Parameters<typeof createWeb3ProviderEvmKeyStore>[0]
        >
      }
      useAccount={useAccount}
      defaultClientConfig={config}
    >
      {children}
    </FtProviderChromia>
  );
}
