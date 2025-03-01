/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  const copied = {};
  Object.assign(copied, obj);
  return copied;
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  if (objects.length === 0) {
    return {};
  }
  const merged = { ...objects[0] };
  if (objects.length === 1) {
    return merged;
  }
  Object.entries(objects[1]).forEach(([key, value]) => {
    if (Object.hasOwn(merged, key)) {
      merged[key] += value;
    } else {
      merged[key] = value;
    }
  });
  return merged;
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {Array} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, ['age']) => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const modified = obj;
  Object.keys(modified).forEach((key) => {
    if (keys.includes(key)) {
      delete modified[key];
    }
  });
  return modified;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  const keys = Object.keys(obj1);
  return keys.every((key) => obj1[key] === obj2[key]);
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  if (Object.keys(lettersObject).length === 0) {
    return '';
  }
  const flatValues = Object.values(lettersObject).flatMap((x) => x);
  const array = Array({ length: Math.max(...flatValues) });

  Object.entries(lettersObject).forEach(([letter, positions]) => {
    positions.forEach((position) => {
      array[position] = letter;
      return true;
    });
  });
  return array.join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  const moneyCash = { 25: 0, 50: 0, 100: 0 };
  const ticketCost = '25';
  let result = true;
  if (queue[0] > ticketCost) {
    return false;
  }
  for (let op = 0; op < queue.length; op += 1) {
    const pay = queue[op].toString();
    if (op === 0 && pay === ticketCost) {
      moneyCash[pay] += 1;
    } else {
      if (pay === '25') {
        moneyCash[pay] += 1;
      }
      if (pay === '50') {
        if (moneyCash['25'] === 0) {
          result = false;
          break;
        } else {
          moneyCash['25'] -= 1;
          moneyCash['50'] += 1;
        }
      }
      if (pay === '100') {
        if (moneyCash['50'] === 0) {
          if (moneyCash['25'] < 3) {
            result = false;
            break;
          } else if (moneyCash['25'] >= 3) {
            moneyCash['25'] -= 3;
            moneyCash['100'] += 1;
          }
        } else if (moneyCash['25'] < 1) {
          result = false;
          break;
        } else {
          moneyCash['50'] -= 1;
          moneyCash['25'] -= 2;
        }
      }
    }
  }
  return result;
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => {
    return this.width * this.height;
  };
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { height: 10, width: 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const parsed = JSON.parse(json);
  Object.setPrototypeOf(parsed, proto);
  return parsed;
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @param {array} arr
 * @return {array}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  const comparator = (a, b) => {
    return a.toLowerCase() < b.toLowerCase()
      ? -1
      : a.toLowerCase() > b.toLowerCase();
  };
  const sorted = arr
    .sort((obj1, obj2) => comparator(obj1.country, obj2.country))
    .sort((obj1, obj2) =>
      obj1.country === obj2.country ? comparator(obj1.city, obj2.city) : 0
    );
  return sorted;
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @param {array} array
 * @param {Function} keySelector
 * @param {Function} valueSelector
 * @return {Map}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const multiMap = new Map();
  const extractor = (obj, fn) => {
    return fn(obj);
  };

  array.forEach((object) => {
    const country = extractor(object, keySelector);
    const city = extractor(object, valueSelector);
    if (multiMap.has(country)) {
      multiMap.get(country).push(city);
    } else {
      multiMap.set(country, [city]);
    }
  });
  return Array.from(multiMap);
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  elemThrow() {
    throw Error(
      'Element, id and pseudo-element should not occur more then one time inside the selector'
    );
  },
  selThrow() {
    throw Error(
      'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
    );
  },
  memory: {},
  str: null,

  element(value) {
    if (this.valuePrev === 'element') {
      this.elemThrow();
    }
    if (this.valuePrev === 'id' || this.valuePrev === 'pseudoElement') {
      this.selThrow();
    }
    this.memory.element = [`${value}`];
    this.valuePrev = 'element';
    return this;
  },

  id(value) {
    if (this.valuePrev === 'id') {
      this.elemThrow();
    }
    if (this.valuePrev === 'class' || this.valuePrev === 'pseudoElement') {
      this.selThrow();
    }
    this.memory.id = [`#${value}`];
    this.valuePrev = 'id';
    return this;
  },

  class(value) {
    if (this.valuePrev === 'attr') {
      this.selThrow();
    }
    if (this.memory.class) {
      this.memory.class.push(`.${value}`);
    } else {
      this.memory.class = [`.${value}`];
    }
    this.valuePrev = 'class';
    return this;
  },

  attr(value) {
    if (this.valuePrev === 'pseudoClass') {
      this.selThrow();
    }
    if (this.memory.attr) {
      this.memory.attr.push(`[${value}]`);
    } else {
      this.memory.attr = [`[${value}]`];
    }
    this.valuePrev = 'attr';
    return this;
  },

  pseudoClass(value) {
    if (this.valuePrev === 'pseudoElement') {
      this.selThrow();
    }
    if (this.memory.pseudoClass) {
      this.memory.pseudoClass.push(`:${value}`);
    } else {
      this.memory.pseudoClass = [`:${value}`];
    }
    this.valuePrev = 'pseudoClass';
    return this;
  },

  pseudoElement(value) {
    if (this.valuePrev === 'pseudoElement') {
      this.elemThrow();
    }
    this.memory.pseudoElement = [`::${value}`];
    this.valuePrev = 'pseudoElement';
    return this;
  },

  combine(selector1, combinator, selector2) {
    this.str = `${selector1}${combinator}${selector2}`;
    return this;
  },

  stringify() {
    const arrayValues = [];
    Object.entries(this.memory).forEach(([key, value]) => {
      // if (typeof value !== "function" && value!==null && key!=="valuePrev"){
      arrayValues.push(value);
      delete this.memory[key];
      // }
    });
    this.valuePrev = null;
    const result = this.str ?? arrayValues.join('');
    this.str = null;
    return result;
  },
  toString() {
    return [
      this.memory.element || '',
      this.memory.id || '',
      this.memory.class ? this.memory.class.join('') : '',
      this.memory.attr ? this.memory.attr.join('') : '',
      this.memory.pseudoClass ? this.memory.pseudoClass.join('') : '',
      this.memory.pseudoElement || '',
    ].join('');
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
