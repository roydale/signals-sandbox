import { HttpInterceptorFn } from '@angular/common/http';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const destroyRef = inject(DestroyRef);
  const loaderService = inject(LoaderService);

  loaderService.toggleLoaderDisplay(true);
  return next(req).pipe(
    takeUntilDestroyed(destroyRef),
    finalize(() => {
      loaderService.toggleLoaderDisplay(false);
    })
  );
};
