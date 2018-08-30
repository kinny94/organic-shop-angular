import { of, Subscription } from 'rxjs';
import { ProductService } from './../../../services/product.service';
import { Component, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Sort } from '@angular/material';

export interface Product {
	title: string;
	price: number;
	category: string;
	imageUrl: string;
}

function compare(a, b, isAsc) {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


@Component({
	selector: 'app-admin-products',
	templateUrl: './admin-products.component.html',
	styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnDestroy{

	products: Product[];
	filteredProducts: any[];
	subscription: Subscription;
	displayedColumns: string[] = ['title', 'price', 'category', 'edit', 'delete'];

	sortedData: Product[];

	constructor( private productService: ProductService, private router: Router  ) {

		this.subscription = this.productService.getAll().pipe( map( data => {

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

				this.filteredProducts = this.products = allProducts;
				this.sortedData = this.products.slice();
			});
			return of( allProducts );
		})).subscribe();
	}

	delete( id ){
		if( confirm('Are you sure you want to delete this product?' )){
			this.productService.delete( id );
			this.router.navigate([ '/admin/products' ]);
		}
	}

	filter( query:string ){
		this.filteredProducts = ( query ) ?
		this.products.filter( product => product.title.toLowerCase().includes( query.toLowerCase() )) :
		this.products;
	}

	sortData(sort: Sort) {
		const data = this.products.slice();
		if (!sort.active || sort.direction === '') {
			this.sortedData = data;
			return;
		}

		this.sortedData = data.sort((a, b) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'title': return compare(a.title, b.title, isAsc);
				case 'price': return compare(a.price, b.price, isAsc);
				case 'category': return compare(a.category, b.category, isAsc);
				default: return 0;
			}
		});

		this.filteredProducts = this.sortedData;
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
