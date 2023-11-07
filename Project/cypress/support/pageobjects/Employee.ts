export class Employee {
    static baseUrl = Cypress.config().baseUrl
    static addEmployee = (firstName: string, lastName: string) => {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}/web/index.php/api/v2/pim/employees`,
            body: {
                firstName: firstName,
                middleName: "",
                lastName: lastName,
                empPicture: null,
                employeeId: "0258998"
            }
        })
    }
    static addEmployeeLoginInfo = (username: string, password: string, empNumber: string) => {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}/web/index.php/api/v2/admin/users`,
            body: {
                username: username,
                password: password,
                status: true,
                userRoleId: 2,
                empNumber: empNumber
            }
        })
    }

    static addEmployeeJobAndLocationInfo = (empNumber: string, jobId: string, locationId: string) => {
        cy.request({
            method: 'PUT',
            url: `${this.baseUrl}/web/index.php/api/v2/pim/employees/${empNumber}/job-details`,
            body: {
                joinedDate: null,
                jobTitleId: jobId,
                locationId: locationId
            }
        })
    }
    static addEmployeeSalary = (salaryAmount: string, empNumber: string) => {
        cy.request({
            method: 'POST',
            url: `${this.baseUrl}/web/index.php/api/v2/pim/employees/${empNumber}/salary-components`,
            body: {
                salaryComponent: "salary comp" + Math.random() * 1000,
                salaryAmount: salaryAmount,
                currencyId: "AFN",
                comment: null,
                addDirectDeposit: false
            }
        })


    }
    static deleteEmployee = (empNumber: string) => {
        cy.request({
            method: 'DELETE',
            url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees`,
            body: {
                "ids": [
                    empNumber
                ]
            }
        })
    }
  

}