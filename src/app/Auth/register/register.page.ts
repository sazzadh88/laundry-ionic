import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { Config } from "src/app/config";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  response_data: any;
  checkoutForm: any;
  constructor(
    public loadingController: LoadingController,
    private config: Config,
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: "",
      phone: "",
      email: "",
      password: ""
    });
  }

  ngOnInit() {}

  register(formreg) {
    this.showLoader("Authenticating");
    this.http
      .post(this.config.API_URL + "register", { data: formreg })
      .subscribe(
        data => {
          this.response_data = data;
          this.loadingController.dismiss();
          if (this.response_data.success) {
            this.presentAlert(this.response_data.response);
            this.router.navigateByUrl("login");
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
      header: "Alert",
      message: msg,
      buttons: ["OK"]
    });

    await alert.present();
  }

  onSubmit(data) {
    console.log(data);
  }
}
