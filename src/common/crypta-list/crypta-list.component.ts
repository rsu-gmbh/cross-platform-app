import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptItem } from '../../crypt/interface/crypta.interface';
import { CryptaService } from '../../crypt/service/crypta.service';
import { BottomBarService } from '../../app/bottom-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crypta-list',
  templateUrl: './crypta-list.component.html',
  styleUrls: ['./crypta-list.component.scss']
})
export class CryptaListComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscriptions: Subscription[] = [];

  @ViewChild('bottomBarContent', {static: true})
  bottomBarContent: TemplateRef<any>;

  items: CryptItem[] = [];
  selectedId = -1;
  show = false;

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private cryptaService: CryptaService,
    private bottomBarService: BottomBarService) { }

  ngOnInit() {
    const routeSub = this.route.paramMap.subscribe(params => {
      this.selectedId = +params.get('id');
      if (this.selectedId > 0) {
        const container = this.cryptaService.getContainer(this.selectedId);
        if (container.locked) {
          this.router.navigateByUrl('/');
          return;
        }
        const itemsSub = this.cryptaService.getItemsAsObservable(this.selectedId).subscribe(items => {
          this.items = items;
          this.cd.detectChanges();
        });
        this.subscriptions.push(itemsSub);
      }
    });
    this.subscriptions.push(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.bottomBarService.setContent(this.bottomBarContent);
  }

  navigateBack() {
    this.router.navigateByUrl('/');
  }

  lockItem(item: CryptItem) {
    this.cryptaService.lockItem(this.selectedId, item.id);
  }

  unlockItem(item: CryptItem) {
    this.cryptaService.unlockItem(this.selectedId, item.id);
  }

  addItem() {
    this.router.navigateByUrl('/crypta/' + this.selectedId + '/add-item');
  }
}
