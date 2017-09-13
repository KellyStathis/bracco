import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canCreate: Ember.computed('currentUser.role_id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canUpdate: Ember.computed('currentUser.role_id', 'currentUser.provider_id', 'model.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.id');
      default:
        return false;
    }
  }),
  canRead: Ember.computed('currentUser.role_id', 'currentUser.provider_id', 'model.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'staff_user':
        return true;
      case 'provider_admin':
      case 'provider_user':
        return this.get('currentUser.provider_id') === this.get('model.id');
      default:
        return false;
    }
  })
});
