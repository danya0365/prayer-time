/**
 * IRoadMapRepository
 * Repository interface for RoadMap data access
 * Following Clean Architecture - this is in the Application layer
 */

export type FeatureStatus = "done" | "in_progress" | "locked";

export interface RoadMapFeature {
  id: string;
  icon: string; // emoji
  title: string;
  description: string;
  status: FeatureStatus;

  // Dual-track fields
  plannedQuarter?: string; // เช่น "Q3 2026" — ทำแน่นอนภายใน quarter นี้
  donationGoal?: number;   // เช่น 5000 — ถ้ายอดสะสมถึงนี้ → เริ่มทำทันที
}

export interface RoadMapTier {
  id: string;
  emoji: string;
  label: string;          // เช่น "🌱 Seed"
  targetAmount: number;   // ยอดสะสมถึง tier นี้
  features: RoadMapFeature[];
}

export interface RoadMapStats {
  currentAmount: number;    // ยอดบริจาคสะสมปัจจุบัน
  nextTierTarget: number;   // เป้า tier ถัดไป
  totalFeatures: number;
  doneFeatures: number;
  inProgressFeatures: number;
}

export interface IRoadMapRepository {
  /**
   * Get all tiers with their features
   */
  getAllTiers(): Promise<RoadMapTier[]>;

  /**
   * Get overall donation stats
   */
  getStats(): Promise<RoadMapStats>;

  /**
   * Get a single feature by ID
   */
  getFeatureById(id: string): Promise<RoadMapFeature | null>;
}
