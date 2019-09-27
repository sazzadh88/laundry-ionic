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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public events: Events
  ) {
    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.data = this.router.getCurrentNavigation().extras.state.data;
    //   }
    // });
  }

  ngOnInit() {}
}
