// lib/actor.ts
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../declarations/neurofund_backend';

const agent = new HttpAgent({
  host: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:4943' 
    : 'https://ic0.app'
});

// Untuk development
if (process.env.NODE_ENV === 'development') {
  agent.fetchRootKey();
}

export const neurofundBackend = Actor.createActor(idlFactory, {
  agent,
  canisterId: process.env.NEXT_PUBLIC_NEUROFUND_BACKEND_CANISTER_ID!,
});