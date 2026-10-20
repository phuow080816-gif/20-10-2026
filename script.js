
const stars = document.getElementById("stars");
const heart = document.getElementById("heart");
const heartStage = document.getElementById("heartStage");
const surpriseBtn = document.getElementById("surpriseBtn");
const letter = document.getElementById("letter");

// Tạo nền sao
for (let i = 0; i < 110; i++) {
    const star = document.createElement("span");
    star.className = "star";

    const size = 1 + Math.random() * 2;

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.setProperty(
        "--duration",
        2 + Math.random() * 4 + "s"
    );

    star.style.animationDelay = Math.random() * 4 + "s";
    stars.appendChild(star);
}

// Tạo hạt sáng bay
function createSparkle(x, y) {
    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";
    sparkle.textContent = Math.random() > 0.35 ? "✦" : "·";

    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";

    sparkle.style.setProperty(
        "--dx",
        (Math.random() - 0.5) * 160 + "px"
    );

    sparkle.style.setProperty(
        "--dy",
        (-40 - Math.random() * 120) + "px"
    );

    sparkle.style.setProperty(
        "--time",
        1.5 + Math.random() * 1.5 + "s"
    );

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 3200);
}

// Hiệu ứng ánh sáng quanh trái tim
function sparkleAroundHeart(amount = 25) {
    const rect = heart.getBoundingClientRect();

    for (let i = 0; i < amount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 65 + Math.random() * 90;

        const x = rect.left + rect.width / 2
            + Math.cos(angle) * distance;

        const y = rect.top + rect.height / 2
            + Math.sin(angle) * distance;

        setTimeout(() => createSparkle(x, y), i * 45);
    }
}

// Nhấn hoặc chạm trái tim
heart.addEventListener("click", () => {
    sparkleAroundHeart(25);
});

heart.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        sparkleAroundHeart(25);
    }
});

// Mở và đóng lời chúc
surpriseBtn.addEventListener("click", () => {
    const isOpen = letter.classList.toggle("show");

    letter.setAttribute("aria-hidden", String(!isOpen));

    if (isOpen) {
        surpriseBtn.innerHTML = "♡ Gửi thêm yêu thương ♡";
        sparkleAroundHeart(35);

        letter.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    } else {
        surpriseBtn.innerHTML =
            "<span>✧</span> Mở món quà nhỏ <span>✧</span>";
    }
});

// Ánh sáng ngẫu nhiên trên nền
setInterval(() => {
    if (Math.random() < 0.65) {
        createSparkle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        );
    }
}, 850);

// Nghiêng trái tim nhẹ theo chuột
if (window.matchMedia("(hover: hover)").matches) {
    heartStage.addEventListener("mousemove", (event) => {
        const rect = heartStage.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        heart.style.animationPlayState = "paused";
        heart.style.transform =
            `translateY(-2px) rotateY(${x * 18}deg) ` +
            `rotateX(${-y * 12}deg)`;
    });

    heartStage.addEventListener("mouseleave", () => {
        heart.style.animationPlayState = "running";
        heart.style.transform = "";
    });
}
