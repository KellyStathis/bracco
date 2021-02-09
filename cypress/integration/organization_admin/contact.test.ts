// /// <reference types="cypress" />
// /* eslint-disable no-undef */

// describe('Organization Admin: Contact', () => {
//   beforeEach(() => {
//     cy.setCookie('_consent', 'true');
//     cy.setCookie('_fabrica', Cypress.env('organization_admin_cookie'), {
//       log: false
//     });
//   });

//   it('search contacts', () => {
//     cy.visit('/providers/datacite/contacts');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq('/providers/datacite/contacts');
//     });
//     cy.get('input[name="query"]')
//       .type('Fenner{enter}')
//       .get('[data-test-contact]')
//       .should('contain', 'Fenner');

//     cy.get('h2.work').contains('DataCite');
//     cy.get('li a.nav-link.active').contains('Contacts');
//     cy.get('div#search').should('exist');
//     cy.get('div.panel.facets').should('exist');

//     cy.get('a#add-contact').should('not.exist');
//   });

//   it('filter contacts', () => {
//     cy.visit('/providers/datacite/contacts');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq('/providers/datacite/contacts');
//     });
//     cy.get('a#role-name-service')
//       .click()
//       .get('h3.member-results')
//       .should('contain', 'Contacts');

//     cy.get('h2.work').contains('DataCite');
//     cy.get('li a.nav-link.active').contains('Contacts');
//     cy.get('div#search').should('exist');
//     cy.get('div.panel.facets').should('exist');

//     cy.get('a#add-contact').should('exist');
//   });

//   it('visiting contacts for member', () => {
//     cy.visit('/providers/datacite/contacts');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq('/providers/datacite/contacts');
//     });
//     cy.get('h2.work').contains('DataCite');
//     cy.get('li a.nav-link.active').contains('Contacts');
//     cy.get('div#search').should('exist');
//     cy.get('div.panel.facets').should('exist');

//     cy.get('a#add-contact').contains('Add Contact');
//   });

//   it('visiting specific contact', () => {
//     cy.visit('/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq(
//         '/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39'
//       );
//     });
//     cy.get('h2.work').contains('Martin Fenner');
//     cy.get('h3.member-results').contains('Contact Information');

//     cy.get('a#edit-contact').contains('Update Contact');
//     cy.get('a#delete-contact').contains('Delete Contact');
//   });

//   it('update specific contact', () => {
//     cy.visit('/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39/edit');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq(
//         '/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39/edit'
//       );
//     });
//     cy.get('h2.work').contains('Martin Fenner');
//     cy.get('h3.edit').contains('Update Contact');

//     cy.get('input#givenName-field').should('exist');
//     cy.get('input#familyName-field').should('exist');
//     cy.get('input#email-field').should('exist');

//     cy.get('.alert-warning').contains(
//       'The contact may receive notifications about administration'
//     );
//     cy.get('button#update-contact').contains('Update Contact');
//   });

//   it('delete specific contact', () => {
//     cy.visit('/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39/delete');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq(
//         '/contacts/3dd8d037-638e-48d8-854e-b1c0261d7e39/delete'
//       );
//     });
//     cy.get('h2.work').contains('Martin Fenner');
//     cy.get('label.control-label').contains(
//       'Are you sure you want to delete this contact? This action cannot be undone.'
//     );

//     cy.get('input#confirm-name-field').should('exist');

//     cy.get('button#delete').contains('Delete');
//   });

//   it('show member settings', () => {
//     cy.visit('/providers/datacite');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq('/providers/datacite');
//     });

//     cy.get('h2.work').contains('DataCite');
//     cy.get('h3.member-results').contains('Contact Information');
//     cy.get('[cy-data="service"]').contains('Martin Fenner');
//   });

//   it('edit member settings', () => {
//     cy.visit('/providers/datacite/edit');
//     cy.location().should((loc) => {
//       expect(loc.pathname).to.eq('/providers/datacite/edit');
//     });

//     cy.get('h2.work').contains('DataCite');
//     cy.get('h3.edit').contains('Update Organization');
//     cy.get('h3.member-results').contains('Contact Information');
//     cy.get('div#service-contact').contains('Martin Fenner');
//   });
// });
