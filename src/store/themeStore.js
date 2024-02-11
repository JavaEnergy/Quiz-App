import { create } from "zustand";

const useThemeStore = create((set) => ({
  mode: "light", // Default mode is light
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === "light" ? "dark" : "light",
      backgroundPattern:
        state.mode === "light"
          ? "/path/to/dark-bg-pattern.svg"
          : "/path/to/light-bg-pattern.svg",
    })),
}));

export default useThemeStore;
