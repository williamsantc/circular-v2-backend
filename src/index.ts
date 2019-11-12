import { CircularApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import { StorageServiceProvider } from './providers/infrastructure/storage/storage.service.provider';

export { CircularApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new CircularApplication(options);

  app.serviceProvider(StorageServiceProvider);

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}
