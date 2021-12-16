import axios from "axios";
export const writeFile = data => {
    
    const toJson = Array.from(data);
    const jsonData = JSON.stringify(toJson, null,2);
    axios.post('http://localhost:3001/add', { json: jsonData }, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
    const blob = new Blob([jsonData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'completed_orders.json';
    link.href = url;
    link.click();
  }
  