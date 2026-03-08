import {
    CreateHomeItemData,
    HomeItem,
    HomeStats,
    IHomeRepository,
    UpdateHomeItemData,
} from '@/src/application/repositories/IHomeRepository';
import { Metadata } from 'next';

export interface HomeViewModel {
  items: HomeItem[];
  stats: HomeStats;
  totalCount: number;
  page: number;
  perPage: number;
}

export class HomePresenter {
  constructor(private readonly repository: IHomeRepository) {}

  async getViewModel(page: number = 1, perPage: number = 10): Promise<HomeViewModel> {
    const [paginatedResult, stats] = await Promise.all([
      this.repository.getPaginated(page, perPage),
      this.repository.getStats(),
    ]);

    return {
      items: paginatedResult.data,
      stats,
      totalCount: paginatedResult.total,
      page,
      perPage,
    };
  }

  generateMetadata(): Metadata {
    return {
      title: "หน้าหลัก | Prayer Times",
      description: "ระบบแสดงเวลาละหมาด",
    };
  }

  async createHomeItem(data: CreateHomeItemData): Promise<HomeItem> {
    return await this.repository.create(data);
  }

  async updateHomeItem(id: string, data: UpdateHomeItemData): Promise<HomeItem> {
    return await this.repository.update(id, data);
  }

  async deleteHomeItem(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async getHomeItemById(id: string): Promise<HomeItem | null> {
    return await this.repository.getById(id);
  }
}
