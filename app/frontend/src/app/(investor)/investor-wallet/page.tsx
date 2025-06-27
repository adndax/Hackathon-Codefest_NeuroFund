"use client";
import { NavigationBar } from "@/components/Navbar";
import { navItemsUnloggedIn, navItemsLoggedIn } from "../../../../data/data";
import { Header, Paragraph } from "@/components/Typography";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Transaction {
  id: number;
  type: "deposit" | "withdraw" | "investment" | "return";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "deposit",
    amount: 45.5,
    description: "Deposit via Bank Transfer",
    date: "2025-06-25",
    status: "completed"
  },
  {
    id: 2,
    type: "investment",
    amount: -18.2,
    description: "Investment in Edge Computing Research",
    date: "2025-06-24",
    status: "completed"
  },
  {
    id: 3,
    type: "return",
    amount: 4.8,
    description: "Return from NLP Research Project",
    date: "2025-06-23",
    status: "completed"
  },
  {
    id: 4,
    type: "withdraw",
    amount: -9.1,
    description: "Withdrawal to Bank Account",
    date: "2025-06-22",
    status: "pending"
  }
];

export default function WalletPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const navItems = isLoggedIn
    ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor")
    : navItemsUnloggedIn;

  const [balance, setBalance] = useState(68.3);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [activeTab, setActiveTab] = useState<"all" | "deposit" | "withdraw" | "investment">("all");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === "all") return true;
    return transaction.type === activeTab;
  });

  const formatICP = (amount: number) => {
    const absAmount = Math.abs(amount);
    return `${absAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    })} ICP`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return "↓";
      case "withdraw":
        return "↑";
      case "investment":
        return "💰";
      case "return":
        return "📈";
      default:
        return "💳";
    }
  };

  const getTransactionColor = (type: string, amount: number) => {
    if (type === "deposit" || type === "return") return "text-green-400";
    if (type === "withdraw" || type === "investment") return "text-red-400";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <NavigationBar
        navItems={navItems}
        current_item="Wallet"
        login={isLoggedIn}
        role={user?.role as "Researcher" | "Investor"}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Bagian Atas */}
        <Header className="pb-20 pt-30">My Wallet</Header>
        
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-[#225491] to-[#2563eb] rounded-xl p-8 mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm mb-2">Total Balance</p>
              <h2 className="text-4xl font-bold text-white mb-4">
                {formatICP(balance)}
              </h2>
              <div className="flex space-x-4">
                <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm">
                  <span className="text-white font-medium">Top Up</span>
                </button>
                <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm">
                  <span className="text-white font-medium">Withdraw</span>
                </button>
              </div>
            </div>
            <div className="text-6xl opacity-20">
              ∞
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Invested</p>
                <p className="text-2xl font-bold text-white">113.6 ICP</p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Returns</p>
                <p className="text-2xl font-bold text-green-400">16.35 ICP</p>
              </div>
              <div className="text-2xl">📈</div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Investments</p>
                <p className="text-2xl font-bold text-white">5</p>
              </div>
              <div className="text-2xl">🎯</div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Transaction History</h3>
            
            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
              {[
                { key: "all", label: "All" },
                { key: "deposit", label: "Deposits" },
                { key: "withdraw", label: "Withdrawals" },
                { key: "investment", label: "Investments" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? "bg-[#225491] text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Transaction List */}
          <div className="divide-y divide-gray-700">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-6 hover:bg-gray-750 transition-all duration-200 border-l-4 border-transparent hover:border-blue-400"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <p className="text-gray-400 text-sm">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getTransactionColor(transaction.type, transaction.amount)}`}>
                        {transaction.amount > 0 ? "+" : ""}{formatICP(transaction.amount)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.status === "completed"
                              ? "bg-green-900 text-green-300"
                              : transaction.status === "pending"
                              ? "bg-yellow-900 text-yellow-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="text-gray-400 text-lg mb-2">No transactions found</div>
                <div className="text-gray-500 text-sm">Try adjusting your filter</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}