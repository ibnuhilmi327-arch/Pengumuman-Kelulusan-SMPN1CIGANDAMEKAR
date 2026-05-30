let students = [];
let captchaCode = "";

// Load CSV
async function loadCSV() {
    const response = await fetch("Data%20Siswa%20Kelas9.csv");
    const data = await response.text();

    const rows = data.trim().split("\n").slice(1);

    students = rows.map(row => {
        const cols = row.split(",");
        return {
            nisn: cols[0].trim(),
            nama: cols[1].trim(),
            status: cols[2].trim()
        };
    });

    console.log(students);
}

// Captcha
function generateCaptcha() {
    captchaCode = Math.random().toString(36).substring(2, 7);
    if(document.getElementById("captcha")){
        document.getElementById("captcha").innerText = captchaCode;
    }
}

// Login
function login() {
    const nisn = document.getElementById("nisn").value.trim();
    const captchaInput = document.getElementById("captchaInput").value.trim();

    if(captchaInput !== captchaCode){
        alert("Captcha salah!");
        generateCaptcha();
        return;
    }

    localStorage.setItem("nisn", nisn);
    window.location.href = "pengumuman.html";
}

// Tampilkan hasil
async function showResult() {
    await loadCSV();

    const nisn = localStorage.getItem("nisn");
    const student = students.find(s => s.nisn === nisn);

    const drumroll = document.getElementById("drumroll");
    const success = document.getElementById("success");

    drumroll.play();

    setTimeout(() => {
        drumroll.pause();
        success.play();

        if(student){
            document.getElementById("result").innerHTML = `
                <h2>NISN: ${student.nisn}</h2>
                <h2>${student.nama}</h2>
                <h1 style="color:yellow;">🎓 ${student.status} 🎉</h1>
            `;

            confetti({
                particleCount: 300,
                spread: 150
            });

        } else {
            document.getElementById("result").innerHTML =
                "<h2>Data tidak ditemukan</h2>";
        }
    }, 4000);
}

// Init
generateCaptcha();

if(window.location.pathname.includes("pengumuman.html")){
    showResult();
}
