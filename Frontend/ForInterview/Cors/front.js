fetch("http://backend.com/data")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));