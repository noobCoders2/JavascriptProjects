const rangeInputs = document.querySelectorAll(".range-input input"),
      numberInputs = document.querySelectorAll(".input input");

let priceGap = 50;

rangeInputs.forEach(input => {
    input.addEventListener("input", e => {

        let minVal = parseInt(rangeInputs[0].value),
            maxVal = parseInt(rangeInputs[1].value);
        // console.log(maxVal - minVal);
        if (maxVal - minVal < priceGap) {
            if (e.target.classList.contains("min-range")) {
                rangeInputs[0].value = maxVal - priceGap;
            } else {
                rangeInputs[1].value = minVal + priceGap;
            }
        } else {
            numberInputs[0].value = minVal;
            numberInputs[1].value = maxVal;
        }
    });
});

numberInputs.forEach(input => {
    input.addEventListener("input", e => {

        let minVal = parseInt(numberInputs[0].value),
            maxVal = parseInt(numberInputs[1].value);

        if ((maxVal - minVal >= priceGap) && maxVal <= 1000) {
            if (e.target.id === "min") {
                rangeInputs[0].value = minVal;
            } else {
                rangeInputs[1].value = maxVal;
            }
        }
    });
});