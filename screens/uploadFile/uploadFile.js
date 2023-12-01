const form = document.querySelector("form"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  let file = target.files[0];

  // Check if a file is selected
  if (file) {
    // Check file format (allow only PDF)
    // Check file size (limit to 5 MB)
    if (file.size <= 5 * 1024 * 1024) {
      // Call the uploadFile function
      uploadFile(file);
    } else {
      alert("File size exceeds the limit (5 MB).");
    }
  }
};

function uploadFile(file) {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   fetch("/upload", { // Assuming the server endpoint is '/upload'
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log("Response is ok");
  //         return response.json();
  //       }
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then((data) => {
  //       // Process the response data as needed
  //       console.log("Signed Up successfully:", data);
  //       window.history.replaceState(null, "", "/dashboard");
  //       window.location.href = "/dashboard";
  //       // Show success message or perform other actions based on the response
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       // Handle errors or show error messages to the user
  //     });
  // }

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload");
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    fileTotal < 1024
      ? (fileSize = fileTotal + " KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");
      var name = file.name;
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if (loaded == total) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  let data = new FormData();
  data.append("file", file);
  xhr.send(data);
}
