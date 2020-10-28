from flask import Flask, request
import json

#@app.route('\Get Question')

def loadData():
    file = open('Questions.json')
    return json.load(file)


if __name__ == "__main__":
    print(loadData())
