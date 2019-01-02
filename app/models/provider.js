import { computed } from '@ember/object';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  symbol: [
    validator('presence', true),
    validator('unique-provider-id', {
      presence: true,
      disabled: computed('model', function() {
        return !this.model.get('isNew');
      })
    }),
    validator('format', {
      regex: /^[A-Z]+$/,
      message: 'The Provider ID can contain only upper case letters'
    }),
    validator('length', {
      min: 2,
      max: 8
    })
  ],
  confirmSymbol: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function() {
        return this.model.get('isNew');
      })
    }),
    validator('confirmation', {
      on: 'symbol',
      message: 'Provider ID does not match',
      disabled: computed('model', function() {
        return this.model.get('isNew');
      })
    })
  ],
  name: validator('presence', true),
  contactName: validator('presence', true),
  contactEmail: [
    validator('presence', true),
    validator('format', {
      type: 'email',
      allowNonTld: true,
      message: 'Please enter a valid email address.'
    })
  ],
  passwordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      })
    }),
    validator('length', {
      min: 8,
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      })
    })
  ],
  confirmPasswordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      })
    }),
    validator('confirmation', {
      on: 'passwordInput',
      message: 'Password does not match',
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      })
    })
  ],
  website: [
    validator('format', {
      type: 'url',
      allowBlank: true,
      message: 'Please enter a valid website URL.'
    })
  ]
});

export default DS.Model.extend(Validations, {
  meta: DS.attr(),

  name: DS.attr('string'),
  symbol: DS.attr('string'),
  description: DS.attr('string'),
  region: DS.attr('string'),
  country: DS.attr('country'),
  organizationType: DS.attr('string'),
  focusArea: DS.attr('string'),
  logoUrl: DS.attr('string'),
  contactName: DS.attr('string'),
  contactEmail: DS.attr('string'),
  phone: DS.attr('string'),
  website: DS.attr('string'),
  isActive: DS.attr('boolean', { defaultValue: true }),
  passwordInput: DS.attr('string'),
  hasPassword: DS.attr('boolean'),
  keepPassword: DS.attr('boolean', { defaultValue: true }),
  joined: DS.attr('date'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  uid: computed('id', function() {
    return this.id.toUpperCase();
  }),
  doiCount: computed('meta.dois', function() {
    return this.get('meta.dois');
  }),
  currentDoiCount: computed('doiCount', function() {
    let currentYear = this.doiCount.findBy('id', 2019);
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  }),
  clientCount: computed('meta.clients', function() {
    return this.get('meta.clients');
  }),
  currentClientCount: computed('clientCount', function() {
    let currentYear = this.clientCount.get('lastObject');
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  }),
  providerCount: computed('meta', function() {
    return this.get('meta.providers');
  }),
  currentProviderCount: computed('providerCount', function() {
    let currentYear = this.providerCount.get('lastObject');
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  })
});
