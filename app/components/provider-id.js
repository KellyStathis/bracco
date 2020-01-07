import Component from '@ember/component';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Component.extend({
  // didReceiveAttrs() {
  //   this._super(...arguments);

  //   this.generate();
  // },

  generate() {
    let self = this;
    let url = ENV.API_URL + '/providers/random';
    fetch(url).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          self.model.set('symbol', data.symbol);
        });
      } else {
        console.debug(response);
      }
    }).catch(function(error) {
      console.debug(error);
    });
  },
});
