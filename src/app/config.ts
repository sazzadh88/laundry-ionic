import { AlertController, ToastController } from "@ionic/angular";

export class Config {
  constructor(
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  API_URL = "http://app.demoonline.co.in/api/";
  API_IMG_URL =
    "http://demoonl2.wwwsg1-ss4.a2hosted.com/laundry-api/laundry-api/public/";

  getToken() {
    return localStorage.getItem("token");
  }
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: "Alert",
      message: msg,
      buttons: ["OK"]
    });

    await alert.present();
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
