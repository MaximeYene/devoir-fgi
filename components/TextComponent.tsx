/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
// components/TextUploader.tsx
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
import { BitcoinIconsPlusOutline } from "@/components/ui/plusIcon";

export function TextComponent() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [textUrls, setTextUrls] = useState<string[]>([]);

  // Charger tous les fichiers textes depuis le backend au démarrage
  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await fetch("https://ton-backend-api.com/texts"); // Assure-toi que l'URL est correcte
        if (!response.ok) {
          throw new Error("Failed to fetch text files");
        }
        const data = await response.json();
        setTextUrls(data.texts); // 'data.texts' doit contenir les URLs des fichiers texte renvoyées par le backend
      } catch (error) {
        console.error("Error fetching text files:", error);
      }
    };

    fetchTexts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const uploadText = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Remplacer par l'URL de ton API backend Python
      const response = await fetch("https://ton-backend-api.com/upload-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload text file");
      }

      const data = await response.json();
      const textUrl = data.url; // Assure-toi que l'API renvoie l'URL du fichier texte

      setTextUrls((prevUrls) => [...prevUrls, textUrl]);
    } catch (error) {
      console.error("Error uploading text file:", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="shadow-md">
            <BitcoinIconsPlusOutline />
            <p className="ml-1">New Text File</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Text File</DialogTitle>
            <DialogDescription>
              Select a text file (.txt) to upload
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="w-full items-center gap-4">
              <Input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={uploadText}>
              Upload Text
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        {/* Afficher les fichiers textes uploadés */}
        <div>
          {textUrls.map((url, index) => (
            <div key={index} className="my-2">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button variant="link" className="text-blue-600 underline">
                  View Text File {index + 1}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
