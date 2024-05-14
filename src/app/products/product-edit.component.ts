import { Component, OnInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { IProduct } from './products';
import { Subscription } from 'rxjs';
import { ratingValidator } from '../shared/rating-validator';

@Component({
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  pageTitle = 'Product Edit';
  private sub: Subscription = new Subscription();
  errorMessage = '';
  product: IProduct | undefined;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {

    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      rating: ['', [ratingValidator.range(1, 5)]],
      description: ''
    });

    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      }
    };
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id')!;
        if (id !== null && !isNaN(id)) { // Check if id is not null and is a valid number
          this.getProduct(id);
        } 
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  getProduct(id: number): void {
    this.productService.getProducts().subscribe(
      (products) => {
        const product = products.find(p => p.id === id);
        if (product) {
          this.product = product;
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching products';
        console.error(error);
      }
    );
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };
        if (p.id >= 1) { //if the product id bigger than 1 or equal will update , if the id = 0 (in our case and memoryAPi zero means not found product so we create it)
          this.productService.updateProduct(p) //updateProduct is http put that returns observable so we need to subscribe
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.productService.createProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
  
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
}
