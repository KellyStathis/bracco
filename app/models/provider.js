import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { isPresent, isBlank } from '@ember/utils';
import { w } from '@ember/string';
// import ENV from 'bracco/config/environment';
import { validator, buildValidations } from 'ember-cp-validations';
import { fragment } from 'ember-data-model-fragments/attributes';
import addressFormatter from '@fragaria/address-formatter';
import ENV from 'bracco/config/environment';

export const organizationTypeList = [
  'researchInstitution',
  'academicInstitution',
  'governmentAgency',
  'internationalOrganization',
  'nationalInstitution',
  'professionalSociety',
  'publisher',
  'serviceProvider',
  'other'
];
export const memberTypeList = [
  'consortium',
  'consortium_organization',
  'contractual_member',
  'direct_member',
  'member_only',
  'registration_agency'
];
export const focusAreaList = [
  'naturalSciences',
  'engineeringAndTechnology',
  'medicalAndHealthSciences',
  'agriculturalSciences',
  'socialSciences',
  'humanities',
  'general'
];
export const nonProfitStatusList = ['non-profit', 'for-profit'];

const Validations = buildValidations({
  symbol: [
    validator('presence', true),
    validator('unique-provider-id', {
      presence: true,
      disabled: computed('model', function () {
        return !this.model.get('isNew');
      })
    }),
    validator('format', {
      regex: /^[A-Z]+$/,
      message: 'The Member ID can contain only upper case letters'
    }),
    validator('length', {
      min: 2,
      max: 8
    })
  ],
  confirmSymbol: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function () {
        return this.model.get('isNew');
      })
    }),
    validator('confirmation', {
      on: 'symbol',
      message: 'Member ID does not match',
      disabled: computed('model', function () {
        return this.model.get('isNew');
      })
    })
  ],
  globusUuid: [
    validator('uuid-format', {
      version: 4,
      allowBlank: true,
      message: 'Must be a valid UUID (version 4).'
    })
  ],
  twitterHandle: [
    validator('format', {
      regex: /^@[a-zA-Z0-9_]{0,15}$/,
      allowBlank: true,
      message: 'Must start with @ followed by up to 15 alphanumeric characters.'
    })
  ],
  name: validator('presence', true),
  displayName: validator('presence', true),
  systemEmail: [validator('presence', true), validator('email-format', true)],
  groupEmail: [
    validator('email-format', {
      allowBlank: true
    })
  ],
  passwordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function () {
        return this.model.get('keepPassword');
      })
    }),
    validator('length', {
      min: 8,
      disabled: computed('model', function () {
        return this.model.get('keepPassword');
      })
    })
  ],
  confirmPasswordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function () {
        return this.model.get('keepPassword');
      })
    }),
    validator('confirmation', {
      on: 'passwordInput',
      message: 'Password does not match',
      disabled: computed('model', function () {
        return this.model.get('keepPassword');
      })
    })
  ],
  website: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid website URL.'
    })
  ],
  rorId: [
    validator('url-format', {
      allowBlank: true,
      message: 'Please enter a valid ROR ID expressed as URL.'
    })
  ],
  salesforceId: [
    validator('format', {
      regex: /[a-zA-Z0-9]{18}/,
      allowBlank: true,
      message: 'Please enter a valid 18 digit Salesforce ID.'
    })
  ],
  contacts: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function () {
        return (
          this.model.get('disableValidations') ||
          this.model.get('isNew') ||
          this.model.get('mode') === 'change' ||
          this.model.get('memberType') === 'developer' ||
          !this.model.get('memberType') || // memberType is null for admin account
          !this.model.get('hasPassword') // Allows users with no contacts to set their password.
        );
      })
    })
  ],
  votingContact: [
    validator('presence', {
      presence: true,
      message: 'A voting representative is required.',
      disabled: computed('model', function () {
        return (
          this.model.get('contacts').length === 0 ||
          this.model.get('isNew') ||
          this.model.get('mode') === 'change' ||
          this.model.get('memberType') === 'consortium_organization' ||
          this.model.get('memberType') === 'developer' ||
          !this.model.get('memberType') // memberType is null for admin account
        );
      })
    })
  ],
  serviceContact: [
    validator('presence', {
      presence: true,
      message: 'A service contact is required.',
      disabled: computed('model', function () {
        return (
          this.model.get('contacts').length === 0 ||
          this.model.get('isNew') ||
          this.model.get('mode') === 'change' ||
          this.model.get('memberType') === 'consortium_organization' ||
          this.model.get('memberType') === 'developer' ||
          !this.model.get('memberType') // memberType is null for admin account
        );
      })
    })
  ],
  billingContact: [
    validator('presence', {
      presence: true,
      message: 'A billing contact is required.',
      disabled: computed('model', function () {
        return (
          this.model.get('contacts').length === 0 ||
          this.model.get('isNew') ||
          this.model.get('mode') === 'change' ||
          this.model.get('memberType') === 'consortium_organization' ||
          this.model.get('memberType') === 'developer' ||
          !this.model.get('memberType') // memberType is null for admin account
        );
      })
    })
  ],
  'billingInformation.state': [validator('billing-state')],
  doiEstimate:
  [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'A doi estimate is required.',

      disabled: computed('model', function () {
        return (
          this.model.get('memberType') !== 'consortium_organization' ||
          !this.model.get('memberType') || // memberType is null for admin account
          !ENV.featureFlags['enable-doi-estimate']
        )
      })
    }),
    validator('number', {
      allowString: true,
      integer: true,
      positive: true,

      disabled: computed('model', function () {
        return (
          this.model.get('memberType') !== 'consortium_organization' ||
          !this.model.get('memberType') || // memberType is null for admin account
          !ENV.featureFlags['enable-doi-estimate']
        )
      })
    })
  ]
});

export default Model.extend(Validations, {
  consortium: belongsTo('provider', {
    inverse: 'consortiumOrganizations',
    async: true
  }),
  consortiumOrganizations: hasMany('provider', {
    inverse: 'consortium',
    async: true
  }),
  contacts: hasMany('contact', {
    inverse: 'provider',
    async: true
  }),

  meta: attr(),

  name: attr('string'),
  displayName: attr('string'),
  symbol: attr('string'),
  globusUuid: attr('string'),
  description: attr('string'),
  region: attr('string'),
  country: attr('country'),
  memberType: attr('string'),
  organizationType: attr('string'),
  focusArea: attr('string'),
  logoUrl: attr('string'),
  systemEmail: attr('string'),
  groupEmail: attr('string'),
  website: attr('string'),
  isActive: attr('boolean', { defaultValue: true }),
  passwordInput: attr('string'),
  nonProfitStatus: attr('string'),
  hasPassword: attr('boolean'),
  keepPassword: attr('boolean', { defaultValue: true }),
  rorId: attr('string'),
  salesforceId: attr('string'),
  twitterHandle: attr('string'),
  logo: attr(),
  billingInformation: attr('billingInformation'),
  technicalContact: fragment('provider-contact'),
  secondaryTechnicalContact: fragment('provider-contact'),
  billingContact: fragment('provider-contact'),
  secondaryBillingContact: fragment('provider-contact'),
  secondaryServiceContact: fragment('provider-contact'),
  serviceContact: fragment('provider-contact'),
  votingContact: fragment('provider-contact'),
  joined: attr('date'),
  created: attr('date'),
  updated: attr('date'),
  doiEstimate: attr('number'),

  uid: computed('id', function () {
    return this.id.toUpperCase();
  }),
  hasRequiredContacts: computed(
    'memberType',
    'votingContact',
    'serviceContact',
    'billingContact',
    function () {
      if (this.memberType === 'consortium_organization') {
        return isPresent(this.serviceContact.email);
      } else if (this.memberType !== 'developer') {
        return (
          isPresent(this.votingContact.email) &&
          isPresent(this.serviceContact.email) &&
          isPresent(this.billingContact.email)
        );
      }
    }
  ),
  filteredContacts: reads('contacts'),
  formattedBillingInformation: computed(
    'billingInformation',
    'billingInformation.{address,city,postCode,state.name,country,country.name,country.code}',
    function () {
      if (this.billingInformation) {
        return addressFormatter.format(
          {
            road: this.billingInformation.address,
            city: this.billingInformation.city,
            postcode: this.billingInformation.postCode
              ? this.billingInformation.postCode
              : null,
            state: this.billingInformation.state
              ? this.billingInformation.state.name
              : null,
            country: this.billingInformation.country
              ? this.billingInformation.country.name
              : null,
            countryCode: this.billingInformation.country
              ? this.billingInformation.country.code
              : null
          },
          {
            output: 'array'
          }
        );
      } else {
        return null;
      }
    }
  )
});
