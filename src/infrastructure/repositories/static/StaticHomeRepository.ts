import {
    CreateHomeItemData,
    HomeItem,
    HomeStats,
    IHomeRepository,
    PaginatedResult,
    UpdateHomeItemData,
} from "@/src/application/repositories/IHomeRepository";

const STATIC_HOME_ITEMS: HomeItem[] = [
  {
    id: "item-001",
    name: "ข้อมูลต้อนรับ",
    description: "ยินดีต้อนรับสู่ระบบเวลาละหมาด",
    isActive: true,
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T10:30:00.000Z",
  }
];

export class StaticHomeRepository implements IHomeRepository {
  private items: HomeItem[] = [...STATIC_HOME_ITEMS];

  async getById(id: string): Promise<HomeItem | null> {
    await this.delay(100);
    return this.items.find((item) => item.id === id) || null;
  }

  async getAll(): Promise<HomeItem[]> {
    await this.delay(100);
    return [...this.items];
  }

  async getPaginated(page: number, perPage: number): Promise<PaginatedResult<HomeItem>> {
    await this.delay(100);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedItems = this.items.slice(start, end);

    return {
      data: paginatedItems,
      total: this.items.length,
      page,
      perPage,
    };
  }

  async getByUserId(userId: string): Promise<HomeItem[]> {
    await this.delay(100);
    return [...this.items];
  }

  async create(data: CreateHomeItemData): Promise<HomeItem> {
    await this.delay(200);
    const newItem: HomeItem = {
      id: `item-${Date.now()}`,
      ...data,
      description: data.description || "",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.items.unshift(newItem);
    return newItem;
  }

  async update(id: string, data: UpdateHomeItemData): Promise<HomeItem> {
    await this.delay(200);
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("HomeItem not found");
    }
    const updatedItem: HomeItem = {
      ...this.items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.items[index] = updatedItem;
    return updatedItem;
  }

  async delete(id: string): Promise<boolean> {
    await this.delay(200);
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    this.items.splice(index, 1);
    return true;
  }

  async getStats(): Promise<HomeStats> {
    await this.delay(100);
    const totalItems = this.items.length;
    const activeItems = this.items.filter((item) => item.isActive).length;
    const inactiveItems = totalItems - activeItems;
    return {
      totalItems,
      activeItems,
      inactiveItems,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const staticHomeRepository = new StaticHomeRepository();
