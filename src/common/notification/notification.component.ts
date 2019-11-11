import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NotificationService } from "./notification.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent implements OnInit {
  show = false;
  message = "";

  constructor(
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.notificationService.notifications.subscribe(notification => {
      this.show = true;
      this.message = notification;
      setTimeout(() => {
        this.show = false;
        this.cd.detectChanges();
      }, 3000);
      this.cd.detectChanges();
    });
  }
}
