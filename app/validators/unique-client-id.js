import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueClientId = BaseValidator.extend({
  store: Ember.inject.service(),

  validate(value, options, model, attribute) {
    let providerId = model.get('provider').get('id') + '.';
    if (value === providerId || Ember.computed.not('model.meta.id.isEnabled')) {
      return true;
    } else {
      return this.get('store').query('client', { id: value }).then((result) => {
        if(result.content.length > 0) {
          return "The Client ID " + value + " already exists.";
        } else {
          return true;
        }
      }, (error) => {
        return true;
      });
    }
  }
});

UniqueClientId.reopenClass({
  getDependentsFor(attribute, options) {
    return ['id'];
  }
});

export default UniqueClientId;
