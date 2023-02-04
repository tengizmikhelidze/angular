import { AppConfigService } from '../services';

export function InitConfig(configService: AppConfigService) {
  // load the config file in this function
  return () => configService.init();
}
