const baseUrl = Cypress.config().baseUrl
export const addExpense = (name: string) => {
    return cy.request({
        method: 'POST',
        url: `${baseUrl}/web/index.php/api/v2/claim/expenses/types`,
        body: {
            name: name,
            description: "description",
            status: true
        }
    })
}
export const deleteExpense= (id: string) => {
    return cy.request({
        method: 'DELETE',
        url: `${baseUrl}/web/index.php/api/v2/claim/expenses/types`,
        body: {
            "ids": [
                id
            ]
        }
    })
}

