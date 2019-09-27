import { Component, OnInit } from "@angular/core";
import { Config } from "../config";
import { LoadingController } from "@ionic/angular";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"]
})
export class CartPage implements OnInit {
  token: any;
  data: any;
  sum: any;
  constructor(
    private config: Config,
    public loadingController: LoadingController,
    private http: HttpClient
  ) {
    this.token = this.config.getToken();
  }

  ngOnInit(): void {
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
          console.log(this.data);
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
  async showLoader(msg) {
    const loading = await this.loadingController.create({
      message: msg
    });
    await loading.present();
  }

  total() {
    this.sum = this.data.data.reduce((total, p) => {
      console.log(p, total);

      return total + p.price * p.quantity;
    }, 0);
  }
}
