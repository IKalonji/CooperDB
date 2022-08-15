from flask import Flask, render_template, request, redirect, url_for, flash, jsonify

from DBCooper import CooperDB
import CooperQL_parser


app = Flask(__name__)

@app.route('/')
def index():
    return "CooperDB"
@app.route('/db/query', methods=['POST'])
def get_db():
    """Get the database"""
    return jsonify({"result": CooperQL_parser.parse(request.json['query'], request.json['parameters'])})

if __name__ == '__main__':
    app.run(debug=True)