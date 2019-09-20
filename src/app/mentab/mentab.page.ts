import { Component, OnInit, OnDestroy } from "@angular/core";
import { Events } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public events: Events
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.category;
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {}

  ionViewWillLeave() {
    this.events.publish("data:dress", this.dress);
  }
}
