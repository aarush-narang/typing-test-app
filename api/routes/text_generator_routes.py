__name__ = 'text_generator' # have to change the name for some reason otherwise it wont import

from flask import Blueprint, jsonify
import requests, random

text_generator_router = Blueprint(__name__, 'routes')

@text_generator_router.get('/generateText')
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
