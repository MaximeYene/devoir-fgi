/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
// components/AudioUploader.tsx
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

export function AudioComponent() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);

  //Ici on Charge tous les audios depuis le backend au démarrage
  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await fetch("https://backend-api.com/audios");
        if (!response.ok) {
          throw new Error("Failed to fetch audios");
        }
        const data = await response.json();
        setAudioUrls(data.audios); // 'data.audios' doit contenir les URLs des audios renvoyées par le backend
      } catch (error) {
        console.error("Error fetching audios:", error);
      }
    };

    fetchAudios();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const uploadAudio = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      //Ici on Remplace par l'URL de l API backend Python
      const response = await fetch("https://backend-api.com/upload-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload audio");
      }

      const data = await response.json();
      const audioUrl = data.url; //Ici l'API renvoie l'URL de l'audio

      setAudioUrls((prevUrls) => [...prevUrls, audioUrl]);
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
            <p className="ml-1">New Audio</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload audio</DialogTitle>
            <DialogDescription>
              Select an audio file to upload
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="w-full items-center gap-4">
              <Input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={uploadAudio}>
              Upload Audio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        {/* Afficher les audios uploadés */}
        <div>
          {audioUrls.map((url, index) => (
            <audio key={index} controls>
              <source src={url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ))}
        </div>
      </div>
    </div>
  );
}
