import { Container } from '../model/container.model';
import { File } from '../model/file.model';

export type Callback<T> = (err: Error | null, reply: T) => void;

export interface StorageService {
  // container methods
  createContainer(container: Partial<Container>, cb: Callback<Container>): void;
  destroyContainer(containerName: string, cb: Callback<boolean>): void;
  getContainers(cb: Callback<Container[]>): void;
  getContainer(containerName: string, cb: Callback<Container>): void;
  // file methods
  getFiles(containerName: string, options: Object, cb: Callback<File[]>): void;
  getFile(containerName: string, fileName: string, cb: Callback<File>): void;
  removeFile(containerName: string, fileName: string, cb: Callback<boolean>): void;
  // main methods
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload(containerName: string, req: any, res: any, options: Object, cb: Callback<any>): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  download(containerName: string, fileName: string, req: any, res: any, cb: Callback<any>): void;
}
