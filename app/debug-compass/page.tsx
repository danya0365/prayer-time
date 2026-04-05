import CompassDebugView from "@/src/presentation/components/features/CompassDebugView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compass Debug | Prayer Times",
  description: "Debug and verify device orientation sensor data",
};

export default function DebugCompassPage() {
  return (
    <CompassDebugView />
  );
}
