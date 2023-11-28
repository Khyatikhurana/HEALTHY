function handleClick(element) {
  // Access the ID of the clicked link
  const clickedLinkId = element.id;
  
  // Use the ID as needed
  console.log('Clicked link ID:', clickedLinkId);
  fetch("/deleteAppointment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      appointment_id: clickedLinkId,
    }),
  })
    .then((response) => {
      if (response.ok) {
        windows.lcation.href = "/appointment";
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors or show error messages to the user
    });
}

