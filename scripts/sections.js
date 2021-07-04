const fSection = () => {

	// fMTB1();
    // fMTB2();

    const fund = 200; // randomFloat(150, 250);

    var iAA = [
        [1/P4, 1, M2, P4, P5, M6],
        [1/P4, 1, M3, P5, P4, M6],
        [1, m3, P5, P4, 1/M3]
    ]

    const iArray = randomArrayValue(iAA); ;
    const rArray = [0.33, 0.66];

    fMTB1A(0,   97, rArray, fund, iArray, [1],   'pitch59A', 0.35);
    fMTB1A(16,  97, rArray, fund, iArray, [2],   'pitch59',  0.35);
    fMTB1A(32,  97, rArray, fund, iArray, [0.5], 'pitch59A', 0.35);
    
    // fMTB1B(0,  97, rArray, fund, iArray, [1], 'pitch59A', 0.35);

    // fMTB1A(24,  200, iArray, [4],   'pitch59A', 0.3);

}