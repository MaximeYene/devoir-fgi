/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
// components/VideoUploader.tsx

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

export function VideoComponent() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);

  //Ici on Charge toutes les vidéos depuis le backend au démarrage
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("https://backend-api.com/videos");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideoUrls(data.videos); // 'data.videos' doit contenir les URLs des vidéos renvoyées par le backend
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const uploadVideo = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      //Ici on Remplace par l'URL de l API backend Python
      const response = await fetch("https://backend-api.com/upload-video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      const data = await response.json();
      const videoUrl = data.url; // Ici l'API renvoie l'URL de la vidéo

      setVideoUrls((prevUrls) => [...prevUrls, videoUrl]);
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
            <p className="ml-1">New Video</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload video</DialogTitle>
            <DialogDescription>Select a video to upload</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="w-full items-center gap-4">
              <Input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={uploadVideo}>
              Upload Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        {/* Afficher les vidéos uploadées */}
        <div>
          {videoUrls.map((url, index) => (
            <video key={index} width="320" height="240" controls>
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>
    </div>
  );
}
