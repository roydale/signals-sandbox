import { Component, effect, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  loaderService = inject(LoaderService);

  show: boolean = false;

  loaderEffect = effect(() => {
    this.show = this.loaderService.showLoader();
  });
}
