import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthService } from "./auth.service";
import { CategoryDetailsPage } from "./category-details/category-details.page";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then(m => m.HomePageModule),
    canActivate: [AuthService]
  },
  { path: "login", loadChildren: "./Auth/login/login.module#LoginPageModule" },
  {
    path: "my-order",
    loadChildren: "./my-order/my-order.module#MyOrderPageModule"
  },
  {
    path: "category-details",
    component: CategoryDetailsPage,
    children: [
      {
        path: "mentab",
        loadChildren: "./mentab/mentab.module#MentabPageModule"
      },
      {
        path: "womentab",
        loadChildren: "./womentab/womentab.module#WomentabPageModule"
      },
      {
        path: "kidstab",
        loadChildren: "./kidstab/kidstab.module#KidstabPageModule"
      },
      {
        path: "",
        redirectTo: "mentab",
        pathMatch: "full"
      }
    ]
  },
  { path: "cart", loadChildren: "./cart/cart.module#CartPageModule" },
  {
    path: "order-details",
    loadChildren: "./order-details/order-details.module#OrderDetailsPageModule"
  },
  {
    path: "register",
    loadChildren: "./Auth/register/register.module#RegisterPageModule"
  },
  {
    path: "profile",
    loadChildren: "./Auth/profile/profile.module#ProfilePageModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
