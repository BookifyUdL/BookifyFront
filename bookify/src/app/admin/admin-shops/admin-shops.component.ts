import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Shop} from '../../models/shop/shop';
import {Achievement} from '../../models/achievement/achievements';
import {DataAuthorService} from '../../models/author/data-author.service';
import {DataShopService} from '../../models/shop/data-shop.service';

@Component({
  selector: 'app-admin-shops',
  templateUrl: './admin-shops.component.html',
  styleUrls: ['./admin-shops.component.css']
})
export class AdminShopsComponent implements OnInit {

  @ViewChild('editShop', {static: false}) editShopTemplate: ElementRef;

  dataSource: MatTableDataSource<Shop>;
  shops: Shop[];

  displayedColumns: string[] = ['id', 'name', 'url', 'action'];
  registerForm: FormGroup;
  newShopForm: FormGroup;
  myControl = new FormControl();
  currentShop: Shop;

  constructor(private modalService: NgbModal, private dataService: DataShopService) { }

  ngOnInit() {
    this.dataService.getShops().subscribe(
      result => {
        this.shops = result.shops;
        this.dataSource = new MatTableDataSource(this.shops);
      }
    );

    this.registerForm = new FormGroup({
      _id : new FormControl(['', Validators.required]),
      name: new FormControl(['', Validators.required]),
      url: new FormControl(['', Validators.required])
    });
    this.newShopForm = new FormGroup({
      name: new FormControl(['', Validators.required]),
      url: new FormControl(['', Validators.required])
    });
  }

  onNewShop() {
    const shop = new Shop();
    shop.name = this.newShopForm.get('name').value;
    shop.url = this.newShopForm.get('url').value;

    this.dataService.newShop(shop)
      .subscribe(res => {
          this.shops.push(res['createdShop']);
          this.dataSource = new MatTableDataSource(this.shops);
        }, (err) => {
          console.log(err);
        }
      );

    this.modalService.dismissAll();
  }

  openEditShop(shop: Shop) {
    this.currentShop = shop;
    this.registerForm.controls['name'].setValue(shop.name);
    this.registerForm.controls['url'].setValue(shop.url);


    this.openModal(this.editShopTemplate, 'modal-edit-shop');
  }

  onEditShop() {
    const toUpdate = [];

    if (this.currentShop.name !== this.registerForm.get('name').value) {
      this.currentShop.name = this.registerForm.get('name').value;
      toUpdate.push({propName: 'name', value: this.registerForm.get('name').value});
    }

    if (this.currentShop.url !== this.registerForm.get('url').value) {
      this.currentShop.url = this.registerForm.get('url').value;
      toUpdate.push({propName: 'url', value: this.registerForm.get('url').value});
    }

    if (toUpdate.length === 0) {
      this.modalService.dismissAll();
      return;
    }

    this.dataService.updateShop(this.currentShop._id, toUpdate)
      .subscribe(res => {
          this.dataSource = new MatTableDataSource(this.shops);
          this.modalService.dismissAll();
        }
      );
  }

  remove(id: any) {
    this.dataService.deleteShop(id)
      .subscribe(() => {
          this.shops.forEach((item, index) => {
            if (item._id === id) {
              this.shops.splice(index, 1);
            }
          });

          this.dataSource = new MatTableDataSource(this.shops);
        }
      );
  }

  openModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: id}).result.
    then((result) => {
      this.registerForm.reset();
      this.newShopForm.reset();
    }, (reason) => {
      this.registerForm.reset();
      this.newShopForm.reset();
    });
  }
}
