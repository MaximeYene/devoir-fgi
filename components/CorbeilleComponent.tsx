// components/TrashComponent.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface FileItem {
  id: number;
  name: string;
  type: string; // 'image', 'audio', 'pdf', 'text', etc.
}

const initialFiles: FileItem[] = [
  { id: 1, name: "image1.png", type: "image" },
  { id: 2, name: "document.pdf", type: "pdf" },
  { id: 3, name: "audio.mp3", type: "audio" },
  { id: 4, name: "notes.txt", type: "text" },
  { id: 5, name: "video.mp4", type: "video"},
];

const CorbeilleComponent: React.FC = () => {
  const [deletedFiles, setDeletedFiles] = useState<FileItem[]>(initialFiles);

  const restoreFile = (fileId: number) => {
    setDeletedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    alert("File restored successfully.");
  };

  const permanentlyDeleteFile = (fileId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this file?");
    if (confirmDelete) {
      setDeletedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
      alert("File deleted permanently.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-red-600">Trash Bin</h1>
      <p className="mb-4 text-gray-700">
        This is where your deleted files are stored. You can restore them or permanently delete them.
      </p>

      {deletedFiles.length === 0 ? (
        <p className="text-gray-600">The trash is empty.</p>
      ) : (
        <ul className="space-y-4">
          {deletedFiles.map((file) => (
            <li key={file.id} className="p-4 bg-gray-100 border rounded-md shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">
                  {file.name} ({file.type})
                </span>
                <div className="space-x-4">
                  <Button variant="outline" onClick={() => restoreFile(file.id)}>
                    Restore
                  </Button>
                  <Button variant="destructive" onClick={() => permanentlyDeleteFile(file.id)}>
                    Delete Permanently
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CorbeilleComponent;
;
