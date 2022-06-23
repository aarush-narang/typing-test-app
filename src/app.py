from flask import Flask, render_template
from routes import main_routes, text_generator_routes
import os

app = Flask(__name__)

app.register_blueprint(main_routes.main_router, url_prefix='/')
app.register_blueprint(text_generator_routes.text_generator_router, url_prefix='/')

if __name__ == '__main__':
    app.run(host=os.getenv('DOMAIN'), port=os.getenv('PORT'), ssl_context=('../cert.pem', '../key.pem'), debug=True) # certificates for https