import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, pt_BR } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ConfigComponent } from './components/config/config.component';
import { YouTubePlayerModule } from '@angular/youtube-player'
import { PlayerComponent } from './components/youtube/player/player.component';
import { StorageService } from './services/storage.service';
import { NotificationService } from './services/notification.service';
import { SessionComponent } from './components/session/session.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PagesComponent } from './pages/pages.component';

registerLocaleData(pt);



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ConfigComponent,
    PlayerComponent,
    SessionComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    YouTubePlayerModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: pt_BR }, StorageService, NotificationService,
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfigComponent, SessionComponent]
})
export class AppModule { }
