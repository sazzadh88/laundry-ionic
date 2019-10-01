import { Component, OnInit } from "@angular/core";
import { Platform, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { Config } from "../config";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-my-order",
  templateUrl: "./my-order.page.html",
  styleUrls: ["./my-order.page.scss"]
})
export class MyOrderPage implements OnInit {
  token: any;
  data: any;
  constructor(
    private config: Config,
    public loadingController: LoadingController,
    private http: HttpClient,
    public router: Router
  ) {
    this.token = this.config.getToken();
  }

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders() {
    this.showLoader("Loading...");
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + this.token
    });

    this.http
      .post(this.config.API_URL + "myOrders", {}, { headers: headers })
      .subscribe(
        data => {
          this.data = data;
          this.loadingController.dismiss();
        },
        error => {
          this.loadingController.dismiss();
          this.config.showToast(
            "Failed! Please check your internet connection"
          );
        }
      );
  }

  async showLoader(msg) {
    const loading = await this.loadingController.create({
      message: msg
    });
    await loading.present();
  }

  openOrder(item) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: item
      }
    };
    this.router.navigate(["order-details"], navigationExtras);
  }
}
