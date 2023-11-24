import fetch from 'cross-fetch';
import ConfusionMatrix from 'ml-confusion-matrix';
import matrix from './Matrix';

class Api {

    post (url, yTest, data) {

        fetch(url , {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => {
            if (response.status !== 200) throw new Error(`${response.status}`);
            return response.json();
        })
        .then(data => {

            const verify = [];
            let cont = 0;

            for (let i = 0; i < yTest.length; i++) {

                verify.push(yTest[i][0] === data.yPred[i]);
            }

            for (let i of verify) {
                if (i) cont++;
            }

            const yTrue = matrix.reshape(yTest);

            //console.log(verify);
            console.log(`Classificador: ${data.classifier}`)
            console.log(`Total de dados: ${yTest.length}`);
            console.log(`Total de acertos: ${cont}`);

            const cm = ConfusionMatrix.fromLabels(yTrue, data.yPred);
            console.log(`Acurácia: ${cm.getAccuracy()}`);
            console.log(`tpr: ${cm.getTruePositiveRate(0)}`);
            console.log(`tnr: ${cm.getTrueNegativeRate(0)}`);
            console.log(`Matriz de confusão: ${cm.getMatrix()}`);
            console.log();

        })
        .catch(error => console.log(error));
    }
}

module.exports = new Api();