__name__ = 'main' # have to change the name for some reason otherwise it wont import

from flask import Blueprint, render_template, redirect, send_file, abort, session, make_response
import os
import re

PROJ_PATH = os.path.abspath(os.path.join(os.getcwd(), os.pardir))

main_router = Blueprint(__name__, 'routes')

@main_router.route('/')
def home():
    return render_template('home.html')


@main_router.get('/<dir>/<resource>')
def return_file(dir, resource):
    file_ending = re.split('\.', resource).pop() # get the file type
    file_dir_path = os.path.dirname(f'{PROJ_PATH}\\{dir}')

    if dir != 'public':
        file_dir_path = os.path.dirname(f'{PROJ_PATH}\\src\\templates\\{dir}')

    for root, dirs, files in os.walk(file_dir_path): # walk through the dir
        for file in files: 
            if file.endswith(f'.{file_ending}') and resource in file: # find the file and send it
                return send_file(f'{file_dir_path}\\{dir}\\{file}')
    return abort(404) # if file was not found, send 404 code
