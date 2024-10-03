/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
// components/DocumentUploader.tsx
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

export function PdfComponent() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrls, setPdfUrls] = useState<string[]>([]);

  // Charger tous les PDFs depuis le backend au démarrage
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch("https://ton-backend-api.com/documents"); // Assure-toi que l'URL est correcte
        if (!response.ok) {
          throw new Error("Failed to fetch PDFs");
        }
        const data = await response.json();
        setPdfUrls(data.documents); // 'data.documents' doit contenir les URLs des PDFs renvoyées par le backend
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPdfs();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const uploadDocument = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Remplacer par l'URL de ton API backend Python
      const response = await fetch("https://ton-backend-api.com/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload PDF");
      }

      const data = await response.json();
      const pdfUrl = data.url; // Assure-toi que l'API renvoie l'URL du PDF

      setPdfUrls((prevUrls) => [...prevUrls, pdfUrl]);
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="shadow-md">
            <BitcoinIconsPlusOutline />
            <p className="ml-1">New PDF Document</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload PDF</DialogTitle>
            <DialogDescription>
              Select a PDF document to upload
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="w-full items-center gap-4">
              <Input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={uploadDocument}>
              Upload PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        {/* Afficher les PDFs uploadés */}
        <div>
          {pdfUrls.map((url, index) => (
            <div key={index} className="my-2">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button variant="link" className="text-blue-600 underline">
                  View PDF {index + 1}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
