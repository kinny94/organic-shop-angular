import { ProductService } from './../../../services/product.service';
import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent{

	categories$;
	product = {};

	constructor(
		private categoryService: CategoryService,
		private productService: ProductService,
		private router: Router,
		private route: ActivatedRoute ){

		this.categories$ = categoryService.getCategories().valueChanges();
		let id = this.route.snapshot.paramMap.get('id');
		if( id ){
			this.productService.getProduct( id ).subscribe( product => {
				this.product = product;
			})
		}

	}

	emailFormControl = new FormControl('', [
		Validators.required
	]);

	save( product ){
		this.productService.create( product );
		this.router.navigate([ '/admin/products' ]);
	}
}
