from sklearn import tree
import numpy as np

def classifierC45(xTrain, xTest, yTrain):

    clf = tree.DecisionTreeClassifier()

    npYtrain = np.array(yTrain)

    clf = clf.fit(xTrain, npYtrain.reshape(-1))

    predicted = clf.predict(xTest)

    arr = { 'classifier': 'C4.5', 'yPred': predicted.tolist() }

    return arr
