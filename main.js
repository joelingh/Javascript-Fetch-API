const URL = 'https://jsonplaceholder.typicode.com/'


// -- Fetch can be run alone, returning promise
const fetchData = fetch(URL)
console.log(fetchData)

// -- Fetch to return JSON
// Fetch does not directly return the JSON response body but instead returns a promise that resolves with a Response object.
fetch(URL)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error))

// -- Checking that the fetch was successful
// A fetch() promise will reject with a TypeError when a network error is encountered or CORS is misconfigured on the server-side
fetch(URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then(response => {
        console.log(response)
    })
    // ** To avoid this, you could check foe the respone 
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// -- Sending a request with credentials included
// The fetch() method can optionally accept a second parameter, an init object that allows you to control a number of different settings
fetch(URL, {
    credentials: 'include'
});

// -- Uploading JSON data
const data = {
    username: 'example'
};
fetch(URL, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });


// -- Supplying your own request object
// Instead of passing a path to the resource you want to request into the fetch() call, 
// you can create a request object using the Request() constructor, and pass that in as a fetch() method argumen
const myHeaders = new Headers();

const myRequest = new Request(URL, {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
});

fetch(myRequest)
    .then(response => response.blob())
    .then(myBlob => {
        myImage.src = URL.createObjectURL(myBlob);
    });