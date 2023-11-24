import PCA from 'pca-js';

class Pca {
    calcEigenVectors (data) {
        const vectors = PCA.getEigenVectors(data);
        return vectors;
    }

    calcNewData (data, perc) {

        let sum = 0;
        let i = 0;
        const pcaData = [];

        while (sum < perc) {
            sum += data[i].percVariance;
            pcaData.push(data[i]);
            i++;
        }

        return pcaData;
    }

    newDataset (dataSource, dataVariance) {

        const newDS = [];
       
        for (let i = 0; i < dataVariance.length; i++) {
            for (let j = 0; j < dataSource.length; j++) {
                if (dataVariance[i].index === j) {
                    newDS.push(dataSource[j]);
                }
            }
        }

        return newDS;
    }

    trainTestSplit (data, labels, percTest) {

        const obj = {};
        const xTrain = [];
        const xTest = []
        const yTrain = [];
        const yTest = [];

        while ((xTest.length / data.length) < percTest) {
           
            for (let i  = 0; i < data.length; i++) {

                let rand = Math.round(Math.random() * 1);

                if (rand === 0) {
                    xTest.push(data[i]);
                    yTest.push(labels[i]);
                    data.splice(i, 1);
                    labels.splice(i, 1);
                }
            }
        }

        for (let i  = 0; i < data.length; i++) {

            xTrain.push(data[i]);
            yTrain.push(labels[i]);
        }

        obj.xTrain = xTrain;
        obj.xTest = xTest;
        obj.yTrain = yTrain;
        obj.yTest = yTest;

        return obj;
    }
}

module.exports = new Pca();