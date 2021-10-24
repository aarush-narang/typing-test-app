__name__ = 'text_generator' # have to change the name for some reason otherwise it wont import

from flask import Blueprint, render_template, redirect, send_file, abort, session, make_response, request
import requests, random

text_generator_router = Blueprint(__name__, 'routes')

@text_generator_router.get('/generateText')
def generateText():
    text = requests.get(f'http://metaphorpsum.com/paragraphs/1/{random.randint(6, 8)}')
    return text.content.decode()
