import { BindingKey, Provider } from '@loopback/context';
import { StorageService } from '../../../app/infraestructura/repository/storage/service/storage.service';
import { getService, juggler } from '@loopback/service-proxy';
import { StorageDataSource } from '../../../app/infraestructura/repository/datasources';

export class StorageServiceProvider implements Provider<StorageService> {
  constructor(protected dataSource: juggler.DataSource = new StorageDataSource()) {}

  value(): Promise<StorageService> {
    return getService(this.dataSource);
  }
}

export const STORAGE_SERVICE = BindingKey.create<StorageService>('services.StorageService');
