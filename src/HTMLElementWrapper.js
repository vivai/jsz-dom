// @flow

'use strict';

import {SPACE} from 'jsz-string';

const htmlElementProto = HTMLElement.prototype;

export default class HTMLElementWrapper {
  element: ?HTMLElement;

  constructor(element: ?HTMLElement = null) {
    this.element = element;
  }

  _apply(fun: Function, args: Array<any>) {
    let result = null;
    if (this.isDefined()) {
      result = fun.apply (this.element, args);
    }
    return result;
  }

  isDefined() {
    return this.element != null;
  }

  isEmpty() {
    return this.element == null;
  }

  onClick(listener: ?Function, useCapture: boolean = false) {
    if (listener == null) {
      throw new Error('Listener ist not defined!');
    } else {
      this._apply(htmlElementProto.addEventListener,
          ['click', listener, useCapture]);
    }
  }

  removeCssClass(...cssClasses: Array<string>) {
    let newCssClasses = this.getCssClasses()         // get classes as array
      .filter( cssClass => {                         // filter all classes
        return !cssClasses.some(obsoleteCssClass => { // they are in cssClasses
          return cssClass === obsoleteCssClass
        });
      });
    this.setCssClass.apply( this, newCssClasses);
    return this;
  }

  setCssClass(...cssClasses: Array<string>) {
    return this._apply(
        htmlElementProto.setAttribute,['class', cssClasses.join(SPACE)]);
  }

  addCssClass(...cssClasses: Array<string>) {
    let newCssClasses = new Set(cssClasses);
    this.getCssClasses().forEach( cssClass => {
      newCssClasses.add(cssClass);
    });
    this.setCssClass.apply(this, Array.from(newCssClasses));
    return this;
  }

  hasCssClass(cssClass: string) {
    return this.getCssClasses()
      .some( currentCssClass => currentCssClass === cssClass);
  }

  getCssClasses() {
    let cssClasses = this._apply(
        htmlElementProto.getAttribute, ['class']);
    return cssClasses ? cssClasses.split(SPACE) : [];
  }

  equals(htmlElement: HTMLElement|HTMLElementWrapper) {
    let result = false;

    if (htmlElement instanceof HTMLElementWrapper) {
      result = htmlElement.element === this.element;
    } else {
      result = htmlElement === this.element;
    }

    return result;
  }

  get innerHTML(): ?string {
    return this.element == null ? null : this.element.innerHTML;
  }

  set innerHTML(html: ?string) {
    if (this.element != null && html != null) {
      this.element.innerHTML = html;
    }
  }
}
