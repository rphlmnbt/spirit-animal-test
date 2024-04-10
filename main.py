from flask import Flask
from flask_restful import Api

app = Flask(__name__)

api = Api(app)

# IMPORT ROUTES
import controllers.mlController

if __name__ == "__main__":
    # start up api
    app.run(port=8081, debug=True)