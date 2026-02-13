import { create } from "zustand";
import { UserSession } from "../_types/auth.types";

type AuthStatus = "authenticated" | "unauthenticated" | "loading";

interface SessionState {
  status: AuthStatus;
  session: UserSession | null;
  clearSession: () => void;
  updateSession: () => void;
}


const fetchSession = async () => {
    try {
        const response = await fetch("/api/auth/session", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data ? { status: "authenticated" as AuthStatus, session: data as UserSession } : { status: "unauthenticated" as AuthStatus, session: null };
        }
        return { status: "unauthenticated" as AuthStatus, session: null };
        
      } catch (error) {
        console.error("Error getting session:", error);
        return { status: "unauthenticated" as AuthStatus, session: null };
      }
}


export const useAuthStore = create<SessionState>((set) => ({
    status: "loading" as AuthStatus,
    session: null,
    clearSession: () => set({ status: "unauthenticated", session: null }),
    updateSession: async ()=>{
        const { status, session } = await fetchSession();
        set({ status, session });
    },
}));


if (typeof window !== "undefined") {
    useAuthStore.getState().updateSession();
}