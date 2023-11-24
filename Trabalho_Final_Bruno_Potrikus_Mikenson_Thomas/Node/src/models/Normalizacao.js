import calc from '../models/Calc';

class Normalizacao {
    minMax (matrix) {

        const newData = [];

        for (let i = 0; i < matrix.length; i++) {

            let min = Math.min.apply(Math, matrix[i]);
            let max = Math.max.apply(Math, matrix[i]);
            newData.push([]);

            for (let j = 0; j < matrix[i].length; j++) {
                let intervalo = (matrix[i][j] - min) / (max - min);
                newData[i].push(intervalo);
            }
        }

        return newData;
    }

    stdDeviation (matrix) {

        const newData = [];

        for (let i = 0; i < matrix.length; i++) {

            let mean = calc.calcMean(matrix[i]);
            let stdDev = calc.calcStdDeviation(mean, matrix[i]);
            newData.push([]);

            for (let j = 0; j < matrix[i].length; j++) {
                let result = (matrix[i][j] - mean) / Math.pow(stdDev, 2);
                newData[i].push(result);
            }
        }

        return newData;
    }
}


module.exports = new Normalizacao();