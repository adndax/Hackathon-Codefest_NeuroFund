// types/plug.d.ts
import type { Principal } from "@dfinity/principal";

export {};

declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: () => Promise<boolean>;
        isConnected: () => Promise<boolean>;
        createAgent: (options: { whitelist: string[]; host?: string }) => Promise<void>;
        getPrincipal: () => Promise<Principal>;
        requestBalance: () => Promise<Array<{ name: string; amount: number }>>;
        agent: any;

        // Tambahkan definisi ini:
        call: (
          canisterId: string,
          options: {
            methodName: string;
            args: any[];
          }
        ) => Promise<any>;

        principalId?: string;
      };
    };
  }
}
