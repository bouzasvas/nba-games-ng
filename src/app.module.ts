import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './components/app/app.component';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {GamesComponent} from './components/games/games.component';
import {GameDetailsComponent} from './components/game-details/game-details.component';
import {StandingsComponent} from './components/standings/standings.component';
import {LoaderComponent} from './components/loader/loader.component';
import {AppHttpInterceptor} from './common/http-interceptor';
import {LoggerService} from './services/logger.service';
import {LoaderService} from './services/loader.service';

import {AppAngularMaterialModule} from './app-angular-material.module';
import {HomeComponent} from './components/home/home.component';
import {TeamStatsComponent} from './components/team-stats/team-stats.component';
import {BoxscoreComponent} from './components/boxscore/boxscore.component';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component';
import {GameHighlightsComponent} from './components/game-highlights/game-highlights.component';
import {ImageFallbackDirective} from './directives/image-fallback.directive';
import {AppErrorsModule} from './app-errors-module/app-errors.module';

import {AppErrorHandlerService} from './app-errors-module/handlers/app-error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GamesComponent,
    StandingsComponent,
    LoaderComponent,
    GameDetailsComponent,
    HomeComponent,
    TeamStatsComponent,
    BoxscoreComponent,
    InfoDialogComponent,
    GameHighlightsComponent,
    ImageFallbackDirective
  ],
  imports: [
    AppErrorsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    AppRoutingModule,

    AppAngularMaterialModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
      deps: [LoggerService, LoaderService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
