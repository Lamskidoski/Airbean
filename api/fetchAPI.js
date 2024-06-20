const url = 'http://localhost:8020/api/endpoint'; // Ändra till din URL
const data = {
  key1: 'value1',
  key2: 'value2'
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer din-token' // Om autentisering behövs
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
