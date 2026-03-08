import { HomeView } from "@/src/presentation/components/home/HomeView";
import { createServerHomePresenter } from "@/src/presentation/presenters/home/HomePresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerHomePresenter();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "หน้าหลัก | Prayer Times",
      description: "ระบบแสดงเวลาละหมาด",
    };
  }
}

export default async function HomePage() {
  const presenter = createServerHomePresenter();

  try {
    const viewModel = await presenter.getViewModel();

    return (
      <HomeView initialViewModel={viewModel} />
    );
  } catch (error) {
    console.error("Error fetching home data:", error);

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-muted-foreground mb-4">ไม่สามารถโหลดข้อมูลหน้าหลักได้</p>
          <Link
            href="/"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            ลองใหม่
          </Link>
        </div>
      </div>
    );
  }
}
