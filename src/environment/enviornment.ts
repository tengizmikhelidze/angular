import { AppConfig } from '../app/core/load-config-json/models';

export const environment: AppConfig = {
  baseHref: '/',
  apiUrl: '/',
  appVersion: require('../../package.json').version,
};
