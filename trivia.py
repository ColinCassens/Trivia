from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/Get Question', methods=['GET'])
def loadData():
    file = open('Questions.json')
    return json.load(file)

app.run()
