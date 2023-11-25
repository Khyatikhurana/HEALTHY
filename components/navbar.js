// // Get references to each sidebar item by their IDs
// const appointmentLink = document.getElementById("/appointment");
// const bookingLink = document.getElementById("/booking");
// const filesLink = document.getElementById("/files");
// const userLink = document.getElementById("/user");

// // Function to handle sidebar link click
// function handleSidebarLinkClick(event) {
// //   event.preventDefault();
//   const route = event.currentTarget.getAttribute("id"); // Get the ID of the clicked element to determine the route

//   // Perform routing or any desired action based on the route
//   console.log("Navigating to:", route);

//   // Perform a GET request to a specific route using fetch
//   fetch(route, {
//     method: "GET", // Use the GET method
//     headers: {
//       "Content-Type": "html/text",
//       // Add any other headers if required
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error("Network response was not ok.");
//     })
//     .then((data) => {
//       // Process the response data as needed
//       console.log("Data received from the server:", data);
//       // Perform actions based on the received data
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       // Handle errors or show error messages to the user
//     });
// }

// // Add click event listeners to each sidebar link
// appointmentLink.addEventListener("click", handleSidebarLinkClick);
// bookingLink.addEventListener("click", handleSidebarLinkClick);
// filesLink.addEventListener("click", handleSidebarLinkClick);
// userLink.addEventListener("click", handleSidebarLinkClick);
