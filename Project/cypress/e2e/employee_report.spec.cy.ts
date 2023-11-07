import { checkDataInTable } from "../support/Utils/checkDataInTable";
import { addJob, deleteJob } from "../support/helper/job";
import { addLocation, deleteLocation } from "../support/helper/location";
import { Employee } from "../support/pageobjects/Employee";
import { Report } from "../support/pageobjects/Report";
let jobId: string;
let empNumber: string;
let number = [];
let locationId: string;
let jobName = "ARTTT"
let reportName = "REPORTTA"
describe("", () => {
    beforeEach(function () {
        cy.visit("/web/index.php/auth/login");
        cy.fixture('employee').as('EmpInfo')
        cy.fixture('location').as('LocationInfo')
        cy.login("Admin", "admin123").then(() => {
            cy.get("@LocationInfo").then((locationData: any) => {
             
                addJob(jobName).then((response) => {
                    jobId = response.body.data.id
                    addLocation(locationData.location.name, locationData.location.code).then((response) => {
                        locationId = response.body.data.id
                        for (let i = 0; i < 3; i++) {
                            cy.get('@EmpInfo').then((infoData: any) => {
                                Employee.addEmployee(infoData.employees[i].firstName, infoData.employees[i].lastName)
                                    .then(async (response) => {
                                        empNumber = await response.body.data.empNumber
                                        number.push(response.body.data.empNumber)
                                        console.log(empNumber)
                                        Employee.addEmployeeLoginInfo(infoData.employees[i].username, infoData.employees[i].password, empNumber)
                                            .then(() => {
                                                Employee.addEmployeeJobAndLocationInfo(empNumber, jobId, locationId)
                                                Employee.addEmployeeSalary(infoData.employees[i].salary, empNumber)
                                            });
                                    })
                            })
                        }

                    })

                })
            })
        })
    })
    it("Create Report", () => {
        cy.get('@EmpInfo').then((infoData: any) => {
            cy.get('@LocationInfo').then((locationData: any) => {
                cy.visit("/web/index.php/pim/viewEmployeeList")
                Report.createReport(reportName, jobName, locationData.location.name).then(() => {
                    cy.get(".rgRow",{timeout:40000}).should("have.length", 3)
                    cy.get(' .oxd-text').contains(reportName)
                    Report.checkTableHeader("Employee First Name", "Job Title", "Amount")
                    for (let i = 0; i < 3; i++) {
                        checkDataInTable('.oxd-report-table', [infoData.employees[i].username, jobName, infoData.employees[i].salary])

                    }
                })
            }).then(() => {
                Report.deleteReport(reportName);
            })

        })
    })
})
after(() => {

    number.forEach((num) => {
        Employee.deleteEmployee(num)
    })
    deleteJob(jobId)
    deleteLocation(locationId)
})
