(() => {
  const retention = document.querySelector("#retention");
  const retentionB = document.querySelector("#retention-b");
  const frame = document.querySelector("#frame");
  const rewind = document.querySelector("#rewind");
  const advance = document.querySelector("#advance");
  const run = document.querySelector("#run");
  const pause = document.querySelector("#pause");
  const playStatus = document.querySelector("#play-status");
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

  let running = false;
  let startN = 0;
  let startTime = 0;
  let rafHandle = null;

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
    run.disabled = running || n === 120;
    pause.disabled = !running;
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

  function stopPlayback(status) {
    if (rafHandle !== null) {
      cancelAnimationFrame(rafHandle);
      rafHandle = null;
    }
    running = false;
    playStatus.textContent = status;
    render();
  }

  function updateFromElapsed(now) {
    const n = Math.min(120, startN + Math.floor((now - startTime) * 30 / 1000));
    if (n !== Number(frame.value)) {
      frame.value = String(n);
      render();
    }
    if (n === 120) {
      stopPlayback("Finished at frame 120.");
      return false;
    }
    return true;
  }

  function playbackFrame(now) {
    rafHandle = null;
    if (!running) return;
    if (updateFromElapsed(now)) rafHandle = requestAnimationFrame(playbackFrame);
  }

  function pauseForControlChange() {
    if (running) {
      updateFromElapsed(performance.now());
      if (running) stopPlayback("Paused.");
    } else {
      playStatus.textContent = "Paused.";
      render();
    }
  }

  frame.addEventListener("input", () => {
    if (running) stopPlayback("Paused.");
    else playStatus.textContent = "Paused.";
    render();
  });
  retention.addEventListener("change", () => {
    pauseForControlChange();
    render();
  });
  retentionB.addEventListener("change", () => {
    pauseForControlChange();
    render();
  });
  pulseSpacing.addEventListener("change", () => {
    pauseForControlChange();
    render();
  });
  rewind.addEventListener("click", () => {
    pauseForControlChange();
    frame.value = String(Math.max(0, Number(frame.value) - 1));
    render();
  });
  advance.addEventListener("click", () => {
    pauseForControlChange();
    frame.value = String(Math.min(120, Number(frame.value) + 1));
    render();
  });
  run.addEventListener("click", () => {
    if (running || Number(frame.value) === 120) return;
    startN = Number(frame.value);
    startTime = performance.now();
    running = true;
    playStatus.textContent = "Running at 30 updates per second.";
    render();
    rafHandle = requestAnimationFrame(playbackFrame);
  });
  pause.addEventListener("click", () => {
    if (!running) return;
    updateFromElapsed(performance.now());
    if (running) stopPlayback("Paused.");
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && running) {
      updateFromElapsed(performance.now());
      if (running) stopPlayback("Paused.");
    }
  });

  render();
})();
