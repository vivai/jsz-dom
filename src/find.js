// @flow

'use strict';

import HTMLElementWrapper from './HTMLElementWrapper';
import HTMLInputElementWrapper from './HTMLInputElementWrapper';

export let getById =
  (id:string
  ): HTMLElementWrapper =>
  new HTMLElementWrapper(document.getElementById(id));

export let getInputById =
  (id:string
  ): HTMLInputElementWrapper =>
    new HTMLInputElementWrapper(document.getElementById(id));


export let getByQuery =
  (selectors: string,
   htmlElement: HTMLElement|Document = document
  ): HTMLElementWrapper =>
    new HTMLElementWrapper(htmlElement.querySelector(selectors));

export let getAllByQuery =
  (selectors: string,
   htmlElement: HTMLElement|Document = document
  ) :Array<HTMLElementWrapper> =>
    Array.from(htmlElement.querySelectorAll(selectors))
      .map((htmlElement: HTMLElement) => new HTMLElementWrapper(htmlElement));

export let getByClass =
  (className: string,
   htmlElement: HTMLElement|Document = document
  ): HTMLElementWrapper =>
    new HTMLElementWrapper(htmlElement.querySelector(`.${className}`));

export let getAllByClass =
  (className: string,
   htmlElement: HTMLElement|Document = document
  ) :Array<HTMLElementWrapper> =>
    Array.from(htmlElement.querySelectorAll(`.${className}`))
      .map((htmlElement: HTMLElement) => new HTMLElementWrapper(htmlElement));

