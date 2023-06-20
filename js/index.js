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
      const maxSize = 500; // maximum size for the modified image

      // Determine the size of the modified image
      const size = Math.min(maxSize, Math.max(image.width, image.height));

      canvas.width = maxSize;
      canvas.height = maxSize;

      // Draw background color
      context.fillStyle = '#04D484';
      context.fillRect(0, 0, maxSize, maxSize);

      // Calculate the position to center the image
      const x = (maxSize - size) / 2;
      const y = (maxSize - size) / 2;

      // Draw circular frame
      context.beginPath();
      context.arc(maxSize / 2, maxSize / 2, size / 2, 0, 2 * Math.PI);
      context.fillStyle = '#FFFFFF'; // Set the color inside the circular frame
      context.fill();

      // Draw the uploaded image on the canvas
      context.save();
      context.clip();
      context.drawImage(image, x, y, size, size);
      context.restore();

      // Get the data URL of the modified image
      const modifiedImageDataURL = canvas.toDataURL();

      // Update the preview area with the modified image
      const previewArea = document.getElementById('preview-area');
      const fileImg = document.getElementById('file-img');
      fileImg.src = modifiedImageDataURL;
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

// Show the "DOWNLOAD IMAGE" button and preview area
function showPreview() {
  const previewArea = document.getElementById('preview-area');
  const downloadImageBtn = document.getElementById('download-image-btn');
  previewArea.style.display = 'block';
  downloadImageBtn.style.display = 'block';
}

// Add event listener for "Generate" button click
const generateBtn = document.querySelector('.btn-brand');
generateBtn.addEventListener('click', function() {
  handleFileUpload();
  showPreview();
});
