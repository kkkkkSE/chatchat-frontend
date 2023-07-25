/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
/// <reference types='codeceptjs' />
type StepsFile = typeof import('./steps_file.js');

declare namespace CodeceptJS {
  interface SupportObject {
    I: I; current: any;
  }
  interface Methods extends Playwright {}
  interface I extends ReturnType<StepsFile> {}
  namespace Translation {
    interface Actions {}
  }
}
