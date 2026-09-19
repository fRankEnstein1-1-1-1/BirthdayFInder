import os
from datetime import date

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# For testing, allow all origins.
# For production, replace with your Vercel URL, e.g.
# CORS(app, origins=["https://your-app.vercel.app"])
CORS(app)


@app.route("/")
def health():
    return jsonify(status="ok", message="Birthday Finder API is running")


@app.route("/api/day", methods=["POST"])
def get_day():
    data = request.get_json(silent=True) or {}

    # Validate that day, month and year are integers
    try:
        day = int(data.get("day"))
        month = int(data.get("month"))
        year = int(data.get("year"))
    except (TypeError, ValueError):
        return jsonify(error="Day, month and year must be valid numbers."), 400

    # Validate that the date actually exists (e.g. rejects 31 Feb)
    try:
        d = date(year, month, day)
    except ValueError:
        return jsonify(error="That date does not exist. Please check your input."), 400

    return jsonify(
        weekday=d.strftime("%A"),           # Monday, Tuesday ...
        formatted=d.strftime("%d %B %Y"),   # 05 March 2001
        day=day,
        month=month,
        year=year,
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)