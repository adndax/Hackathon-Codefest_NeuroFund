"use client";
import { useState, ChangeEvent, useEffect } from "react";
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

interface User {
  id: string;
  name: string;
  role: 'Researcher' | 'Investor';
  email?: string;
  location?: string;
  bio?: string;
}

interface UploadedFileData {
  name: string;
  size: number;
  type: string;
  lastModified: number;
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
  const [pdfFileName, setPdfFileName] = useState<string>("");

  // Load PDF file data from sessionStorage when component mounts
  useEffect(() => {
    const uploadedFileData = sessionStorage.getItem('uploadedFile');
    if (uploadedFileData) {
      try {
        const fileData: UploadedFileData = JSON.parse(uploadedFileData);
        setPdfFileName(fileData.name);
        
        // Auto-fill title with PDF name (without extension)
        const titleFromPdf = fileData.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        setFormData(prev => ({
          ...prev,
          title: titleFromPdf
        }));
      } catch (error) {
        console.error('Error parsing uploaded file data:', error);
      }
    }
  }, []);

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
      // Create a new file with renamed based on PDF name
      const pdfNameWithoutExt = pdfFileName.replace(/\.[^/.]+$/, "");
      const imageExtension = file.name.split('.').pop();
      const newFileName = `${pdfNameWithoutExt}_cover.${imageExtension}`;
      
      // Create a new File object with the new name
      const renamedFile = new File([file], newFileName, {
        type: file.type,
        lastModified: file.lastModified,
      });
      
      setImageFile(renamedFile);
    }
  };

  const handleSubmit = () => {
    // Validasi form
    if (!formData.title.trim()) {
      alert("Title is required!");
      return;
    }

    // Add research to ongoing list (tanpa pdfFile property)
    addOngoingResearch({
      title: formData.title,
      topic: formData.topic,
      description: formData.description || "No description provided.",
      image: imageFile
    });

    // Store PDF info separately in localStorage for future reference
    const uploadedFileData = sessionStorage.getItem('uploadedFile');
    if (uploadedFileData) {
      const researchId = Date.now().toString();
      localStorage.setItem(`research_pdf_${researchId}`, uploadedFileData);
    }

    // Clear sessionStorage
    sessionStorage.removeItem('uploadedFile');
    
    // Navigate to success page
    router.push("/upload-3-researcher");
    
    // Reset form
    setFormData({
      title: "",
      topic: "",
      description: ""
    });
    setImageFile(null);
  };

  const handleDelete = () => {
    // Reset form
    setFormData({
      title: "",
      topic: "",
      description: ""
    });
    setImageFile(null);
    
    // Clear sessionStorage
    sessionStorage.removeItem('uploadedFile');
    
    const userData: User = {
      id: "1", 
      name: "Adinda", 
      role: "Researcher" as const
    };
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
        role={user?.role}
      />
      
      <div className="max-w-4xl mx-auto py-40 pl-20">
        <div className="space-y-6">
          {/* Show PDF file info */}
          {pdfFileName && (
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
              <p className="text-blue-300 text-sm">
                <strong>PDF File:</strong> {pdfFileName}
              </p>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 py-15">
              <div className="aspect-square w-60 h-65 border-2 border-dashed border-gray-700 bg-foreground/80 flex items-center justify-center -mx-40 relative overflow-hidden cursor-pointer hover:border-gray-500 transition-colors">
                {imageFile ? (
                  <div className="w-full h-full relative">
                    <img 
                      src={URL.createObjectURL(imageFile)} 
                      alt="Upload preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 truncate">
                      {imageFile.name}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon size={48} className="text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Cover Image</p>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              
              {imageFile && (
                <p className="text-green-400 text-sm mt-2 text-center">
                  Image will be saved as: <br />
                  <span className="font-mono">{imageFile.name}</span>
                </p>
              )}
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