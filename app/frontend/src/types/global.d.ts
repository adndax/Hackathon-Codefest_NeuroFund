export {};

declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: () => Promise<boolean>;
        isConnected: () => Promise<boolean>;
        createAgent: (options: {
          whitelist: string[];
          host?: string;
        }) => Promise<void>;
        getPrincipal: () => Promise<{ toText: () => string }>;
        requestBalance: () => Promise<
          { name: string; amount: number }[]
        >;
        // tambahkan lainnya jika perlu
      };
    };
  }
}
