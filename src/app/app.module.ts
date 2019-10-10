import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AuthService } from "./auth.service";
import { HttpClientModule } from "@angular/common/http";
import { Config } from "./config";
import { AdMobFree } from "@ionic-native/admob-free/ngx";
import { CategoryDetailsPageModule } from "./category-details/category-details.module";
import { AdmobFreeService } from "./admobfree.service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CategoryDetailsPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    AdmobFreeService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    Config,
    CategoryDetailsPageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
