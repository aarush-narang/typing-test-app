__name__ = 'text_generator' # have to change the name for some reason otherwise it wont import

from flask import Blueprint, jsonify
import requests, random

text_generator_router = Blueprint(__name__, 'routes')

@text_generator_router.get('/generateText')
def generateText():
    text = 'test test test test test test test test test test test test '# requests.get(f'http://metaphorpsum.com/paragraphs/1/{random.randint(6, 8)}').content.decode()
    horizontalTranslate = 13.85
    totalHorizontal = 0
    totalLetters = 0
    lineEndIndecies = []

    # use same logic, if the pixel value times length of the next word is greater than 800, log the index of the last character in the word or log the index of the word
    words = text.split(' ')
    for i in range(len(words)):
        if(totalHorizontal + (len(words[i])+1)*horizontalTranslate >= 800):
            lineEndIndecies.append(totalLetters)
            totalHorizontal = 0
        totalHorizontal += (len(words[i])+1)*horizontalTranslate
        totalLetters += len(words[i])+1

    return jsonify(text=text, indecies=lineEndIndecies)
