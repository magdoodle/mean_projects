import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {
  myErrors: any;
  newProduct: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.newProduct = { name: '', qty: '', price: '' }
    this._route.params.subscribe((params: Params) => console.log(params['id']));
  }
  addProductForm() {
    let observable = this._httpService.createProduct(this.newProduct);
    observable.subscribe(data => {
      console.log(data)
      if (data['errors']) {
        this.myErrors = data['errors']
        console.log("Mags - error inside addProductForm function")
        console.log(this.myErrors)
      }
      else {
        console.log('form data from addRest', data)
        this.newProduct = { name: '', qty: '', price: '' }
        this._router.navigate(['/home']);
      }
    })
  }
}

