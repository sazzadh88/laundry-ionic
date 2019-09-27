import { Component } from "@angular/core";
import { Config } from "../config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, NavigationExtras } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  token: string;
  user: any;
  response: any;

  constructor(
    private config: Config,
    private http: HttpClient,
    private router: Router,
    public loadingController: LoadingController
  ) {
    this.token = this.config.getToken();
    this.user = this.config.getUser();
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  openCategory(category) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: category
      }
    };
    this.router.navigate(["category-details"], navigationExtras);
  }
}
