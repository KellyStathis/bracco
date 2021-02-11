import Model, { attr, belongsTo } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import _string from 'lodash/string';

const Validations = buildValidations({
  email: [
    validator('presence', {
      presence: true
    }),
    validator('email-format', {
      allowBlank: true
    })
  ],
  confirmName: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function () {
        return this.model.get('isNew');
      })
    }),
    validator('confirmation', {
      on: 'name',
      message: 'Name does not match.',
      disabled: computed('model', function () {
        return this.model.get('isNew');
      })
    })
  ]
});

export default Model.extend(Validations, {
  provider: belongsTo('provider', {
    async: true
  }),

  meta: attr(),

  email: attr('string'),
  givenName: attr('string'),
  familyName: attr('string'),
  name: attr('string'),
  roleName: attr(),
  created: attr('date'),
  updated: attr('date'),
  deleted: attr('date'),

  displayName: computed('name', 'email', function () {
    if (this.name) {
      return this.name;
    } else {
      return this.email;
    }
  }),
  roleNameString: computed('roleName', function () {
    if (this.roleName) {
      return this.roleName
        .map(function (role) {
          return _string.upperFirst(_string.lowerCase(role));
        })
        .join(', ');
    } else {
      return null;
    }
  })
});
