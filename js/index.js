// Get the file input element
const fileInput = document.getElementById('fileInput');

// Get the file name and display it
function getFileName() {
  const fileName = fileInput.value.split('\\').pop();
  document.getElementById('file-name').textContent = fileName;
}

// Handle file upload and generate the overlay
function handleFileUpload() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const image = new Image();
    image.src = event.target.result;

    image.onload = function() {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;

      // Add your overlay logic here
      // For example, you can draw a logo on the canvas
      // using the context.drawImage() method

      // Draw the uploaded image on the canvas
      context.drawImage(image, 0, 0, image.width, image.height);

      // Get the data URL of the modified image
      const modifiedImageDataURL = canvas.toDataURL();

      // Update the preview area with the modified image
      const previewArea = document.getElementById('preview-area');
      const fileImg = document.getElementById('file-img');
      fileImg.src = modifiedImageDataURL;
      previewArea.style.display = 'block';

      // Show the "DOWNLOAD IMAGE" button
      const downloadImageBtn = document.getElementById('download-image-btn');
      downloadImageBtn.style.display = 'block';
    };
  };

  reader.readAsDataURL(file);
}

// Add event listener for file input change
fileInput.addEventListener('change', handleFileUpload);

// Handle the conversion and download of the image
function convert() {
  const previewArea = document.getElementById('preview-area');

  // Use html2canvas to capture the preview area as a canvas
  html2canvas(previewArea).then(function(canvas) {
    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL();

    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'modified_image.png';
    link.click();
  });
}
