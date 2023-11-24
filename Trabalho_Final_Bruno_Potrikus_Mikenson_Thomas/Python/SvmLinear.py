from sklearn import svm
import numpy as np

def classifierSvmLinear(xTrain, xTest, yTrain):
    model = svm.SVC(kernel='linear')

    npYtrain = np.array(yTrain)

    model.fit(xTrain, npYtrain.reshape(-1))
    model.score(xTrain, yTrain)

    predicted = model.predict(xTest)

    arr = { 'classifier': 'SVM Linear', 'yPred': predicted.tolist() }

    return arr