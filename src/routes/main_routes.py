__name__ = 'main' # have to change the name for some reason otherwise it wont import

from flask import Blueprint, render_template
import os

PROJ_PATH = os.path.abspath(os.path.join(os.getcwd(), os.pardir))

main_router = Blueprint(__name__, 'routes')

@main_router.route('/')
def home():
    return render_template('home.html')
