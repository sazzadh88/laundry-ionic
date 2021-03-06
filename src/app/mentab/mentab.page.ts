import { Component, OnInit, OnDestroy } from "@angular/core";
import { Events, LoadingController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Config } from "../config";

@Component({
  selector: "app-mentab",
  templateUrl: "./mentab.page.html",
  styleUrls: ["./mentab.page.scss"]
})
export class MentabPage implements OnInit {
  dress = {
    men: [
      {
        name: "Men1",
        price: "Rs 20"
      },
      {
        name: "Men2",
        price: "Rs 202"
      }
    ],
    women: [
      {
        name: "Women1",
        price: "Rs 20"
      },
      {
        name: "Women2",
        price: "Rs 202"
      }
    ],
    kids: [
      {
        name: "Kids 1",
        price: "Rs 20"
      },
      {
        name: "Kids 2",
        price: "Rs 202"
      }
    ]
  };
  data: any;
  response: any;
  token: any;
  category: any;
  quantity_s = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public events: Events,
    public http: HttpClient,
    public loadingController: LoadingController,
    public config: Config
  ) {
    this.token = this.config.getToken();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit(): void {
    this.showLoader("Loading Items");
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + this.token
    });

    this.http
      .post(
        this.config.API_URL + "getItems",
        { type: this.category },
        { headers: headers }
      )
      .subscribe(
        data => {
          this.data = data;
          this.loadingController.dismiss();
          console.log(this.data);
          localStorage.setItem("items", JSON.stringify(this.data));
          let s = localStorage.getItem("items");
          console.log(JSON.parse(s));
        },
        error => {
          this.loadingController.dismiss();
          this.config.showToast(
            "Failed! Please check your internet connection"
          );
        }
      );
  }

  ionViewWillEnter() {
    this.data = JSON.parse(localStorage.getItem("items"));
  }

  async showLoader(msg) {
    const loading = await this.loadingController.create({
      message: msg
    });
    await loading.present();
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

  ionViewWillLeave() {
    this.events.publish("data:dress", this.data);
    this.events.publish("data:_dress", this.data);
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
