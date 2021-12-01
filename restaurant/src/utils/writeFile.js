export const writeFile = jsonData => {
    const fileData = JSON.stringify(jsonData, null,2);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'completed_orders.json';
    link.href = url;
    link.click();
  }
  