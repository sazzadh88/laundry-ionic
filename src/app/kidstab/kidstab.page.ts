import { Component, OnInit } from "@angular/core";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-kidstab",
  templateUrl: "./kidstab.page.html",
  styleUrls: ["./kidstab.page.scss"]
})
export class KidstabPage implements OnInit {
  data: any;

  constructor(public events: Events) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.events.subscribe("data:dress", dress => {
      this.data = dress;
      console.log("Dress event found for kids", this.data.kids);
    });
  }

  ionViewWillLeave() {
    this.events.unsubscribe("data:dress");
    this.events.publish("data:dress");
  }
}
