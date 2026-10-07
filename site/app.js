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
  const pulseSpacing = document.querySelector("#pulse-spacing");
  const trainLevel = document.querySelector("#train-level");
  const trainGlow = document.querySelector("#train-glow");
  const curve = document.querySelector("#flash-curve");
  const curveB = document.querySelector("#second-curve");
  const trainCurve = document.querySelector("#train-curve");

  function render() {
    const n = Number(frame.value);
    const r = Number(retention.value);
    const level = r ** n;
    const rB = Number(retentionB.value);
    const levelB = rB ** n;
    const spacing = Number(pulseSpacing.value);
    const trainValues = [0.35];
    for (let i = 1; i <= 120; i++) {
      trainValues.push(Math.min(1, r * trainValues[i - 1] + (i % spacing === 0 ? 0.35 : 0)));
    }
    const train = trainValues[n];

    flashLevel.textContent = `Frame ${n} · retained ${(100 * level).toFixed(2)}%.`;
    trainLevel.textContent = `Frame ${n} · pulse-train level ${(100 * train).toFixed(2)}%.`;
    secondLevel.textContent = `Frame ${n} · retained ${(100 * levelB).toFixed(2)}%.`;
    halfLevel.textContent = `Half the starting level after ${(Math.log(0.5) / Math.log(r)).toFixed(2)} updates.`;
    glow.style.opacity = String(level);
    glowB.style.opacity = String(levelB);
    trainGlow.style.opacity = String(train);
    rewind.disabled = n === 0;
    advance.disabled = n === 120;
    curve.setAttribute("points", Array.from({ length: 121 }, (_, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * r ** i).toFixed(3)}`
    ).join(" "));
    curveB.setAttribute("points", Array.from({ length: 121 }, (_, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * rB ** i).toFixed(3)}`
    ).join(" "));
    trainCurve.setAttribute("points", trainValues.map((value, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * value).toFixed(3)}`
    ).join(" "));
  }

  frame.addEventListener("input", render);
  retention.addEventListener("change", render);
  retentionB.addEventListener("change", render);
  pulseSpacing.addEventListener("change", render);
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
