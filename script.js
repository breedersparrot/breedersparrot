// Handle the import of parrot image
document.getElementById('parrotImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const image = document.getElementById('parrotImageDisplay');
        const img = new Image();
        img.src = e.target.result;

        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set the desired dimensions (fixed size)
            const width = 200;  // Set the desired width
            const height = 200; // Set the desired height

            canvas.width = width;
            canvas.height = height;

            // Draw the image on the canvas with fixed size
            ctx.drawImage(img, 0, 0, width, height);

            // Convert canvas to data URL
            image.src = canvas.toDataURL('image/png');
            image.style.display = 'block'; // Ensure the image is visible
        };
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Handle the import of logo image
document.getElementById('logoImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const logo = document.getElementById('logoImageDisplay');
        logo.src = e.target.result;
        logo.style.display = 'block'; // Ensure the logo is visible
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('issueCertificateBtn').addEventListener('click', function() {
    const parrotType = document.getElementById('parrotType').value;
    const parrotSubtype = document.getElementById('parrotSubtype').value;
    const birthDate = document.getElementById('birthDate').value;
    const nationality = document.getElementById('nationality').value;
    const region = document.getElementById('region').value;
    const legBand = document.getElementById('legBand').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const issueDate = document.getElementById('issueDate').value;

    document.getElementById('displayParrotType').textContent = parrotType;
    document.getElementById('displayParrotSubtype').textContent = parrotSubtype;
    document.getElementById('displayBirthDate').textContent = birthDate;
    document.getElementById('displayNationality').textContent = nationality;
    document.getElementById('displayRegion').textContent = region;
    document.getElementById('displayLegBand').textContent = legBand;
    document.getElementById('displayContactNumber').textContent = contactNumber;
    document.getElementById('displayIssueDate').textContent = issueDate;

    // Show certificate section
    document.querySelector('.certificate-section').style.display = 'flex';
});

document.getElementById('downloadPNG').addEventListener('click', function() {
    html2canvas(document.querySelector('.certificate'), {
        useCORS: true,  // Added to handle CORS for image loading
        scale: 2        // Added to improve the resolution of the PNG image
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'parrot_certificate.png';
        
        // Create a click event and dispatch it to download the image
        const event = new MouseEvent('click');
        link.dispatchEvent(event);
    });
});

document.getElementById('downloadPDF').addEventListener('click', function() {
    html2canvas(document.querySelector('.certificate'), {
        useCORS: true,  // Added to handle CORS for image loading
        scale: 2        // Added to improve the resolution of the PDF image
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save('parrot_certificate.pdf');
    });
});
