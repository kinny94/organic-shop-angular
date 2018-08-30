import { Observable, of } from 'rxjs';
import { ProductService } from './../../../services/product.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface elements {
	title: string;
	price: number;
	category: string;
	imageUrl: string;
}
@Component({
	selector: 'app-admin-products',
	templateUrl: './admin-products.component.html',
	styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent{

	datasource: Observable<any>;
	displayedColumns: string[] = ['title', 'price', 'category', 'edit', 'delete'];

	constructor( private productService: ProductService, private router: Router  ) {

		this.productService.getAll().pipe( map( data => {

			let allProducts = [];
			data.forEach(element => {
				let obj = {};

				obj["id"] = element.key;
				obj["category"] = element.payload.val()["category"];
				obj["title"] = element.payload.val()["title"];
				obj["price"] = element.payload.val()["price"];
				obj["imageUrl"] = element.payload.val()["imageUrl"];
				allProducts.push( obj );
				obj = {};
			});
			return of( allProducts );
		})).subscribe(( elements ) => {
			this.datasource = elements;
		});
	}

	delete( id ){
		if( confirm('Are you sure you want to delete this product?' )){
			this.productService.delete( id );
			this.router.navigate([ '/admin/products' ]);
		}
	}
}
