export class Report {
    static elements = {
        reportBtn: () => cy.get('.oxd-topbar-body-nav > ul',{timeout:40000}).contains("Report"),
        addBtn: () => cy.get('.orangehrm-header-container > .oxd-button',{timeout:40000}),
        reportName: () => cy.get('.oxd-input',{timeout:40000}).last(),
        selectBox: () => cy.get('.oxd-select-text',{timeout:40000}),
        dropDown: () => cy.get('.oxd-select-dropdown',{timeout:40000}),
        iconBtn: () => cy.get(' .oxd-icon-button',{timeout:40000}),
        loadingSpinner: () => cy.get('.oxd-loading-spinner-container',{timeout:40000}),
        switch: () => cy.get('.oxd-switch-input',{timeout:40000}),
        saveBtn: () => cy.get('.oxd-button--secondary',{timeout:40000}),
        searchBtn: () => cy.get('.oxd-form-actions > .oxd-button--secondary',{timeout:40000}),
        deleteIcon: () => cy.get('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon',{timeout:40000}),
    }
    static selectSearchCriteria(job: string, location: string) {

        this.elements.selectBox().first().click({ force: true })
        this.elements.dropDown().contains('Job Title').click({ force: true })
        this.elements.iconBtn().eq(2).click({ force: true })
        this.elements.selectBox().eq(2).click({ force: true })
        this.elements.dropDown().contains(job,{timeout:40000}).click({ force: true })


        this.elements.selectBox().first().click({ force: true })
        this.elements.dropDown().contains('Location').click({ force: true })
        this.elements.iconBtn().eq(2).click({ force: true })
        this.elements.selectBox().eq(3).click({ force: true })
        this.elements.dropDown().contains(location,{timeout:40000}).click({ force: true })
    }
    static chooseDisplayFields(x: string, y: string) {
        this.elements.selectBox().eq(4).click({ force: true })
        this.elements.dropDown().contains(x,{timeout:40000}).click({ force: true })
        this.elements.selectBox().eq(5).click({ force: true })
        this.elements.dropDown().contains(y,{timeout:40000}).click({ force: true })
        cy.get('.oxd-icon-button > .oxd-icon',{timeout:40000}).eq(5).click({ force: true })
    }
    static createReport(name: string, job: string, location: string) {
       
        this.elements.reportBtn().click({ force: true })
        this.elements.addBtn().click({ force: true })
        return this.elements.loadingSpinner().should("exist").then(() => {
            this.elements.loadingSpinner().should("not.exist").then(() => {
                this.elements.reportName().type(name)
                this.selectSearchCriteria(job, location)

                this.chooseDisplayFields("Salary", "Amount")
                this.chooseDisplayFields("Personal", "First Name")
                this.chooseDisplayFields("Job", "Job Title")

                this.elements.switch().first().click({ force: true })
                this.elements.switch().eq(1).click({ force: true })
                this.elements.switch().last().click({ force: true })

                this.elements.saveBtn().click({ force: true })
            })
        })
    }

    static deleteReport(name: string) {
        this.elements.reportBtn().click({ force: true })
        cy.get('.oxd-autocomplete-text-input > input').type(name)
        cy.get('.oxd-grid-2').contains(name).click({ force: true })
        this.elements.searchBtn().click({ force: true })
        this.elements.deleteIcon().click({ force: true })
        cy.get('.oxd-button--label-danger').click({ force: true })
    }
    static checkTableHeader(firstCol: string, secondCol: string, thirdCol: string) {
        cy.get('[data-rgcol="0"] > .header-content').contains(firstCol)
        cy.get('[data-rgcol="1"] > .header-content').contains(secondCol)
        cy.get('[data-rgcol="2"] > .header-content').contains(thirdCol)
    }
    

}