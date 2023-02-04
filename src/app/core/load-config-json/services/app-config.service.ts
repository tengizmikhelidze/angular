import { Injectable } from '@angular/core';
import { AppConfig } from '../models';
import { environment } from '@environment';
const CONFIG_URL: string = '/config.json';
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  appConfig: AppConfig = {} as AppConfig;
  init() {
    fetch(CONFIG_URL)
      .then((response) => response.json())
      .then((config) => {
        this.appConfig = {
          ...this.appConfig,
          ...config,
        };
        environment.apiUrl = this.appConfig.apiUrl;
        environment.baseHref = this.appConfig.baseHref;
      })
      .catch((error) => {
        console.log('Cant Read Config.JSON\n\n', error);
      });
  }

  get Config(): AppConfig {
    return this.appConfig;
  }
}
