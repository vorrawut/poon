import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Toast } from "../ui/Toast";
import { useUIStore } from "../../store/useUIStore";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../libs/utils";

export function Layout() {
  const { sidebarOpen, isMobile, setIsMobile } = useUIStore();
  const { isPlayMode, themeMode } = useTheme();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile]);

  return (
    <div
      className={cn(
        "flex h-screen transition-colors duration-300",
        // Theme-aware background
        "bg-[var(--color-bg-primary)]",
        // Play mode cosmic background
        isPlayMode && "relative overflow-hidden",
        // Cosmic background effects for play mode
        isPlayMode &&
          themeMode === "dark" &&
          "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900",
        isPlayMode &&
          themeMode === "light" &&
          "bg-gradient-to-br from-blue-50 via-purple-50/30 to-blue-50",
      )}
    >
      {/* Cosmic background effects for Play mode */}
      {isPlayMode && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary-500)_0%,_transparent_50%)] opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-accent-500)_0%,_transparent_50%)] opacity-10" />
        </>
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => useUIStore.getState().setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Toast notifications */}
      <Toast />
    </div>
  );
}
