import { ICart } from './../models/cart';
import { ProduitsService } from './../produits.service';
import { Component, OnInit } from '@angular/core';
import { IProductAdded } from '../models/product';
import { EventType } from '@angular/router';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {
  public selectionValues: Record<string, number> = {};


  constructor(public produitsService: ProduitsService) { }

  ngOnInit() { }

  productsQuantity(quantity: number) {
    return Array.from({ length: quantity }, (_, i) => i + 1)
  }

  setValue(product: IProductAdded, event: any): void {
    this.selectionValues[product.id] = parseInt(event.target.value);
  }

  filterCategory(event: any) {
    this.produitsService.produits = this.produitsService.produitsFilter;
    switch (event.target.value) {
      case "Food":
        this.produitsService.produits = this.produitsService.produits.filter(product => product.category == "Food");
        break;
      case "Medecine":
        this.produitsService.produits = this.produitsService.produits.filter(product => product.category == "Medecine");
        break;
      case "All":
        this.produitsService.produits = this.produitsService.produitsFilter;
        break;
    }

  }

  addPanierProduct(product: IProductAdded, quantity: number, index: number): void {
    if (!quantity) {
      alert('Choisissez  la quantité pour ajouter le produit dans le panier');
      return
    }
    const productInCart = {
      id: product.id,
      productName: product.productName,
      price: Math.round((product.price) * 100) / 100,
      quantity: quantity,
      total: Math.round((product.price * quantity) * 100) / 100
    }
    const alreadyAdded: ICart[] = this.produitsService.cart.filter(data => data.id == product.id);
    if (alreadyAdded.length > 0) {
      this.produitsService.cart.map(product => {
        if (product.id === alreadyAdded[0].id) {
          product.quantity += quantity;
          this.produitsService.produits[index].quantity -= quantity;
          this.produitsService.cartQuantity += quantity;
          return
        }
      })
    } else {
      this.produitsService.cart.push(productInCart);
      this.produitsService.produits[index].quantity -= quantity;
      this.produitsService.cartQuantity += quantity;
    }
  }

}
