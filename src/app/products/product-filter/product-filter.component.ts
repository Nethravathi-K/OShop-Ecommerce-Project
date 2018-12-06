import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../category.service';
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent{
  @Input('category') category;
  categories$;
  

  constructor( categoryService:CategoryService, private route: ActivatedRoute) {
    this.categories$=categoryService.getCategories();
   }

}
