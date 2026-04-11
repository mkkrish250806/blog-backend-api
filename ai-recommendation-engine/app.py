from flask import Flask, jsonify
from recommendation import get_recommendations

app = Flask(__name__)

@app.route("/")
def home():
    return "AI Recommendation Engine Running ✅"


@app.route("/recommend/<int:user_id>", methods=["GET"])
def recommend(user_id):
    recommendations = get_recommendations(user_id)

    return jsonify({
        "user_id": user_id,
        "recommendations": recommendations
    })


if __name__ == "__main__":
    app.run(debug=True, port=5001)