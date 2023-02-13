from flask import Flask, render_template, jsonify
import requests, random

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.get('/generateText')
def generateText():
    text = requests.get(f'http://metaphorpsum.com/paragraphs/1/{random.randint(3, 5)}').content.decode()
    totalHorizontal = 0
    totalLetters = 0
    lineEndIndecies = []

    words = text.split(' ')
    for i in range(len(words)):
        if(totalHorizontal + (len(words[i]))*13.85 > 800):
            lineEndIndecies.append(totalLetters-1)
            totalHorizontal = 0
        totalHorizontal += (len(words[i])+1)*13.85
        totalLetters += len(words[i])+1

    return jsonify(text=text, indecies=lineEndIndecies)
