class Calc {
    calcMean (data) {

        let sum = 0;

        for (let i = 0; i < data.length; i++) {
            sum += data[i];
        }

        let mean = sum / data.length;

        return mean;
    }

    calcStdDeviation (mean, data) {

        let sum = 0;

        for (let i = 0; i < data.length; i++) {
            sum += Math.pow((data[i] - mean), 2);
        }

        let div = sum / (data.length - 1);
        let stdDeviation = Math.sqrt(div);
        
        return stdDeviation;
    }

    calcVariance (mean, data) {

        let sum = 0;

        for (let i = 0; i < data.length; i++) {
            sum += Math.pow((data[i] - mean), 2);  
        }

        let variance = sum / (data.length - 1);
        
        return variance;
    }

    calcTotalVariances (data) {

        let sum = 0;

        for (let i = 0; i < data.length; i++) {
            sum += data[i].variance;
        }

        return sum;
    }

    calcPercVariance (total, data) {

        let perc = data / total;
        return perc;
    }

    calcTotalPercVariances (data) {

        let sum = 0;

        for (let i = 0; i < data.length; i++) {
            sum += data[i].percVariance;
        }

        return sum;
    }
}

module.exports = new Calc();