import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'role', 'page', 'perPage'],
  query: null,
  role: null
});