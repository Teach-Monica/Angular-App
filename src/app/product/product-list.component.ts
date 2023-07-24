import { Component, OnInit} from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: String = "Product List";
    imageWidth: number = 50;
    imageMargin : number = 2;
    showImage: boolean = false;
    // adding an error message property for subscription.
    errorMessage:String='';
    // listFilter: String = "cart"; 
    // instead of the above variable we are going with getters and setters.
    private _listFilter = '';

    get listFilter() : string{
        return this._listFilter
    }

    set listFilter(value:string){
        this._listFilter=value;
        console.log(`setting filter to ${value}`);
        this.filteredProducts = this.performFilter(value);
    }

    // filtering the product list array
    // making a copy of products arrays so that we don't loose our original array.
    filteredProducts : IProduct[] = [];

    products : IProduct[] = [];
    //injectig the service to the component.
    constructor (private productService: ProductService){}

    toggleImage(): void {
        this.showImage=!this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error:err => this.errorMessage = err
        });
        
    }

    performFilter(filterBy: string) : IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product : IProduct)=>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string): void {
        this.pageTitle = `Product List - ${message}`;
    }
}