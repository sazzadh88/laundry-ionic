import { Component, OnInit } from "@angular/core";
import { Config } from "../config";
import { LoadingController } from "@ionic/angular";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { DatePicker } from "@ionic-native/date-picker/ngx";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
  providers: [DatePicker]
})
export class CartPage implements OnInit {
  discount: any;
  token: any;
  data: any;
  sum: any;
  address: any;
  response: any;
  coupon: any;
  deliveryDate: any;
  expected_delivery_date: any;
  constructor(
    private config: Config,
    public loadingController: LoadingController,
    private http: HttpClient,
    private datePicker: DatePicker,
    public route: Router
  ) {
    this.discount = {
      value: 0
    };
    this.token = this.config.getToken();
    this.deliveryDate = new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000
    ).toLocaleDateString();
  }

  ngOnInit(): void {
    this.fetchCartItems();
  }
  async showLoader(msg) {
    const loading = await this.loadingController.create({
      message: msg
    });
    await loading.present();
  }

  total() {
    this.sum = this.data.data.reduce((total, p) => {
      return total + p.price * p.quantity;
    }, 0);
  }

  cartFunction(item, type) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + this.token
    });

    this.http
      .post(
        this.config.API_URL + "cartFunction",
        { item: item, type: type, coupon: this.coupon },
        { headers: headers }
      )
      .subscribe(
        data => {
          this.fetchCartItems();
        },
        error => {
          this.loadingController.dismiss();
          this.config.showToast(
            "Failed! Please check your internet connection"
          );
        }
      );
  }

  fetchCartItems() {
    this.showLoader("Loading Items");
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + this.token
    });

    this.http
      .post(this.config.API_URL + "myCart", {}, { headers: headers })
      .subscribe(
        data => {
          this.data = data;
          this.loadingController.dismiss();
          this.total();
        },
        error => {
          this.loadingController.dismiss();
          this.config.showToast(
            "Failed! Please check your internet connection"
          );
        }
      );
  }

  showDatePicker() {
    this.datePicker
      .show({
        date: new Date(),
        mode: "date",
        minDate: new Date().valueOf(),
        allowOldDates: false,
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
      })
      .then(
        date => {
          this.deliveryDate = date.toLocaleDateString();
          this.expected_delivery_date =
            date.toISOString().split("T")[0] +
            " " +
            date.toTimeString().split(" ")[0];
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  placeOrder() {
    this.showLoader("Placing order! Please wait");

    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + this.token
    });

    this.http
      .post(
        this.config.API_URL + "placeOrder",
        {
          amount: this.sum - this.discount.value,
          discount: this.discount.value,
          address: this.address,
          coupon: this.coupon,
          expected_delivery_date: this.expected_delivery_date
        },
        { headers: headers }
      )
      .subscribe(
        data => {
          this.response = data;
          console.log(this.response);

          this.config.showToast(this.response.response);
          this.loadingController.dismiss();
          this.route.navigateByUrl("/my-order");
        },
        error => {
          this.loadingController.dismiss();
          this.config.showToast(
            "Failed! Please check your internet connection"
          );
        }
      );
  }

  applyCoupon() {
    this.showLoader("Checking coupon! Please wait");

    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + this.token
    });

    this.http
      .post(
        this.config.API_URL + "checkCoupon",
        {
          data: this.coupon
        },
        { headers: headers }
      )
      .subscribe(
        data => {
          this.response = data;
          console.log(this.response);
          this.discount.value = this.response.data.value;
          this.config.showToast(this.response.response);
          this.loadingController.dismiss();
        },
        error => {
          this.config.showToast("Invalid coupon code");
          this.loadingController.dismiss();
        }
      );
  }
}
