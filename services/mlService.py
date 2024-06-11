import pandas as pd
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn import tree
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from flask import jsonify


class MLService:
    def predict(self, answers):

        # Import the dataset
        directory = os.path.dirname(__file__)
        filename = os.path.join(directory, '../datasets/datasets.csv')
        dataset = pd.read_csv(filename, sep=',')

        # Separate the columns
        characteristics = dataset.drop(columns=['animal'])
        result = dataset['animal']

        # Define the column transformer
        column_transformer = ColumnTransformer(
            transformers=[
                ('encoder', OneHotEncoder(), [0, 1, 2, 3, 4])  # Apply OneHotEncoder to both columns
            ],
            remainder='passthrough'  # Leave the rest of the columns unchanged
        )

        # Create the pipeline
        pipeline = Pipeline(steps=[
            ('preprocessor', column_transformer),
            ('classifier', RandomForestClassifier(n_estimators=10, random_state=42))
        ])

        # Fit the model
        pipeline.fit(characteristics, result)

        # Get the results
        prediction = pipeline.predict([answers])

        # Extract the trained RandomForestClassifier from the pipeline
        random_forest = pipeline.named_steps['classifier']

        # Select one of the trees from the forest
        estimator = random_forest.estimators_[0]

        # Generate graph
        tree.export_graphviz(estimator, out_file='graph.dot', 
                            feature_names=pipeline.named_steps['preprocessor'].transformers_[0][1].get_feature_names_out(),
                            class_names=sorted(result.unique()),
                            filled=True, rounded=True,
                            special_characters=True)

        return prediction
    
    def prediction_probability(self, answers):
        # Import the dataset
        directory = os.path.dirname(__file__)
        filename = os.path.join(directory, '../datasets/datasets.csv')
        dataset = pd.read_csv(filename, sep=',')

        # Separate the columns
        characteristics = dataset.drop(columns=['animal'])
        result = dataset['animal']

        # Define the column transformer
        column_transformer = ColumnTransformer(
            transformers=[
                ('encoder', OneHotEncoder(), [0, 1, 2, 3, 4])  # Apply OneHotEncoder to both columns
            ],
            remainder='passthrough'  # Leave the rest of the columns unchanged
        )

        # Create the pipeline
        pipeline = Pipeline(steps=[
            ('preprocessor', column_transformer),
            ('classifier', RandomForestClassifier(n_estimators=10, random_state=42))
        ])

        # Fit the model
        pipeline.fit(characteristics, result)

        # Get the results
        probabilities = pipeline.predict_proba([answers])
        print(probabilities)

        # Extract the trained RandomForestClassifier from the pipeline
        random_forest = pipeline.named_steps['classifier']

        # Select one of the trees from the forest
        estimator = random_forest.estimators_[0]

        # Generate graph
        tree.export_graphviz(estimator, out_file='graph.dot', 
                            feature_names=pipeline.named_steps['preprocessor'].transformers_[0][1].get_feature_names_out(),
                            class_names=sorted(result.unique()),
                            filled=True, rounded=True,
                            special_characters=True)

        return probabilities[0]