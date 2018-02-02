import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import 'rxjs/add/operator/switchMap';

import { ProductsService } from '../products.service';
import { Product } from '../../shared/models/product';
import { Comment } from '../../shared/models/comment';
import { AuthService } from '../../shared/auth.service';


@Component({
	selector: 'app-product-item',
	templateUrl: './product-item.component.html'
})


export class ProductItemComponent implements OnInit{

	myForm: FormGroup;
	error = false;
	errorMessage = '';

	constructor(
		private productsService: ProductsService,
		private route: ActivatedRoute,
		private location: Location,
		private authService: AuthService,
		private formb: FormBuilder
		) {}

	@Input() product: Product;

	comments: Comment[];

	getProduct() {
		this.route.params
		.switchMap((params: Params) => this.productsService.getProduct(+params['id']))
		.subscribe(product => this.product = product);
	}

	isAuth() {
		return this.authService.isAuthenticated();
	}

	getComments() {
		this.route.params
		.switchMap((params: Params) => this.productsService.getComments(+params['id']))
		.subscribe(comments => this.comments = comments);
	}

	onPostComment() {
		this.route.params
		.switchMap((params: Params) => this.productsService.postComment(this.myForm.value, +params['id']))
		.subscribe(() => this.getComments());
		this.myForm.reset({text: '', rate: 1});
	}


	ngOnInit() {
		this.getProduct();
		this.getComments();
		this.myForm = this.formb.group({
			text: ['', Validators.required],
			rate: [1, Validators.required],
		});
	}

}
