"use client";

import { useState, useEffect } from "react";
import { NavigationBar } from "@/components/Navbar";
import { navItemsLoggedIn, navItemsUnloggedIn } from "@data";
import { ImageIcon } from "lucide-react";
import { NextDelButton } from "@/components/Button";
import { InputText, TextArea } from "@/components/TextField";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function UploadResearcherPage2() {
  const router = useRouter();
  const { isLoggedIn, user, uploadData, setUploadData } = useAuth();
  
  const navItems = isLoggedIn 
    ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor") 
    : navItemsUnloggedIn;

  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    description: ""
  });

  // Redirect jika tidak ada file yang diupload
  useEffect(() => {
    if (!uploadData?.file) {
      router.push("/upload-researcher");
    }
  }, [uploadData, router]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (formData.title && formData.topic && formData.description) {
      // Update upload data dengan form data
      const updatedData = {
        ...uploadData,
        ...formData
      };
      
      // Set upload data dan tunggu sebentar untuk memastikan state terupdate
      setUploadData(updatedData);
      
      // Gunakan setTimeout untuk memastikan state sudah terupdate sebelum navigate
      setTimeout(() => {
        router.push("/upload-3-researcher");
      }, 100);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDelete = () => {
    // Clear upload data dan kembali ke halaman utama
    setUploadData(null);
    router.push("/researcher");
  };

  if (!uploadData?.file) {
    return <div>Loading...</div>; // Atau redirect loading
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationBar 
          navItems={navItems} 
          current_item="Edit" 
          login={isLoggedIn}
          role={user?.role as "Researcher" | "Investor"}
      />
      <div className="max-w-4xl mx-auto py-40 pl-20">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 py-15">
              <div className="aspect-square w-60 h-65 border-2 border-dashed border-gray-700 bg-foreground/80 flex items-center justify-center -mx-40">
                <div className="text-center">
                  <ImageIcon size={48} className="text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 max-w-48 truncate">
                    {uploadData.file.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-full space-y-6 mt-5">
              <InputText 
                label="title" 
                name="title"
                value={formData.title} 
                onChange={handleChange}
                placeholder="Enter your research title"
              >
                Title*
              </InputText>
              <InputText 
                label="topic" 
                name="topic"
                value={formData.topic} 
                onChange={handleChange}
                placeholder="e.g., Machine Learning, Biotechnology, AI"
              >
                Topic*
              </InputText>
              <TextArea 
                label="description" 
                name="description"
                value={formData.description} 
                onChange={handleChange} 
                rows={6}
                placeholder="Provide a detailed description of your research, methodology, and findings"
              >
                Description*
              </TextArea>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-7">
            <NextDelButton onClick={handleDelete}>Delete</NextDelButton>
            <NextDelButton 
              onClick={handleSubmit} 
              className="bg-primary"
              disabled={!formData.title || !formData.topic || !formData.description}
            >
              Next
            </NextDelButton>
          </div>
        </div>
      </div>
    </div>
  );
}