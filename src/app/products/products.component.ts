import { Product } from './../admin/admin-products/admin-products.component';
import { map } from 'rxjs/operators';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';

export interface Product{
	id: string,
	title: string,
	category: string,
	price: number,
	imageUrl: string
}

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})

export class ProductsComponent{

	products$: Product[] = [];
	backupProducts$: Product[] = [];
	categories$ = [];

	active = "";

	constructor( productService: ProductService, categoryService: CategoryService ) {
		productService.getAll().pipe( map( data => {
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

			return allProducts;
		})).subscribe(( products ) => {
			this.products$ = products;
			this.backupProducts$ = products;
		});

		categoryService.getCategories().valueChanges().pipe( map( data => {
			return data;
		})).subscribe(( categories ) => {
			console.log( categories );
			this.categories$ = categories;
		});
	}

	getDataForCategory( category, index ){

		this.active = '.mat-tab-label-active';
		if( category === "allProducts"){
			this.products$ = this.backupProducts$;
		}else{
			this.products$ = this.backupProducts$;
			this.products$ = this.products$.filter( product => product.category === category );
		}
	}

	ngOnInit() {
	}

}
