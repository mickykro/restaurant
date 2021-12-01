export const floor = (tables) => {
    let floor = [];
    tables.forEach(table => {
        floor.push({
            table: table.table,
            diners: table.diners,
            concat: table.concat
        })
    })
}