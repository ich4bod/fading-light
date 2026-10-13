(() => {
  const retention = document.querySelector("#retention");
  const retentionB = document.querySelector("#retention-b");
  const swapFlashRetentions = document.querySelector("#swap-flash-retentions");
  const frame = document.querySelector("#frame");
  const rewind = document.querySelector("#rewind");
  const advance = document.querySelector("#advance");
  const run = document.querySelector("#run");
  const pause = document.querySelector("#pause");
  const runNextPulse = document.querySelector("#run-next-pulse");
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
  const flashSampleTotalReadout = document.querySelector("#flash-sample-total-readout");
  const flashNextUpdateReadout = document.querySelector("#flash-next-update-readout");
  const flashPerSecondReadout = document.querySelector("#flash-per-second-readout");
  const seekFlashGap = document.querySelector("#seek-flash-gap");
  const flashGapInfo = document.querySelector("#flash-gap-info");
  const flashRatioReadout = document.querySelector("#flash-ratio-readout");
  const flashCrossingRows = document.querySelector("#flash-crossing-rows");
  const flashCrossingLevel = document.querySelector("#flash-crossing-level");
  const flashSeekCrossing = document.querySelector("#flash-seek-crossing");
  const pulseSpacing = document.querySelector("#pulse-spacing");
  const pulseSlotPrevious = document.querySelector("#pulse-slot-previous");
  const pulseSlotNext = document.querySelector("#pulse-slot-next");
  const pulseAmount = document.querySelector("#pulse-amount");
  const pulsePattern = document.querySelector("#pulse-pattern");
  const keptPulsePatternInfo = document.querySelector("#kept-pulse-pattern-info");
  const pulseCount = document.querySelector("#pulse-count");
  const pulsePartsLast = document.querySelector("#pulse-parts-last");
  const pulsePartsEarlier = document.querySelector("#pulse-parts-earlier");
  const pulsePartsReadout = document.querySelector("#pulse-parts-readout");
  const seekFirstCap = document.querySelector("#seek-first-cap");
  const trainTailFraction = document.querySelector("#train-tail-fraction");
  const trainTailSeek = document.querySelector("#train-tail-seek");
  const pulseLastAdded = document.querySelector("#pulse-last-added");
  const trainTailInfo = document.querySelector("#train-tail-info");
  const trainLevel = document.querySelector("#train-level");
  const pulseArithmetic = document.querySelector("#pulse-arithmetic");
  const pulseAdditionsTable = document.querySelector("#pulse-additions-table tbody");
  const trainGlow = document.querySelector("#train-glow");
  const curve = document.querySelector("#flash-curve");
  const curveB = document.querySelector("#second-curve");
  const trainCurve = document.querySelector("#train-curve");
  const showUncapped = document.querySelector("#train-show-uncapped");
  const uncappedPlot = document.querySelector("#train-uncapped-plot");
  const uncappedCurve = document.querySelector("#train-uncapped-curve");
  const cappedReference = document.querySelector("#train-capped-reference");
  const uncappedScale = document.querySelector("#train-uncapped-scale");
  const updateCursor = document.querySelector("#update-cursor");
  const flashCursor = document.querySelector("#flash-cursor");
  const secondCursor = document.querySelector("#second-cursor");
  const trainCursor = document.querySelector("#train-cursor");
  const keepLight = document.querySelector("#keep-light");
  const returnLight = document.querySelector("#return-light");
  const returnPulseRecipe = document.querySelector("#return-pulse-recipe");
  const lightStudy = document.querySelector("#light-study");
  const choiceNote = document.querySelector("#choice-note-fading-light");
  const lightStudyApply = document.querySelector("#light-study-apply");
  const selectedChoiceNotes = {
    "clock-thirty": "About the selected choice: At thirty updates per second, update ninety-six is 3.20 logical seconds. The two extra pulses are 0.80 seconds apart; the retained train level there is 26.48 percent.",
    "clock-sixty": "About the selected choice: At sixty updates per second with decay per second fixed, update ninety-six is 1.60 logical seconds. Pulses are 0.40 seconds apart; the retained train level there is 51.74 percent.",
    "clock-sixty-update": "About the selected choice: At sixty updates per second with fraction per update fixed, update ninety-six is still 1.60 logical seconds. The train level is 26.48 percent, like the thirty-update recipe, but it reaches that sample sooner.",
    "tail-retentions-0": "About the selected choice: At update 120, the train reads 0.02%. It began with 0.35 and received 2 extra equal additions, spaced 24 updates apart. Retention is 0.9 per update. Loading stays paused.",
    "tail-retentions-1": "About the selected choice: At update 120, the train reads 16.30%. It began with 0.35 and received 2 extra equal additions, spaced 24 updates apart. Retention is 0.98 per update. Loading stays paused.",
    "tail-retentions-2": "About the selected choice: At update 120, the train reads 65.21%. It began with 0.35 and received 2 extra equal additions, spaced 24 updates apart. Retention is 0.995 per update. Loading stays paused.",
    "alternating-ending-0": "About the selected choice: At update 96, the train reads 9.12%. It began with 0.35 and received 1 extra half/full alternating additions, spaced 24 updates apart. Retention is 0.98 per update. Loading stays paused.",
    "alternating-ending-1": "About the selected choice: At update 96, the train reads 22.39%. It began with 0.35 and received 2 extra half/full alternating additions, spaced 24 updates apart. Retention is 0.98 per update. Loading stays paused.",
    "alternating-ending-2": "About the selected choice: At update 96, the train reads 68.17%. It began with 0.35 and received 4 extra half/full alternating additions, spaced 24 updates apart. Retention is 0.98 per update. Loading stays paused.",
    "late-tail-0": "About the selected choice: At update 48, the train reads 69.82%. It began with 0.35 and received 2 extra equal additions, spaced 24 updates apart. Retention is 0.98 per update. Loading stays paused.",
    "late-tail-1": "About the selected choice: At update 96, the train reads 26.48%. It began with 0.35 and received 2 extra equal additions, spaced 24 updates apart. Retention is 0.98 per update. Loading stays paused.",
    "late-tail-2": "About the selected choice: At update 120, the train reads 16.30%. It began with 0.35 and received 2 extra equal additions, spaced 24 updates apart. Retention is 0.98 per update. Loading stays paused."
  };
  const lightStudies = {
    tail: ["0.995", "0.9", "12", "0.7", "equal", "1", "30", "update", "24"],
    steps: ["0.9", "0.995", "12", "0.35", "equal", "all", "30", "update", "24"],
    seconds: ["0.9", "0.995", "12", "0.35", "equal", "all", "60", "second", "24"],
    "burst-two": ["0.9", "0.995", "12", "0.35", "equal", "2", "30", "update", "48"],
    "burst-four": ["0.9", "0.995", "12", "0.35", "equal", "4", "30", "update", "72"],
    "burst-continues": ["0.9", "0.995", "12", "0.35", "equal", "all", "30", "update", "72"],
    "clock-30": ["0.98", "0.98", "24", "0.35", "equal", "0", "30", "update", "30"],
    "clock-60-update": ["0.98", "0.98", "24", "0.35", "equal", "0", "60", "update", "60"],
    "clock-60-second": ["0.98", "0.98", "24", "0.35", "equal", "0", "60", "second", "60"],
    "tail-slow-cap": ["0.995", "0.9", "12", "0.7", "equal", "1", "30", "update", "12"],
    "tail-middle-cap": ["0.98", "0.9", "12", "0.7", "equal", "1", "30", "update", "12"],
    "tail-fast-room": ["0.9", "0.9", "12", "0.7", "equal", "1", "30", "update", "12"],
    "burst-equal-three": ["0.9", "0.995", "12", "0.35", "equal", "all", "30", "update", "36"],
    "burst-half-three": ["0.9", "0.995", "12", "0.35", "half", "all", "30", "update", "36"],
    "burst-half-two": ["0.9", "0.995", "12", "0.35", "half", "2", "30", "update", "36"],
    "finite-spacing-twelve": ["0.9", "0.995", "12", "0.7", "equal", "2", "30", "update", "96"],
    "finite-spacing-twenty-four": ["0.9", "0.995", "24", "0.7", "equal", "2", "30", "update", "96"],
    "finite-spacing-forty-eight": ["0.9", "0.995", "48", "0.7", "equal", "2", "30", "update", "96"],
    "after-one": ["0.98", "0.9", "12", "0.35", "equal", "1", "30", "update", "72"],
    "after-two": ["0.98", "0.9", "12", "0.35", "equal", "2", "30", "update", "72"],
    "after-four": ["0.98", "0.9", "12", "0.35", "equal", "4", "30", "update", "72"],
    "clock-thirty": ["0.98", "0.9", "24", "0.35", "equal", "2", "30", "second", "96"],
    "clock-sixty": ["0.98", "0.9", "24", "0.35", "equal", "2", "60", "second", "96"],
    "clock-sixty-update": ["0.98", "0.9", "24", "0.35", "equal", "2", "60", "update", "96"],
    "tail-retentions-0": ["0.9", "0.9", "24", "0.35", "equal", "2", "30", "update", "120"],
    "tail-retentions-1": ["0.98", "0.9", "24", "0.35", "equal", "2", "30", "update", "120"],
    "tail-retentions-2": ["0.995", "0.9", "24", "0.35", "equal", "2", "30", "update", "120"],
    "alternating-ending-0": ["0.98", "0.9", "24", "0.35", "half", "1", "30", "update", "96"],
    "alternating-ending-1": ["0.98", "0.9", "24", "0.35", "half", "2", "30", "update", "96"],
    "alternating-ending-2": ["0.98", "0.9", "24", "0.35", "half", "4", "30", "update", "96"],
    "late-tail-0": ["0.98", "0.9", "24", "0.35", "equal", "2", "30", "update", "48"],
    "late-tail-1": ["0.98", "0.9", "24", "0.35", "equal", "2", "30", "update", "96"],
    "late-tail-2": ["0.98", "0.9", "24", "0.35", "equal", "2", "30", "update", "120"]
  };
  const forgetLight = document.querySelector("#forget-light");
  const keptLightInfo = document.querySelector("#kept-light-info");
  const keptPulseCountInfo = document.querySelector("#kept-pulse-count-info");
  const showKeptCurve = document.querySelector("#light-show-kept-curve");
  const keptCurve = document.querySelector("#kept-flash-curve");
  const chartSeconds = document.querySelectorAll("#chart-seconds text");

  let keptLight = null;
  let running = false;
  let currentRate = Number(updateRate.value);
  let currentDecayUnit = decayUnit.value;
  let startN = 0;
  let startTime = 0;
  let runStopUpdate = 120;
  let specialPulseStop = false;
  let rafHandle = null;

  function updateSelectedChoiceNote() {
    choiceNote.textContent = selectedChoiceNotes[lightStudy.value] || "Other choices keep their existing descriptions.";
  }

  function currentExperiment() {
    return {
      n: Number(frame.value),
      rA: Number(retention.value),
      rB: Number(retentionB.value),
      k: Number(pulseSpacing.value),
      a: Number(pulseAmount.value),
      pattern: pulsePattern.value,
      additionalpulses: pulseCount.value,
      rate: currentRate,
      decayUnit: currentDecayUnit
    };
  }

  function sameExperiment(a, b) {
    return a.n === b.n && a.rA === b.rA && a.rB === b.rB &&
      a.k === b.k && a.a === b.a && a.pattern === b.pattern && a.rate === b.rate &&
      a.decayUnit === b.decayUnit && a.additionalpulses === b.additionalpulses;
  }

  function canReturnPulseRecipe(current, kept, isRunning) {
    return !isRunning && kept !== null &&
      (current.k !== kept.k || current.a !== kept.a ||
        current.pattern !== kept.pattern || current.additionalpulses !== kept.additionalpulses);
  }

  function effectiveRetention(raw) {
    return currentDecayUnit === "second" ? raw ** (30 / currentRate) : raw;
  }

  function sharedCrossingCandidate(rA, rB, target, n) {
    const crossing = Math.max(
      Math.ceil(Math.log(target) / Math.log(rA)),
      Math.ceil(Math.log(target) / Math.log(rB))
    );
    return Number.isInteger(crossing) && crossing >= 0 && crossing <= 120 && crossing !== n
      ? crossing : null;
  }

  function currentSharedCrossingCandidate() {
    return sharedCrossingCandidate(
      effectiveRetention(Number(retention.value)),
      effectiveRetention(Number(retentionB.value)),
      Number(flashCrossingLevel.value), Number(frame.value)
    );
  }

  function refreshSharedCrossingEligibility() {
    flashSeekCrossing.disabled = currentSharedCrossingCandidate() === null;
  }

  function bestFlashGap(rA, rB) {
    let best = { n: 0, gap: 0 };
    for (let n = 0; n <= 120; n++) {
      const gap = Math.abs(rA ** n - rB ** n);
      if (gap > best.gap) best = { n, gap };
    }
    return best;
  }

  function previousPulseSlot(n, spacing) {
    return n === 0 ? null : Math.floor((n - 1) / spacing) * spacing;
  }

  function nextPulseSlot(n, spacing) {
    const next = (Math.floor(n / spacing) + 1) * spacing;
    return next <= 120 ? next : null;
  }

  function activePulse(i, spacing, count) {
    return i % spacing === 0 && (count === "all" || i / spacing <= Number(count));
  }

  function addedAmount(update, spacing, amount, count, pattern) {
    if (!activePulse(update, spacing, count)) return 0;
    if (pattern === "half") {
      const ordinal = update / spacing;
      return ordinal % 2 === 1 ? amount / 2 : amount;
    }
    return amount;
  }

  function nextEligiblePulse(n) {
    const spacing = Number(pulseSpacing.value);
    const count = pulseCount.value;
    for (let j = n + 1; j <= 120; j++) {
      if (activePulse(j, spacing, count)) return j;
    }
    return null;
  }

  function pulseTrainValues() {
    const r = effectiveRetention(Number(retention.value));
    const spacing = Number(pulseSpacing.value);
    const amount = Number(pulseAmount.value);
    const count = pulseCount.value;
    const pattern = pulsePattern.value;
    const capped = [amount];
    const uncapped = [amount];
    for (let i = 1; i <= 120; i++) {
      const addition = addedAmount(i, spacing, amount, count, pattern);
      capped.push(Math.min(1, r * capped[i - 1] + addition));
      uncapped.push(r * uncapped[i - 1] + addition);
    }
    return { capped, uncapped };
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

  function finalAddedCandidate() {
    if (pulseCount.value === "all") return null;
    const finalUpdate = Number(pulseCount.value) * Number(pulseSpacing.value);
    return finalUpdate <= 120 && finalUpdate !== Number(frame.value) ? finalUpdate : null;
  }

  function pulseParts(values, n, r, spacing, amount, count, pattern) {
    let j = 0;
    let accepted = amount;
    for (let i = 1; i <= n; i++) {
      const addition = addedAmount(i, spacing, amount, count, pattern);
      if (addition > 0) {
        j = i;
        accepted = Math.min(addition, 1 - r * values[i - 1]);
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
    updateSelectedChoiceNote();
    const n = Number(frame.value);
    const r = effectiveRetention(Number(retention.value));
    const level = r ** n;
    let sampledTotal = 0;
    for (let i = 0; i <= n; i++) sampledTotal += r ** i;
    flashSampleTotalReadout.textContent = `Updates 0–${n}: ${sampledTotal.toFixed(3)} level-samples. Current flash: ${(100 * level).toFixed(2)}%.`;
    const nextLevel = r ** (n + 1);
    const removedLevel = level * (1 - r);
    flashNextUpdateReadout.textContent = `Next update ${n + 1}: ${(100 * nextLevel).toFixed(2)}% remains · ${(100 * removedLevel).toFixed(2)} percentage points removed.`;
    const target = Number(threshold.value);
    const firstUpdate = Math.ceil(Math.log(target) / Math.log(r));
    const rB = effectiveRetention(Number(retentionB.value));
    const levelB = rB ** n;
    flashRatioReadout.textContent = `First / second at update ${n}: ${(level / levelB).toFixed(3)} ×.`;
    flashPerSecondReadout.textContent = `After one logical second: first ${(100 * r ** currentRate).toFixed(3)}% · second ${(100 * rB ** currentRate).toFixed(3)}% of each starting flash.`;
    flashCrossingRows.replaceChildren();
    for (const [label, target] of [["50%", 0.5], ["10%", 0.1], ["1%", 0.01]]) {
      const row = document.createElement("tr");
      const levelCell = document.createElement("td");
      levelCell.textContent = label;
      row.append(levelCell);
      for (const retentionValue of [r, rB]) {
        const crossing = Math.ceil(Math.log(target) / Math.log(retentionValue));
        const updateCell = document.createElement("td");
        updateCell.textContent = crossing > 120 ? `${crossing} (past 120)` : String(crossing);
        const secondsCell = document.createElement("td");
        secondsCell.textContent = (crossing / currentRate).toFixed(2);
        row.append(updateCell, secondsCell);
      }
      flashCrossingRows.append(row);
    }
    refreshSharedCrossingEligibility();
    const spacing = Number(pulseSpacing.value);
    const amount = Number(pulseAmount.value);
    const count = pulseCount.value;
    const pattern = pulsePattern.value;
    const { capped: trainValues, uncapped: uncappedValues } = pulseTrainValues();
    renderTailInspector(trainValues, n);
    pulseLastAdded.disabled = finalAddedCandidate() === null;
    let lastPulse = null;
    for (let i = 1; i <= n; i++) {
      const active = activePulse(i, spacing, count);
      if (active) lastPulse = i;
    }
    const firstCap = firstCappedPulse(trainValues);
    seekFirstCap.disabled = firstCap === -1 || firstCap === n;
    const train = trainValues[n];
    const parts = pulseParts(trainValues, n, r, spacing, amount, count, pattern);
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
      const addition = addedAmount(lastPulse, spacing, amount, count, pattern);
      const clipped = Math.max(0, decayed + addition - 1);
      pulseArithmetic.textContent = `Pulse at update ${lastPulse}: after decay ${(100 * decayed).toFixed(2)}% + pulse ${(100 * addition).toFixed(2)}% − clipped ${(100 * clipped).toFixed(2)}% = ${(100 * trainValues[lastPulse]).toFixed(2)}%.`;
    }
    pulseAdditionsTable.replaceChildren();
    const additionRows = [[0, 0, amount, 0, trainValues[0]]];
    for (let j = 1; j <= n; j++) {
      if (!activePulse(j, spacing, count)) continue;
      const before = r * trainValues[j - 1];
      const addition = addedAmount(j, spacing, amount, count, pattern);
      const clipped = Math.max(0, before + addition - 1);
      additionRows.push([j, before, addition, clipped, trainValues[j]]);
    }
    for (const row of additionRows) {
      const tr = document.createElement("tr");
      row.forEach((value, index) => {
        const cell = document.createElement(index === 0 ? "th" : "td");
        if (index === 0) cell.scope = "row";
        cell.textContent = index === 0 ? String(value) : `${(100 * value).toFixed(2)}%`;
        tr.append(cell);
      });
      pulseAdditionsTable.append(tr);
    }

    retentionLabel.textContent = currentDecayUnit === "second"
      ? "Fraction kept at 30 updates per second" : updateLabel;
    retentionBLabel.textContent = currentDecayUnit === "second"
      ? "Second fraction kept at 30 updates per second" : updateBLabel;
    flashLevel.textContent = `Frame ${n} · retained ${(100 * level).toFixed(2)}%.`;
    trainLevel.textContent = `Frame ${n} · pulse-train level ${(100 * train).toFixed(2)}%.`;
    secondLevel.textContent = `Frame ${n} · retained ${(100 * levelB).toFixed(2)}%.`;
    const flashGap = bestFlashGap(r, rB);
    flashGapInfo.textContent = `Largest flash gap in this strip: ${(100 * flashGap.gap).toFixed(2)} percentage points at update ${flashGap.n}.`;
    halfLevel.textContent = `Half the starting level after ${(Math.log(0.5) / Math.log(r)).toFixed(2)} updates.`;
    thresholdInfo.textContent = firstUpdate > 120
      ? "This level is beyond the 120-update strip."
      : `First whole update at or below ${(100 * target).toFixed(0)}%: ${firstUpdate}.`;
    seekThreshold.disabled = firstUpdate > 120 || running;
    timeUnit.textContent = `At ${currentRate} updates per second, frame ${n} corresponds to ${(n / currentRate).toFixed(2)} seconds.`;
    halfTime.textContent = `At this rate, half the starting level takes ${(Math.log(0.5) / Math.log(r) / currentRate).toFixed(2)} seconds.`;
    chartSeconds.forEach((label, i) => {
      label.textContent = `${(i * 60 / currentRate).toFixed(2)} s`;
    });
    run.textContent = `Run at ${currentRate} updates per second`;
    glow.style.opacity = String(level);
    glowB.style.opacity = String(levelB);
    trainGlow.style.opacity = String(train);
    rewind.disabled = n === 0;
    advance.disabled = n === 120;
    pulseSlotPrevious.disabled = previousPulseSlot(n, spacing) === null;
    pulseSlotNext.disabled = nextPulseSlot(n, spacing) === null;
    run.disabled = running || n === 120;
    runNextPulse.disabled = running || nextEligiblePulse(n) === null;
    pause.disabled = !running;
    keepLight.disabled = running;
    returnLight.disabled = running || keptLight === null ||
      sameExperiment(currentExperiment(), keptLight);
    returnPulseRecipe.disabled = !canReturnPulseRecipe(currentExperiment(), keptLight, running);
    lightStudyApply.disabled = running || sameExperiment(currentExperiment(), {
      rA: Number(lightStudies[lightStudy.value][0]),
      rB: Number(lightStudies[lightStudy.value][1]),
      k: Number(lightStudies[lightStudy.value][2]),
      a: Number(lightStudies[lightStudy.value][3]),
      pattern: lightStudies[lightStudy.value][4],
      additionalpulses: lightStudies[lightStudy.value][5],
      rate: Number(lightStudies[lightStudy.value][6]),
      decayUnit: lightStudies[lightStudy.value][7],
      n: Number(lightStudies[lightStudy.value][8])
    });
    swapFlashRetentions.disabled = retention.value === retentionB.value;
    forgetLight.disabled = keptLight === null;
    showKeptCurve.disabled = keptLight === null;
    keptCurve.toggleAttribute("hidden", keptLight === null || !showKeptCurve.checked);
    keptLightInfo.textContent = keptLight === null
      ? "No light experiment kept."
      : `Kept: update ${keptLight.n} · first ${100 * keptLight.rA}% · second ${100 * keptLight.rB}% · pulses every ${keptLight.k} updates · pulse ${100 * keptLight.a}% · ${keptLight.rate} updates per second${keptLight.decayUnit === "second" ? " · decay matched per second" : ""}.`;
    keptPulseCountInfo.textContent = keptLight === null
      ? "No pulse count kept."
      : keptLight.additionalpulses === "all"
        ? "Kept additional pulses: keep adding."
        : `Kept additional pulses: ${keptLight.additionalpulses}.`;
    keptPulsePatternInfo.textContent = keptLight === null
      ? "No pulse pattern kept."
      : keptLight.pattern === "half"
        ? "Kept pulse pattern: half, full, half, full."
        : "Kept pulse pattern: equal additions.";
    curve.setAttribute("points", Array.from({ length: 121 }, (_, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * r ** i).toFixed(3)}`
    ).join(" "));
    curveB.setAttribute("points", Array.from({ length: 121 }, (_, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * rB ** i).toFixed(3)}`
    ).join(" "));
    if (keptLight !== null) {
      const keptRetention = keptLight.decayUnit === "second"
        ? keptLight.rA ** (30 / keptLight.rate) : keptLight.rA;
      keptCurve.setAttribute("points", Array.from({ length: 121 }, (_, i) =>
        `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * keptRetention ** i).toFixed(3)}`
      ).join(" "));
    }
    trainCurve.setAttribute("points", trainValues.map((value, i) =>
      `${(16 + 2.4 * i).toFixed(3)},${(144 - 128 * value).toFixed(3)}`
    ).join(" "));
    const comparisonMax = Math.max(1, ...uncappedValues);
    uncappedPlot.setAttribute("data-max", String(comparisonMax));
    uncappedCurve.setAttribute("points", uncappedValues.map((value, i) =>
      `${16 + 2.4 * i},${144 - 128 * value / comparisonMax}`
    ).join(" "));
    cappedReference.setAttribute("points", trainValues.map((value, i) =>
      `${16 + 2.4 * i},${144 - 128 * value / comparisonMax}`
    ).join(" "));
    uncappedScale.textContent = `Comparison top: ${(100 * comparisonMax).toFixed(2)}%.`;
    const cursorX = 16 + 2.4 * n;
    updateCursor.setAttribute("x1", String(cursorX));
    updateCursor.setAttribute("x2", String(cursorX));
    updateCursor.setAttribute("y1", "16");
    updateCursor.setAttribute("y2", "144");
    flashCursor.setAttribute("cx", String(cursorX));
    flashCursor.setAttribute("cy", String(144 - 128 * level));
    secondCursor.setAttribute("cx", String(cursorX));
    secondCursor.setAttribute("cy", String(144 - 128 * levelB));
    trainCursor.setAttribute("cx", String(cursorX));
    trainCursor.setAttribute("cy", String(144 - 128 * train));
  }

  function stopPlayback(status, refresh = true) {
    if (rafHandle !== null) {
      cancelAnimationFrame(rafHandle);
      rafHandle = null;
    }
    running = false;
    runStopUpdate = 120;
    specialPulseStop = false;
    playStatus.textContent = status;
    if (refresh) render();
  }

  function updateFromElapsed(now, refresh = true) {
    const n = Math.min(runStopUpdate, startN + Math.floor((now - startTime) * currentRate / 1000));
    if (n !== Number(frame.value)) {
      frame.value = String(n);
      if (refresh) render();
    }
    if (specialPulseStop && n === runStopUpdate) {
      stopPlayback(`Paused at pulse update ${n}.`, refresh);
      return false;
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
      runStopUpdate = 120;
      specialPulseStop = false;
      playStatus.textContent = "Paused.";
      if (refresh) render();
    }
  }

  keepLight.addEventListener("click", () => {
    if (running) return;
    keptLight = currentExperiment();
    render();
  });
  swapFlashRetentions.addEventListener("click", () => {
    if (retention.value === retentionB.value) return;
    pauseForControlChange(false);
    const first = retention.value;
    retention.value = retentionB.value;
    retentionB.value = first;
    render();
  });
  lightStudyApply.addEventListener("click", () => {
    const values = lightStudies[lightStudy.value];
    const study = {
      rA: Number(values[0]), rB: Number(values[1]), k: Number(values[2]),
      a: Number(values[3]), pattern: values[4], additionalpulses: values[5],
      rate: Number(values[6]), decayUnit: values[7], n: Number(values[8])
    };
    if (running || sameExperiment(currentExperiment(), study)) return;
    pauseForControlChange(false);
    retention.value = values[0];
    retentionB.value = values[1];
    pulseSpacing.value = values[2];
    pulseAmount.value = values[3];
    pulsePattern.value = values[4];
    pulseCount.value = values[5];
    updateRate.value = values[6];
    currentRate = study.rate;
    decayUnit.value = values[7];
    currentDecayUnit = study.decayUnit;
    frame.value = values[8];
    render();
  });
  returnLight.addEventListener("click", () => {
    if (running || keptLight === null || sameExperiment(currentExperiment(), keptLight)) return;
    frame.value = String(keptLight.n);
    retention.value = String(keptLight.rA);
    retentionB.value = String(keptLight.rB);
    pulseSpacing.value = String(keptLight.k);
    pulseAmount.value = String(keptLight.a);
    pulsePattern.value = keptLight.pattern;
    pulseCount.value = keptLight.additionalpulses;
    updateRate.value = String(keptLight.rate);
    currentRate = keptLight.rate;
    decayUnit.value = keptLight.decayUnit;
    currentDecayUnit = keptLight.decayUnit;
    playStatus.textContent = "Paused.";
    render();
  });
  returnPulseRecipe.addEventListener("click", () => {
    if (!canReturnPulseRecipe(currentExperiment(), keptLight, running)) return;
    pulseSpacing.value = String(keptLight.k);
    pulseAmount.value = String(keptLight.a);
    pulsePattern.value = keptLight.pattern;
    pulseCount.value = keptLight.additionalpulses;
    render();
  });
  forgetLight.addEventListener("click", () => {
    keptLight = null;
    showKeptCurve.checked = false;
    render();
  });
  showKeptCurve.addEventListener("change", render);
  lightStudy.addEventListener("change", render);

  seekFlashGap.addEventListener("click", () => {
    const flashGap = bestFlashGap(
      effectiveRetention(Number(retention.value)),
      effectiveRetention(Number(retentionB.value))
    );
    pauseForControlChange(false);
    frame.value = String(flashGap.n);
    render();
  });

  flashCrossingLevel.addEventListener("change", refreshSharedCrossingEligibility);
  flashSeekCrossing.addEventListener("click", () => {
    const candidate = currentSharedCrossingCandidate();
    if (candidate === null) return;
    pauseForControlChange(false);
    frame.value = String(candidate);
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
  pulsePattern.addEventListener("change", () => {
    pauseForControlChange();
    render();
  });
  seekFirstCap.addEventListener("click", () => {
    const candidate = firstCappedPulse(pulseTrainValues().capped);
    if (candidate === -1 || candidate === Number(frame.value)) return;
    pauseForControlChange();
    const firstCap = firstCappedPulse(pulseTrainValues().capped);
    if (firstCap === -1 || firstCap === Number(frame.value)) return;
    frame.value = String(firstCap);
    render();
  });
  trainTailSeek.addEventListener("click", () => {
    const { candidate } = currentTail(pulseTrainValues().capped);
    if (candidate === null || candidate === Number(frame.value)) return;
    pauseForControlChange(false);
    const tail = currentTail(pulseTrainValues().capped);
    if (tail.candidate !== null) frame.value = String(tail.candidate);
    render();
  });
  pulseLastAdded.addEventListener("click", () => {
    const candidate = finalAddedCandidate();
    if (candidate === null) return;
    pauseForControlChange(false);
    frame.value = String(candidate);
    render();
  });
  trainTailFraction.addEventListener("change", () => {
    if (running) stopPlayback("Paused.");
    else renderTailInspector(pulseTrainValues().capped, Number(frame.value));
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
  function startPlayback(stopUpdate, stopAtPulse = false) {
    startN = Number(frame.value);
    startTime = performance.now();
    runStopUpdate = stopUpdate;
    specialPulseStop = stopAtPulse;
    running = true;
    playStatus.textContent = `Running at ${currentRate} updates per second.`;
    render();
    rafHandle = requestAnimationFrame(playbackFrame);
  }

  run.addEventListener("click", () => {
    if (running || Number(frame.value) === 120) return;
    startPlayback(120);
  });
  runNextPulse.addEventListener("click", () => {
    if (running) return;
    const target = nextEligiblePulse(Number(frame.value));
    if (target === null) return;
    startPlayback(target, true);
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

  showUncapped.addEventListener("change", () => {
    uncappedPlot.toggleAttribute("hidden", !showUncapped.checked);
  });

  render();
})();
