export const checkDataInTable = (tableSelector: string, rowsData: any[]) => { 
    cy.get(tableSelector,{timeout:40000}).find('.rgRow',{timeout:40000}).should('have.length.gt', 0).each(($row :string, rowIndex :number) => { 
        if (rowIndex < rowsData.length) { 
            const rowData = rowsData[rowIndex]; 
            let allDataFound = true; 
            cy.get($row,{timeout:40000}).find('.rgCell',{timeout:40000}).each(($cell, cellIndex) => { 
                cy.wrap($cell).invoke('text').then((cellText) => { 
                    const cellTextLower = cellText.trim().toLowerCase(); 
                    const expectedData = rowData[cellIndex] ? rowData[cellIndex].toString().toLowerCase().trim() : ''; 
 
                    if (!cellTextLower.includes(expectedData)) { 
                        allDataFound = false; 
                    } 
                }); 
            }); 
            cy.wrap($row).then(() => { 
                if (allDataFound) { 
                    cy.log(`All data found in row ${rowIndex + 1}`); 
                } else { 
                    cy.log(`Data not found in row ${rowIndex + 1}`); 
                } 
            }); 
        } 
    }); 
};