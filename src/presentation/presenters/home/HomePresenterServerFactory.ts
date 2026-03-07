import { StaticHomeRepository } from '@/src/infrastructure/repositories/static/StaticHomeRepository';
import { HomePresenter } from './HomePresenter';

export class HomePresenterServerFactory {
  static create(): HomePresenter {
    const repository = new StaticHomeRepository();
    return new HomePresenter(repository);
  }
}

export function createServerHomePresenter(): HomePresenter {
  return HomePresenterServerFactory.create();
}
