/**
 * RoadMapPresenterServerFactory
 * Factory for creating RoadMapPresenter instances on the server side
 * ✅ Injects the appropriate repository (Mock or Real)
 */

import { MockRoadMapRepository } from "@/src/infrastructure/repositories/mock/MockRoadMapRepository";
import { RoadMapPresenter } from "./RoadMapPresenter";
// import { SupabaseRoadMapRepository } from '@/src/infrastructure/repositories/supabase/SupabaseRoadMapRepository';
// import { createServerSupabaseClient } from '@/src/infrastructure/supabase/server';

export class RoadMapPresenterServerFactory {
  static create(): RoadMapPresenter {
    // ✅ Use Mock Repository for development
    const repository = new MockRoadMapRepository();

    // ⏳ TODO: Switch to Supabase Repository when backend is ready
    // const supabase = createServerSupabaseClient();
    // const repository = new SupabaseRoadMapRepository(supabase);

    return new RoadMapPresenter(repository);
  }
}

export function createServerRoadMapPresenter(): RoadMapPresenter {
  return RoadMapPresenterServerFactory.create();
}
