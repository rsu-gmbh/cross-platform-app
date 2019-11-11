import {
  Component,
  TemplateRef,
  OnInit,
  ChangeDetectorRef
} from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { BottomBarService } from "./bottom-bar.service";
import { CryptaService } from "../crypt/service/crypta.service";

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 * @deprecated Only supported on Chrome and Android Webview.
 */
interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "crossplatform-app";
  bottomBarContent: TemplateRef<any> = null;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private cryptaService: CryptaService,
    public bottomBarService: BottomBarService
  ) {}

  ngOnInit(): void {
    this.bottomBarService.content.subscribe((content: TemplateRef<any>) => {
      this.bottomBarContent = content;
      this.cd.detectChanges();
    });

    window.addEventListener(
      "beforeinstallprompt",
      (e: BeforeInstallPromptEvent) => {
        // Stash the event so it can be triggered later.
        console.log("can install the pwa");
        e.prompt();
        e.userChoice.then(choiceResult => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
        });

        //deferredPrompt = e;
        // Update UI notify the user they can add to home screen
        //showInstallPromotion();
      }
    );

    window.addEventListener("appinstalled", evt => {
      console.log("a2hs installed");
    });

    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        const regex = /\/crypta\/\d+/gm;
        if (regex.exec(ev.url) !== null) {
        } else {
          this.cryptaService.lockAll();
        }
      }
    });
  }
}
