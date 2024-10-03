// components/Home.tsx
import React from "react";

const HomeDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">
        Welcome to the Dashboard
      </h1>
      <p className="mb-4 font-bold text-gray-700">
        This dashboard allows you to easily manage and organize your media. Here’s an overview of the available features:
      </p>

      <section className="mb-8 p-4 hover:transform hover:scale-105 duration-75 hover:shadow-lg border rounded-md shadow-md bg-blue-100">
        <h2 className="text-xl font-semibold text-blue-800">Image Management</h2>
        <p className="text-blue-700">
          Upload and manage your images directly from this interface. 
          You can view, download, and delete images as needed.
        </p>
      </section>

      <section className="mb-8 p-4  hover:transform hover:scale-105 duration-75  hover:shadow-lg border rounded-md shadow-md bg-green-100">
        <h2 className="text-xl font-semibold text-green-800">Video Management</h2>
        <p className="text-green-700">
          Upload and manage your videos here. 
          You can play, download, and delete your videos with ease.
        </p>
      </section>

      <section className="mb-8 p-4  hover:transform hover:scale-105 duration-75  hover:shadow-lg border rounded-md shadow-md bg-yellow-100">
        <h2 className="text-xl font-semibold text-yellow-800">Audio Management</h2>
        <p className="text-yellow-700">
          Upload and listen to your audio files. 
          Easily access your recordings and manage them as needed.
        </p>
      </section>
    </div>
  );
};

export default HomeDashboard;
