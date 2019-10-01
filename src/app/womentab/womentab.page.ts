import { Component, OnInit } from "@angular/core";
import { Events, LoadingController } from "@ionic/angular";
import { Config } from "../config";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-womentab",
  templateUrl: "./womentab.page.html",
  styleUrls: ["./womentab.page.scss"]
})
export class WomentabPage implements OnInit {
  data: any;
  token: any;
  response: any;

  constructor(
    public events: Events,
    public config: Config,
    private router: Router,
    public loadingController: LoadingController,
    private http: HttpClient
  ) {
    this.token = this.config.getToken();
    this.events.subscribe("data:dress", dress => {
      this.data = dress;
      console.log("Dress event found for women", this.data);
    });
  }

  ngOnInit() {}

  ionViewwillLeave() {
    this.events.unsubscribe("data:dress");
  }

  ionViewDidLeave() {
    this.events.publish("data:dress", this.data);
  }

  addToCart(item) {
    this.showLoader("Adding to cart");
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + this.token
    });

    this.http
      .post(
        this.config.API_URL + "addToCart",
        { item: item },
        { headers: headers }
      )
      .subscribe(
        data => {
          this.response = data;
          this.loadingController.dismiss();
          this.config.showToast(this.response.response);
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

  goToCart() {
    this.router.navigateByUrl("cart");
  }
}
