import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { CryptaCommonModule } from "../common/crypta-common.module";
import { MatButtonModule } from "@angular/material/button";
import { BottomBarComponent } from "./bottom-bar/bottom-bar.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { PersistanceService } from "src/persist/persistance.service";
import { JsonstorePersistanceService } from "src/persist/jsonstore/jsonstore-persistance.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, BottomBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    CryptaCommonModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    [{ provide: PersistanceService, useClass: JsonstorePersistanceService }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
