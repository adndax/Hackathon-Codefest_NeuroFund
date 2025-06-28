"use client";

import { NavigationBar } from "@/components/Navbar";
import { navItemsLoggedIn, navItemsUnloggedIn, researchList } from "@data";
import { Header } from "@/components/Typography";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Modal from "../modal";
import { useAuth } from "@/context/AuthContext";

export default function ResearchDetailPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [principalId, setPrincipalId] = useState<string | null>(null);

  // Auth check
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (user?.role !== "Investor") {
      router.push(user?.role === "Researcher" ? "/researcher-research" : "/");
    }
  }, [isLoggedIn, user, router]);

  // Wallet integration - Plug
  const connectWallet = async () => {
    try {
      if (!window.ic?.plug) return;
      const connected = await window.ic.plug.requestConnect();
      if (connected) {
        await window.ic.plug.createAgent({
          whitelist: ["rrkah-fqaaa-aaaaa-aaaaq-cai"], // contoh canister
        });
        const principal = await window.ic.plug.getPrincipal();
        const balance = await window.ic.plug.requestBalance();
        setPrincipalId(principal.toText());
        const icp = balance.find((b) => b.name === "ICP");
        setWalletBalance(icp?.amount || 0);
      }
    } catch (err) {
      console.error("Wallet connect error", err);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  const handleFundClick = () => {
    setIsFundingModalOpen(true);
  };

  const handleConfirmFunding = () => {
    if (isChecked) {
      setIsFundingModalOpen(false);
      setIsSuccessModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsFundingModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  const navItems = isLoggedIn
    ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor")
    : navItemsUnloggedIn;

  const research = researchList.find((item) => item.id === parseInt(id as string));

  if (!isLoggedIn || user?.role !== "Investor") return <div>Loading...</div>;
  if (!research) return <div>Research not found</div>;

  return (
    <div className="min-h-screen text-white">
      <NavigationBar
        navItems={navItems}
        current_item="Research"
        login={isLoggedIn}
        role={user?.role as "Investor"}
      />

      <div className="max-w-6xl mx-auto py-10 px-5">
        <Header className="text-4xl font-bold mb-8 pt-20 text-left">{research.title}</Header>
        <hr className="border-gray-600 mb-6" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#E6C798] rounded-full"></div>
            <div>
              <div className="text-white font-medium text-lg">{research.author}</div>
              <div className="text-gray-400 text-sm">{research.date}</div>
            </div>
          </div>

          <button
            onClick={handleFundClick}
            className="px-8 py-3 bg-[#A7C4EC] text-[#0A1526] rounded-full hover:bg-[#95B8E0] transition font-medium text-lg"
          >
            Fund this research
          </button>
        </div>

        <div className="bg-white text-black rounded-lg p-10 min-h-[600px]">
          <h2 className="text-2xl font-bold mb-8 text-center">Abstract</h2>
          <p className="text-gray-700 leading-relaxed text-justify">{research.description}</p>
        </div>
      </div>

      {/* Modal Pendanaan */}
      <Modal isOpen={isFundingModalOpen} onClose={handleCloseModal} title="Confirm Your Funding">
        <div className="space-y-4">
          <h3 className="font-semibold">Funding Details:</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>📊 Project: {research.title}</p>
            <p>💰 Tokens: 500 ICP</p>
            <p>📅 Milestones: M1, M2</p>
            <p>⏳ Duration: 3 Months</p>
            <p>📅 Starts: 10 May 2025</p>
          </div>
          <h3 className="font-semibold">Connected Wallet:</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>👤 Principal ID: {principalId || "Not connected"}</p>
            <p>💼 Wallet Balance: {walletBalance !== null ? `${walletBalance} ICP` : "..."}</p>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreement"
              className="mr-2"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="agreement">I agree to the funding terms</label>
          </div>
          <button
            onClick={handleConfirmFunding}
            className={`w-full py-2 rounded-lg transition ${
              isChecked ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isChecked}
          >
            Sign & Submit
          </button>
        </div>
      </Modal>

      {/* Modal Sukses */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#225491] text-white p-8 rounded-2xl max-w-md mx-4 text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-[#5CED73] p-4 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold">Funding submitted!</h2>
          </div>
        </div>
      )}
    </div>
  );
}
