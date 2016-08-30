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
      '</div>');

  t.ok(typeof dom.getElement === 'function',
      'Function getElement is imported.');

  let htmlElementById = dom.getElementById('div1');
  let htmlElementNone = dom.getElementById('noId');
  let htmlElementDiv2 = dom.getElement('div.foo');
  let htmlElementDivs = dom.getAllElements('div');

  t.true(htmlElementById.isDefined(), 'htmlElementById.isDefined() === true');
  t.false(htmlElementById.isEmpty(), 'htmlElementById.isEmpty() === false');

  t.false(htmlElementNone.isDefined(), 'htmlElementNone.isDefined() === false');
  t.true(htmlElementNone.isEmpty(), 'htmlElementNone.isEmpty() === true');

  t.true(htmlElementDiv2.isDefined(),
      'htmlElementDiv2.isDefined() === true');
  t.false(htmlElementDiv2.isEmpty(),
      'htmlElementDiv2.isEmpty() === false');

  t.equal(htmlElementDivs.length, 3, 'htmlElementDivs.length === 2');

  t.equal(htmlElementDiv2.innerHTML, 'foo',
      'htmlElementDiv2.innerHTML === "foo"');

  htmlElementDiv2.innerHTML = 'bar';

  t.equal(htmlElementDiv2.innerHTML, 'bar',
      'htmlElementDiv2.innerHTML === "bar"');

  document.body.removeChild(document.getElementById('test'));

  t.end();

});
