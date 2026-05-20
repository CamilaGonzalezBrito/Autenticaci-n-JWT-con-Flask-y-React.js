"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():

    data = request.json

    email = data["email"]
    password = data["password"]

    user_exists = User.query.filter_by(
        email=email
    ).first()

    if user_exists:
        return jsonify({
            "msg":"User already exists"
        }),400
    
    new_user = User(
        email=email,
        password=password,
        is_active=True
    )

    db.session.add(new_user)

    db.session.commit()

    return jsonify({
        "msg": "User created successfully"
    }), 200

@api.route('/login', methods=['POST'])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({
            "msg": "User not found"
        }), 404

    if user.password != password:
        return jsonify({
            "msg": "Wrong password"
        }), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": token,
        "user": user.serialize()
    }), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()

    return jsonify({
        "msg": "Access granted",
        "user_id": current_user_id
    }), 200