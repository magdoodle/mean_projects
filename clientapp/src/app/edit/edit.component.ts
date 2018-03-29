
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  oneproduct: any;
  myErrors: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe(data => {
      this.id = data['id']
      console.log(data['id'])
    })
    console.log("getting id in edit", this.id);
    let observable = this._httpService.getSingleProduct(this.id);
    observable.subscribe(data => {
      console.log("data from the edit.comp.ts", data)
      this.oneproduct = data;
    })
  }
  editProductForm(id) {
    console.log(this.oneproduct)
    let observable = this._httpService.editProduct(this.id, this.oneproduct);
    // console.log("printing from editform", this.oneproduct)
    observable.subscribe(data => {
      if (data['errors']) {
        this.myErrors = data['errors']
        // console.log(this.myErrors)
      }
      else {
        // console.log("this.oneproduct",this.oneproduct)
        // console.log("data", data)
        // this.oneproduct = data;
        // console.log("from the editProductForm in edit.ts", data)
        this._router.navigate(['/home']);
      }
    })
  }
}

