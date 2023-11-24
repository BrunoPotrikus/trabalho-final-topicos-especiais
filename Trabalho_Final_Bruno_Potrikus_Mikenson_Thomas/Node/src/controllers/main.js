import fs from 'fs';
import pca from '../models/Pca';
import matrix from "../models/Matrix";
import normalizacao from '../models/Normalizacao';
import variance from '../models/Variance';
import calc from '../models/Calc';
import api from '../models/Api';

exports.index = (req, res) => {
    res.render('index');
}

exports.main = (req, res) => {
    fs.readFile('./wdbc.data', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        // Higienização da base de dados
        const dataString = matrix.dataToString(data);
        const stringArray = matrix.stringToMatrix(dataString);
        const newMatrix = matrix.removeLabels(stringArray);

        // Tratamento das labels
        const labels = newMatrix.labels;
        const convertLabels = matrix.convertLabels(labels, 0);
        labels.splice((labels.length - 1), 1);

        // Convertendo para valores numéricos
        const matrixNumber = matrix.stringToNumber(newMatrix.data);
        matrixNumber.splice((matrixNumber.length - 1), 1);

        // Normalização dos dados com mínimo e máximo
        const trMatrix = matrix.transposeMatrix(matrixNumber);
        const dataMinMax = normalizacao.minMax(trMatrix);

        // const newDataStd = normalizacao.stdDeviation(trMatrix);

        // Cálculo da variância
        const calcVariance = variance.amostral(dataMinMax);
        const percVariance = variance.getToCalcPerc(calcVariance);
        const rkdPercVariance = variance.rankedPercVariance(percVariance);
        
        //const sumPercVariance = calc.calcTotalPercVariances(rkdPercVariance);
        //console.log(`Soma total variâncias: ${sumPercVariance}`);

        // Cálculo da varância acumulada
        const newData = pca.calcNewData(rkdPercVariance, 0.99);
        const shape = matrix.shape(newData);
        console.log(`componentes: ${shape}`);

        // Novo dataset com base na variância acumulada
        const newDataset = pca.newDataset(dataMinMax, newData);
        const trNewDataset = matrix.transposeMatrix(newDataset);

        // Separando dados de treinamento e dados de teste
        const { xTrain, xTest, yTrain, yTest } = pca.trainTestSplit(trNewDataset, labels, 0.33);

        const trXtrain = matrix.transposeMatrix(xTrain);
        const xTrainMean = matrix.meanList(trXtrain);

        const apiData = {
            xTrain: xTrain,
            xTest: xTest,
            yTrain: yTrain,
        }

        const apiNB = api.post('http://127.0.0.1:5000/naivebayes', yTest, apiData);
        const apiSvmLienar = api.post('http://127.0.0.1:5000/svmlinear', yTest, apiData);
        const apiSvmRBF = api.post('http://127.0.0.1:5000/svmrbf', yTest, apiData);
        const apiC45 = api.post('http://127.0.0.1:5000/c45', yTest, apiData);
    });
}