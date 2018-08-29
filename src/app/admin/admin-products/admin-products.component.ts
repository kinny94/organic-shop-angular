import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
	title: string;
	price: number;
	category: string;
	image: string;
  }

  const ELEMENT_DATA: PeriodicElement[] = [
	{title: "title", price: 23, category: "1.0079", image: 'H'},
	{title: "title", price: 231, category: "4.0026", image: 'He'},
	{title: "title", price: 3213, category: "6.941", image: 'Li'},
	{title: "title", price: 21, category: "9.0122", image: 'Be'},
	{title: "title", price: 212, category: "10.811", image: 'B'},
	{title: "title", price: 343, category: "12.0107", image: 'C'},
	{title: "title", price: 434, category: "14.0067", image: 'N'},
	{title: "title", price: 435, category: "15.9994", image: 'O'},
	{title: "title", price: 324, category: "18.9984", image: 'F'},
	{title: "title", price: 3145, category: "20.1797", image: 'Ne'},
  ];

@Component({
	selector: 'app-admin-products',
	templateUrl: './admin-products.component.html',
	styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit {

	datasource;
	//displayedColumns: string[] = ['title', 'price', 'category', 'url' ];

	constructor( private productService: ProductService ) {
		this.datasource = this.productService.getAll().subscribe( data => {
			this.datasource = data;
			console.log( this.datasource );
		});
	}

	ngOnInit() {
	}

	displayedColumns: string[] = ['title', 'price', 'category', 'image'];
	dataSource = ELEMENT_DATA;

}
