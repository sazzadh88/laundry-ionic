import { Component, ViewChildren, QueryList } from "@angular/core";

import {
  Platform,
  MenuController,
  IonRouterOutlet,
  ToastController
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Config } from "./config";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  public user: any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "My Cart",
      url: "/cart",
      icon: "cart"
    },
    {
      title: "My Orders",
      url: "/my-order",
      icon: "ios-basket"
    },
    {
      title: "Settings",
      url: "/profile",
      icon: "cog"
    },
    {
      title: "Logout",
      url: "/login",
      icon: "log-out"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public config: Config,
    private menu: MenuController,
    private router: Router,
    private toast: ToastController
  ) {
    this.user = this.config.getUser();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      // close side menua
      try {
        const element = await this.menu.getOpen();
        if (element !== null) {
          this.menu.close();
          return;
        }
      } catch (error) {}

      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url === "/home") {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            // this.platform.exitApp(); // Exit from app
            navigator["app"].exitApp(); // work for ionic 4
          } else {
          }
        }
      });
    });
  }
}
