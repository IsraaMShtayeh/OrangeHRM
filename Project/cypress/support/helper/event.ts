const baseUrl = Cypress.config().baseUrl
export const addEvent= (name: string) => {
    return cy.request({
        method: 'POST',
        url: `${baseUrl}/web/index.php/api/v2/claim/events`,
        body: {
            name: name,
            description: "description",
            status: true
        }
    })
}

export const deleteEvent= (id: string) => {
    return cy.request({
        method: 'DELETE',
        url: `${baseUrl}/web/index.php/api/v2/claim/events`,
        body: {
            "ids": [
                id
            ]
        }
    })
}
