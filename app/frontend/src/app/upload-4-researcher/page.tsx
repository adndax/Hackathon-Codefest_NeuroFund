"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NavigationBar } from "@/components/Navbar";
import { navItemsLoggedIn } from "../../../data/data";
import { NextDelButton } from "@/components/Button";

export default function MilestonePlanningPage() {
  const router = useRouter();
  const [milestoneStep, setMilestoneStep] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = () => {
    router.push("/upload-3-researcher");
  };

  const handleDelete = () => {
    router.push("/upload-researcher");
  };

  const handleBudgetChange = (e: any) => {
    const newBudget = e.target.value;
    setBudget(newBudget);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <NavigationBar navItems={navItemsLoggedIn} current_item="Research" login={true} />

      <div className="flex max-w-7xl mx-auto py-10">
        {/* Bagian Kiri: Abstrak */}
        <div className="w-2/5 pr-10 my-60"> {/* Changed from w-100 to w-2/5 */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md h-[600px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Abstract</h2>
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus arcu nec elit sollicitudin porttitor. Etiam id quam quis tortor hendrerit rhoncus. Donec vel urna neque. Aliquam pellentesque varius felis a suscipit. Sed euismod, nisl nec ultricies lacinia, nunc nisl aliquam massa, eget lacinia nunc nisl eget nunc. Sed euismod, nisl nec ultricies lacinia, nunc nisl aliquam massa, eget lacinia nunc nisl eget nunc.
              <br /><br />
              Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur nec, cursus in felis. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur nec, cursus in felis. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur nec, cursus in felis. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur nec, cursus in felis.
              <br /><br />
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed quam tincidunt, sit amet mollis nunc aliquam. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed quam tincidunt, sit amet mollis nunc aliquam.
            </p>
          </div>
        </div>

        {/* Bagian Kanan: Form Milestone Planning */}
        <div className="w-3/5 pl-10 my-60"> {/* Changed from w-1/2 to w-3/5 */}
          <div className="space-y-6">
            {/* Milestone Step Dropdown */}
            <div>
              <label className="block text-[16px] font-inter font-medium mb-1 bg-transparent text-[#F5F8FA]">Select milestone step</label>
              <select
                value={milestoneStep}
                onChange={(e) => setMilestoneStep(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-[#A7C4EC]/80 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select milestone step</option>
                {[1, 2, 3, 4].map((step) => (
                  <option key={step} value={step}>
                    Milestone {step}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Dropdown */}
            <div>
              <label className="block text-[16px] font-inter font-medium mb-1 bg-transparent text-[#F5F8FA]">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-[#A7C4EC]/80 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select milestone date</option>
                {Array.from({ length: 6 }, (_, i) => i + 1).map((week) => (
                  <option key={week} value={week}>
                    {week} {week === 1 ? "week" : "weeks"}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Plan Input */}
            <div>
              <label className="block text-[16px] font-inter font-medium mb-1 bg-transparent text-[#F5F8FA]">Budget Plan</label>
              <input
                type="text"
                value={budget}
                onChange={handleBudgetChange}
                placeholder="Enter the budget estimate"
                className="w-full p-3 rounded-lg bg-gray-800 text-[#A7C4EC]/80 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tombol Delete dan Submit */}
            <div className="flex justify-end gap-4">
              <NextDelButton onClick={handleDelete}>Delete</NextDelButton>
              <NextDelButton onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
                Submit
              </NextDelButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}