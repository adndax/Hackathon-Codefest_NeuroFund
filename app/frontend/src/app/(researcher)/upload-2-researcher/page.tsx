"use client";
import { useState, ChangeEvent } from "react";
import { NavigationBar } from "@/components/Navbar";
import { navItemsLoggedIn, navItemsUnloggedIn } from "@data";
import { ImageIcon } from "lucide-react";
import { NextDelButton } from "@/components/Button";
import { InputText, TextArea } from "@/components/TextField";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useResearch } from "@/context/ResearchContext";

interface FormData {
  title: string;
  topic: string;
  description: string;
}

export default function UploadResearcherPage() {
  const router = useRouter();
  const { setLogin, setUser, isLoggedIn, user } = useAuth();
  const { addOngoingResearch } = useResearch();
  
  const navItems = isLoggedIn
    ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor")
    : navItemsUnloggedIn;

  const [formData, setFormData] = useState<FormData>({
    title: "",
    topic: "",
    description: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = () => {
    // Validasi form
    if (!formData.title.trim()) {
      alert("Title is required!");
      return;
    }

    // Add research to ongoing list
    addOngoingResearch({
      title: formData.title,
      topic: formData.topic,
      description: formData.description || "No description provided.",
      image: imageFile
    });

    // Reset form
    setFormData({
      title: "",
      topic: "",
      description: ""
    });
    setImageFile(null);

    // Navigate to profile
    router.push("/researcher-profile");
  };

  const handleDelete = () => {
    // Reset form
    setFormData({
      title: "",
      topic: "",
      description: ""
    });
    setImageFile(null);
    
    const userData = { name: "Adinda", role: "Researcher" };
    setUser(userData);
    setLogin(true);
    router.push("/researcher");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationBar
        navItems={navItems}
        current_item="Home"
        login={isLoggedIn}
        role={user?.role as "Researcher" | "Investor"}
      />
      
      <div className="max-w-4xl mx-auto py-40 pl-20">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 py-15">
              <div className="aspect-square w-60 h-65 border-2 border-dashed border-gray-700 bg-foreground/80 flex items-center justify-center -mx-40 relative overflow-hidden cursor-pointer hover:border-gray-500 transition-colors">
                {imageFile ? (
                  <img 
                    src={URL.createObjectURL(imageFile)} 
                    alt="Upload preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={48} className="text-gray-600" />
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            
            <div className="w-full md:w-full space-y-6 mt-5">
              <InputText 
                label="title" 
                value={formData.title} 
                onChange={handleChange}
              >
                Title*
              </InputText>
              
              <InputText 
                label="topic" 
                value={formData.topic} 
                onChange={handleChange}
              >
                Topic
              </InputText>
              
              <TextArea 
                label="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={6}
              >
                Description
              </TextArea>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-7">
            <NextDelButton onClick={handleDelete}>Delete</NextDelButton>
            <NextDelButton onClick={handleSubmit} className="bg-primary">
              Submit Research
            </NextDelButton>
          </div>
        </div>
      </div>
    </div>
  );
}