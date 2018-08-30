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
	id;

	constructor(
		private categoryService: CategoryService,
		private productService: ProductService,
		private router: Router,
		private route: ActivatedRoute ){

		this.categories$ = categoryService.getCategories().valueChanges();
		this.id = this.route.snapshot.paramMap.get('id');
		if( this.id ){
			this.productService.getProduct( this.id ).subscribe( product => {
				this.product = product;
			})
		}

	}

	emailFormControl = new FormControl('', [
		Validators.required
	]);

	save( product ){

		if( this.id ){
			//console.log( product );
			this.productService.update( this.id, product );
		}else{
			this.productService.create( product );
		}

		this.router.navigate([ '/admin/products' ]);
	}
}
