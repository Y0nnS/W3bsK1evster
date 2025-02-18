// AOS
AOS.init({
    duration: 1200,
});

const staffContainer = document.querySelector('.staffBox-item');
const scrollLeftButton = document.getElementById('scrollLeft');
const scrollRightButton = document.getElementById('scrollRight');

function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("hidden");
}

// HAMBURGER MENU
const hamburger = document.getElementById("hamburger");
const dropdownMenu = document.getElementById("dropdown-menu");

hamburger.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
});

// DONATION DATABASE
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM Loaded!");

    const tableBody = document.getElementById("donationTable");
    console.log("🔍 Table body :", tableBody);

    if (!tableBody) {
        console.error("❌ ERROR : Elemen 'donationTable' tidak ditemukan di DOM!");
        return;
    }

    fetch("../database/donations.json")
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = "";
            data.forEach(donation => {
                const row = `
                    <tr class="border-b border-gray-700">
                        <td class="py-2 px-4">${donation.nama}</td>
                        <td class="py-2 px-4">${donation.note}</td>
                        <td class="py-2 px-4 text-[#e7a77c]">${donation.jumlah}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("⚠️ Error fetching donation data:", error));
});

// STAFF DATABASE
document.addEventListener("DOMContentLoaded", function () {
    fetch("../database/staff.json")
        .then(response => response.json())
        .then(data => {
            const staffContainer = document.getElementById("staff");
            staffContainer.innerHTML = "";

            data.staff.forEach(category => {
                let categoryHTML = `
                    <div>
                        <div class="text-center my-10" data-aos="fade-up">
                            <h1 class="text-xl sm:text-2xl md:text-3xl font-bold">
                                <span class="text-[#d49163]">${category.category}</span>
                            </h1>
                            <p class="text-sm text-gray-300">${category.description}</p>
                        </div>
                    <div class="flex flex-wrap justify-center gap-12">`;

                category.members.forEach(member => {
                    categoryHTML += `
                        <div class="relative flex flex-col items-center bg-gradient-to-b from-[#2e2e2e] to-black p-6 rounded-2xl max-w-xs w-full sm:w-48 shadow-lg 
                            border border-[#d49163]/50 transition-all duration-500 transform group 
                            hover:scale-105 hover:shadow-2xl hover:rotate-1 cursor-pointer" data-aos="fade-up">
                            
                            <!-- Efek Glow -->
                            <div class="absolute inset-0 rounded-2xl bg-[#d49163]/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            
                            <!-- Avatar dengan Animasi Hover -->
                            <img src="${member.image}" alt="${member.name}" 
                                class="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-3 border-2 border-[#d49163] shadow-md 
                                transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                            
                            <!-- Nama -->
                            <p class="text-sm sm:text-base font-semibold text-white transition-all duration-500 group-hover:scale-110 group-hover:text-[#d49163]">${member.name}</p>
                            
                            <!-- Role -->
                            <p class="text-xs sm:text-sm font-light text-gray-400 transition-all duration-500 group-hover:scale-105 group-hover:text-white">${member.role}</p>
                        </div>
                    `;
                });

                categoryHTML += `</div></div>`;
                staffContainer.innerHTML += categoryHTML;
            });

        })
        .catch(error => console.error("Error fetching staff data:", error));
});

// LEADERBAORD DATABASE
document.addEventListener("DOMContentLoaded", async function () {
    const leaderboardList = document.getElementById("leaderboard-list");

    try {
        const response = await fetch("../database/leaderboard.json");
        const leaderboardData = await response.json();

        leaderboardList.innerHTML = leaderboardData.map(player => `
            <div class="flex items-center gap-4 bg-zinc-800 bg-gradient-to-b from-[#2e2e2e] to-black bg-opacity-90 rounded-xl p-5 w-64 sm:w-72 shadow-lg border-[1px] border-[#e7a77c] transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-[#ffcc99] group cursor-pointer ">
                <div
                    class="absolute inset-0 rounded-xl bg-[#e7a77c]/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                </div>
                <div class="w-12 h-12 sm:w-14 sm:h-14">
                    <img src="${player.image}" alt="${player.season}" class="w-full h-full object-cover rounded-full border-0 border-gray-500">
                </div>
                <div>
                    <p class="text-sm sm:text-base font-semibold text-white">${player.rank} ${player.season} | ${player.name}</p>
                </div>
            </div>
        `).join("");

    } catch (error) {
        console.error("Gagal mengambil data leaderboard:", error);
    }
});

// CHANGE IMAGE
document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "./assets/img/yuki.png",
        "./assets/img/yuki2.png",
        "./assets/img/yuki3.png"
    ];
    let index = 0;
    const bgCurrent = document.getElementById("home-bg");
    const bgNext = document.getElementById("home-bg-next");

    function changeBackground() {
        index = (index + 1) % images.length;
        bgNext.style.backgroundImage = `url('${images[index]}')`;
        bgNext.classList.remove("opacity-0");
        bgNext.classList.add("opacity-100");

        setTimeout(() => {
            bgCurrent.style.backgroundImage = bgNext.style.backgroundImage;
            bgNext.classList.remove("opacity-100");
            bgNext.classList.add("opacity-0");
        }, 1000);
    }

    setInterval(changeBackground, 5000);
});
