// ================== UPGRADED PANIC MODE ==================
// Fake Google Sign-In → Password → Google Classroom
// Shift + Tab = close at any time

let panicActive = false;
let currentStage = 0; // 0 = email, 1 = password, 2 = classroom

document.addEventListener('keydown', function(e) {
    if (e.shiftKey && e.key === 'Tab') {
        e.preventDefault();

        if (panicActive) {
            // CLOSE PANIC - works from any stage
            const screen = document.getElementById('google-panic-screen');
            if (screen) screen.remove();
            document.body.style.display = '';
            document.title = "Homework Planet"; // reset tab title
            panicActive = false;
            currentStage = 0;
        } else {
            // START PANIC - Stage 1: Email screen
            showEmailScreen();
        }
    }
});

function showEmailScreen() {
    panicActive = true;
    currentStage = 0;

    const html = `
        <div id="google-panic-screen" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:#f8f9fa; z-index:9999999; margin:0; padding:0; overflow:hidden; font-family:'Roboto',Arial,sans-serif;">
            <!-- Top bar -->
            <div style="background:#fff; height:64px; border-bottom:1px solid #dadce0; display:flex; align-items:center; padding:0 24px;">
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png" style="height:28px;">
            </div>

            <!-- Email card -->
            <div style="max-width:450px; margin:80px auto 0; background:#fff; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.2); padding:40px 40px 36px;">
                <div style="text-align:center; margin-bottom:24px;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png" style="height:72px;">
                    <h1 style="font-size:28px; font-weight:400; margin:24px 0 8px; color:#202124;">Sign in</h1>
                    <p style="color:#202124; font-size:16px;">Use your Google Account</p>
                </div>

                <div style="margin-bottom:24px;">
                    <input type="text" id="fake-email" placeholder="Email or phone" 
                           style="width:100%; height:56px; padding:0 16px; font-size:16px; border:1px solid #dadce0; border-radius:4px; outline:none;">
                    <p id="email-error" style="color:#d93025; font-size:12px; margin-top:4px; display:none;">Couldn't find your Google Account</p>
                </div>

                <button onclick="goToPassword()" 
                        style="width:100%; height:48px; background:#1a73e8; color:white; border:none; border-radius:4px; font-size:15px; font-weight:500; cursor:pointer;">
                    Next
                </button>
            </div>

            <div style="position:absolute; bottom:20px; left:0; right:0; text-align:center; color:#8a8a8a; font-size:13px;">
                Press <strong>Shift + Tab</strong> to return to Homework Planet
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    document.body.style.display = 'none';
    document.title = "Sign in - Google Accounts";

    setTimeout(() => document.getElementById('fake-email').focus(), 100);
}

window.goToPassword = function() {
    currentStage = 1;
    const emailField = document.getElementById('fake-email');
    const error = document.getElementById('email-error');

    if (emailField.value.trim() === '') {
        error.style.display = 'block';
        emailField.style.borderColor = '#d93025';
        return;
    }

    // Replace content with password screen
    const passwordHTML = `
        <div style="max-width:450px; margin:80px auto 0; background:#fff; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.2); padding:40px 40px 36px;">
            <div style="text-align:center; margin-bottom:24px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png" style="height:72px;">
                <h1 style="font-size:24px; font-weight:400; margin:16px 0 4px; color:#202124;">Welcome</h1>
                <p style="color:#202124; font-size:15px;">${emailField.value}</p>
            </div>

            <input type="password" id="fake-password" placeholder="Password" 
                   style="width:100%; height:56px; padding:0 16px; font-size:16px; border:1px solid #dadce0; border-radius:4px; outline:none; margin-bottom:8px;">

            <button onclick="goToClassroom()" 
                    style="width:100%; height:48px; background:#1a73e8; color:white; border:none; border-radius:4px; font-size:15px; font-weight:500; cursor:pointer;">
                Sign in
            </button>
        </div>
    `;

    // Swap the card content
    const oldCard = document.querySelector('#google-panic-screen > div');
    if (oldCard) oldCard.innerHTML = passwordHTML;
    document.title = "Password - Google Accounts";

    setTimeout(() => document.getElementById('fake-password').focus(), 100);
};

window.goToClassroom = function() {
    currentStage = 2;
    document.title = "Google Classroom";

    // Change favicon to Google Classroom
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = 'https://ssl.gstatic.com/classroom/favicon.ico';
    document.head.appendChild(link);

    const classroomHTML = `
        <div id="google-panic-screen" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:#fff; z-index:9999999; margin:0; padding:0; overflow:auto; font-family:'Roboto',Arial,sans-serif;">
            <!-- Classroom Header -->
            <div style="background:#4285f4; color:white; height:64px; display:flex; align-items:center; padding:0 24px; font-size:22px; font-weight:500;">
                <img src="https://ssl.gstatic.com/classroom/favicon.ico" style="height:32px; margin-right:12px;"> Google Classroom
            </div>

            <div style="padding:24px; max-width:1100px; margin:auto;">
                <h2 style="color:#3c4043; margin-bottom:16px;">Classes</h2>
                <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:20px;">
                    <div style="background:#f8f9fa; border-radius:8px; padding:16px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                        <h3 style="margin:0 0 8px 0; color:#1a73e8;">Math 9 - Period 2</h3>
                        <p style="color:#666; font-size:14px;">Mrs. Thompson • Due today</p>
                    </div>
                    <div style="background:#f8f9fa; border-radius:8px; padding:16px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                        <h3 style="margin:0 0 8px 0; color:#1a73e8;">Science 9 - Period 3</h3>
                        <p style="color:#666; font-size:14px;">Mr. Patel • Quiz tomorrow</p>
                    </div>
                    <div style="background:#f8f9fa; border-radius:8px; padding:16px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                        <h3 style="margin:0 0 8px 0; color:#1a73e8;">English 9 - Period 4</h3>
                        <p style="color:#666; font-size:14px;">Ms. Rivera • Essay due Friday</p>
                    </div>
                </div>
            </div>

            <div style="position:absolute; bottom:20px; left:0; right:0; text-align:center; color:#8a8a8a; font-size:13px;">
                Press <strong>Shift + Tab</strong> to return to Homework Planet
            </div>
        </div>
    `;

    const screen = document.getElementById('google-panic-screen');
    if (screen) screen.innerHTML = classroomHTML;
};

// Close panic if they click anywhere on classroom (optional backup)
document.addEventListener('click', function(e) {
    if (panicActive && currentStage === 2 && e.target.id === 'google-panic-screen') {
        const screen = document.getElementById('google-panic-screen');
        if (screen) screen.remove();
        document.body.style.display = '';
        document.title = "Homework Planet";
        panicActive = false;
    }
});
