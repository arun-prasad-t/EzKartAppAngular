import { ShoppingData } from './../data';
import { ShoppingCart } from './../../models/shopping-cart';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

public categories:any[]=[];
public filteredList =[];
cartUrl = "/app-shopping-cart"


public productList: Product[] = [
    {
        title : 'Iphone7',
        imageUrl : '/assets/images/iphone7.jpg',
        price: 50000,
        category: 'Electronics',
        $key : 'ip7'
    },
    {
      title : 'Oneplus6T',
      imageUrl : '/assets/images/oneplus6t.jpg',
      price: 40000,
      category: 'Electronics',
      $key : 'op6t'
    },
    {
      title : 'CoffeMug',
      imageUrl : '/assets/images/coffe_mug.jpg',
      price: 200,
      category: 'Gifts',
      $key : 'cfgMu'
    },
    {
      title : 'TeddyBear',
      imageUrl : '/assets/images/teddy.jpg',
      price: 400,
      category: 'Gifts',
      $key : 'TdyBr'
    },
    {
      title : 'ChessBoard',
      imageUrl : '/assets/images/chess.jpg',
      price: 265,
      category: 'Games',
      $key : 'ChsBr'
    }
];

public rowData = this.productList;
  constructor(private shoppingData:ShoppingData,
    private router:Router) {  
    this.getCategories(); 
    this.filteredList = this.productList;
  }

  ngOnInit() {    
  }

  getCategories(){
    for(let i=0;i<this.productList.length;i++){
      if(this.categories.some(x=> x==this.productList[i].category)){
        continue;
      }
      else{
        this.categories.push(this.productList[i].category);
      }
    }
    
  }

  applyFilter(category){
    if(category && category.length>0){
      this.filteredList = this.productList.filter(x=> x.category == category);
    }
  }

  clearFilter(){
    this.filteredList = this.productList;
  }

  gotoCart(){
    this.router.navigateByUrl(this.cartUrl);
  }

}
