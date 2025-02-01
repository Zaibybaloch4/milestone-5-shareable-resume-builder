var resumeForm = document.getElementById('resume-form');
var displayElement = document.getElementById('resume-display');
var linkContainer = document.getElementById('shareable-link-container');
var resumeShareableLink = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download');
if (resumeForm && displayElement && linkContainer && resumeShareableLink) {
    // Form submission handler
    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Input
        var photoInput = document.getElementById('photo').files[0];
        var userName = document.getElementById('userName').value;
        var name = document.getElementById('name').value;
        var FatherName = document.getElementById('FatherName').value;
        var email = document.getElementById('email').value;
        var number = document.getElementById('number').value;
        var education = document.getElementById('Qualification').value;
        var skills = document.getElementById('skill').value;
        var certification = document.getElementById('certifications').value;
        var experience = document.getElementById('experience').value;
        var workplace = document.getElementById('workplace').value;
        // Data storage
        var resumeData = {
            photoInput: photoInput,
            name: name,
            email: email,
            number: number,
            education: education,
            skills: skills,
            experience: experience,
            certification: certification,
            workplace: workplace
        };
        localStorage.setItem(userName, JSON.stringify(resumeData));
        var reader = new FileReader();
        reader.onload = function (e) {
            if (e.target) {
                var resumeHTML = "\n                    <h1>DYNAMIC AND EDITABLE RESUME</h1>\n                    <img src=\"".concat(e.target.result, "\" alt=\"Profile Picture\" style=\"width: 300px; height: 300px; border-radius: 100%;\">\n                    <h2>Personal Information:</h2>\n                    <p><b>userName:</b><span contenteditable=\"true\">").concat(userName, "</span></p>\n                    <p><b>Name:</b><span contenteditable=\"true\">").concat(name, "</span></p>\n                    <p><b>FatherName:</b><span contenteditable=\"true\">").concat(FatherName, "</span></p>\n                    <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n                    <p><b>Number:</b><span contenteditable=\"true\">").concat(number, "</span></p>\n                    <h3>Education:</h3>\n                    <p><b>Education:</b><span contenteditable=\"true\">").concat(education, "</span></p>\n                    <h3>Skills:</h3>\n                    <p><b>Skills:</b><span contenteditable=\"true\">").concat(skills, "</span></p>\n                    <p><b>Certification:</b><span contenteditable=\"true\">").concat(certification, "</span></p>\n                    <h3>Experience:</h3>\n                    <p><b>Experience:</b><span contenteditable=\"true\">").concat(experience, "</span></p>\n                    <p><b>Workplace:</b><span contenteditable=\"true\">").concat(workplace, "</span></p>\n                ");
                displayElement.innerHTML = resumeHTML;
                // Generate a unique link (for demonstration purposes, using a random string)
                var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(userName));
                // Display the shareable link
                linkContainer.style.display = 'block';
                resumeShareableLink.href = shareableURL;
                resumeShareableLink.textContent = shareableURL;
            }
            else {
                console.error('Error: e.target is null');
            }
        };
        reader.readAsDataURL(photoInput);
    });
}
else {
    console.error('Error: One or more elements not found');
}
// PDF download
if (downloadPdfButton) {
    downloadPdfButton.addEventListener('click', function () {
        window.print();
    });
}
// Load saved resume data
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('userName').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('number').value = resumeData.number;
            document.getElementById('Qualification').value = resumeData.education;
            document.getElementById('certifications').value = resumeData.certification;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('workplace').value = resumeData.workplace;
            document.getElementById('skill').value = resumeData.skills;
        }
    }
});
