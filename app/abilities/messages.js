import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canRead: Ember.computed('currentUser.role_id', 'model.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'staff_user':
        return 'admin' === this.get('model.id');
      case 'provider_admin':
      case 'provider_user':
        return this.get('currentUser.provider_id') === this.get('model.id');
      case 'client_admin':
      case 'client_user':
        return this.get('currentUser.client_id') === this.get('model.id');
      default:
        return false;
    }
  })
});