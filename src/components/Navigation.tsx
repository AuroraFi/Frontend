import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Github, ChevronDown } from "lucide-react";
import { OktoContextType, useOkto } from "okto-sdk-react";
import AuthModal from "./PhoneNumberModal";

export const Navigation = () => {
  const { isLoggedIn } = useOkto() as OktoContextType;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentPath] = useState(window.location.pathname);

  const renderWalletButton = () => {
    if (!isLoggedIn) {
      return (
        <button
          className="px-8 py-2 border-[#151515] border rounded-full"
          onClick={() => setIsAuthModalOpen(true)}
        >
          Connect Wallet
        </button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="px-8 py-2 border-[#151515] border rounded-full inline-flex items-center gap-2">
          Connected
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[400px] bg-[#fbfbe4] border border-[#151515] rounded-xl"
        >
          <DropdownMenuLabel>Wallet Details</DropdownMenuLabel>
          <DropdownMenuSeparator className="border-b border-[#151515]" />
          <DropdownMenuItem className="flex flex-col items-start">
            <span className="text-sm font-medium">Status</span>
            <span className="text-sm text-gray-600 break-all">Connected</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-b border-[#151515]" />
          <DropdownMenuItem onClick={() => {}} className="text-red-600">
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <nav className="">
        <div className="fixed top-0 left-0 right-0 w-full flex flex-row p-6 items-center bg-[#fbfbe4] z-40">
          <a href="/" className="inline-flex gap-4 items-center">
            <img
              src="/logo_black.png"
              alt="Logo"
              width="30"
              height="24"
              className="object-contain"
            />
            <span className="text-lg font-bold mr-10">AuroraFi</span>
          </a>
          <div className="flex flex-row gap-10">
            <a href="/" className="opacity-50">
              Home
            </a>
            <a href="https://github.com/AuroraFi" className="opacity-50">
              Docs
            </a>
            <a href="/about" className="opacity-50">
              About
            </a>
          </div>
          <div className="ml-auto inline-flex gap-2">
            {renderWalletButton()}
            <a
              href="https://github.com/AuroraFi"
              className="flex bg-[#151515] text-[#fbfbe4] rounded-full p-2 items-center"
            >
              <Github />
            </a>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
