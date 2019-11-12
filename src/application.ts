import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RestExplorerBindings, RestExplorerComponent } from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import * as path from 'path';
import { MySequence } from './app/infraestructura/config/sequence';

export class CircularApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    /*// Binding infrastructure context
    this.bind(USER_MAPPER).toProvider(UserMapperProvider);
    this.bind(ROUND_MAPPER).toProvider(RoundMapperProvider);
    this.bind(USER_REPOSITORY).toProvider(UserRepositoryProvider);
    this.bind(GAME_REPOSITORY).toProvider(GameRepositoryProvider);
    this.bind(ROUND_REPOSITORY).toProvider(RoundRepositoryProvider);

    // Binding domain context
    this.bind(USER_SERVICE).toProvider(UserServiceProvider);
    this.bind(GAME_SERVICE).toProvider(GameServiceProvider);

    // Binding application context
    this.bind(USER_APP_MAPPER).toProvider(UserAppMapperProvider);
    this.bind(BOOT_GAME_APP_SERVICE).toProvider(BootGameAppServiceProvider);
    this.bind(PLAYERS_SAVED_APP_MAPPER).toProvider(PlayersSavedAppMapperProvider);
    this.bind(ROUND_APP_MAPPER).toProvider(RoundAppMapperProvider);
    this.bind(ROUND_APP_SERVICE).toProvider(RoundAppServiceProvider);
    this.bind(WINNER_APP_MAPPER).toProvider(WinnerAppMapperProvider);*/

    // this.bind(RestBindings.SequenceActions.REJECT).toProvider(ErrorHandlerProvider);

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;

    this.bootOptions = {
      controllers: {
        extensions: ['.controller.js'],
        glob: '/app/infrastructure/controller/',
      },
      repositories: {
        extensions: ['.repository.js'],
        glob: '/app/infrastructure/repository/loopback/',
      },
      datasources: {
        extensions: ['.datasource.js'],
        glob: '/app/infrastructure/repository/datasources/',
      },
    };
  }
}
