from sklearn.naive_bayes import GaussianNB
import numpy as np

def gaussianNaiveBayes(xTrain, xTest, yTrain):
    gnb = GaussianNB()

    npYtrain = np.array(yTrain)

    gnb.fit(xTrain, npYtrain.reshape(-1))

    yPred = gnb.predict(xTest)
    scores = gnb.predict_proba(xTest)[:, 1]

    npYpred = np.array(yPred)
    npScores = np.array(scores)

    arr = { 'classifier': 'Naive Bayes', 'scores': npScores.tolist(), 'yPred': npYpred.tolist() }

    return arr
