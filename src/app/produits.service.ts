import { Category, IProductAdded } from './models/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICart } from './models/cart';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  public CategoryEnum = Category;

  public produits: IProductAdded[] = [];
  public produitsFilter: IProductAdded[] = [];
  public cart: ICart[] = [];
  public cartQuantity: number = 0;

  constructor(private http: HttpClient) {
    this.getProduits().subscribe(produits => {
      this.produits = produits;
      this.produitsFilter = produits;
    })
  }

  getProduits(): Observable<IProductAdded[]> {
    const url = `https://run.mocky.io/v3/0ff2e26d-34dc-41cc-8b87-f1d247a0f5e1`;
    return this.http.get<IProductAdded[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
