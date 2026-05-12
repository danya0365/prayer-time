/**
 * RoadMapPresenter
 * Handles business logic for the Road Map page
 * Receives repository via dependency injection
 */

import { Metadata } from "next";
import {
  IRoadMapRepository,
  RoadMapFeature,
  RoadMapStats,
  RoadMapTier,
} from "@/src/application/repositories/IRoadMapRepository";

export interface RoadMapViewModel {
  tiers: RoadMapTier[];
  stats: RoadMapStats;
  currentAmount: number;
  nextTierTarget: number;
  overallProgressPercent: number; // 0-100
}

/**
 * Presenter for RoadMap page
 * ✅ Receives repository via constructor injection
 */
export class RoadMapPresenter {
  constructor(private readonly repository: IRoadMapRepository) {}

  // ============================================================
  // VIEW MODEL METHODS
  // ============================================================

  async getViewModel(): Promise<RoadMapViewModel> {
    const [tiers, stats] = await Promise.all([
      this.repository.getAllTiers(),
      this.repository.getStats(),
    ]);

    const overallProgressPercent = Math.min(
      100,
      Math.round((stats.currentAmount / stats.nextTierTarget) * 100)
    );

    return {
      tiers,
      stats,
      currentAmount: stats.currentAmount,
      nextTierTarget: stats.nextTierTarget,
      overallProgressPercent,
    };
  }

  generateMetadata(): Metadata {
    return {
      title: "Road Map | Prayer Times Dashboard",
      description:
        "ดูแผนการพัฒนาฟีเจอร์ของเรา ทุกฟีเจอร์จะทำแน่นอนตามกำหนด — บริจาคเพื่อช่วยให้ฟีเจอร์มาเร็วขึ้น",
    };
  }

  // ============================================================
  // GRANULAR DATA METHODS
  // ============================================================

  async getAllTiers(): Promise<RoadMapTier[]> {
    return await this.repository.getAllTiers();
  }

  async getStats(): Promise<RoadMapStats> {
    return await this.repository.getStats();
  }

  async getFeatureById(id: string): Promise<RoadMapFeature | null> {
    return await this.repository.getFeatureById(id);
  }

  /**
   * Helper: คำนวณ fast-track progress percent สำหรับ feature
   */
  computeFastTrackPercent(
    feature: RoadMapFeature,
    currentAmount: number
  ): number {
    if (!feature.donationGoal) return 0;
    return Math.min(100, Math.round((currentAmount / feature.donationGoal) * 100));
  }

  /**
   * Helper: ตรวจสอบว่า feature ถึง donationGoal แล้วหรือยัง
   */
  isFastTrackReached(
    feature: RoadMapFeature,
    currentAmount: number
  ): boolean {
    if (!feature.donationGoal) return false;
    return currentAmount >= feature.donationGoal;
  }
}
