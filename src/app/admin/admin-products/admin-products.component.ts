import { Subscription } from 'rxjs';
import { ProductService } from './../../../services/product.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

export interface Product {
	id: string,
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

export class AdminProductsComponent implements OnDestroy{

	subscription: Subscription;
	displayedColumns: string[] = ['title', 'price', 'category', 'edit', 'delete'];
	dataSource: MatTableDataSource<Product>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

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
			});

			this.dataSource = new MatTableDataSource( allProducts );
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		})).subscribe();
	}

	delete( id ){
		if( confirm('Are you sure you want to delete this product?' )){
			this.productService.delete( id );
			this.router.navigate([ '/admin/products' ]);
		}
	}

	filter( query:string ){
		query = query.trim(); // Remove whitespace
   		query = query.toLowerCase(); // Datasource defaults to lowercase matches
    	this.dataSource.filter = query;
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}







