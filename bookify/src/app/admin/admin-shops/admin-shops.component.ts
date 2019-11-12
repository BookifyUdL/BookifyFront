import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Shop} from '../../shop/shop';
import {Achievement} from '../../achievement/achievements';

@Component({
  selector: 'app-admin-shops',
  templateUrl: './admin-shops.component.html',
  styleUrls: ['./admin-shops.component.css']
})
export class AdminShopsComponent implements OnInit {

  @ViewChild('editShop', {static: false}) editShopTemplate: ElementRef;

  dataSource: MatTableDataSource<Shop>;
  shops: Shop[] = [
    {_id : '1', name: 'Amazon', url: 'amazon.com'},
    {_id : '2', name: 'La Casa Del Libro', url: 'casadellibro.com'},
    {_id : '3', name: 'Abacus', url: 'abacus.com'},
  ];

  displayedColumns: string[] = ['id', 'name', 'url', 'action'];
  registerForm: FormGroup;
  newShopForm: FormGroup;
  myControl = new FormControl();
  currentShop: Shop;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.shops);

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
    shop._id = String(Number(this.shops[this.shops.length - 1]._id) + 1);

    this.shops.push(shop);
    this.dataSource = new MatTableDataSource(this.shops);
    this.modalService.dismissAll();
  }

  openEditShop(shop: Shop) {
    this.currentShop = shop;
    this.registerForm.controls['name'].setValue(shop.name);
    this.registerForm.controls['url'].setValue(shop.url);


    this.openModal(this.editShopTemplate, 'modal-edit-shop');
  }

  onEditShop() {
    this.currentShop.name = this.registerForm.get('name').value;
    this.currentShop.url = this.registerForm.get('url').value;
    this.modalService.dismissAll();
  }

  remove(id: any) {
    this.shops = this.shops.filter(shop => String(shop._id) !== String(id));
    this.dataSource = new MatTableDataSource(this.shops);
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
