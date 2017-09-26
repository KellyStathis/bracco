import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  id: [
    validator('presence', true),
    validator('client-id', true),
    validator('unique-client-id', true),
    validator('format', {
      regex: /^[a-z0-9.]+$/,
      message: 'The Client ID can contain only lower case letters and numbers, and must start with the Provider ID'
    }),
    validator('length', {
      min: 5,
      max: 17
    })
  ],
  name: validator('presence', true),
  domains: validator('presence', true),
  contact: validator('presence', true),
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ]
});

export default DS.Model.extend(Validations, {
  provider: DS.belongsTo('provider', {
    async: false
  }),
  prefixes: DS.hasMany('prefix', {
    async: false
  }),
  'client-prefixes': DS.hasMany('client-prefix', {
    async: false
  }),
  users: DS.hasMany('user', { async: true }),

  name: DS.attr('string'),
  domains: DS.attr('string', { defaultValue: '*' }),
  contact: DS.attr('string'),
  email: DS.attr('string'),
  year: DS.attr('number'),
  isActive: DS.attr('boolean', { defaultValue: true }),
  doiCount: DS.attr(),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  domainList: Ember.computed('domains', function() {
    return this.get('domains').split(",").map(function(item) {
      return item.trim();
    });
  }),
  uid: Ember.computed('id', function() {
    return this.get('id').toUpperCase();
  }),
  'provider-id': Ember.computed('id', function() {
    return this.get('id').split('.').get('firstObject');
  }),
  currentDoiCount: Ember.computed('doiCount', function() {
    let currentYear = this.get('doiCount').findBy('id', 2017);
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  })
});