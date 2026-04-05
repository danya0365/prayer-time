"use client"

import CompassDebugView from "@/src/presentation/components/features/CompassDebugView";
import { useEffect, useState } from "react";

export default function DebugCompassClient() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <CompassDebugView />
    );
}