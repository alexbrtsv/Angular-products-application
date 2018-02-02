import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ProductsService } from '../products.service';
import { Product } from '../../shared/models/product';
import 'rxjs/add/operator/switchMap';


@Component({
	selector: 'app-product-item',
	templateUrl: './product-item.component.html'
})


export class ProductItemComponent implements OnInit{

	constructor(
		private productsService: ProductsService,
		private route: ActivatedRoute,
		private location: Location
		) {}

@Input() product: Product;

	getProduct() {
		this.route.params
		.switchMap((params: Params) => this.productsService.getProduct(+params['id']))
		.subscribe(product => this.product = product);
	}

	ngOnInit() {
	}

}
