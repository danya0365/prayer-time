"use client";

import {
  RoadMapFeature,
  RoadMapTier,
} from "@/src/application/repositories/IRoadMapRepository";
import {
  RoadMapPresenter,
  RoadMapViewModel,
} from "@/src/presentation/presenters/road-map/RoadMapPresenter";
import Link from "next/link";

interface RoadMapViewProps {
  initialViewModel: RoadMapViewModel;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: RoadMapFeature["status"] }) {
  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-light text-success-dark">
        ✅ เสร็จแล้ว
      </span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-warning-light text-warning-dark animate-pulse">
        🔨 กำลังทำ
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted-light text-muted">
      🔒 รอคิว
    </span>
  );
}

function FastTrackBar({
  feature,
  currentAmount,
  presenter,
}: {
  feature: RoadMapFeature;
  currentAmount: number;
  presenter: RoadMapPresenter;
}) {
  if (!feature.donationGoal) return null;

  const reached = presenter.isFastTrackReached(feature, currentAmount);
  const percent = presenter.computeFastTrackPercent(feature, currentAmount);

  if (reached) {
    return (
      <div className="flex items-center gap-1.5 mt-1">
        <span className="text-xs font-semibold text-success">
          ⚡ Fast-track พร้อมเริ่ม!
        </span>
      </div>
    );
  }

  return (
    <div className="mt-1.5 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">
          ⚡ Fast-track{" "}
          <span className="font-semibold text-secondary">
            ฿{feature.donationGoal.toLocaleString()}
          </span>
        </span>
        <span className="text-xs text-muted">{percent}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, #6366f1, #10b981)",
          }}
        />
      </div>
    </div>
  );
}

function FeatureRow({
  feature,
  currentAmount,
  presenter,
}: {
  feature: RoadMapFeature;
  currentAmount: number;
  presenter: RoadMapPresenter;
}) {
  const isLocked = feature.status === "locked";

  return (
    <div
      className={`group flex gap-3 p-3 rounded-xl border transition-all duration-200 ${
        isLocked
          ? "border-border bg-surface opacity-60 hover:opacity-80"
          : "border-border bg-surface hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {/* Icon */}
      <div className="flex-shrink-0 text-2xl leading-none mt-0.5">
        {feature.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start gap-2 mb-0.5">
          <span
            className={`font-semibold text-sm leading-snug ${
              isLocked ? "text-muted" : "text-foreground"
            }`}
          >
            {feature.title}
          </span>
          <StatusBadge status={feature.status} />
        </div>

        <p className="text-xs text-muted leading-relaxed mb-1">
          {feature.description}
        </p>

        {/* Dual-track indicators */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {feature.plannedQuarter && (
            <span className="inline-flex items-center gap-1 text-xs text-info-dark font-medium">
              <span>📅</span>
              <span>กำหนด {feature.plannedQuarter}</span>
            </span>
          )}
        </div>

        <FastTrackBar
          feature={feature}
          currentAmount={currentAmount}
          presenter={presenter}
        />
      </div>
    </div>
  );
}

function TierCard({
  tier,
  currentAmount,
  presenter,
}: {
  tier: RoadMapTier;
  currentAmount: number;
  presenter: RoadMapPresenter;
}) {
  const isUnlocked =
    tier.targetAmount === 0 || currentAmount >= tier.targetAmount;
  const tierPercent =
    tier.targetAmount === 0
      ? 100
      : Math.min(100, Math.round((currentAmount / tier.targetAmount) * 100));

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        isUnlocked
          ? "border-primary/40 shadow-lg shadow-primary/10"
          : "border-border"
      }`}
    >
      {/* Tier header */}
      <div
        className={`px-5 py-4 flex items-center justify-between ${
          isUnlocked
            ? "bg-primary-gradient"
            : "bg-surface border-b border-dashed border-border"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${isUnlocked ? "bg-white/20" : "bg-muted"}`}
          >
            <span className="text-xl">{tier.emoji}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3
                className={`font-bold text-sm leading-tight ${isUnlocked ? "text-white" : "text-foreground"}`}
              >
                {tier.label}
              </h3>
              {!isUnlocked && (
                <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                  🔒
                </span>
              )}
            </div>
            {tier.targetAmount > 0 && (
              <p
                className={`text-xs ${isUnlocked ? "text-white/80" : "text-muted-foreground"}`}
              >
                เป้าหมาย ฿{tier.targetAmount.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Tier mini progress */}
        {tier.targetAmount > 0 && (
          <div className="text-right">
            <div
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg ${isUnlocked ? "" : "bg-muted"}`}
            >
              <span
                className={`text-xs font-bold ${isUnlocked ? "text-white" : "text-foreground"}`}
              >
                {tierPercent}%
              </span>
            </div>
          </div>
        )}
        {tier.targetAmount === 0 && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isUnlocked ? "text-white/90 bg-white/20" : "text-muted-foreground bg-muted"}`}
          >
            ฟรีเสมอ 💚
          </span>
        )}
      </div>

      {/* Features list */}
      <div
        className={`p-4 space-y-2 ${isUnlocked ? "bg-background" : "bg-muted/30"}`}
      >
        {tier.features.map((feature) => (
          <FeatureRow
            key={feature.id}
            feature={feature}
            currentAmount={currentAmount}
            presenter={presenter}
          />
        ))}
      </div>
    </div>
  );
}

function DualTrackLegend() {
  return (
    <div className="rounded-2xl border border-secondary/30 bg-secondary-light/30 dark:bg-secondary-dark/10 p-5">
      <h2 className="font-bold text-base text-foreground mb-3 flex items-center gap-2">
        <span>🗺️</span> ทำความเข้าใจระบบ Dual-Track
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Track 1 */}
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📅</span>
            <span className="font-semibold text-sm text-foreground">
              กำหนดการ (Planned)
            </span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            <strong className="text-foreground">ทุกฟีเจอร์จะทำแน่นอน</strong>{" "}
            ตาม Quarter ที่กำหนด ไม่มีการล็อคถาวร ไม่บังคับบริจาค — แค่รอตามคิว
          </p>
        </div>

        {/* Track 2 */}
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚡</span>
            <span className="font-semibold text-sm text-foreground">
              Fast-Track (บริจาค)
            </span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            ถ้ายอดบริจาครวมถึงเป้าก่อน{" "}
            <strong className="text-foreground">เราเริ่มทำทันที</strong>{" "}
            ไม่ต้องรอ deadline ช่วยกันให้ฟีเจอร์มาเร็วขึ้น!
          </p>
        </div>
      </div>

      {/* Status legend */}
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-success-light text-success-dark">
            ✅ เสร็จแล้ว
          </span>
          <span className="text-xs text-muted">— ใช้งานได้เลย</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-warning-light text-warning-dark">
            🔨 กำลังทำ
          </span>
          <span className="text-xs text-muted">— คาดมาเร็วๆนี้</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted-light text-muted">
            🔒 รอคิว
          </span>
          <span className="text-xs text-muted">— จะทำตามลำดับ</span>
        </div>
      </div>
    </div>
  );
}

function DonationProgressBar({
  currentAmount,
  nextTarget,
  percent,
}: {
  currentAmount: number;
  nextTarget: number;
  percent: number;
}) {
  return (
    <div className="rounded-2xl border border-primary/30 bg-primary-light/20 dark:bg-primary-dark/10 p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-muted uppercase tracking-wide font-medium">
            ยอดบริจาคสะสม
          </p>
          <p className="text-2xl font-extrabold text-primary">
            ฿{currentAmount.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted">เป้า Tier ถัดไป</p>
          <p className="text-lg font-bold text-foreground">
            ฿{nextTarget.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="h-3 w-full rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, #10b981, #14b8a6, #06b6d4)",
          }}
        />
      </div>
      <p className="text-xs text-muted mt-1.5 text-right">
        {percent}% ของเป้าหมาย Tier ถัดไป
      </p>
    </div>
  );
}

function CommunityNote() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 text-center">
      <div className="text-4xl mb-3">🌙</div>
      <h2 className="font-bold text-lg text-foreground mb-2">
        ร่วมเป็นส่วนหนึ่งของการพัฒนา
      </h2>
      <p className="text-sm text-muted leading-relaxed max-w-md mx-auto">
        แอปนี้สร้างโดยทีมเล็กๆ เพื่อชุมชนมุสลิม 🤍 ทุกฟีเจอร์จะมาแน่นอน
        ไม่มีการบังคับบริจาค แต่ถ้าคุณอยากให้มาเร็วขึ้น — ช่วยกันจะยิ่งเร็ว!
      </p>
    </div>
  );
}

function DonationCTA({ currentAmount }: { currentAmount: number }) {
  const amounts = [50, 100, 200, 500, 1000];

  return (
    <div className="rounded-2xl border border-secondary/30 bg-surface overflow-hidden">
      <div
        className="px-6 py-5"
        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
      >
        <h2 className="font-bold text-white text-lg mb-1">
          ⚡ Fast-Track ฟีเจอร์ที่คุณอยากได้!
        </h2>
        <p className="text-white/80 text-sm">
          บริจาครวม ฿{currentAmount.toLocaleString()} แล้ว —
          มาช่วยกันให้ถึงเป้าเร็วขึ้น
        </p>
      </div>

      <div className="p-6">
        <div className="grid sm:grid-cols-2 gap-6 items-center">
          {/* QR Placeholder */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-36 h-36 rounded-2xl bg-muted-light dark:bg-muted-dark border border-border flex flex-col items-center justify-center">
              <span className="text-4xl mb-1">📱</span>
              <span className="text-xs text-muted text-center leading-tight">
                QR PromptPay
                <br />
                จะแสดงที่นี่
              </span>
            </div>
            <p className="text-xs text-muted">สแกนเพื่อโอน</p>
          </div>

          {/* Amount chips */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">
              เลือกจำนวนที่สะดวก:
            </p>
            <div className="flex flex-wrap gap-2">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  id={`donate-btn-${amount}`}
                  className="px-4 py-2 rounded-xl border border-secondary text-secondary font-semibold text-sm hover:bg-secondary hover:text-white transition-all duration-200 active:scale-95"
                >
                  ฿{amount.toLocaleString()}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted">
              * ทุกยอดบริจาคจะถูกรวมเข้าในยอดสะสมสาธารณะ 🌱
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main View ─────────────────────────────────────────────────────────────────

export function RoadMapView({ initialViewModel }: RoadMapViewProps) {
  // Create a lightweight presenter instance client-side for helper methods
  // (no repo needed for pure helper functions)
  const presenter = {
    computeFastTrackPercent: (feature: RoadMapFeature, amount: number) => {
      if (!feature.donationGoal) return 0;
      return Math.min(100, Math.round((amount / feature.donationGoal) * 100));
    },
    isFastTrackReached: (feature: RoadMapFeature, amount: number) => {
      if (!feature.donationGoal) return false;
      return amount >= feature.donationGoal;
    },
  } as unknown as RoadMapPresenter;

  const {
    tiers,
    currentAmount,
    nextTierTarget,
    overallProgressPercent,
    stats,
  } = initialViewModel;

  return (
    <div className="min-h-screen bg-background dark">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #10b981 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-light dark:bg-primary-dark/20 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <span>🌿</span>
            <span>Community Roadmap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 leading-tight">
            แผนการพัฒนา
            <br />
            <span className="text-primary">Prayer Times</span>
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-lg mx-auto leading-relaxed">
            ทุกฟีเจอร์จะทำ<strong className="text-foreground">แน่นอน</strong>
            ตามกำหนด — ไม่มีการล็อคถาวร ไม่บังคับบริจาค
            <br />
            บริจาคเพื่อช่วยให้ฟีเจอร์ที่คุณอยากได้{" "}
            <span className="text-primary font-semibold">มาเร็วขึ้น</span> ✨
          </p>

          {/* Quick stats */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-foreground">
                {stats.totalFeatures}
              </p>
              <p className="text-xs text-muted">ฟีเจอร์ทั้งหมด</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-extrabold text-success">
                {stats.doneFeatures}
              </p>
              <p className="text-xs text-muted">เสร็จแล้ว</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-extrabold text-warning">
                {stats.inProgressFeatures}
              </p>
              <p className="text-xs text-muted">กำลังทำ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-6">
        {/* Donation Progress */}
        <DonationProgressBar
          currentAmount={currentAmount}
          nextTarget={nextTierTarget}
          percent={overallProgressPercent}
        />

        {/* Dual-track Legend */}
        <DualTrackLegend />

        {/* Tier Grid */}
        <div className="space-y-5">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span>🎯</span> ฟีเจอร์ตามระดับการสนับสนุน
          </h2>
          {tiers.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              currentAmount={currentAmount}
              presenter={presenter}
            />
          ))}
        </div>

        {/* Community Note */}
        <CommunityNote />

        {/* Donation CTA */}
        <DonationCTA currentAmount={currentAmount} />

        {/* Back to home */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            ← กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
