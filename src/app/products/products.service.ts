import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { Product } from '../shared/models/product';
import { Comment } from '../shared/models/comment';

@Injectable()
export class ProductsService {

	baseUrl = "https://smktesting.herokuapp.com/api/";
	products: Product[] = [];
	comments: Comment[];

	constructor(private http: Http) {}

	getProducts(): Promise<Product[]> {
		return this.http.get(this.baseUrl + 'products/')
		.toPromise()
		.then(res => res.json())
		.then(products => this.products = products);
	}

	getProduct(id: number): Promise<Product> {
		return this.getProducts()
		.then(products => products.find(product => product.id === id));
	}

	getComments(id: number): Promise<Comment[]> {
		return this.http.get(this.baseUrl + 'reviews/' + id)
		.toPromise()
		.then(res => res.json() as Comment[]);
	}

	postComment(comment, id): Observable<any> {
		let headers = new Headers({'Authorization' : 'Token '+localStorage.getItem('currentUser')});
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.baseUrl + 'reviews/'+ id, comment, options);
	}

}