const dateFormatter = require("./dateFormatter");
function fillTable(data) {
  let final = "";

  if (data.length === 0) {
    return "No Upcoming Appointments";
  }
  var j = 1;
  for (const ele of data) {
    const formattedDate = dateFormatter.formatDate(ele.date);
    // Generate the modified option for each department
    const modifiedOption = `<tr>
    <th scope="row">${j}</th>
    <td>${formattedDate}</td>
    <td>${ele.appointment_time}</td>
    <td>Dr. ${ele.doctor_first_name} ${ele.doctor_last_name}</td>
    </tr>`;
    j = j + 1;
    // Append the modified option to the final string
    final += modifiedOption;
  }

  // Replace the placeholder in the main template with the generated options

  return final;
}

module.exports = { fillTable };
