/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
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
