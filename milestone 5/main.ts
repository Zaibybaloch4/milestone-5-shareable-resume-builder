const resumeForm = document.getElementById('resume-form') as HTMLFormElement | null;
const displayElement = document.getElementById('resume-display') as HTMLDivElement | null;
const linkContainer = document.getElementById('shareable-link-container') as HTMLDivElement | null;
const resumeShareableLink = document.getElementById('shareable-link') as HTMLAnchorElement | null;
const downloadPdfButton = document.getElementById('download') as HTMLAnchorElement | null;

if (resumeForm && displayElement && linkContainer && resumeShareableLink) {
    // Form submission handler
    resumeForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        // Input
        const photoInput = (document.getElementById('photo') as HTMLInputElement).files![0];
        const userName = (document.getElementById('userName') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const FatherName = (document.getElementById('FatherName') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const number = (document.getElementById('number') as HTMLInputElement).value;
        const education = (document.getElementById('Qualification') as HTMLInputElement).value;
        const skills = (document.getElementById('skill') as HTMLInputElement).value;
        const certification = (document.getElementById('certifications') as HTMLInputElement).value;
        const experience = (document.getElementById('experience') as HTMLInputElement).value;
        const workplace = (document.getElementById('workplace') as HTMLInputElement).value;

        // Data storage
        const resumeData = {
            photoInput,
            name,
            email,
            number,
            education,
            skills,
            experience,
            certification,
            workplace
        };
        localStorage.setItem(userName, JSON.stringify(resumeData));

        const reader = new FileReader();
        reader.onload = function (e) {
            if (e.target) {
                const resumeHTML = `
                    <h1>DYNAMIC AND EDITABLE RESUME</h1>
                    <img src="${e.target.result}" alt="Profile Picture" style="width: 300px; height: 300px; border-radius: 100%;">
                    <h2>Personal Information:</h2>
                    <p><b>userName:</b><span contenteditable="true">${userName}</span></p>
                    <p><b>Name:</b><span contenteditable="true">${name}</span></p>
                    <p><b>FatherName:</b><span contenteditable="true">${FatherName}</span></p>
                    <p><b>Email:</b><span contenteditable="true">${email}</span></p>
                    <p><b>Number:</b><span contenteditable="true">${number}</span></p>
                    <h3>Education:</h3>
                    <p><b>Education:</b><span contenteditable="true">${education}</span></p>
                    <h3>Skills:</h3>
                    <p><b>Skills:</b><span contenteditable="true">${skills}</span></p>
                    <p><b>Certification:</b><span contenteditable="true">${certification}</span></p>
                    <h3>Experience:</h3>
                    <p><b>Experience:</b><span contenteditable="true">${experience}</span></p>
                    <p><b>Workplace:</b><span contenteditable="true">${workplace}</span></p>
                `;
                displayElement.innerHTML = resumeHTML;

                // Generate a unique link (for demonstration purposes, using a random string)
                const shareableURL = `${window.location.origin}?username=${encodeURIComponent(userName)}`;

                // Display the shareable link
                linkContainer.style.display = 'block';
                resumeShareableLink.href = shareableURL;
                resumeShareableLink.textContent = shareableURL;
            } else {
                console.error('Error: e.target is null');
            }
        };
        reader.readAsDataURL(photoInput);
    });
} else {
    console.error('Error: One or more elements not found');
}

// PDF download
if (downloadPdfButton) {
    downloadPdfButton.addEventListener('click', () => {
        window.print();
    });
}

// Load saved resume data
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('userName') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('number') as HTMLInputElement).value = resumeData.number;
            (document.getElementById('Qualification') as HTMLInputElement).value = resumeData.education;
            (document.getElementById('certifications') as HTMLInputElement).value = resumeData.certification;
            (document.getElementById('experience') as HTMLInputElement).value = resumeData.experience;
            (document.getElementById('workplace') as HTMLInputElement).value = resumeData.workplace;
            (document.getElementById('skill') as HTMLInputElement).value = resumeData.skills;
        }
    }
});
