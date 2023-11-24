import calc from '../models/Calc';

class Variance {
    amostral (matrix) {

        const varMatrix = [];

        for (let i = 0; i < matrix.length; i++) {

            let mean = calc.calcMean(matrix[i]);
            let variance = calc.calcVariance(mean, matrix[i]);
            varMatrix.push({});
            varMatrix[i].index = i;
            varMatrix[i].variance = variance;

        }

        return varMatrix;
    }

    rankedVariance (data) {

        return data.sort((a, b) => {
            return a.variance > b.variance ? -1 : a.variance < b.variance ? 1 : 0;
        });
    }

    rankedPercVariance (data) {

        return data.sort((a, b) => {
            return a.percVariance > b.percVariance ? -1 : a.percVariance < b.percVariance ? 1 : 0;
        });
    }

    getToCalcPerc (data) {

        const matrixPerc = [];
        const total = calc.calcTotalVariances(data);

        for (let i = 0; i < data.length; i++) {

            let percVariance = calc.calcPercVariance(total, data[i].variance);
            matrixPerc.push({});
            matrixPerc[i].index = i;
            matrixPerc[i].percVariance = percVariance;
        }

        return matrixPerc;
    }
}

module.exports = new Variance();