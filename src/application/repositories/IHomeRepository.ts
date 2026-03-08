export interface HomeItem {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HomeStats {
  totalItems: number;
  activeItems: number;
  inactiveItems: number;
}

export interface CreateHomeItemData {
  name: string;
  description?: string;
}

export interface UpdateHomeItemData {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface IHomeRepository {
  getById(id: string): Promise<HomeItem | null>;
  getAll(): Promise<HomeItem[]>;
  getPaginated(page: number, perPage: number): Promise<PaginatedResult<HomeItem>>;
  getByUserId(userId: string): Promise<HomeItem[]>;
  create(data: CreateHomeItemData): Promise<HomeItem>;
  update(id: string, data: UpdateHomeItemData): Promise<HomeItem>;
  delete(id: string): Promise<boolean>;
  getStats(): Promise<HomeStats>;
}
