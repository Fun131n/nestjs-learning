import { Injectable, CacheOptionsFactory, CacheModuleOptions, Inject } from "@nestjs/common";
import redisStore from 'cache-manager-redis-store';
import { ClientOpts, RetryStrategyOptions } from "redis";
import * as APP_CONFIG from '@app/app.config';
import { ExtLoggerService } from "../helper/logger.service";

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {

  constructor(@Inject(ExtLoggerService) private readonly logger: ExtLoggerService) {}

  public createCacheOptions(): CacheModuleOptions {
    const redisOptions: ClientOpts = {
      host: APP_CONFIG.REDIS.host,
      port: APP_CONFIG.REDIS.port,
      retry_strategy: this.retryStrategy.bind(this)
    }

    return {
      store: redisStore,
      ttl: APP_CONFIG.REDIS.ttl,
      isCacheableValue: () => true,
      ...redisOptions,
    }
  }

  public retryStrategy(options: RetryStrategyOptions) {
    this.logger.error('Redis 异常' + options.error);

    if (options?.error?.code === 'ECONNREFUSED') {
      return new Error('Redis 服务器拒绝连接');
    }
    if (options.total_retry_time > 1000 * 60) {
      return new Error('Redis 重试时间已用完');
    }
    if (options.attempt > 6) {
      return new Error('Redis 尝试次数已达极限');
    }

    return Math.min(options.attempt * 100, 3000);
  }
}