// CSP-Safe Panic Mode for GitHub Pages
// Shift + Tab = Fake Google Sign In → Password → Classroom

let panicActive = false;
let panicScreen = null;

document.addEventListener('keydown', function(e) {
    if (e.shiftKey && e.key === 'Tab') {
        e.preventDefault();

        if (panicActive) {
            closePanic();
        } else {
            showEmailScreen();
        }
    }
});

function showEmailScreen() {
    panicActive = true;

    panicScreen = document.createElement('div');
    panicScreen.id = 'panic-screen';
    panicScreen.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:#f8f9fa; z-index:9999999; font-family:Arial,sans-serif; overflow:auto; margin:0; padding:0;`;

    panicScreen.innerHTML = `
        <div style="max-width:460px; margin:120px auto; background:#fff; border-radius:8px; box-shadow:0 4px 20px rgba(0,0,0,0.2); padding:40px;">
            <div style="text-align:center;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png" style="height:70px;">
                <h1 style="margin:25px 0 10px; font-size:28px; color:#202124;">Sign in</h1>
                <p style="color:#202124; font-size:16px;">Use your Google Account</p>
            </div>
            
            <input type="text" id="fake-email" placeholder="Email or phone" 
                   style="width:100%; padding:16px; margin:25px 0; font-size:16px; border:1px solid #dadce0; border-radius:4px;">
            
            <button id="next-btn" 
                    style="width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:4px; font-size:16px; cursor:pointer;">
                Next
            </button>
        </div>
        
        <div style="text-align:center; margin-top:60px; color:#666; font-size:14px;">
            Press Shift + Tab to return
        </div>
    `;

    document.body.appendChild(panicScreen);
    document.body.style.display = 'none';
    document.title = "Sign in - Google Accounts";

    // Add click listener safely
    setTimeout(() => {
        const nextBtn = document.getElementById('next-btn');
        const emailInput = document.getElementById('fake-email');
        if (nextBtn) nextBtn.addEventListener('click', goToPassword);
        if (emailInput) emailInput.focus();
    }, 100);
}

function goToPassword() {
    if (!panicScreen) return;

    const email = document.getElementById('fake-email').value.trim() || "student@gmail.com";

    panicScreen.innerHTML = `
        <div style="max-width:460px; margin:120px auto; background:#fff; border-radius:8px; box-shadow:0 4px 20px rgba(0,0,0,0.2); padding:40px;">
            <div style="text-align:center;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png" style="height:70px;">
                <h1 style="margin:20px 0 8px; font-size:24px; color:#202124;">Welcome</h1>
                <p style="color:#202124;">${email}</p>
            </div>
            
            <input type="password" placeholder="Password" 
                   style="width:100%; padding:16px; margin:25px 0; font-size:16px; border:1px solid #dadce0; border-radius:4px;">
            
            <button id="signin-btn" 
                    style="width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:4px; font-size:16px; cursor:pointer;">
                Sign in
            </button>
        </div>
        
        <div style="text-align:center; margin-top:60px; color:#666; font-size:14px;">
            Press Shift + Tab to return
        </div>
    `;

    // Add listener for sign in button
    setTimeout(() => {
        const signinBtn = document.getElementById('signin-btn');
        if (signinBtn) signinBtn.addEventListener('click', showClassroom);
    }, 100);
}

function showClassroom() {
    if (!panicScreen) return;

    document.title = "Google Classroom";

    panicScreen.innerHTML = `
        <div style="background:#4285f4; color:white; padding:20px; font-size:22px; display:flex; align-items:center; gap:12px;">
            <img src="https://ssl.gstatic.com/classroom/favicon.ico" style="height:32px;"> 
            Google Classroom
        </div>
        <div style="padding:40px; color:#333; text-align:center;">
            <h2>Your Classes</h2>
            <div style="margin:30px 0; font-size:18px;">
                Math 9 • Science 9 • English 9
            </div>
            <p style="color:#777;">(This is fake — press Shift + Tab to go back to games)</p>
        </div>
    `;
}

function closePanic() {
    if (panicScreen) {
        panicScreen.remove();
        panicScreen = null;
    }
    document.body.style.display = '';
    document.title = "Homework Planet - Test";
    panicActive = false;
}
