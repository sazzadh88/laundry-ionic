import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.page.html",
  styleUrls: ["./order-details.page.scss"]
})
export class OrderDetailsPage implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() {
    if (!this.data) {
      this.router.navigate(["my-order"]);
    }

    console.log(this.data);
  }
}
