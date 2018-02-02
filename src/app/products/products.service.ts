import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Product } from '../shared/models/product';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProductsService {

	products: Product[] = [];

	constructor(private http: Http) {}

	getProducts(): Promise<Product[]> {
		return this.http.get('https://smktesting.herokuapp.com/api/products/')
		.toPromise()
		.then(res => res.json())
		.then(products => this.products = products);
	}

	getProduct(id: number): Promise<Product> {
		return this.getProducts()
		.then(products => products.find(product => product.id === id));
	}
}