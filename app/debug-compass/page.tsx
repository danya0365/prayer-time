import { Metadata } from "next";
import DebugCompassClient from "./client";

export const metadata: Metadata = {
  title: "Compass Debug | Prayer Times",
  description: "Debug and verify device orientation sensor data",
};

export default function DebugCompassPage() {
  return (
    <DebugCompassClient />
  );
}
