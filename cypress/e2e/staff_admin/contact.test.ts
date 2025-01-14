/// <reference types="cypress" />
/* eslint-disable no-undef */

// TBD - where does admin have rights to do things with members?
//       Add/Update/Delete

function escapeRE(string) {
  //return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

describe('ACCEPTANCE: STAFF_ADMIN | CONTACTS', () => {
  const waitTime = 1000;
  const waitTime2 = 2000;
  const waitTime3 = 3000;
  const waitTime4 = 4000;
  const min = 5000;
  const max = 9999;

  before(function () {
    cy.login(Cypress.env('staff_admin_username'), Cypress.env('staff_admin_password'));
    cy.setCookie('_consent', 'true');
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_fabrica', '_jwt', '_consent');
    cy.wait(waitTime2);
  });

  it('search contacts', () => {
    // Create a contact to be searched for.
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'datacite';
    roles = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        // Give it a little extra time to process the new contact so that we can search for it.
        cy.visit('/contacts');
        cy.url().should('include', '/contacts')
        cy.wait(waitTime)

        cy.get('input[name="query"]')
          .type(family_name + '{enter}', { force: true } )
          .get('[data-test-contact]')
          .should('contain', family_name);

          cy.get('h2.work').contains('DataCite');
          cy.get('li a.nav-link.active').contains('Contacts');
          cy.get('div#search').should('exist');
          //cy.get('div.panel.facets').should('exist');

          cy.get('a#add-contact').should('not.exist');

          // Create DOI button
          cy.get('.create-doi-button').should('not.exist');
      });
    });
  });

  // TBD - bug uncovered.  Add github issue. Skip this test until the issue is fixed.
  it.skip('filter contacts', () => {
    // Create a contact for filters.
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'datacite';
    roles = ["service", "secondary_service", "technical", "secondary_technical", "billing", "voting", "secondary_billing"];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        // Give it a little extra time to process the new contact so that we can search for it.
        cy.visit('/contacts');
        cy.url().should('include', '/contacts')
        cy.wait(waitTime)

        cy.get('select').select('-created');
        cy.wait(waitTime);

        cy.get('a#role-name-service')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-technical')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-billing')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-voting')
          .click()
          .get('[data-test-voting]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-secondary_service')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-secondary_technical')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);

        cy.wait(waitTime);
        cy.get('a#role-name-secondary_billing')
          .click()
          .get('[data-test-contact]')
          .should('contain', family_name);
      });
    });
  });

  it('create a contact', () => {
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';

    cy.visit('/providers/datacite/contacts/new');
    cy.url().should('include', '/providers/datacite/contacts/new').then(() => {
      cy.wait(waitTime);

      cy.get('h3.edit').contains('Add Contact');

      cy.get('input#givenName-field').should('be.visible').type(given_name, { force: true })
        .clickOutside();
      cy.get('input#familyName-field').should('be.visible').type(family_name, { force: true })
        .clickOutside();
      cy.get('input#email-field').should('be.visible').type(email, { force: true })
        .clickOutside();

      cy.get('.alert-warning').contains(/The contact entered may receive notifications/i)
        .within(() => {
          cy.get('a[href*="privacy.html"]').should('be.visible');
        }
      );

      ////////// DONE FILLING IN FORM.  PRESS THE CREATE BUTTON.
      cy.get('button#add-contact').should('be.visible').click({force: true}).then(() => {
        cy.wait(waitTime);
        cy.location().should((loc) => {
          cy.wait(waitTime);
          //expect(loc.pathname).to.contain('/contacts/');
          cy.get('h2.work').contains(given_name + ' ' + family_name);
        });
      });
    });
  });

  it('visiting specific contact', () => {
    // Create a contact to be visited.
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'datacite';
    //roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];
    roles = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        cy.visit('/contacts/' + id);
        cy.url().should('include', '/contacts/' + id)
        cy.wait(waitTime);

        cy.get('h2.work').contains(given_name + ' ' + family_name);
        cy.get('h3.member-results').contains('Contact Information');

        cy.get('a#edit-contact').contains('Update Contact');
        cy.get('a#delete-contact').contains('Delete Contact');
     });
   });
  });

  it('update specific contact', () => {
    // Create a contact to be updated.
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    updated_given_name = 'Jonathan';
    updated_email = updated_given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'datacite';
    //roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];
    roles = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');

        cy.visit('/contacts/' + id + '/edit');
        cy.url().should('include', '/contacts/' + id + '/edit')
        cy.wait(waitTime);

        cy.get('h2.work').contains(given_name + ' ' + family_name);
        cy.get('h3.edit').contains('Update Contact');

        cy.get('input#givenName-field').clear({force: true})
          .type(updated_given_name +'{enter}', {force: true});
        cy.get('input#familyName-field').should('exist');
        cy.get('input#email-field').should('exist');

        cy.get('.alert-warning').contains(
          'The contact may receive notifications about administration'
        );

        cy.get('button#update-contact').contains('Update Contact').click({force: true})
          .then(() => {
            cy.wait(waitTime);
            cy.location().should((loc) => {
              expect(loc.pathname).to.eq('/contacts/' + id);
            });
            cy.get('h2.work').contains(updated_given_name + ' ' + family_name);
          });
      });
    });
  });

  it('delete specific contact', () => {
    // Create a contact to be deleted.
    const rndInt = randomIntFromInterval(min, max);
    given_name = 'John';
    family_name = 'Doe' + rndInt;
    email = given_name + '.' + family_name + '@example.org';
    type = 'providers';
    id = 'datacite';
    //roles = ["service", "secondary_service", "technical", "secondary_technical", "billing"];
    roles = [];

    cy.getCookie('_jwt').then((cookie) => {
      cy.createContact(email, given_name, family_name, roles, type, id, Cypress.env('api_url'), cookie.value).then((id) => {
        cy.log('CREATED CONTACT: ' + given_name + ' ' + family_name + ' (' + id + ')');


        cy.visit('/contacts/' + id);
        cy.url().should('include', '/contacts/' + id);
        cy.wait(waitTime);

        cy.get('a#delete-contact').contains('Delete Contact').click();
        cy.wait(waitTime);

        cy.get('h2.work').contains(given_name + ' ' + family_name);
        cy.get('label.control-label').contains(
          'Are you sure you want to delete this contact? This action cannot be undone.'
        );

        cy.wait(waitTime);
        cy.get('input#confirm-delete-field').click({ force: true }).type('Delete', { force: true });
        cy.wait(waitTime);
        cy.get('#confirm-delete').should('have.class', 'has-success');

        cy.get('button#delete').contains('Delete').click({force: true});
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/providers/datacite/contacts');
        });
      });
    });
  });

  // TBD - move these elsewhere?
  it.skip('visiting contacts for member', () => {
    cy.visit('/providers/issda/contacts');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/issda/contacts');
    });
    cy.get('h2.work').contains('Irish Social Science Data Archive (ISSDA)');
    cy.get('li a.nav-link.active').contains('Contacts');
    cy.get('div#search').should('exist');
    cy.get('div.panel.facets').should('exist');

    cy.get('a#add-contact').contains('Add Contact');
  });

  it.skip('show member settings', () => {
    cy.visit('/providers/issda');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/issda');
    });

    cy.get('h2.work').contains('Irish Social Science Data Archive (ISSDA)');
    cy.get('h3.member-results').contains('Contact Information');
    cy.get('[cy-data="service"]').contains('John Howard');
  });

  it.skip('edit member settings', () => {
    cy.visit('/providers/issda/edit');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/providers/issda/edit');
    });

    cy.get('h2.work').contains('Irish Social Science Data Archive (ISSDA)');
    cy.get('h3.edit').contains('Update Organization');
    cy.get('h3.member-results').contains('Contact Information');
    cy.get('div#service-contact').contains('John Howard');
  });
});
