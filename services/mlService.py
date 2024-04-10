import pandas as pd
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn import tree


class MLService:
    def predict(self, answers):

        # Import the dataset
        directory = os.path.dirname(__file__)
        filename = os.path.join(directory, '../datasets/dataset.csv')
        dataset = pd.read_csv(filename, sep=',')

        # Separate the columns
        characteristics = dataset.drop(columns=['animal'])
        result = dataset['animal']

        # Initialize the model
        model = RandomForestClassifier()
        model.fit(characteristics, result)

        # Get the results
        prediction = model.predict([answers])

        # Generate graph
        tree.export_graphviz(model, out_file='graph.dot', 
                            feature_names=['environment','characteristic','challenge_approach','role','adversity_reaction'], 
                            class_names=sorted(result.unique()), 
                            label = 'all',
                            rounded=True,
                            filled=True
                            )

        return prediction
    
    def prediction_probability(self, answers):

        # Import the dataset
        directory = os.path.dirname(__file__)
        filename = os.path.join(directory, '../datasets/dataset.csv')
        dataset = pd.read_csv(filename, sep=',')

        # Separate the columns
        characteristics = dataset.drop(columns=['animal'])
        result = dataset['animal']

        # Initialize the model
        model = RandomForestClassifier()
        model.fit(characteristics, result)

        # Get the results
        probabilities = model.predict_proba([answers])

        # Generate graph
        tree.export_graphviz(model, out_file='graph.dot', 
                            feature_names=['environment','characteristic','challenge_approach','role','adversity_reaction'], 
                            class_names=sorted(result.unique()), 
                            label = 'all',
                            rounded=True,
                            filled=True
                            )

        return probabilities