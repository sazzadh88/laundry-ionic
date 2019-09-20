import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoadingController, AlertController, Events } from "@ionic/angular";
import { Config } from "src/app/config";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  providers: [HttpClient, Config]
})
export class LoginPage implements OnInit {
  response_data: any;
  response_user_data: any;

  constructor(
    private http: HttpClient,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private config: Config,
    public events: Events,
    public router: Router
  ) {}

  ngOnInit() {}

  login(form) {
    this.showLoader("Authenticating");
    this.http
      .post(this.config.API_URL + "login", { data: form.value })
      .subscribe(
        data => {
          this.response_data = data;
          localStorage.setItem("token", this.response_data.token);
          this.setUserData(this.response_data.token);
          this.presentAlert(this.response_data.response);
        },
        error => {
          this.loadingController.dismiss();
          this.presentAlert(error.error["error"]);
        }
      );
  }

  async showLoader(msg) {
    const loading = await this.loadingController.create({
      message: msg
    });
    await loading.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: "Alert",
      message: msg,
      buttons: ["OK"]
    });

    await alert.present();
  }

  setUserData(token) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token
    });

    this.http
      .post(this.config.API_URL + "me", {}, { headers: headers })
      .subscribe(data => {
        this.response_user_data = data;
        localStorage.setItem(
          "user",
          JSON.stringify(this.response_user_data.user)
        );
        this.loadingController.dismiss();

        this.router.navigateByUrl("home");
      });
  }
}
