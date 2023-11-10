const baseUrl = Cypress.config().baseUrl
export let id: string
export const submitClaim = (claimEventId: string, expenseTypeId: string,amount:string) => {
    cy.request({
        method: 'POST',
        url: `${baseUrl}/web/index.php/api/v2/claim/requests`,
        body: {
            claimEventId:claimEventId,
            currencyId: "JOD",
            remarks: null
        }
    }).then(async (response) => {
        id = await response.body.data.id
        console.log("url", id)
        cy.request({
            method: 'POST',
            url: `${baseUrl}/web/index.php/api/v2/claim/requests/${id}/expenses`,
            body: {
                expenseTypeId: expenseTypeId,
                date: "2023-11-29",
                amount: amount,
                note: null
            }
        }).then((response) => {
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/web/index.php/api/v2/claim/requests/${id}/action`,
                body: {
                    action: "SUBMIT"
                }
            })
            console.log(response)
            // console.log(`${baseUrl}/web/index.php/claim/assignClaim/id/${id}`)
        })
    })
}
