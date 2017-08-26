import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canRead: Ember.computed(function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  })
});