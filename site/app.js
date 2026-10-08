(() => {
  const retention = document.querySelector("#retention");
  const retentionB = document.querySelector("#retention-b");
  const frame = document.querySelector("#frame");
  const rewind = document.querySelector("#rewind");
  const advance = document.querySelector("#advance");
  const run = document.querySelector("#run");
  const pause = document.querySelector("#pause");
  const updateRate = document.querySelector("#update-rate");
  const decayUnit = document.querySelector("#decay-unit");
  const retentionLabel = document.querySelector('label[for="retention"]');
  const retentionBLabel = document.querySelector('label[for="retention-b"]');
  const updateLabel = retentionLabel.textContent;
  const updateBLabel = retentionBLabel.textContent;
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
  const pulseSlotPrevious = document.querySelector("#pulse-slot-previous");
  const pulseSlotNext = document.querySelector("#pulse-slot-next");
  const pulseAmount = document.querySelector("#pulse-amount");
  const pulseCount = document.querySelector("#pulse-count");
  const pulsePartsLast = document.querySelector("#pulse-parts-last");
  const pulsePartsEarlier = document.querySelector("#pulse-parts-earlier");
  const pulsePartsReadout = document.querySelector("#pulse-parts-readout");
  const seekFirstCap = document.querySelector("#seek-first-cap");
  const trainTailFraction = document.querySelector("#train-tail-fraction");
  const trainTailSeek = document.querySelector("#train-tail-seek");
  const trainTailInfo = document.querySelector("#train-tail-info");
  const trainLevel = document.querySelector("#train-level");
  const pulseArithmetic = document.querySelector("#pulse-arithmetic");
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
  const keptPulseCountInfo = document.querySelector("#kept-pulse-count-info");

  let keptLight = null;
  let running = false;
  let currentRate = Number(updateRate.value);
  let currentDecayUnit = decayUnit.value;
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
      additionalpulses: pulseCount.value,
      rate: currentRate,
      decayUnit: currentDecayUnit
    };
  }

  function sameExperiment(a, b) {
    return a.n === b.n && a.rA === b.rA && a.rB === b.rB &&
      a.k === b.k && a.a === b.a && a.rate === b.rate &&
      a.decayUnit === b.decayUnit && a.additionalpulses === b.additionalpulses;
  }

  function effectiveRetention(raw) {
    return currentDecayUnit === "second" ? raw ** (30 / currentRate) : raw;
  }

  function previousPulseSlot(n, spacing) {
    return n === 0 ? null : Math.floor((n - 1) / spacing) * spacing;
  }

  function nextPulseSlot(n, spacing) {
    const next = (Math.floor(n / spacing) + 1) * spacing;
    return next <= 120 ? next : null;
  }

  function pulseTrainValues() {
    const r = effectiveRetention(Number(retention.value));
    const spacing = Number(pulseSpacing.value);
    const amount = Number(pulseAmount.value);
    const count = pulseCount.value;
    const values = [amount];
    for (let i = 1; i <= 120; i++) {
      const active = i % spacing === 0 && (count === "all" || i / spacing <= Number(count));
      values.push(Math.min(1, r * values[i - 1] + (active ? amount : 0)));
    }
    return values;
  }

  function firstCappedPulse(values) {
    return values.findIndex((value, i) => i >= 1 && value === 1);
  }

  function firstQuietUpdate(values, count, spacing, fraction) {
    if (count === "all") return { finalPulse: null, candidate: null };
    const finalPulse = Number(count) * spacing;
    if (finalPulse > 120) return { finalPulse, candidate: null };
    const threshold = values[finalPulse] * fraction;
    for (let j = finalPulse + 1; j <= 120; j++) {
      if (values[j] < threshold) return { finalPulse, candidate: j };
    }
    return { finalPulse, candidate: null };
  }

  function currentTail(values) {
    return firstQuietUpdate(values, pulseCount.value, Number(pulseSpacing.value),
      Number(trainTailFraction.value));
  }

  function pulseParts(values, n, r, spacing, amount, count) {
    let j = 0;
    let accepted = amount;
    for (let i = 1; i <= n; i++) {
      const active = i % spacing === 0 && (count === "all" || i / spacing <= Number(count));
      if (active) {
        j = i;
        accepted = Math.min(amount, 1 - r * values[i - 1]);
      }
    }
    const last = accepted * r ** (n - j);
    return { j, last, earlier: Math.max(0, values[n] - last) };
  }

  function renderTailInspector(values, n) {
    const { finalPulse, candidate } = currentTail(values);
    trainTailSeek.disabled = candidate === null || candidate === n;
    trainTailInfo.textContent = finalPulse === null
      ? "A continuing train has no final pulse."
      : finalPulse > 120
        ? "The final pulse lies beyond update 120."
        : candidate === null
          ? `Final pulse: update ${finalPulse} · no such update through 120.`
          : `Final pulse: update ${finalPulse} · first below ${100 * Number(trainTailFraction.value)}% of that peak: update ${candidate}.`;
  }

  function render() {
    const n = Number(frame.value);
    const r = effectiveRetention(Number(retention.value));
    const level = r ** n;
    const target = Number(threshold.value);
    const firstUpdate = Math.ceil(Math.log(target) / Math.log(r));
    const rB = effectiveRetention(Number(retentionB.value));
    const levelB = rB ** n;
    const spacing = Number(pulseSpacing.value);
    const amount = Number(pulseAmount.value);
    const count = pulseCount.value;
    const trainValues = pulseTrainValues();
    renderTailInspector(trainValues, n);
    let lastPulse = null;
    for (let i = 1; i <= n; i++) {
      const active = i % spacing === 0 && (count === "all" || i / spacing <= Number(count));
      if (active) lastPulse = i;
    }
    const firstCap = firstCappedPulse(trainValues);
    seekFirstCap.disabled = firstCap === -1 || firstCap === n;
    const train = trainValues[n];
    const parts = pulseParts(trainValues, n, r, spacing, amount, count);
    const lastWidth = 296 * parts.last;
    const earlierWidth = 296 * parts.earlier;
    pulsePartsLast.setAttribute("width", String(lastWidth));
    pulsePartsEarlier.setAttribute("x", String(12 + lastWidth));
    pulsePartsEarlier.setAttribute("width", String(earlierWidth));
    pulsePartsReadout.textContent = `The last pulse at update ${parts.j} contributes ${(100 * parts.last).toFixed(2)}% here; earlier pulses contribute ${(100 * parts.earlier).toFixed(2)}%.`;
    if (lastPulse === null) {
      pulseArithmetic.textContent = "No added pulse has occurred after the initial level.";
    } else {
      const decayed = r * trainValues[lastPulse - 1];
      const clipped = Math.max(0, decayed + amount - 1);
      pulseArithmetic.textContent = `Pulse at update ${lastPulse}: after decay ${(100 * decayed).toFixed(2)}% + pulse ${(100 * amount).toFixed(2)}% − clipped ${(100 * clipped).toFixed(2)}% = ${(100 * trainValues[lastPulse]).toFixed(2)}%.`;
    }

    retentionLabel.textContent = currentDecayUnit === "second"
      ? "Fraction kept at 30 updates per second" : updateLabel;
    retentionBLabel.textContent = currentDecayUnit === "second"
      ? "Second fraction kept at 30 updates per second" : updateBLabel;
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
    pulseSlotPrevious.disabled = previousPulseSlot(n, spacing) === null;
    pulseSlotNext.disabled = nextPulseSlot(n, spacing) === null;
    run.disabled = running || n === 120;
    pause.disabled = !running;
    keepLight.disabled = running;
    returnLight.disabled = running || keptLight === null ||
      sameExperiment(currentExperiment(), keptLight);
    forgetLight.disabled = keptLight === null;
    keptLightInfo.textContent = keptLight === null
      ? "No light experiment kept."
      : `Kept: update ${keptLight.n} · first ${100 * keptLight.rA}% · second ${100 * keptLight.rB}% · pulses every ${keptLight.k} updates · pulse ${100 * keptLight.a}% · ${keptLight.rate} updates per second${keptLight.decayUnit === "second" ? " · decay matched per second" : ""}.`;
    keptPulseCountInfo.textContent = keptLight === null
      ? "No pulse count kept."
      : keptLight.additionalpulses === "all"
        ? "Kept additional pulses: keep adding."
        : `Kept additional pulses: ${keptLight.additionalpulses}.`;
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

  function stopPlayback(status, refresh = true) {
    if (rafHandle !== null) {
      cancelAnimationFrame(rafHandle);
      rafHandle = null;
    }
    running = false;
    playStatus.textContent = status;
    if (refresh) render();
  }

  function updateFromElapsed(now, refresh = true) {
    const n = Math.min(120, startN + Math.floor((now - startTime) * currentRate / 1000));
    if (n !== Number(frame.value)) {
      frame.value = String(n);
      if (refresh) render();
    }
    if (n === 120) {
      stopPlayback("Finished at frame 120.", refresh);
      return false;
    }
    return true;
  }

  function playbackFrame(now) {
    rafHandle = null;
    if (!running) return;
    if (updateFromElapsed(now)) rafHandle = requestAnimationFrame(playbackFrame);
  }

  function pauseForControlChange(refresh = true) {
    if (running) {
      updateFromElapsed(performance.now(), refresh);
      if (running) stopPlayback("Paused.", refresh);
    } else {
      playStatus.textContent = "Paused.";
      if (refresh) render();
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
    pulseCount.value = keptLight.additionalpulses;
    updateRate.value = String(keptLight.rate);
    currentRate = keptLight.rate;
    decayUnit.value = keptLight.decayUnit;
    currentDecayUnit = keptLight.decayUnit;
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
    const firstUpdate = Math.ceil(Math.log(target) / Math.log(effectiveRetention(Number(retention.value))));
    if (running || firstUpdate > 120) return;
    frame.value = String(firstUpdate);
    render();
  });
  updateRate.addEventListener("change", () => {
    pauseForControlChange();
    currentRate = Number(updateRate.value);
    render();
  });
  decayUnit.addEventListener("change", () => {
    pauseForControlChange();
    currentDecayUnit = decayUnit.value;
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
  pulseSlotPrevious.addEventListener("click", () => {
    pauseForControlChange();
    const previous = previousPulseSlot(Number(frame.value), Number(pulseSpacing.value));
    if (previous !== null) frame.value = String(previous);
    render();
  });
  pulseSlotNext.addEventListener("click", () => {
    pauseForControlChange();
    const next = nextPulseSlot(Number(frame.value), Number(pulseSpacing.value));
    if (next !== null) frame.value = String(next);
    render();
  });
  pulseAmount.addEventListener("change", () => {
    pauseForControlChange();
    render();
  });
  seekFirstCap.addEventListener("click", () => {
    const candidate = firstCappedPulse(pulseTrainValues());
    if (candidate === -1 || candidate === Number(frame.value)) return;
    pauseForControlChange();
    const firstCap = firstCappedPulse(pulseTrainValues());
    if (firstCap === -1 || firstCap === Number(frame.value)) return;
    frame.value = String(firstCap);
    render();
  });
  trainTailSeek.addEventListener("click", () => {
    const { candidate } = currentTail(pulseTrainValues());
    if (candidate === null || candidate === Number(frame.value)) return;
    pauseForControlChange(false);
    const tail = currentTail(pulseTrainValues());
    if (tail.candidate !== null) frame.value = String(tail.candidate);
    render();
  });
  trainTailFraction.addEventListener("change", () => {
    if (running) stopPlayback("Paused.");
    else renderTailInspector(pulseTrainValues(), Number(frame.value));
  });
  pulseCount.addEventListener("change", () => {
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
