from sklearn import svm
import numpy as np

def classifierSvmRBF(xTrain, xTest, yTrain):
    model = svm.SVC(kernel='rbf')

    npYtrain = np.array(yTrain)

    model.fit(xTrain, npYtrain.reshape(-1))
    model.score(xTrain, yTrain)

    predicted = model.predict(xTest)

    arr = { 'classifier': 'SVM RBF', 'yPred': predicted.tolist() }

    return arr