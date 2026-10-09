// E2E test template (Cypress-style) - adapt to your framework

describe('Authentication E2E', () => {
  it('signs up a new user, signs in, refreshes token, and signs out', () => {
    // PSEUDOCODE: replace with actual cypress/playwright commands
    // cy.request('POST', '/api/signup', {email, password})
    // cy.request('POST', '/api/signin', {email, password}).then(resp => { expect(resp.status).to.eq(200); const {accessToken, refreshToken} = resp.body; })
    // cy.request({ method: 'POST', url: '/api/refresh', body: { refreshToken }})
    // cy.request({ method: 'POST', url: '/api/signout', auth: { bearer: accessToken }})

    // Use test accounts from staging secret manager, not included here.
  });
});
