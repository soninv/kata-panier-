import { Component } from '@angular/core';
import { ProduitsService } from '../produits.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent {
  constructor(public produitsService: ProduitsService) { }

  removeProductCart(index: number): void {
    this.produitsService.produits.map(produit => {
      if (produit.id === this.produitsService.cart[index].id) {
        produit.quantity += this.produitsService.cart[index].quantity;
        this.produitsService.cartQuantity -= this.produitsService.cart[index].quantity;
      }
    })
    this.produitsService.cart.splice(index, 1);
  }

}
