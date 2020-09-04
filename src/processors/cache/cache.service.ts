/**
 * 缓存服务
 */

import { RedisClient } from 'redis';
import { Inject, CACHE_MANAGER, Injectable } from '@nestjs/common';
import { ExtLoggerService } from '../helper/logger.service';

export type TCacheKey = string;
export type TCacheResult<T> = Promise<T>;

// Cache 客户端管理器
export interface ICacheManager {
  store: {
    getClient(): RedisClient;
  };
  get(key: TCacheKey): any;
  set(key: TCacheKey, value: string, options: { ttl: number}): any;
}

@Injectable()
export class CacheService {
  private cache: ICacheManager;

  constructor(@Inject(CACHE_MANAGER) cache: ICacheManager, @Inject(ExtLoggerService) logger: ExtLoggerService) {
    this.cache = cache;
    this.redisClient.on('ready', () => {
      logger.log('Redis 已准备好');
    })
  }

  private get redisClient(): RedisClient {
    return this.cache.store.getClient();
  }

  private get checkCacheServiceAvailable(): boolean {
    return this.redisClient.connected;
  }

  public get<T>(key: TCacheKey): TCacheResult<T> {
    if (!this.checkCacheServiceAvailable) {
      return Promise.reject('redis尚未准备好')
    }
    return this.cache.get(key);
  }

  public set<T>(key: TCacheKey, value: string, options?: { ttl: number}): TCacheResult<T> {
    if (!this.checkCacheServiceAvailable) {
      return Promise.reject('redis尚未准备好')
    }
    return this.cache.set(key, value, options);
  }
}