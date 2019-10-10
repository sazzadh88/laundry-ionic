import { Component, OnInit } from "@angular/core";
import { Config } from "../config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, NavigationExtras } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { AdmobFreeService } from "../admobfree.service";
import { AdMobFreeBannerConfig, AdMobFree } from "@ionic-native/admob-free/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  token: string;
  user: any;
  response: any;

  constructor(
    private config: Config,
    private http: HttpClient,
    private router: Router,
    public loadingController: LoadingController,
    private admobFreeService: AdmobFreeService,
    private admobFree: AdMobFree
  ) {
    this.token = this.config.getToken();
    this.user = this.config.getUser();
  }

  ngOnInit() {
    // this.showBanner();
    // this.admobFreeService.InterstitialAd();
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  openCategory(category) {
    localStorage.setItem("category", category);
    let navigationExtras: NavigationExtras = {
      state: {
        data: category
      }
    };
    this.router.navigate(["category-details"], navigationExtras);
  }

  showBanner() {
    console.log("started");

    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: true,
      autoShow: true,
      id: "ca-app-pub-5187363226010265/1429333250"
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner
      .prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));
  }
}
