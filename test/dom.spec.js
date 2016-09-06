//@flow

'use strict';

import {test} from 'tape';
import * as dom from '../src/dom';

/* eslint-disable no-magic-numbers */

test('dom tests', function(t) {

  document.body.insertAdjacentHTML(
      'afterbegin',
      "<div id='test'>" +
      "<div id='div1' title='div1'></div>" +
      "<div title='div2' class='foo'>foo</div>" +
      '<input id="input"/>'+
      '</div>');

  t.ok(typeof dom.getById === 'function',
      'Function getById is imported.');
  t.ok(typeof dom.getByQuery === 'function',
      'Function getByQuery is imported.');
  t.ok(typeof dom.getAllByQuery === 'function',
      'Function getAllByQuery is imported.');
  t.ok(typeof dom.getByClass === 'function',
      'Function getByClass is imported.');
  t.ok(typeof dom.getAllByClass === 'function',
      'Function getAllByClass is imported.');

  let byId = dom.getById('div1');
  let none = dom.getById('noId');
  let div2 = dom.getByQuery('div.foo');
  let divs = dom.getAllByQuery('div');
  let byClass = dom.getByClass('foo');
  let allByClass = dom.getAllByClass('foo');

  t.true(byId.isDefined(), 'byId.isDefined() === true');
  t.false(byId.isEmpty(), 'byId.isEmpty() === false');

  t.false(none.isDefined(), 'none.isDefined() === false');
  t.true(none.isEmpty(), 'none.isEmpty() === true');

  t.true(div2.isDefined(), 'div2.isDefined() === true');
  t.false(div2.isEmpty(), 'div2.isEmpty() === false');

  t.true(byClass.isDefined(), 'byClass is defined');

  t.equal(divs.length, 3, 'divs.length === 2');

  t.equal(div2.innerHTML, 'foo', 'div2.innerHTML === "foo"');

  div2.innerHTML = 'bar';

  t.equal(div2.innerHTML, 'bar', 'div2.innerHTML === "bar"');

  t.true(div2.equals(byClass),'di2,equals(byClass)');
  t.true(div2.equals(allByClass[0]),'di2,equals(allByClass[0])');

  let input = dom.getInputById('input');

  t.equal(input.value, '', 'input value === ""');

  if (input.element instanceof HTMLInputElement) {
    input.element.value = '42';
  } else {
    t.fail('input.element is not an instance of HTMLInputElement');
  }

  t.equal(input.value, '42', 'input value === 42');


  input.disable();

  if (input.element instanceof HTMLInputElement) {
    t.true(input.element.getAttribute('disabled'), 'is disabled');
  }

  input.enable();
  if (input.element instanceof HTMLInputElement) {
    t.false(input.element.getAttribute('disabled'), 'is disabled');
  }

  document.body.removeChild(document.getElementById('test'));

  t.end();

});
