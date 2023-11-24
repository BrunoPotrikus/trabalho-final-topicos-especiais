from flask import Flask, request
from NaiveBayes import gaussianNaiveBayes
from SvmLinear import classifierSvmLinear
from SvmRBF import classifierSvmRBF
from C45 import classifierC45

app = Flask("Classifier")

@app.route("/naivebayes", methods=["POST"])
def getNB():

    body = request.get_json()

    calcNaiveBayes = gaussianNaiveBayes(body["xTrain"], body["xTest"], body["yTrain"])

    return calcNaiveBayes

@app.route('/svmlinear', methods=["POST"])
def getSvmLinear():

    body = request.get_json()

    calcSvm = classifierSvmLinear(body["xTrain"], body["xTest"], body["yTrain"])

    return calcSvm

@app.route('/svmrbf', methods=["POST"])
def getSvmRBF():

    body = request.get_json()

    calcSvm = classifierSvmRBF(body["xTrain"], body["xTest"], body["yTrain"])

    return calcSvm

@app.route('/c45', methods=["POST"])
def getC45():

    body = request.get_json()

    calcC45 = classifierC45(body["xTrain"], body["xTest"], body["yTrain"])

    return calcC45

app.run(debug=True)


