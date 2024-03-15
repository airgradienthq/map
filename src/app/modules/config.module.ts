import { APP_INITIALIZER, NgModule } from '@angular/core';

import { Config } from '../models/config/config';
import { ConfigService } from '../services/config.service';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => configService.loadConfig(),
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: Config,
      useFactory: (configService: ConfigService) => configService.config,
      deps: [ConfigService]
    },
  ]
})
export class ConfigModule {}
