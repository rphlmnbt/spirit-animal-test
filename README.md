# Spirit Animal Test

## Description

This application is a simple web app that mimics personality-type quizes that you can usually find on the internet. For this specific application, the user is asked to answer five questions. After which, the user will be shown the animal that most likely aligns with his personality (based on the dataset used in the application), together with the percentage amount of how much the user aligns with the all of the other animals (including the best match). 

Machine learning is used in order to determine which animal fits the user best, and the data used to feed the machine learning classsifier is based on fummy data that I put in a CSV file. The machine learning classifier that was used in this application is the Random Forest Classifier of Python's Scikit-learn library. API's were created in order to utilize their functions and were served to the Front End via flask.

In the Front End side of things, React and TypeScript are mainly used for the development of the UI. Additionally, React Router was used in order to handle navigation, while React Bootstrap was used in order to utilize some ready-made components for the application.

![image](https://github.com/user-attachments/assets/328f2f97-0adf-4feb-84a4-782bcf3cbd9c)

## Technologies Used

### Front End

- React JS
- TypeScript
- Axios
- React Bootstrap
- React Router

### Back End
- Python
- Flask
- NumPy
- Scikit-learn
- Pandas
