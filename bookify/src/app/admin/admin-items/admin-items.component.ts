import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../../models/item/item';
import {DataItemService} from '../../models/item/data-item.service';
import {Shop} from '../../models/shop/shop';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css']
})
export class AdminItemsComponent implements OnInit {

  @ViewChild('editItem', {static: false}) editTemplate: ElementRef;

  dataSource: MatTableDataSource<Item>;
  items: Item[];

  displayedColumns: string[] = ['id', 'shop_id', 'book_id', 'price', 'action'];
  registerForm: FormGroup;
  newItemForm: FormGroup;
  current: Item;

  constructor(private modalService: NgbModal, private dataService: DataItemService) { }

  ngOnInit() {
    this.dataService.getItems().subscribe(
      result => {
        this.items = result.items;
        this.dataSource = new MatTableDataSource(this.items);
      }
    );

    this.registerForm = new FormGroup({
      _id : new FormControl(['', Validators.required]),
      shop_id: new FormControl(['', Validators.required]),
      book_id: new FormControl(['', Validators.required]),
      price: new FormControl(['', Validators.required]),
    });

    this.newItemForm = new FormGroup({
      shop_id: new FormControl(['', Validators.required]),
      book_id: new FormControl(['', Validators.required]),
      price: new FormControl(['', Validators.required]),
    });
  }

  remove(id: any) {
    this.dataService.deleteItem(id)
      .subscribe(() => {
          this.items.forEach((item, index) => {
            if (item._id === id) {
              this.items.splice(index, 1);
            }
          });

          this.dataSource = new MatTableDataSource(this.items);
        }
      );
  }

  onEditItem() {
    const toUpdate = [];

    if (this.current.shop_id !== this.registerForm.get('shop_id').value) {
      this.current.shop_id = this.registerForm.get('shop_id').value;
      toUpdate.push({propName: 'shop_id', value: this.registerForm.get('shop_id').value});
    }

    if (this.current.book_id !== this.registerForm.get('book_id').value) {
      this.current.book_id = this.registerForm.get('book_id').value;
      toUpdate.push({propName: 'book_id', value: this.registerForm.get('book_id').value});
    }

    if (this.current.price !== this.registerForm.get('price').value) {
      this.current.price = this.registerForm.get('price').value;
      toUpdate.push({propName: 'price', value: this.registerForm.get('price').value});
    }

    if (toUpdate.length === 0) {
      this.modalService.dismissAll();
      return;
    }

    this.dataService.updateItem(this.current._id, toUpdate)
      .subscribe(res => {
          this.dataSource = new MatTableDataSource(this.items);
          this.modalService.dismissAll();
        }
      );
  }

  openEditItem(item: Item) {
    this.current = item;
    this.registerForm.controls['shop_id'].setValue(item.shop_id);
    this.registerForm.controls['book_id'].setValue(item.book_id);
    this.registerForm.controls['price'].setValue(item.price);
    this.openModal(this.editTemplate, 'modal-edit-item');
  }

  onNewItem() {
    const item = new Item();
    item.shop_id = this.newItemForm.get('shop_id').value;
    item.book_id = this.newItemForm.get('book_id').value;
    item.price = this.newItemForm.get('price').value;

    this.dataService. newItem(item)
      .subscribe(res => {
          this.items.push(res['createdItem']);
          this.dataSource = new MatTableDataSource(this.items);
        }, (err) => {
          console.log(err);
        }
      );
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
