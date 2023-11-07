const baseUrl = Cypress.config().baseUrl

export const addLocation = (name: string, countryCode: string) => {
    return cy.request({
        method: 'POST',
        url: `${baseUrl}/web/index.php/api/v2/admin/locations`,
        body: {
            name: name ,
            countryCode: countryCode,
            province: "",
            city: "",
            address: "",
            zipCode: "",
            phone: "",
            fax: "",
            note: ""
        }
    })
}
export const deleteLocation=(locationId:string)=>{
    cy.request({
        method: 'DELETE',
        url: `${baseUrl}/web/index.php/api/v2/admin/locations`,
        body: {
            "ids": [
                locationId
            ]
        }
    })
}
