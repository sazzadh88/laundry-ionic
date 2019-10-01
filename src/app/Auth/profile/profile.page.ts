import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Config } from "src/app/config";
import { LoadingController, AlertController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  profileUpdateForm: any;
  response_data: any;
  user: any;
  token: any;
  constructor(
    private formBuilder: FormBuilder,
    private config: Config,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private http: HttpClient,
    private router: Router
  ) {
    this.user = this.config.getUser();
    this.token = this.config.getToken();
    this.profileUpdateForm = this.formBuilder.group({
      name: this.user.name,
      phone: this.user.phone,
      email: this.user.email,
      password: ""
    });
    console.log("User", this.user);
  }

  ngOnInit() {}
  updateProfile(data) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + this.token
    });

    this.showLoader("Updating Profile...");
    this.http
      .post(
        this.config.API_URL + "updateProfile",
        { data: data },
        { headers: headers }
      )
      .subscribe(
        data => {
          this.response_data = data;
          this.loadingController.dismiss();
          if (this.response_data.response) {
            this.setUserData(this.token);
            this.presentAlert(this.response_data.response);
          }
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
        this.user = data;
        localStorage.setItem("user", JSON.stringify(this.user.user));
        this.loadingController.dismiss();
        this.router.navigate(["home"]);
      });
  }
}
