/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
// components/ImageUploader.tsx

'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BitcoinIconsPlusOutline } from "./ui/plusIcon";

export function ImagesComponent() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //Ici on Charge toutes les images depuis le backend au démarrage
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://backend-api.com/images");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImageUrls(data.images); // 'data.images' doit contenir les URLs des images renvoyées par le backend
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const uploadImage = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      //Ici on remplace par l'URL de l API backend Python
      const response = await fetch("https://backend-api.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      const imageUrl = data.url; // Ici l'API renvoie l'URL de l'image

      setImageUrls((prevUrls) => [...prevUrls, imageUrl]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="shadow-md">
            <BitcoinIconsPlusOutline />
            <p className="ml-1">New Image</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit image</DialogTitle>
            <DialogDescription>Select Image to upload</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="w-full items-center gap-4">
              <Input
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={uploadImage}>
              Upload Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        {/* Afficher les images uploadées */}
        <div>
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Uploaded image ${index}`}
              width={200}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
