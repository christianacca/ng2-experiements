import { InjectionToken, ErrorHandler } from '@angular/core';

export const NG_ERROR_HANDLER = new InjectionToken('defaultErrorHandler');

export const NgErrorHandlerFactory = () => new ErrorHandler();

export const ngErrorHandlerProvider = { provide: NG_ERROR_HANDLER, useFactory: NgErrorHandlerFactory};
