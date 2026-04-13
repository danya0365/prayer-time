/**
 * MockRoadMapRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - this is in the Infrastructure layer
 */

import {
  IRoadMapRepository,
  RoadMapFeature,
  RoadMapStats,
  RoadMapTier,
} from "@/src/application/repositories/IRoadMapRepository";

// ข้อมูลจำลองสำหรับยอดบริจาคปัจจุบัน
const CURRENT_AMOUNT = 12500; // สมมติว่าตอนนี้ได้ 12,500 บาท

const MOCK_FEATURES: RoadMapFeature[] = [
  // 🐾 ฟรีเสมอ (฿0)
  {
    id: "feat-basic-times",
    icon: "🕰️",
    title: "บอกเวลาละหมาดแม่นยำ",
    description: "เวลาละหมาด 5 เวลาตามตำแหน่งของคุณ",
    status: "done",
  },
  {
    id: "feat-qibla",
    icon: "🧭",
    title: "เข็มทิศทิศกิบลัต",
    description: "ชี้ทิศทางมักกะฮ์สำหรับการละหมาด",
    status: "done",
  },
  
  // 🌱 Seed (฿5,000)
  {
    id: "feat-notifications",
    icon: "🔔",
    title: "ระบบแจ้งเตือนเข้าเวลา",
    description: "แจ้งเตือนเมื่อถึงเวลาละหมาด พร้อมเสียงอะซานพื้นฐาน",
    status: "done",
    plannedQuarter: "Q4 2025",
    donationGoal: 5000,
  },
  
  // 🌿 Sprout (฿15,000)
  {
    id: "feat-multi-lang",
    icon: "🌐",
    title: "รองรับหลายภาษา",
    description: "ไทย, อังกฤษ, อาหรับ, มาลายู",
    status: "in_progress",
    plannedQuarter: "Q1 2026",
    donationGoal: 10000,
  },
  {
    id: "feat-custom-athan",
    icon: "🔊",
    title: "เสียงอะซานหลายรูปแบบ",
    description: "เลือกเสียงมุอัซซินที่คุณชื่นชอบได้",
    status: "locked",
    plannedQuarter: "Q2 2026",
    donationGoal: 15000,
  },

  // 🌸 Bloom (฿30,000)
  {
    id: "feat-widgets",
    icon: "📱",
    title: "Widgets สำหรับมือถือ",
    description: "ดูเวลาละหมาดได้ทันทีจากหน้าจอหลัก (iOS/Android)",
    status: "locked",
    plannedQuarter: "Q3 2026",
    donationGoal: 20000,
  },
  {
    id: "feat-hijri-cal",
    icon: "📅",
    title: "ปฏิทินฮิจเราะห์ศักราช",
    description: "ดูปฏิทินอิสลามพร้อมวันสำคัญทางศาสนา",
    status: "locked",
    plannedQuarter: "Q4 2026",
    donationGoal: 25000,
  },

  // 🦁 Champion (฿60,000)
  {
    id: "feat-quran-read",
    icon: "📖",
    title: "แอปพลิเคชันอัลกุรอาน",
    description: "อ่านอัลกุรอานพร้อมคำแปลและเสียงอ่าน",
    status: "locked",
    plannedQuarter: "Q1 2027",
    donationGoal: 40000,
  },
  {
    id: "feat-halal-map",
    icon: "🗺️",
    title: "แผนที่ร้านอาหารฮาลาลและมัสยิด",
    description: "ค้นหาสถานที่สำคัญสำหรับมุสลิมใกล้ตัวคุณ",
    status: "locked",
    plannedQuarter: "Q2 2027",
    donationGoal: 50000,
  },

  // 👑 Legend (฿100,000)
  {
    id: "feat-ai-assistant",
    icon: "🤖",
    title: "ผู้ช่วย AI อิสลาม",
    description: "ถาม-ตอบปัญหาศาสนาโดยอ้างอิงจากแหล่งที่เชื่อถือได้",
    status: "locked",
    plannedQuarter: "Q4 2027",
    donationGoal: 80000,
  },
  {
    id: "feat-community",
    icon: "🤝",
    title: "ระบบคอมมูนิตี้",
    description: "สร้างกลุ่ม, หาเพื่อนร่วมทางไปละหมาด",
    status: "locked",
    plannedQuarter: "Q1 2028",
    donationGoal: 100000,
  },
];

const MOCK_TIERS: RoadMapTier[] = [
  {
    id: "tier-free",
    emoji: "🐾",
    label: "ฟรีเสมอ",
    targetAmount: 0,
    features: MOCK_FEATURES.filter(f => !f.donationGoal),
  },
  {
    id: "tier-seed",
    emoji: "🌱",
    label: "Seed (เมล็ดพันธุ์)",
    targetAmount: 5000,
    features: MOCK_FEATURES.filter(f => f.donationGoal && f.donationGoal <= 5000),
  },
  {
    id: "tier-sprout",
    emoji: "🌿",
    label: "Sprout (ต้นกล้า)",
    targetAmount: 15000,
    features: MOCK_FEATURES.filter(f => f.donationGoal && f.donationGoal > 5000 && f.donationGoal <= 15000),
  },
  {
    id: "tier-bloom",
    emoji: "🌸",
    label: "Bloom (เบ่งบาน)",
    targetAmount: 30000,
    features: MOCK_FEATURES.filter(f => f.donationGoal && f.donationGoal > 15000 && f.donationGoal <= 30000),
  },
  {
    id: "tier-champion",
    emoji: "🦁",
    label: "Champion (แชมเปี้ยน)",
    targetAmount: 60000,
    features: MOCK_FEATURES.filter(f => f.donationGoal && f.donationGoal > 30000 && f.donationGoal <= 60000),
  },
  {
    id: "tier-legend",
    emoji: "👑",
    label: "Legend (ตำนาน)",
    targetAmount: 100000,
    features: MOCK_FEATURES.filter(f => f.donationGoal && f.donationGoal > 60000),
  },
];

export class MockRoadMapRepository implements IRoadMapRepository {
  async getAllTiers(): Promise<RoadMapTier[]> {
    await this.delay(300);
    return MOCK_TIERS;
  }

  async getStats(): Promise<RoadMapStats> {
    await this.delay(150);
    
    // คำนวณหาเป้าหมายต่อไปจากยอดปัจจุบัน
    const nextTier = MOCK_TIERS.find(t => t.targetAmount > CURRENT_AMOUNT) || MOCK_TIERS[MOCK_TIERS.length - 1];
    
    return {
      currentAmount: CURRENT_AMOUNT,
      nextTierTarget: nextTier.targetAmount,
      totalFeatures: MOCK_FEATURES.length,
      doneFeatures: MOCK_FEATURES.filter(f => f.status === "done").length,
      inProgressFeatures: MOCK_FEATURES.filter(f => f.status === "in_progress").length,
    };
  }

  async getFeatureById(id: string): Promise<RoadMapFeature | null> {
    await this.delay(100);
    return MOCK_FEATURES.find((f) => f.id === id) || null;
  }

  // Helper method to simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance for convenience
export const mockRoadMapRepository = new MockRoadMapRepository();
