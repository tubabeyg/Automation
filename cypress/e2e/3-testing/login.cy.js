///<reference types="cypress"/>

describe ("Spill creation", ()=>
{
    before(() => {
        // Load the fixture file once before all tests
        cy.fixture('example').as('data');
      });
    it("Creating a new spill", () => {
        cy.get('@data').then((data) => {
        cy.intercept('POST', '/api/spill/createNew').as('createNewSpill')
        cy.visit('http://35.239.245.88:3081/?redirectAfterAuth=%2Fdashboard');
        cy.get('#email').click();
        cy.get('#email').type('hamzarizwan8822+309@gmail.com'); //PES ADMIN
        cy.get('#password').click();
        cy.get('#password').type('1234');
        cy.get('.jss28 > .MuiButtonBase-root > .MuiButton-label').click();
        cy.get('[href="/dashboard"]').click();
        cy.get('body').click();
        cy.wait(1000);
        //cy.contains('Spills').filter(':nth-child(2)').click();
        cy.get('[href="http://35.239.245.88:3081/dashboard/spills"] > .MuiTab-wrapper').contains('Spills').click();
        cy.get(':nth-child(2) > .MuiButton-label').contains('Create New Spill').click();
        cy.wait(10000)
        cy.get('.css-yk16xz-control').contains("Select...")
        .click({ force: true })
        .type("Tuba");
  
      cy.wait(1000);
      //project manager name
      cy.get('#react-select-2-option-48').click({ multiple: true });
        cy.get("[id=\"organization-select\"]", { timeout: 10000 })
        .click({ force: true })
        .type("T", { force: true });
        cy.get('[data-value="140"]').contains('Tuba Test Organization', { timeout: 10000 })
        .should("have.text", 'Tuba Test Organization')
        .click({ force: true });
        //When user selects 'Client Organization', the default users will appear in 'User's for Email' section if any.
          cy.get(":nth-child(1) > .css-12jo7m5", { timeout: 5000 }).should(
            "be.visible"
          );
          let current_date = new Date().getDate();
          cy.xpath(
            '//*[@id="scrollable-auto-tabpanel-2"]/p/div/div/div/div[3]/div/form/div/div[4]/div/div'
          ).click({ force: true }); //opening calender
  
          cy.get(
            'button[class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary"]'
          )
            .contains("Today")
            .click({ force: true }); //picking current date and time
          cy.get(
            'button[class="MuiButtonBase-root MuiIconButton-root MuiPickersDay-day MuiPickersDay-current MuiPickersDay-daySelected"]'
          )
            .should("be.visible")
            .should("have.text", `${current_date}`); //checking if the current date is highlighted
          cy.get(
            'button[class="MuiButtonBase-root MuiIconButton-root MuiPickersDay-day MuiPickersDay-dayDisabled"]'
          ).should("exist"); //checking if the future dates are disabled
          cy.get(
            'button[class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary"]'
          )
            .contains("OK")
            .click({ force: true }); //closing calender
            cy.contains('Create and Edit').click({force:true})
  
          cy.wait(4000);
        cy.wait('@createNewSpill').then((interception) => {
            // Access the intercepted request and response
            const request = interception.request
          
            // Perform assertions on the intercepted request
            expect(request.method).to.eq('POST')
            expect(request.url).to.eq('http://35.239.245.88:3082/api/spill/createNew')
          
        });

    })

  })
    })
