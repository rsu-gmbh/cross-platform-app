import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  private notificationsSource = new BehaviorSubject<string>("");
  notifications = this.notificationsSource.asObservable();

  constructor() {}

  notify(message: string) {
    this.notificationsSource.next(message);
  }
}
