import { RoadMapView } from "@/src/presentation/components/road-map/RoadMapView";
import { createServerRoadMapPresenter } from "@/src/presentation/presenters/road-map/RoadMapPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the Road Map page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerRoadMapPresenter();
  return presenter.generateMetadata();
}

/**
 * Road Map page — Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function RoadMapPage() {
  const presenter = createServerRoadMapPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <RoadMapView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching road-map data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-muted mb-6">ไม่สามารถโหลดข้อมูล Road Map ได้</p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    );
  }
}
