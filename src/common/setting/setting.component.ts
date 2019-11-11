import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  AfterViewInit
} from "@angular/core";
import { BottomBarService } from "src/app/bottom-bar.service";
import { FormBuilder } from "@angular/forms";
import { JsonstoreSetting } from "src/persist/jsonstore/jsonstore-setting";
import { JsonstoreSettingsService } from "src/persist/jsonstore/jsonstore-settings.service";
import { CryptaService } from "src/crypt/service/crypta.service";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.scss"]
})
export class SettingComponent implements OnInit, AfterViewInit {
  @ViewChild("bottomBarContent", { static: true })
  bottomBarContent: TemplateRef<any>;

  settingForm = this.fb.group({
    url: [""],
    key: [""]
  });

  constructor(
    private bottomBarService: BottomBarService,
    private fb: FormBuilder,
    private settingsService: JsonstoreSettingsService,
    private cryptaService: CryptaService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.bottomBarService.setContent(this.bottomBarContent);
    this.load();
  }

  saveSetting() {
    const setting = this.settingForm.value;
    const jsonstoreSetting = new JsonstoreSetting(
      "master",
      setting.url,
      setting.key
    );
    this.settingsService.addSetting(jsonstoreSetting);
    this.settingsService.activateSetting("master");
    this.cryptaService.load();
  }

  load() {
    const activeSetting = this.settingsService.getActiveSetting();
    if (activeSetting) {
      this.settingForm.patchValue({
        url: this.settingsService.getActiveSetting().apiUrl,
        key: this.settingsService.getActiveSetting().apiKey
      });
    }
  }
}
