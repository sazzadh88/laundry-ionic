import { Component, OnInit } from "@angular/core";
import { Events, LoadingController } from "@ionic/angular";
import { Config } from "../config";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-kidstab",
  templateUrl: "./kidstab.page.html",
  styleUrls: ["./kidstab.page.scss"]
})
export class KidstabPage implements OnInit {
  data: any;
  token: any;
  response: any;

  constructor(
    public events: Events,
    public config: Config,
    private router: Router,
    public loadingController: LoadingController,
    public http: HttpClient
  ) {
    this.token = this.config.getToken();
    // this.events.subscribe("data:dress", dress => {
    //   this.data = dress;
    //   console.log("Dress event found for kinds", this.data.kids);
    // });
  }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("items"));
  }
  ionViewWillEnter() {
    // this.events.subscribe("data:dress", dress => {
    //   this.data = dress;
    //   console.log("Dress event found for kids", this.data);
    // });
    // this.events.subscribe("data:_dress", dress => {
    //   this.data = dress;
    //   console.log("Dress event found for kids", this.data);
    // });
    this.data = JSON.parse(localStorage.getItem("items"));
  }

  ionViewwillLeave() {
    // this.events.unsubscribe("data:dress");
    // this.events.unsubscribe("data:_dress");
  }
  ionViewDidLeave() {
    // this.events.publish("data:dress", this.data);
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

  cartFunction(item, type) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + this.token
    });

    this.http
      .post(
        this.config.API_URL + "cartItemFunction",
        { item: item, type: type, category: localStorage.getItem("category") },
        { headers: headers }
      )
      .subscribe(
        data => {
          this.response = data;
          localStorage.setItem("items", JSON.stringify(this.response.data));
          this.data = this.response.data;
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
