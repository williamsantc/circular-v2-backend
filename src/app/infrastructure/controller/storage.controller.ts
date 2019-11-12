import { inject } from '@loopback/core';
import {
  post,
  requestBody,
  del,
  param,
  get,
  getFilterSchemaFor,
  Request,
  Response,
  RestBindings,
} from '@loopback/rest';
import { Filter } from '@loopback/repository';
import { promisify } from 'util';

import { StorageService } from '../repository/storage/service/storage.service';
import { Container } from '../repository/storage/model/container.model';
import { File } from '../repository/storage/model/file.model';
import { STORAGE_SERVICE } from '../../../providers/infrastructure/storage/storage.service.provider';

export class StorageGcController {
  @inject(STORAGE_SERVICE)
  private storageService: StorageService;

  constructor(
    @inject(RestBindings.Http.REQUEST) public request: Request,
    @inject(RestBindings.Http.RESPONSE) public response: Response,
  ) {}

  @post('/containers', {
    responses: {
      '200': {
        description: 'Container model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Container } } },
      },
    },
  })
  async createContainer(@requestBody() container: Container): Promise<Container> {
    const createContainer = promisify(this.storageService.createContainer);
    return createContainer(container);
  }

  @get('/containers', {
    responses: {
      '200': {
        description: 'Array of Containers model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Container } },
          },
        },
      },
    },
  })
  async findContainer(
    @param.query.object('filter', getFilterSchemaFor(Container)) filter?: Filter,
  ): Promise<Container[]> {
    const getContainers = promisify(this.storageService.getContainers);
    return getContainers();
  }

  @get('/containers/{containerName}', {
    responses: {
      '200': {
        description: 'Container model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Container } } },
      },
    },
  })
  async findContainerByName(@param.path.string('containerName') containerName: string): Promise<Container> {
    const getContainer = promisify(this.storageService.getContainer);
    return getContainer(containerName);
  }

  @del('/containers/{containerName}', {
    responses: {
      '204': {
        description: 'Container DELETE success',
      },
    },
  })
  async deleteContainerByName(@param.path.string('containerName') containerName: string): Promise<boolean> {
    const destroyContainer = promisify(this.storageService.destroyContainer);
    return destroyContainer(containerName);
  }

  @get('/containers/{containerName}/files', {
    responses: {
      '200': {
        description: 'Array of Files model instances belongs to container',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': File } },
          },
        },
      },
    },
  })
  async findFilesInContainer(
    @param.path.string('containerName') containerName: string,
    @param.query.object('filter', getFilterSchemaFor(Container)) filter?: Filter,
  ): Promise<File[]> {
    const getFiles = promisify(this.storageService.getFiles);
    return getFiles(containerName, {});
  }

  @get('/containers/{containerName}/files/{fileName}', {
    responses: {
      '200': {
        description: 'File model instances belongs to container',
        content: { 'application/json': { schema: { 'x-ts-type': File } } },
      },
    },
  })
  async findFileInContainer(
    @param.path.string('containerName') containerName: string,
    @param.path.string('fileName') fileName: string,
  ): Promise<File> {
    const getFile = promisify(this.storageService.getFile);
    return getFile(containerName, fileName);
  }

  @del('/containers/{containerName}/files/{fileName}', {
    responses: {
      '204': {
        description: 'File DELETE from Container success',
      },
    },
  })
  async deleteFileInContainer(
    @param.path.string('containerName') containerName: string,
    @param.path.string('fileName') fileName: string,
  ): Promise<boolean> {
    const removeFile = promisify(this.storageService.removeFile);
    return removeFile(containerName, fileName);
  }

  @post('/containers/{containerName}/upload', {
    responses: {
      '200': {
        description: 'Upload a Files model instances into Container',
        content: { 'application/json': { schema: { 'x-ts-type': File } } },
      },
    },
  })
  async upload(@param.path.string('containerName') containerName: string): Promise<File> {
    const upload = promisify(this.storageService.upload);
    return upload(containerName, this.request, this.response, {});
  }

  @get('/containers/{containerName}/download/{fileName}', {
    responses: {
      '200': {
        description: 'Download a File within specified Container',
        content: { 'application/json': { schema: { 'x-ts-type': Object } } },
      },
    },
  })
  async download(
    @param.path.string('containerName') containerName: string,
    @param.path.string('fileName') fileName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const download = promisify(this.storageService.download);
    return download(containerName, fileName, this.request, this.response);
  }
}
