import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MODAL_DATA } from './services/modal/modal.service';
import { LoadingInterceptor } from './interceptors/loading/loading.interceptor';
import { RequestOptionsInterceptor } from './interceptors/request-token/request-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FeaturesModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestOptionsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: MODAL_DATA, useValue: { data: undefined } },
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
