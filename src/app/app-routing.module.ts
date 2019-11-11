import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InfoComponent } from "../common/info/info.component";
import { MainComponent } from "../common/main/main.component";
import { CryptaListComponent } from "../common/crypta-list/crypta-list.component";
import { AddContainerComponent } from "../common/add-container/add-container.component";
import { AddItemComponent } from "../common/add-item/add-item.component";
import { SettingComponent } from "src/common/setting/setting.component";

const routes: Routes = [
  {
    path: "info",
    component: InfoComponent
  },
  {
    path: "settings",
    component: SettingComponent
  },
  {
    path: "crypta/add",
    component: AddContainerComponent
  },
  {
    path: "crypta/:id",
    component: CryptaListComponent
  },
  {
    path: "crypta/:id/add-item",
    component: AddItemComponent
  },
  {
    path: "**",
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
