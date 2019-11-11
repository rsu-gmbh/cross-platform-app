import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CryptaContainer } from '../../crypt/interface/crypta.interface';
import { CryptaService } from '../../crypt/service/crypta.service';
import { BottomBarService } from '../../app/bottom-bar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('bottomBarContent', {static: true})
  bottomBarContent: TemplateRef<any>;

  containers: CryptaContainer[] = [];

  constructor(private router: Router, private bottomBarService: BottomBarService, private cryptaService: CryptaService) {
    this.cryptaService.containers.subscribe((data: CryptaContainer[]) => {
      if (data) {
        this.containers = data;
      }
    });
  }

  ngOnInit() {
    this.bottomBarService.setContent(this.bottomBarContent);
  }

  unlockContainer(container: CryptaContainer, password: string) {
    if (this.cryptaService.unlockContainer(container.id, password)) {
      this.openCrypta(container.id);
    }
  }

  openCrypta(id: number) {
    this.router.navigate(['/crypta/' + id]);
  }

  navigateToAddContainer() {
    this.router.navigateByUrl('crypta/add');
  }
}
