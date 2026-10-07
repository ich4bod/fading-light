(() => {
  const retention = document.querySelector("#retention");
  const frame = document.querySelector("#frame");
  const rewind = document.querySelector("#rewind");
  const advance = document.querySelector("#advance");
  const flashLevel = document.querySelector("#flash-level");
  const halfLevel = document.querySelector("#half-level");
  const glow = document.querySelector("#flash-glow");
  const curve = document.querySelector("#flash-curve");

  function render() {
    const n = Number(frame.value);
    const r = Number(retention.value);
    const level = r ** n;

    flashLevel.textContent = `Frame ${n} · retained ${(100 * level).toFixed(2)}%.`;
    halfLevel.textContent = `Half the starting level after ${(Math.log(0.5) / Math.log(r)).toFixed(2)} updates.`;
    glow.style.opacity = String(level);
    rewind.disabled = n === 0;
    advance.disabled = n === 120;
    curve.setAttribute("points", Array.from({ length: 121 }, (_, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * r ** i).toFixed(3)}`
    ).join(" "));
  }

  frame.addEventListener("input", render);
  retention.addEventListener("change", render);
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
