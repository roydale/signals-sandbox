import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  showLoader = signal(false);

  toggleLoaderDisplay(value: boolean) {
    this.showLoader.set(value);
  }
}
