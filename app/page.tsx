/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Link from "next/link";
import {
  Bell,
  Home,
  Menu,
  Package2,
  Search,
  AudioLines,
  ImageIcon,
  VideoIcon
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import HomeDashboard from "@/components/HomeDashboard";
import { ImagesComponent } from "@/components/ImagesComponent";
import { AudioComponent } from "@/components/AudioComponent";
import { VideoComponent } from "@/components/VideoComponent";

export default function Dashboard() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = React.useState("Home");

  const renderSection = () => {
    switch (selectedSection) {
      case "Home":
        return <HomeDashboard />;
      case "Images":
        return <ImagesComponent />;
      case "Audios":
        return <AudioComponent />;
      case "Videos":
        return <VideoComponent />;
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">TTIC5/GI</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <button
                onClick={() => {
                  setSelectedSection("Home");
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  selectedSection === "Home"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Home className="h-4 w-4" />
                Home
              </button>
              <button
                onClick={() => {
                  setSelectedSection("Images");
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  selectedSection === "Images"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <ImageIcon className="h-4 w-4"/>
                Images
              </button>
              <button
                onClick={() => {
                  setSelectedSection("Audios");
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  selectedSection === "Audios"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <AudioLines className="h-4 w-4" />
                Audios
              </button>
              <button
                onClick={() => {
                  setSelectedSection("Videos");
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  selectedSection === "Videos"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <VideoIcon className="h-4 w-4" />
                Videos
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <button
                  onClick={() => setSelectedSection("Home")}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Home
                </button>
                <button
                  onClick={() => setSelectedSection("Images")}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <ImageIcon className="h-5 w-5" />
                  Images
                </button>
                <button
                  onClick={() => setSelectedSection("Audios")}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <AudioLines className="h-5 w-5" />
                  Audios
                </button>
                <button
                  onClick={() => setSelectedSection("Videos")}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <VideoIcon className="h-5 w-5" />
                  Videos
                </button>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex flex-1 rounded-lg shadow-sm">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
