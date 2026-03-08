'use client';

import { StaticHomeRepository } from '@/src/infrastructure/repositories/static/StaticHomeRepository';
import { HomePresenter } from './HomePresenter';

export class HomePresenterClientFactory {
  static create(): HomePresenter {
    const repository = new StaticHomeRepository();
    return new HomePresenter(repository);
  }
}

export function createClientHomePresenter(): HomePresenter {
  return HomePresenterClientFactory.create();
}
