const infoPanel = document.getElementById('info-panel');
const menuItems = document.querySelectorAll('.menu-btn');

const infoContent = {
    about: `<strong>About Me</strong><br>Hello! I'm Katam Nani, a passionate BTech second-year student at Lovely Professional University, specializing in Electronics and Communication Engineering. I am eager to learn, innovate, and contribute to exciting projects in my field.`,
    projects: `<strong>Projects</strong><ul><li>Gesture Control Robot</li><li>Drone Detection</li></ul>`,
    specialization: `<strong>Specialization</strong><br>Electronics and Communication Engineering, Embedded Systems, IoT, Robotics.`,
    contact: `<strong>Contact Info</strong><br>Email: knaninani6281@gmail.com<br>LinkedIn: <a href="https://linkedin.com/in/yourprofile" target="_blank">yourprofile</a>`,
    education: `<strong>Education</strong><br>BTech in Electronics and Communication Engineering, Lovely Professional University`
};

menuItems.forEach(btn => {
    btn.addEventListener('click', () => {
        infoPanel.innerHTML = infoContent[btn.dataset.section];
        infoPanel.style.display = 'block';
    });
});

// Hide info panel when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('menu-btn')) {
        infoPanel.style.display = 'none';
    }
});
// You can add interactive features here if needed
// For example, smooth scrolling or form validation