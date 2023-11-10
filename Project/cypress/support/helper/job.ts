const baseUrl = Cypress.config().baseUrl
export const addJob = (title: string) => {
    return cy.request({
        method: 'POST',
        url: `${baseUrl}/web/index.php/api/v2/admin/job-titles`,
        body: {
            title: title,
            description: "",
            specification: null,
            note: ""
        }
    })
}
export const deleteJob=(jobId:string)=>{
    cy.request({
        method: 'DELETE',
        url: `${baseUrl}/web/index.php/api/v2/admin/job-titles`,
        body: {
            "ids": [
                jobId
            ]
        }
    })
}