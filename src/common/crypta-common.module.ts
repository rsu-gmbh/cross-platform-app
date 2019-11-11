import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InfoComponent } from "./info/info.component";
import { MainComponent } from "./main/main.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CryptaItemComponent } from "./crypta-item/crypta-item.component";
import { CryptaListComponent } from "./crypta-list/crypta-list.component";
import { AddContainerComponent } from "./add-container/add-container.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AddItemComponent } from "./add-item/add-item.component";
import { SettingComponent } from "./setting/setting.component";
import { NotificationComponent } from "./notification/notification.component";

@NgModule({
  declarations: [
    InfoComponent,
    MainComponent,
    CryptaItemComponent,
    CryptaListComponent,
    AddContainerComponent,
    AddItemComponent,
    SettingComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [NotificationComponent]
})
export class CryptaCommonModule {}
