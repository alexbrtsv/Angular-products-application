import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../shared/models/product';
import { ProductsService } from './products.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

	products: Product[];

	constructor(private productsService: ProductsService, private router: Router){}

	ngOnInit(){
		this.productsService.getProducts().then(products => this.products = products);
	}

  gotoItem(id): void {
    this.router.navigate(['/product', id]);
  }
}