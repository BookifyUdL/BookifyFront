import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../../models/item/item';
import {DataItemService} from '../../models/item/data-item.service';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css']
})
export class AdminItemsComponent implements OnInit {

  @ViewChild('editItem', {static: false}) editTemplate: ElementRef;

  dataSource: MatTableDataSource<Item>;
  items: Item[] = [
    {_id : '1', shopId: '1', bookId: '1', price: 30},
    {_id : '2', shopId: '3', bookId: '1', price: 30},
    {_id : '3', shopId: '4', bookId: '2', price: 30},
    {_id : '4', shopId: '11', bookId: '3', price: 30},
  ];

  displayedColumns: string[] = ['id', 'shopId', 'bookId', 'price', 'action'];
  registerForm: FormGroup;
  newItemForm: FormGroup;
  current: Item;

  constructor(private modalService: NgbModal, private dataService: DataItemService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.items);

    this.registerForm = new FormGroup({
      _id : new FormControl(['', Validators.required]),
      shopId: new FormControl(['', Validators.required]),
      bookId: new FormControl(['', Validators.required]),
      price: new FormControl(['', Validators.required]),
    });

    this.newItemForm = new FormGroup({
      shopId: new FormControl(['', Validators.required]),
      bookId: new FormControl(['', Validators.required]),
      price: new FormControl(['', Validators.required]),
    });
  }

  remove(id: any) {
    this.items = this.items.filter(item => String(item._id) !== String(id));
    this.dataSource = new MatTableDataSource(this.items);
  }

  onEditItem() {
    this.current.shopId = this.registerForm.get('shopId').value;
    this.current.bookId = this.registerForm.get('bookId').value;
    this.current.price = this.registerForm.get('price').value;
    this.modalService.dismissAll();
  }

  openEditItem(item: Item) {
    this.current = item;
    this.registerForm.controls['shopId'].setValue(item.shopId);
    this.registerForm.controls['bookId'].setValue(item.bookId);
    this.registerForm.controls['price'].setValue(item.price);
    this.openModal(this.editTemplate, 'modal-edit-item');
  }

  onNewItem() {
    const item = new Item();
    item.shopId = this.newItemForm.get('shopId').value;
    item.bookId = this.newItemForm.get('bookId').value;
    item.price = this.newItemForm.get('price').value;
    item._id = String(Number(this.items[this.items.length - 1]._id) + 1);

    this.items.push(item);
    this.dataSource = new MatTableDataSource(this.items);
    this.modalService.dismissAll();
  }

  openModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: id}).result.
    then((result) => {
      this.registerForm.reset();
      this.newItemForm.reset();
    }, (reason) => {
      this.registerForm.reset();
      this.newItemForm.reset();
    });
  }
}
