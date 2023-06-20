// Get the file input element
const fileInput = document.getElementById('fileInput');

// Get the file name and display it
function getFileName() {
  const fileName = fileInput.value.split('\\').pop();
  document.getElementById('file-name').textContent = fileName;
}

// Handle file upload and generate the overlay
function generateProfilePicture() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const image = new Image();
    image.src = event.target.result;

    image.onload = function() {
      // Resize the image to 390x390 if it's not already
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const maxSize = 390; // maximum size for the modified image

      if (image.width !== maxSize || image.height !== maxSize) {
        canvas.width = maxSize;
        canvas.height = maxSize;

        context.drawImage(image, 0, 0, maxSize, maxSize);
        const resizedDataURL = canvas.toDataURL();

        const resizedImage = new Image();
        resizedImage.src = resizedDataURL;

        resizedImage.onload = function() {
          drawProfilePicture(resizedImage);
        };
      } else {
        drawProfilePicture(image);
      }
    };
  };

  reader.readAsDataURL(file);
}

// Draw the profile picture with circular overlay
function drawProfilePicture(image) {
  // Create a new canvas with the desired dimensions
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const canvasSize = 400; // size of the canvas
  const cropRadius = 180; // radius of the circular crop

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  // Draw background color
  context.fillStyle = '#04D484';
  context.fillRect(0, 0, canvasSize, canvasSize);

  // Calculate the position to center the image
  const imageSize = Math.min(canvasSize, Math.max(image.width, image.height));
  const x = (canvasSize - imageSize) / 2;
  const y = (canvasSize - imageSize) / 2;

  // Draw circular frame
  context.beginPath();
  context.arc(canvasSize / 2, canvasSize / 2, cropRadius, 0, 2 * Math.PI);
  context.closePath();
  context.fillStyle = '#FFFFFF'; // Set the color inside the circular frame
  context.fill();

  // Draw the uploaded image on the canvas
  context.save();
  context.clip();
  context.drawImage(image, x, y, imageSize, imageSize);
  context.restore();

  // Update the preview area with the modified image
  const previewArea = document.getElementById('preview-area');
  const fileImg = document.getElementById('file-img');
  fileImg.src = canvas.toDataURL();
  previewArea.style.display = 'block';

  // Show the "DOWNLOAD IMAGE" button
  const downloadImageDiv = document.getElementById('download-image');
  downloadImageDiv.style.display = 'block';
}

// Convert canvas to data URL and trigger download
function downloadImage() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const canvasSize = 400; // size of the canvas

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  // Draw background color
  context.fillStyle = '#04D484';
  context.fillRect(0, 0, canvasSize, canvasSize);

  // Get the image element from the preview area
  const image = document.getElementById('file-img');

  // Calculate the position to center the image
  const imageSize = Math.min(canvasSize, Math.max(image.width, image.height));
  const x = (canvasSize - imageSize) / 2;
  const y = (canvasSize - imageSize) / 2;

  // Draw the image on the canvas
  context.drawImage(image, x, y, imageSize, imageSize);

  // Convert the canvas to a data URL
  const dataURL = canvas.toDataURL();

  // Create a temporary link element to trigger the download
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'profile_picture.png';

  // Trigger the click event on the link to download the image
  link.click();
}










// V2 WORKFLOW
// V2 WORKFLOW



// // Get the file input element
// const fileInput = document.getElementById('fileInput');

// // Get the file name and display it
// function getFileName() {
//   const fileName = fileInput.value.split('\\').pop();
//   document.getElementById('file-name').textContent = fileName;
// }

// // Handle file upload and generate the overlay
// function generateProfilePicture() {
//   const file = fileInput.files[0];
//   const reader = new FileReader();

//   reader.onload = function(event) {
//     const image = new Image();
//     image.src = event.target.result;

//     image.onload = function() {
//       const canvas = document.createElement('canvas');
//       const context = canvas.getContext('2d');
//       const maxSize = 400; // maximum size for the modified image

//       // Resize the image to 390x390px if it has a different size
//       if (image.width !== 390 || image.height !== 390) {
//         const resizedCanvas = document.createElement('canvas');
//         resizedCanvas.width = 390;
//         resizedCanvas.height = 390;
//         const resizedContext = resizedCanvas.getContext('2d');
//         resizedContext.drawImage(image, 0, 0, 390, 390);
//         image.src = resizedCanvas.toDataURL();
//       } 
      

//       canvas.width = maxSize;
//       canvas.height = maxSize;

//       // Draw background color
//       context.fillStyle = '#04D484';
//       context.fillRect(0, 0, maxSize, maxSize);

//       // Calculate the position to center the image
//       const size = 400;
//       const x = (maxSize - size) / 2;
//       const y = (maxSize - size) / 2;

//       // Draw the circular frame
//       context.beginPath();
//       context.arc(maxSize / 2, maxSize / 2, size / 2, 0, 2 * Math.PI);
//       context.closePath();
//       context.clip();

//       // Draw the uploaded image on the canvas
//       context.drawImage(image, x, y, size, size);

//       // Get the data URL of the modified image
//       const modifiedImageDataURL = canvas.toDataURL();

//       // Update the preview area with the modified image
//       const previewArea = document.getElementById('preview-area');
//       const fileImg = document.getElementById('file-img');
//       fileImg.src = modifiedImageDataURL;

//       // Show the preview area and download button
//       showPreview();
//     };
//   };

//   reader.readAsDataURL(file);
// }

// // Show the "DOWNLOAD IMAGE" button and preview area
// function showPreview() {
//   const previewArea = document.getElementById('preview-area');
//   const downloadImageDiv = document.getElementById('download-image');
//   previewArea.style.display = 'block';
//   downloadImageDiv.style.display = 'block';
// }

// // Handle the conversion and download of the image
// function downloadImage() {
//   const previewArea = document.getElementById('preview-area');
//   const downloadImageBtn = document.getElementById('download-image-btn');

//   // Create a new canvas with the desired dimensions
//   const canvas = document.createElement('canvas');
//   const maxSize = 400; // maximum size for the modified image
//   canvas.width = maxSize;
//   canvas.height = maxSize;

//   // Draw background color
//   const context = canvas.getContext('2d');
//   context.fillStyle = '#04D484';
//   context.fillRect(0, 0, maxSize, maxSize);

//   // Get the image element from the preview area
//   const image = previewArea.querySelector('img');

//   // Calculate the position to center the image
//   const size = 400;
//   const x = (maxSize - size) / 2;
//   const y = (maxSize - size) / 2;

//   // Draw the circular frame
//   context.beginPath();
//   context.arc(maxSize / 2, maxSize / 2, size / 2, 0, 2 * Math.PI);
//   context.closePath();
//   context.clip();

//   // Draw the image on the canvas
//   context.drawImage(image, x, y, size, size);

//   // Convert the canvas to a data URL
//   const dataURL = canvas.toDataURL();

//   // Create a temporary link element to trigger the download
//   const link = document.createElement('a');
//   link.href = dataURL;
//   link.download = 'haqqchain_profile_picture.png';

//   // Trigger the click event on the link to download the image
//   link.click();
// }

// // Add event listener for file input change
// fileInput.addEventListener('change', getFileName);






















// V1 WORKFLOW
// V1 WORKFLOW
// V1 WORKFLOW
// V1 WORKFLOW
// V1 WORKFLOW
// V1 WORKFLOW


// // Get the file input element
// const fileInput = document.getElementById('fileInput');

// // Get the file name and display it
// function getFileName() {
//   const fileName = fileInput.value.split('\\').pop();
//   document.getElementById('file-name').textContent = fileName;
// }

// // Handle file upload and generate the overlay
// function handleFileUpload() {
//   const file = fileInput.files[0];
//   const reader = new FileReader();

//   reader.onload = function(event) {
//     const image = new Image();
//     image.src = event.target.result;

//     image.onload = function() {
//       const canvas = document.createElement('canvas');
//       const context = canvas.getContext('2d');
//       const maxSize = 500; // maximum size for the modified image

//       // Determine the size of the modified image
//       const size = Math.min(maxSize, Math.max(image.width, image.height));

//       canvas.width = maxSize;
//       canvas.height = maxSize;

//       // Draw background color
//       context.fillStyle = '#04D484';
//       context.fillRect(0, 0, maxSize, maxSize);

//       // Calculate the position to center the image
//       const x = (maxSize - size) / 2;
//       const y = (maxSize - size) / 2;

//       // Draw circular frame
//       context.beginPath();
//       context.arc(maxSize / 2, maxSize / 2, size / 2, 0, 2 * Math.PI);
//       context.fillStyle = '#FFFFFF'; // Set the color inside the circular frame
//       context.fill();

//       // Draw the uploaded image on the canvas
//       context.save();
//       context.clip();
//       context.drawImage(image, x, y, size, size);
//       context.restore();

//       // Get the data URL of the modified image
//       const modifiedImageDataURL = canvas.toDataURL();

//       // Update the preview area with the modified image
//       const previewArea = document.getElementById('preview-area');
//       const fileImg = document.getElementById('file-img');
//       fileImg.src = modifiedImageDataURL;
//     };
//   };

//   reader.readAsDataURL(file);
// }

// // Add event listener for file input change
// fileInput.addEventListener('change', handleFileUpload);

// // Handle the conversion and download of the image
// function convert() {
//   const previewArea = document.getElementById('preview-area');
//   const downloadImageBtn = document.getElementById('download-image-btn');
  
//   // Create a new canvas with the desired dimensions
//   const canvas = document.createElement('canvas');
//   const maxSize = 500; // maximum size for the modified image
//   canvas.width = maxSize;
//   canvas.height = maxSize;
  
//   // Draw background color
//   const context = canvas.getContext('2d');
//   context.fillStyle = '#04D484';
//   context.fillRect(0, 0, maxSize, maxSize);
  
//   // Get the image element from the preview area
//   const image = previewArea.querySelector('img');
  
//   // Calculate the position to center the image
//   const size = Math.min(maxSize, Math.max(image.width, image.height));
//   const x = (maxSize - size) / 2;
//   const y = (maxSize - size) / 2;
  
//   // Draw the image on the canvas
//   context.drawImage(image, x, y, size, size);
  
//   // Convert the canvas to a data URL
//   const dataURL = canvas.toDataURL();

//   // Create a temporary link element to trigger the download
//   const link = document.createElement('a');
//   link.href = dataURL;
//   link.download = 'modified_image.png';

//   // Trigger the click event on the link to download the image
//   link.click();
// }


// // Show the "DOWNLOAD IMAGE" button and preview area
// function showPreview() {
//   const previewArea = document.getElementById('preview-area');
//   const downloadImageDiv = document.getElementById('download-image');
//   previewArea.style.display = 'block';
//   downloadImageDiv.style.display = 'block';
// }

// // Add event listener for "Generate" button click
// const generateBtn = document.querySelector('.btn-brand');
// generateBtn.addEventListener('click', function() {
//   handleFileUpload();
//   showPreview();
// });

