import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Shop} from '../../shop/shop';

@Component({
  selector: 'app-admin-shops',
  templateUrl: './admin-shops.component.html',
  styleUrls: ['./admin-shops.component.css']
})
export class AdminShopsComponent implements OnInit {

  @ViewChild('editGenre', {static: false}) editGenreTemplate: ElementRef;

  dataSource: MatTableDataSource<Shop>;
  shops: Shop[] = [
    {_id : '1', name: 'Amazon', url: 'amazon.com'},
    {_id : '2', name: 'La Casa Del Libro', url: 'casadellibro.com'},
    {_id : '3', name: 'Abacus', url: 'abacus.com'},
  ];

  displayedColumns: string[] = ['id', 'name', 'action'];
  registerForm: FormGroup;
  newshopForm: FormGroup;
  myControl = new FormControl();
  curentShop: Shop;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.shops);

    this.registerForm = new FormGroup({
      _id : new FormControl(['', Validators.required]),
      name: new FormControl(['', Validators.required])
    });
    this.newshopForm = new FormGroup({
      name: new FormControl(['', Validators.required])
    });
  }

}
