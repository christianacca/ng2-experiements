import { InjectionToken, ErrorHandler } from '@angular/core';

// used internally by angular to create error chains
export const ERROR_ORIGINAL_ERROR = 'ngOriginalError';

export const NG_ERROR_HANDLER = new InjectionToken('defaultErrorHandler');

export function ngErrorHandlerFactory() { return new ErrorHandler() };

export const ngErrorHandlerProvider = { provide: NG_ERROR_HANDLER, useFactory: ngErrorHandlerFactory};
