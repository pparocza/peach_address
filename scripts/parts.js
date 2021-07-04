const fMTB1A = (startTime, stopTime, rArray, fund, iArray, octaveArray, preset, gainVal) => {

    const output = new MyGain(gainVal);

    const s = new PitchedPresets();
    s[preset]();

    const sL = 500;

    let pSeq = new Sequence();
    pSeq.urnSelect(sL, iArray);

    let oSeq = new Sequence();
    oSeq.randomSelect(sL, rArray);
    oSeq.sumSequence();
    oSeq.add(startTime+globalNow);

    let pOSeq = new Sequence();
    pOSeq.randomSelect(sL, [0.5, 0.33, 0.66, 0.25]);
    pOSeq.sumSequence();
    pOSeq.add(startTime+globalNow);

    pSeq = pSeq.sequence;
    oSeq = oSeq.sequence;
    pOSeq = pOSeq.sequence;

    oSeq = oSeq.filter(num => num <= stopTime);
    pOSeq = pOSeq.filter(num => num <= stopTime);

    let t = 0;

    const w = new Effect();
    w.fmShaper(fund*randomFloat(0.999, 1.001), 2*fund*randomFloat(0.999, 1.001), 1, 0.0002);
    w.on();

    const wD = new Effect();
    wD.randomShortDelay();
    wD.on();

    const w2 = new MyWaveShaper();
    w2.makeSigmoid(5);

    const wD2 = new Effect();
    wD2.randomShortDelay();
    wD2.on();

    const sG = new Effect();
    sG.thru();
    sG.on();

    s.connect(sG);

    sG.connect(w);
    sG.connect(w2);

    w.connect(wD);
    w2.connect(wD2);

    sG.connect(output);
    wD.connect(output);
    wD2.connect(output);

    output.connect(masterGain);

    for(let i=0; i<oSeq.length; i++){

        t = oSeq[i];

        s.startAtTime(t);
        s.output.gain.setValueAtTime(randomFloat(0.5, 1), t);   
        w.output.gain.setValueAtTime(randomFloat(0, 0.25), t);

    }

    for(let i=0; i<pOSeq.length; i++){

        t = pOSeq[i];

        s.o.osc.frequency.setValueAtTime(fund*pSeq[i]*randomArrayValue(octaveArray)*randomFloat(0.999, 1.001), t);
        w2.output.gain.setValueAtTime(randomFloat(0, 0.25), t*randomFloat(0.33, 1));

    }

}