import { padTo2Digits } from "../helper/format";

export class AssignClaim {
 static date=(new Date());
 static today=[
    this.date.getFullYear(),
    padTo2Digits(this.date.getMonth() + 1),
    padTo2Digits(this.date.getDate()),
  ].join('-')        
    static elements = {
        approveBtn: () => cy.get('.oxd-button--secondary', { timeout: 40000 }),
        rejectBtn: () => cy.get('.oxd-button--danger', { timeout: 40000 }),
        loadingSpinner: () => cy.get('.oxd-loading-spinner-container', { timeout: 40000 }),
        backBtn: () => cy.get('.oxd-button', { timeout: 40000 }).contains("Back"),
        employeeName: () => cy.get('.oxd-autocomplete-text-input > input', { timeout: 40000 }).eq(0),
        dropDown: () => cy.get('.oxd-autocomplete-dropdown', { timeout: 40000 }),
        searchBtn: () => cy.get('.oxd-form-actions > .oxd-button--secondary', { timeout: 40000 }),
        status: () => cy.get('.oxd-padding-cell').eq(15),
        amount: () => cy.get(' .oxd-padding-cell').eq(16),
        date: () => cy.get(' .oxd-padding-cell').eq(14),
    }
   
    static assignClaim(firstName: string, lastName: string, status: string, amount: string) {
        if (status === "Paid") {
            this.elements.approveBtn().click({ force: true })
        } else {
            cy.wait(3000)
            this.elements.rejectBtn().click({ force: true })
        }

        return this.elements.loadingSpinner().should("exist").then(() => {
            this.elements.loadingSpinner().should("not.exist").then(() => {
                this.elements.backBtn().click({ force: true })
                 cy.wait(5000)
                this.elements.employeeName().type(firstName)
                cy.wait(5000)
                this.elements.dropDown().contains(firstName + " " + lastName,{timeout:40000}).click({ force: true })
                this.elements.searchBtn().click({ force: true })
                this.elements.amount().contains(amount+".00")
                this.elements.date().contains(this.today)
                this.elements.status().contains(status)
 
              
            })
        })


    }
}