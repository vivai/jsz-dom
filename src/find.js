// @flow

'use strict';

import HTMLElementWrapper from './HTMLElementWrapper';

export let getElement =
  (selectors: string,
   htmlElement: HTMLElement|Document = document
  ): HTMLElementWrapper =>
    new HTMLElementWrapper(htmlElement.querySelector(selectors));


export let getAllElements =
  (selectors: string,
   htmlElement: HTMLElement|Document = document
  ) :Array<HTMLElementWrapper> =>
    Array.from(htmlElement.querySelectorAll(selectors))
      .map((htmlElement: HTMLElement) => new HTMLElementWrapper(htmlElement));

export let getElementById =
  (id: string): HTMLElementWrapper =>
    new HTMLElementWrapper(document.getElementById(id));
