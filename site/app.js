(() => {
  const retention = document.querySelector("#retention");
  const retentionB = document.querySelector("#retention-b");
  const frame = document.querySelector("#frame");
  const rewind = document.querySelector("#rewind");
  const advance = document.querySelector("#advance");
  const run = document.querySelector("#run");
  const pause = document.querySelector("#pause");
  const updateRate = document.querySelector("#update-rate");
  const threshold = document.querySelector("#threshold");
  const seekThreshold = document.querySelector("#seek-threshold");
  const thresholdInfo = document.querySelector("#threshold-info");
  const playStatus = document.querySelector("#play-status");
  const flashLevel = document.querySelector("#flash-level");
  const halfLevel = document.querySelector("#half-level");
  const timeUnit = document.querySelector("#time-unit");
  const halfTime = document.querySelector("#half-time");
  const glow = document.querySelector("#flash-glow");
  const glowB = document.querySelector("#second-glow");
  const secondLevel = document.querySelector("#second-level");
  const pulseSpacing = document.querySelector("#pulse-spacing");
  const pulseAmount = document.querySelector("#pulse-amount");
  const trainLevel = document.querySelector("#train-level");
  const trainGlow = document.querySelector("#train-glow");
  const curve = document.querySelector("#flash-curve");
  const curveB = document.querySelector("#second-curve");
  const trainCurve = document.querySelector("#train-curve");
  const updateCursor = document.querySelector("#update-cursor");
  const flashCursor = document.querySelector("#flash-cursor");
  const secondCursor = document.querySelector("#second-cursor");
  const keepLight = document.querySelector("#keep-light");
  const returnLight = document.querySelector("#return-light");
  const forgetLight = document.querySelector("#forget-light");
  const keptLightInfo = document.querySelector("#kept-light-info");

  let keptLight = null;
  let running = false;
  let currentRate = Number(updateRate.value);
  let startN = 0;
  let startTime = 0;
  let rafHandle = null;

  function currentExperiment() {
    return {
      n: Number(frame.value),
      rA: Number(retention.value),
      rB: Number(retentionB.value),
      k: Number(pulseSpacing.value),
      a: Number(pulseAmount.value),
      rate: currentRate
    };
  }

  function sameExperiment(a, b) {
    return a.n === b.n && a.rA === b.rA && a.rB === b.rB &&
      a.k === b.k && a.a === b.a && a.rate === b.rate;
  }

  function render() {
    const n = Number(frame.value);
    const r = Number(retention.value);
    const level = r ** n;
    const target = Number(threshold.value);
    const firstUpdate = Math.ceil(Math.log(target) / Math.log(r));
    const rB = Number(retentionB.value);
    const levelB = rB ** n;
    const spacing = Number(pulseSpacing.value);
    const amount = Number(pulseAmount.value);
    const trainValues = [amount];
    for (let i = 1; i <= 120; i++) {
      trainValues.push(Math.min(1, r * trainValues[i - 1] + (i % spacing === 0 ? amount : 0)));
    }
    const train = trainValues[n];

    flashLevel.textContent = `Frame ${n} · retained ${(100 * level).toFixed(2)}%.`;
    trainLevel.textContent = `Frame ${n} · pulse-train level ${(100 * train).toFixed(2)}%.`;
    secondLevel.textContent = `Frame ${n} · retained ${(100 * levelB).toFixed(2)}%.`;
    halfLevel.textContent = `Half the starting level after ${(Math.log(0.5) / Math.log(r)).toFixed(2)} updates.`;
    thresholdInfo.textContent = firstUpdate > 120
      ? "This level is beyond the 120-update strip."
      : `First whole update at or below ${(100 * target).toFixed(0)}%: ${firstUpdate}.`;
    seekThreshold.disabled = firstUpdate > 120 || running;
    timeUnit.textContent = `At ${currentRate} updates per second, frame ${n} corresponds to ${(n / currentRate).toFixed(2)} seconds.`;
    halfTime.textContent = `At this rate, half the starting level takes ${(Math.log(0.5) / Math.log(r) / currentRate).toFixed(2)} seconds.`;
    run.textContent = `Run at ${currentRate} updates per second`;
    glow.style.opacity = String(level);
    glowB.style.opacity = String(levelB);
    trainGlow.style.opacity = String(train);
    rewind.disabled = n === 0;
    advance.disabled = n === 120;
    run.disabled = running || n === 120;
    pause.disabled = !running;
    keepLight.disabled = running;
    returnLight.disabled = running || keptLight === null ||
      sameExperiment(currentExperiment(), keptLight);
    forgetLight.disabled = keptLight === null;
    keptLightInfo.textContent = keptLight === null
      ? "No light experiment kept."
      : `Kept: update ${keptLight.n} · first ${100 * keptLight.rA}% · second ${100 * keptLight.rB}% · pulses every ${keptLight.k} updates · pulse ${100 * keptLight.a}% · ${keptLight.rate} updates per second.`;
    curve.setAttribute("points", Array.from({ length: 121 }, (_, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * r ** i).toFixed(3)}`
    ).join(" "));
    curveB.setAttribute("points", Array.from({ length: 121 }, (_, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * rB ** i).toFixed(3)}`
    ).join(" "));
    trainCurve.setAttribute("points", trainValues.map((value, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * value).toFixed(3)}`
    ).join(" "));
    const cursorX = 16 + 2.4 * n;
    updateCursor.setAttribute("x1", String(cursorX));
    updateCursor.setAttribute("x2", String(cursorX));
    updateCursor.setAttribute("y1", "16");
    updateCursor.setAttribute("y2", "144");
    flashCursor.setAttribute("cx", String(cursorX));
    flashCursor.setAttribute("cy", String(144 - 128 * level));
    secondCursor.setAttribute("cx", String(cursorX));
    secondCursor.setAttribute("cy", String(144 - 128 * levelB));
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
    const n = Math.min(120, startN + Math.floor((now - startTime) * currentRate / 1000));
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

  keepLight.addEventListener("click", () => {
    if (running) return;
    keptLight = currentExperiment();
    render();
  });
  returnLight.addEventListener("click", () => {
    if (running || keptLight === null || sameExperiment(currentExperiment(), keptLight)) return;
    frame.value = String(keptLight.n);
    retention.value = String(keptLight.rA);
    retentionB.value = String(keptLight.rB);
    pulseSpacing.value = String(keptLight.k);
    pulseAmount.value = String(keptLight.a);
    updateRate.value = String(keptLight.rate);
    currentRate = keptLight.rate;
    playStatus.textContent = "Paused.";
    render();
  });
  forgetLight.addEventListener("click", () => {
    keptLight = null;
    render();
  });

  threshold.addEventListener("change", render);
  seekThreshold.addEventListener("click", () => {
    const target = Number(threshold.value);
    const firstUpdate = Math.ceil(Math.log(target) / Math.log(Number(retention.value)));
    if (running || firstUpdate > 120) return;
    frame.value = String(firstUpdate);
    render();
  });
  updateRate.addEventListener("change", () => {
    pauseForControlChange();
    currentRate = Number(updateRate.value);
    render();
  });
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
  pulseAmount.addEventListener("change", () => {
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
    playStatus.textContent = `Running at ${currentRate} updates per second.`;
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
