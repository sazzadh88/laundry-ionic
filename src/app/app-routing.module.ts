import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthService } from "./auth.service";
import { TabsPageComponent } from "./tabs-page/tabs-page.component";
import { CategoryDetailsPage } from "./category-details/category-details.page";

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
  {
    path: "list",
    loadChildren: () => import("./list/list.module").then(m => m.ListPageModule)
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
