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
      const size = Math.min(image.width, image.height);

      canvas.width = size;
      canvas.height = size;

      // Draw circular frame
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      context.fillStyle = '#04D484';
      context.fill();

      // Draw the uploaded image on the circular frame
      context.save();
      context.clip();
      context.drawImage(image, 0, 0, size, size);
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
