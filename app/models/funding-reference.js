import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

const Validations = buildValidations({
  funderName: [
    validator('presence', {
      presence: true,
      message: 'Funder Name must be included if you input a funderIdentifier.',
      disabled: computed('model.funderIdentifier', function() {
        return isBlank(this.model.get('funderIdentifier'));
      }),
    }),
  ],
  awardUri: [
    validator('url-format', {
      allowBlank: true,
      message: 'Please enter a valid URI',
    }),
  ],
});

export default Fragment.extend(Validations, {
  funderName: DS.attr('string', { defaultValue: null }),
  funderIdentifier: DS.attr('string', { defaultValue: null }),
  funderIdentifierType: DS.attr('string', { defaultValue: null }),
  // schemeUri: DS.attr('string', { defaultValue: null }),
  awardNumber: DS.attr('string', { defaultValue: null }),
  awardUri: DS.attr('string', { defaultValue: null }),
  awardTitle: DS.attr('string', { defaultValue: null }),
});
