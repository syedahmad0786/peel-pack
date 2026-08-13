import "./style.css";
import { advice, coupons, dailyIndex } from "./bank";

const prize = document.querySelector("#prize")!;
const canvas = document.querySelector<HTMLCanvasElement>("#foil")!;
const ctx = canvas.getContext("2d")!;
const sheet = document.querySelector("#sheet")!;

function sizeCanvas() {
  const r = canvas.getBoundingClientRect();
  canvas.width = r.width * devicePixelRatio;
  canvas.height = r.height * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function foil() {
  sizeCanvas();
  const w = canvas.width / devicePixelRatio;
  const h = canvas.height / devicePixelRatio;
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#c0c7d1");
  g.addColorStop(0.5, "#f4f7fb");
  g.addColorStop(1, "#9aa3b2");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#5c6573";
  ctx.font = "700 18px Fredoka, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("SCRATCH ME", w / 2, h / 2);
}

function setPrize(i: number) {
  prize.textContent = advice[i % advice.length];
}

setPrize(dailyIndex());
foil();
addEventListener("resize", foil);

let drawing = false;
function scratch(e: PointerEvent) {
  const r = canvas.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

canvas.addEventListener("pointerdown", (e) => {
  drawing = true;
  canvas.setPointerCapture(e.pointerId);
  scratch(e);
  ping();
});
canvas.addEventListener("pointermove", (e) => {
  if (drawing) scratch(e);
});
canvas.addEventListener("pointerup", () => {
  drawing = false;
});

function ping() {
  const ac = new AudioContext();
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = "sawtooth";
  o.frequency.value = 140 + Math.random() * 80;
  g.gain.value = 0.03;
  o.connect(g);
  g.connect(ac.destination);
  o.start();
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.06);
  o.stop(ac.currentTime + 0.07);
}

document.querySelector("#new-card")!.addEventListener("click", () => {
  setPrize(Math.floor(Math.random() * advice.length));
  foil();
});

const colors = ["#ff4d8d", "#ffe566", "#3ec1ff", "#b8ff6a", "#ff9a3c", "#c9a7ff"];
for (let i = 0; i < 8; i++) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "sticker";
  el.style.background = colors[i % colors.length];
  el.innerHTML = `<span class="over">PEEL</span><span class="under">${coupons[i]}</span>`;
  el.addEventListener("click", () => {
    el.classList.add("peeled");
    ping();
    setTimeout(() => {
      el.classList.add("revealed");
      el.classList.remove("peeled");
    }, 700);
  });
  sheet.append(el);
}
