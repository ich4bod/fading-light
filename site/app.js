(() => {
  const retention = document.querySelector("#retention");
  const retentionB = document.querySelector("#retention-b");
  const frame = document.querySelector("#frame");
  const rewind = document.querySelector("#rewind");
  const advance = document.querySelector("#advance");
  const flashLevel = document.querySelector("#flash-level");
  const halfLevel = document.querySelector("#half-level");
  const glow = document.querySelector("#flash-glow");
  const glowB = document.querySelector("#second-glow");
  const secondLevel = document.querySelector("#second-level");
  const curve = document.querySelector("#flash-curve");
  const curveB = document.querySelector("#second-curve");

  function render() {
    const n = Number(frame.value);
    const r = Number(retention.value);
    const level = r ** n;
    const rB = Number(retentionB.value);
    const levelB = rB ** n;

    flashLevel.textContent = `Frame ${n} · retained ${(100 * level).toFixed(2)}%.`;
    secondLevel.textContent = `Frame ${n} · retained ${(100 * levelB).toFixed(2)}%.`;
    halfLevel.textContent = `Half the starting level after ${(Math.log(0.5) / Math.log(r)).toFixed(2)} updates.`;
    glow.style.opacity = String(level);
    glowB.style.opacity = String(levelB);
    rewind.disabled = n === 0;
    advance.disabled = n === 120;
    curve.setAttribute("points", Array.from({ length: 121 }, (_, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * r ** i).toFixed(3)}`
    ).join(" "));
    curveB.setAttribute("points", Array.from({ length: 121 }, (_, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * rB ** i).toFixed(3)}`
    ).join(" "));
  }

  frame.addEventListener("input", render);
  retention.addEventListener("change", render);
  retentionB.addEventListener("change", render);
  rewind.addEventListener("click", () => {
    frame.value = String(Math.max(0, Number(frame.value) - 1));
    render();
  });
  advance.addEventListener("click", () => {
    frame.value = String(Math.min(120, Number(frame.value) + 1));
    render();
  });

  render();
})();
