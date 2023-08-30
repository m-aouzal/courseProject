import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private formDirtySubject = new BehaviorSubject<boolean>(false);

  get formDirty$() {

    return this.formDirtySubject.asObservable();
  }

  setFormDirty(dirty: boolean) {
    this.formDirtySubject.next(dirty);

  }


 

 
}
