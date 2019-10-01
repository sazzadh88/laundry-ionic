import { Component, OnInit } from "@angular/core";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-category-details",
  templateUrl: "./category-details.page.html",
  styleUrls: ["./category-details.page.scss"]
})
export class CategoryDetailsPage implements OnInit {
  data: any;

  constructor(public events: Events) {}

  ngOnInit() {}
}
