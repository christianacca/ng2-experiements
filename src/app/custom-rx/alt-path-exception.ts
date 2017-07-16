export const ALT_PATH_EXCEPTION =
    new Error('ALT_PATH_EXCEPTION: Throw to signal downstream code in a promise/observable chain to skip their main success path');
(ALT_PATH_EXCEPTION as any).isError = false;
