import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BottomBarService } from '../../app/bottom-bar.service';
import { CryptaService } from '../../crypt/service/crypta.service';
import { CryptaContainer } from '../../crypt/interface/crypta.interface';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  container: CryptaContainer;

  itemForm = this.fb.group({
    name: [''],
    description: [''],
    secret: ['']
  });

  @ViewChild('bottomBarContent', { static: true })
  bottomBarContent: TemplateRef<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bottomBarService: BottomBarService,
    private cryptaService: CryptaService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.container = this.cryptaService.getContainer(+params.get('id'));
    });
  }

  ngAfterViewInit(): void {
    this.bottomBarService.setContent(this.bottomBarContent);
  }

  saveItem() {
    const item = this.itemForm.value;
    this.cryptaService.addCryptItem(this.container.id, item.name, item.secret);
    this.router.navigateByUrl('/crypta/' + this.container.id);
  }

}
