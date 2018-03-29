
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
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
    let observable = this._httpService.getSingleProduct(this.id);
    observable.subscribe(data => {
      // console.log("detail.ts ngOnIt",  data)
      this.oneproduct = data;
    })
  }
  showPets() {
    let observable = this._httpService.getSingleProduct(this.id);
    observable.subscribe(data => {
      this.oneproduct = data
      console.log(this.oneproduct)
    })
  }
  deleteProduct(id) {
    let observable = this._httpService.sendDelete(id)
    observable.subscribe(data => {
      console.log(data, "deleted")

    })
    this._router.navigate(['/home']);
  }

}

