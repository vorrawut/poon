import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  // Theme
  theme: "light" | "dark" | "system";

  // View Mode (Play/Clarity)
  viewMode: "play" | "clarity";

  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;

  // Modals
  modals: {
    addAccount: boolean;
    addTransaction: boolean;
    importCSV: boolean;
    linkBank: boolean;
    settings: boolean;
    accountDetails: boolean;
  };

  // Loading states
  globalLoading: boolean;

  // Toast notifications
  toasts: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    title: string;
    message?: string;
    duration?: number;
    timestamp: number;
  }>;

  // Current page
  currentPage: string;

  // Mobile
  isMobile: boolean;

  // Actions
  setTheme: (theme: "light" | "dark" | "system") => void;
  setViewMode: (viewMode: "play" | "clarity") => void;
  toggleViewMode: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  openModal: (modal: keyof UIState["modals"]) => void;
  closeModal: (modal: keyof UIState["modals"]) => void;
  closeAllModals: () => void;
  setGlobalLoading: (loading: boolean) => void;
  addToast: (toast: Omit<UIState["toasts"][0], "id" | "timestamp">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  setCurrentPage: (page: string) => void;
  setIsMobile: (mobile: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: "system",
      viewMode: "play",
      sidebarOpen: true,
      sidebarCollapsed: false,
      modals: {
        addAccount: false,
        addTransaction: false,
        importCSV: false,
        linkBank: false,
        settings: false,
        accountDetails: false,
      },
      globalLoading: false,
      toasts: [],
      currentPage: "dashboard",
      isMobile: false,

      setTheme: (theme) => set({ theme }),

      setViewMode: (viewMode) => set({ viewMode }),

      toggleViewMode: () => {
        const { viewMode } = get();
        set({ viewMode: viewMode === "play" ? "clarity" : "play" });
      },

      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

      toggleSidebar: () => {
        const { isMobile, sidebarOpen } = get();
        if (isMobile) {
          set({ sidebarOpen: !sidebarOpen });
        } else {
          set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
        }
      },

      openModal: (modal) => {
        set((state) => ({
          modals: {
            ...state.modals,
            [modal]: true,
          },
        }));
      },

      closeModal: (modal) => {
        set((state) => ({
          modals: {
            ...state.modals,
            [modal]: false,
          },
        }));
      },

      closeAllModals: () => {
        set((state) => ({
          modals: Object.keys(state.modals).reduce(
            (acc, key) => ({ ...acc, [key]: false }),
            {} as UIState["modals"],
          ),
        }));
      },

      setGlobalLoading: (globalLoading) => set({ globalLoading }),

      addToast: (toast) => {
        const id =
          Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const newToast = {
          ...toast,
          id,
          timestamp: Date.now(),
          duration: toast.duration || 5000,
        };

        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        // Auto remove toast after duration
        if (newToast.duration > 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, newToast.duration);
        }

        return id;
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },

      clearToasts: () => set({ toasts: [] }),

      setCurrentPage: (currentPage) => set({ currentPage }),

      setIsMobile: (isMobile) => {
        set({ isMobile });
        // Auto close sidebar on mobile
        if (isMobile) {
          set({ sidebarOpen: false });
        }
      },
    }),
    {
      name: "poon-ui-store",
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
);

// Toast helper functions
export const toast = {
  success: (title: string, message?: string) => {
    return useUIStore.getState().addToast({
      type: "success",
      title,
      message,
    });
  },

  error: (title: string, message?: string) => {
    return useUIStore.getState().addToast({
      type: "error",
      title,
      message,
      duration: 8000, // Longer duration for errors
    });
  },

  warning: (title: string, message?: string) => {
    return useUIStore.getState().addToast({
      type: "warning",
      title,
      message,
    });
  },

  info: (title: string, message?: string) => {
    return useUIStore.getState().addToast({
      type: "info",
      title,
      message,
    });
  },

  remove: (id: string) => {
    useUIStore.getState().removeToast(id);
  },

  clear: () => {
    useUIStore.getState().clearToasts();
  },
};
