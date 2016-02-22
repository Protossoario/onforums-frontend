/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/Dispatcher';
import { FocusStore } from 'stores//FocusStore';
import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

describe('FocusStore', () => {

  let storeClass;

  // Instanciate a new store for every test
  beforeEach(() => {
    storeClass = AltTestingUtils.makeStoreTestable(alt, FocusStore);
  });
});
