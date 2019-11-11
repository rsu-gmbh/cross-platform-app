import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { BottomBarService } from '../../app/bottom-bar.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CryptaService } from '../../crypt/service/crypta.service';

@Component({
  selector: 'app-add-container',
  templateUrl: './add-container.component.html',
  styleUrls: ['./add-container.component.scss']
})
export class AddContainerComponent implements OnInit, AfterViewInit {

  containerForm = this.fb.group({
    name: [''],
    description: [''],
    password: [''],
    repeatPassword: ['']
  });

  @ViewChild('bottomBarContent', {static: true})
  bottomBarContent: TemplateRef<any>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private bottomBarService: BottomBarService,
    private cryptaService: CryptaService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.bottomBarService.setContent(this.bottomBarContent);
  }

  saveContainer() {
    const container = this.containerForm.value;

    if (container.password == container.repeatPassword) {
      this.cryptaService.addCryptaContainer(container.password, container.name, container.description);
    }
    this.router.navigateByUrl('crypta');
  }
}
