import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Config } from "../config";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.page.html",
  styleUrls: ["./order-details.page.scss"]
})
export class OrderDetailsPage implements OnInit {
  data: any;
  token: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private config: Config,
    private http: HttpClient,
    public loadingController: LoadingController
  ) {
    this.token = this.config.getToken();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() {
    if (!this.data) {
      this.router.navigate(["my-order"]);
    }

    console.log(this.data);
  }

  async showLoader(msg) {
    const loading = await this.loadingController.create({
      message: msg
    });
    await loading.present();
  }

  confirmDelivery(id) {
    this.showLoader("Please wait..");
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + this.token
    });

    this.http
      .post(
        this.config.API_URL + "confirmDelivery",
        { id: id },
        { headers: headers }
      )
      .subscribe(
        data => {
          this.loadingController.dismiss();
          this.config.showToast("Confirmed as delivered");
        },
        error => {
          this.loadingController.dismiss();
          this.config.showToast(
            "Failed! Please check your internet connection"
          );
        }
      );
  }
}
