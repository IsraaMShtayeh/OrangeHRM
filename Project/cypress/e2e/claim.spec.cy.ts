
import { id, submitClaim } from "../support/helper/claim";
import { addEvent, deleteEvent } from "../support/helper/event";
import { addExpense, deleteExpense } from "../support/helper/expense";
import { AssignClaim } from "../support/pageobjects/AssignClaim";
import { Employee } from "../support/pageobjects/Employee";


let empNumber: string;
let eventName = "EVENTAB";
let eventId: string;
let expenseName = "EXPENSEAB";
let expenseId: string;
let amount = "5";
describe("", () => {
    beforeEach(function () {
        cy.visit("/web/index.php/auth/login");
        cy.fixture('employee').as('EmpInfo')
        cy.login("Admin", "admin123").then(() => {
            cy.get('@EmpInfo').then((infoData: any) => {
                Employee.addEmployee(infoData.employees[0].firstName, infoData.employees[0].lastName)
                    .then(async (response) => {
                        empNumber = await response.body.data.empNumber
                        Employee.addEmployeeLoginInfo(infoData.employees[0].username, infoData.employees[0].password, empNumber)

                    }).then(() => {

                        addEvent(eventName).then((response) => {
                            eventId = response.body.data.id;
                            console.log("Event", eventId)
                            addExpense(expenseName).then((response) => {
                                expenseId = response.body.data.id;
                                console.log("expense", expenseId)
                            })
                        })
                    }).then(() => {
                        cy.logout()
                        cy.login(infoData.employees[0].username, infoData.employees[0].password).then(() => {
                            cy.wait(3000)
                            cy.visit("/web/index.php/claim/viewClaim")
                            submitClaim(eventId, expenseId, amount)
                            cy.logout()
                        })
                    })

            })



        })
    })



    it("approved claims", () => {
        cy.login("Admin", "admin123").then(() => {
            cy.wait(3000)
            cy.visit(`/web/index.php/claim/assignClaim/id/${id}`)
        })
        cy.get('@EmpInfo').then((infoData: any) => {

            AssignClaim.assignClaim(infoData.employees[0].firstName, infoData.employees[0].lastName, "Paid", amount)
        })
        deleteEvent(eventId)
        deleteExpense(expenseId)
        Employee.deleteEmployee(empNumber)
    })
    it("rejected claims", () => {

        cy.login("Admin", "admin123").then(() => {
            cy.wait(3000)
            cy.visit(`/web/index.php/claim/assignClaim/id/${id}`)
        })

        cy.get('@EmpInfo').then((infoData: any) => {

            AssignClaim.assignClaim(infoData.employees[0].firstName, infoData.employees[0].lastName, "Rejected", amount)
        })
        deleteEvent(eventId)
        deleteExpense(expenseId)
        Employee.deleteEmployee(empNumber)
    })

   
})
