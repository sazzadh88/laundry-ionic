import { Component, OnInit } from "@angular/core";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-womentab",
  templateUrl: "./womentab.page.html",
  styleUrls: ["./womentab.page.scss"]
})
export class WomentabPage implements OnInit {
  data: any;

  constructor(public events: Events) {
    this.events.subscribe("data:dress", dress => {
      this.data = dress;
      console.log("Dress event found for women", this.data.women);
    });
  }

  ngOnInit() {}

  ionViewWillLeave() {
    this.events.unsubscribe("data:dress");
    this.events.publish("data:dress");
  }
}
