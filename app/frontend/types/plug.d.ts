// types/plug.d.ts
export {};

declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: () => Promise<boolean>;
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
