import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  createProduct(newproduct) {
    return this._http.post('/things', newproduct)
  }
  getProducts() {
    return this._http.get('/things')
  }
  editProduct(id, oneproduct) {
    return this._http.put('/things/' + id, oneproduct)
  }
  sendDelete(id) {
    return this._http.delete('/things/' + id)
  }
  getSingleProduct(id) {
    return this._http.get('/things/' + id)
  }
}


