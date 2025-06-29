export {};

declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: (options?: { // Make it optional, as sometimes no args are needed
          whitelist?: string[]; // Define whitelist as an optional property within an object
          host?: string; // Add other common options for completeness
          onConnectionUpdate?: () => void;
          timeout?: number;
        }) => Promise<boolean>;
        isConnected: () => Promise<boolean>;
        createAgent: (options: { whitelist: string[]; host?: string }) => Promise<void>;
        getPrincipal: () => Promise<{ toText: () => string }>;
        principalId?: string;
        requestBalance: () => Promise<{ name: string; amount: number }[]>;
        call: (
          canisterId: string,
          options: { methodName: string; args: any[] }
        ) => Promise<any>;
      };
    };
  }
}