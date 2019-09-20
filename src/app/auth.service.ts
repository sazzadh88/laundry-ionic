import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Events } from "@ionic/angular";
import { Config } from "src/app/config";

@Injectable({
  providedIn: "root"
})
export class AuthService implements CanActivate {
  constructor(
    private router: Router,
    public events: Events,
    public config: Config
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      this.config.getToken() === null ||
      this.config.getToken() === undefined
    ) {
      this.router.navigateByUrl("login");
      return false;
    }

    return true;
  }
}
