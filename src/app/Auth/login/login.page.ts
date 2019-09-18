import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [HttpClient]
})
export class LoginPage implements OnInit {

  response_data:any;

  constructor(private http: HttpClient,
    public loadingController: LoadingController,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  login(form) {
    this.showLoader("Authenticating");
    this.http.post('https://laundry.test/api/login', { data: form.value }).subscribe(
      data => {
        this.response_data = data;
        this.presentAlert(this.response_data.response);
        this.loadingController.dismiss();
      },
      error => {
        this.loadingController.dismiss();
        this.presentAlert(error.error['error']);
      }
    );
  }

  async showLoader(msg) {
    const loading = await this.loadingController.create({
      message: msg,
    });
    await loading.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }



}
