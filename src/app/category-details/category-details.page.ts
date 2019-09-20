import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-category-details",
  templateUrl: "./category-details.page.html",
  styleUrls: ["./category-details.page.scss"]
})
export class CategoryDetailsPage implements OnInit {
  data: any;

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public events: Events
  ) {
    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.data = this.router.getCurrentNavigation().extras.state.category;
    //   }
    // });
  }

  ngOnInit() {}
}
