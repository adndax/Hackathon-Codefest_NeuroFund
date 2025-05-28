"use client";

import { NavigationBar } from "@/components/Navbar";
import { navItemsLoggedIn } from "../../../data/data";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { NextDelButton } from "@/components/Button";
import { InputText, TextArea } from "@/components/TextField";

export default function UploadResearcherPage() {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    description: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add submission logic here
  };

  const handleDelete = () => {
    console.log("Delete requested");
    // Add deletion logic here
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationBar navItems={navItemsLoggedIn} current_item="Edit" login={true}/>
      
      <div className="max-w-4xl mx-auto py-40 pl-20">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 py-15">
              <div className="aspect-square w-60 h-65 border-2 border-dashed border-gray-700 bg-foreground/80 flex items-center justify-center -mx-40">
                <ImageIcon size={48} className="text-gray-600" />
              </div>
            </div>

            <div className="w-full md:w-full space-y-6 mt-5">
              <InputText label="title" value={formData.title} onChange={handleChange}>Title*</InputText>
              <InputText label="topic" value={formData.topic} onChange={handleChange}>Topic</InputText>
              <TextArea label="description" value={formData.description} onChange={handleChange} rows={6}>Description</TextArea>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-7">
            <NextDelButton>Delete</NextDelButton>
            <NextDelButton className="bg-primary">Next</NextDelButton>
          </div>
        </div>
      </div>
    </div>
  );
}