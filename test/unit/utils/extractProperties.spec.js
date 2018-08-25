/* global describe,it */
import { expect } from 'chai';
import extractProperties from '../../../lib/utils/extractProperties';

describe('extractProperties', () => {
  it('properties', () => {
    const prop = { a: 5 };
    const p = {
      properties: prop,
    };
    const _p = extractProperties(p);
    expect(_p).to.eq(prop);
  });
  it('attributes', () => {
    const prop = { a: 5 };
    const p = {
      attributes: prop,
    };
    const _p = extractProperties(p);
    expect(_p).to.eq(prop);
  });
  it('fields', () => {
    const prop = { a: 5 };
    const p = {
      fields: prop,
    };
    const _p = extractProperties(p);
    expect(_p).to.eq(prop);
  });
  it('no data', () => {
    const _p = extractProperties();
    // eslint-disable-next-line no-unused-expressions
    expect(_p).to.be.empty;
  });
});
