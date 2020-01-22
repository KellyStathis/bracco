import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';


export default Component.extend({
  tagName: 'div',
  classNames: [ 'license' ],
  citations: 0,
  views: 0,
  downloads: 0,
  label: '',
  metrics: [],
  store: service(),
  hasUsage: computed('views','downloads', function() {
    return ((this.views + this.downloads) > 0) ?  true  : false;
  }),
  hasMetrics: computed('citations','views','downloads', function() {
    return ((this.views + this.downloads + this.citations) > 0) ?  true  : false;
  }),

  init() {
    this._super();
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.passMetrics();
  },
  passMetrics() {
    let self = this;
    self.set('citations' , this.model.citations);
    self.set('views',(this.model.views));
    self.set('downloads',(this.model.downloads));
  },
});
