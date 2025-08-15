import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemedDashboard } from "@/components/themes/ThemedDashboard";

export default function Home() {
  return (
    <ThemeProvider>
      <ThemedDashboard />
    </ThemeProvider>
  );
}
