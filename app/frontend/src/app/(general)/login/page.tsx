'use client';

import { Header, Paragraph } from '@/components/Typography';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const canisterId = "ulvla-h7777-77774-qaacq-cai"; // Ganti sesuai canistermu

export default function LoginPage() {
  const router = useRouter();
  const { setLogin, setUser, setPlugWalletData } = useAuth();

  const { isConnected, address } = useAccount();
  const [selectedRole, setSelectedRole] = useState<'Investor' | 'Researcher' | null>(null);

  // Fungsi connect Plug Wallet
  const connectPlugWallet = async () => {
    if (!window.ic?.plug) {
      alert("Please install Plug Wallet extension");
      return;
    }
    try {
      const connected = await window.ic.plug.requestConnect();
      if (!connected) {
        alert("Failed to connect Plug Wallet");
        return;
      }
      await window.ic.plug.createAgent({ whitelist: [canisterId] });
      const principal = await window.ic.plug.getPrincipal();
      setPlugWalletData(window.ic.plug, principal.toText());
      alert("Plug Wallet connected: " + principal.toText());
    } catch (error) {
      console.error("Plug Wallet connect error:", error);
      alert("Error connecting Plug Wallet");
    }
  };

  // Login dengan wagmi + rainbowkit wallet
  useEffect(() => {
    if (isConnected && address && selectedRole) {
      const user = {
        name: address,
        role: selectedRole,
      };
      setUser(user);
      setLogin(true);
      router.push(`/${selectedRole.toLowerCase()}`); // ke /investor atau /researcher
    }
  }, [isConnected, address, selectedRole]);

  return (
    <div className="flex min-h-screen bg-[#1a2a44] text-white font-sans gap-6">
      {/* Kolom kiri */}
      <div className="flex flex-1 flex-col items-center justify-center py-10 px-5">
        <div className="w-80 h-80 flex items-center justify-center text-white">
          <img src="/asset-3d-3.png" alt="NeuroFund Logo" className="w-full h-full object-contain" />
        </div>
        <Paragraph className="text-base leading-relaxed text-center max-w-md text-[#A7C4EC]">
          NeuroFund connects researchers with collective funding through a transparent voting-based platform. Join a community that believes the best innovations deserve collective support!
        </Paragraph>
      </div>

      {/* Kolom kanan */}
      <div className="flex flex-1 flex-col items-center justify-center py-10 px-5">
        <Header className="mb-5 p-5">Login to NeuroFund</Header>

        <div className="bg-[#e8eef6] rounded-2xl p-10 w-full max-w-md text-gray-800">
          <Paragraph className="text-left mb-3 pb-2">
            Select your role:
          </Paragraph>

          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-xl ${selectedRole === 'Investor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedRole('Investor')}
            >
              Investor
            </button>
            <button
              className={`px-4 py-2 rounded-xl ${selectedRole === 'Researcher' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedRole('Researcher')}
            >
              Researcher
            </button>
          </div>

          <Paragraph className="text-left mb-3 pb-2">
            Then connect your wallet (MetaMask / Rainbow):
          </Paragraph>

          <div className="flex justify-center mb-6">
            <ConnectButton chainStatus="icon" showBalance={false} />
          </div>

          {/* Tombol Connect Plug Wallet */}
          <button
            onClick={connectPlugWallet}
            className="mb-6 w-full py-3 rounded-xl bg-[#6e7ff4] text-white hover:bg-[#5869d6]"
          >
            Connect Plug Wallet (ICP)
          </button>

          <p className="text-center text-sm text-gray-800">
            Do not have an account?{' '}
            <a href="/sign-up" className="text-[#4a6fa5] underline font-bold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}