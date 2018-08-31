import { map } from 'rxjs/operators';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent{

	products$ = [];
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

			this.products$ = allProducts;
		})).subscribe();
	}

	ngOnInit() {
	}

}
