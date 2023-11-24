import calc from '../models/Calc';

class Matrix {
    dataToString (data) {
        const string  = data.split('\n');
        return string;
    }

    stringToMatrix (string) {
        const matrix = [];

        for (let array of string) {
            let stringArray = array.split(',');
            matrix.push(stringArray);
        }

        return matrix;
    }

    removeLabels (matrix) {

        const obj = {};
        obj.labels = [];

        for (let i = 0; i < matrix.length; i++) {   
            obj.labels.push(matrix[i].splice(1, 1));
            matrix[i].splice(0, 1)
            obj.data = matrix;
        }

        return obj;
    }

    stringToNumber (matrix) {
        const matrixNumber = [];

        for (let i = 0; i < matrix.length; i++) {
            matrixNumber.push(
                matrix[i].map(value => {
                    return Number(value); 
            }));
        }

        return matrixNumber;
    }

    transposeMatrix (matrix) {
        const trMatrix = [];

        for (let i = 0; i < matrix[0].length; i++) {

            trMatrix.push([]);

            for (let j = 0; j < matrix.length; j++) { 

                trMatrix[i].push(matrix[j][i]);

            }
        }

        return trMatrix;
    }

    matrixToJson(matrix) {
        let matrixJson = JSON.stringify(matrix);
        return matrixJson;
    }

    convertLabels (labels, column) {
        return labels.map(value => {
            switch (value[column]) {
                case 'M':
                    value[column] = 1;
                    return;

                case 'B':
                    value[column] = 0;
                    return;
                
                default:
                    return;
            }
        });
    }

    meanList (data) {

        const list = [];

        for (let i = 0; i < data.length; i++) {
            let mean = calc.calcMean(data[i]);
            list.push(mean);
        }

        return list;
    }

    shape (data) {
        return data.length;
    }

    reshape (matrix) {

        const matrixReshape = [];

        for (let i = 0; i < matrix.length; i++) {

            matrixReshape.push(matrix[i][0]);
        }

        return matrixReshape;
    }
}

module.exports = new Matrix();