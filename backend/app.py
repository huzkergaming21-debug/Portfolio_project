import json
import os
import sqlite3
from functools import wraps
from pathlib import Path

from flask import Flask, jsonify, request, session
from flask_cors import CORS

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "portfolio.db"

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "local-development-change-this-secret")
app.config.update(SESSION_COOKIE_HTTPONLY=True, SESSION_COOKIE_SAMESITE="Lax")
CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

DEFAULT_CONTENT = {
    "profile": {
        "name": "Huzker",
        "headline": "Security Automation Developer",
        "intro": "I build automation, integrations, and tools that make security operations more efficient.",
        "about": "I'm a security-focused developer with experience in building integrations, automation, and custom tools for threat intelligence and incident response.",
        "location": "Singapore (GMT+8)",
        "email": "huzker@example.com",
        "cvUrl": "",
        "gitlabUrl": "https://git.soc.rrsi.int/huzker",
        "linkedinUrl": "https://www.linkedin.com/in/huzker"
    },
    "aboutDetails": [
        {"label": "Location", "value": "Singapore (GMT+8)"},
        {"label": "Team / Focus", "value": "SOC / Threat Intel"},
        {"label": "Technologies", "value": "Python · Flask · Docker · Elasticsearch"},
        {"label": "Personal Note", "value": "Always learning new things"}
    ],
    "quickFacts": [
        {"label": "Name", "value": "Huzker"},
        {"label": "Role", "value": "Security Automation Developer"},
        {"label": "Focus", "value": "SOAR, Integrations, Threat Intel"},
        {"label": "Languages", "value": "Python, JavaScript, Bash"},
        {"label": "Tools", "value": "TheHive, Elasticsearch, Docker"},
        {"label": "Interests", "value": "Cybersecurity, Automation, Open Source, Games, Anime"}
    ],
    "projects": [
        {"title":"Mitch Middleware","description":"TheHive → RT integration middleware with webhook processing, data transformation, and ticket creation.","tags":["Python","Flask","TheHive","RT"],"symbol":"↔","tone":"violet","details":"Connects TheHive case workflows with Request Tracker. The integration validates incoming events, filters for the right task state, maps case fields, creates RT tickets, and links ticket references back to TheHive."},
        {"title":"SOVA Alert Manager","description":"Web UI and scripts for querying and deleting TheHive alerts and cases by date range and batch.","tags":["React","Python","TheHive","API"],"symbol":"▤","tone":"red","details":"A retention utility and interface for date-scoped alert and case inventory, dry runs, exports, and controlled deletion. Includes retries, progress reporting, and batch-oriented cleanup workflows."},
        {"title":"Allyza Typosquat Pipeline","description":"Automated typosquatting detection using DNSTwist, TLS inspection, and TheHive alerting.","tags":["Python","PowerShell","DNSTwist"],"symbol":"◎","tone":"blue","details":"A pipeline that combines domain permutation discovery, DNS checks, TLS certificate enrichment, and TheHive alert processing."},
        {"title":"RF2TheHive","description":"Recorded Future intelligence and playbook alert integration for TheHive.","tags":["Python","Threat Intel","TheHive"],"symbol":"◈","tone":"cyan","details":"Transforms Recorded Future data into TheHive alerts. Playbook update handling can emit a new, traceable alert for each meaningful update."},
        {"title":"Bifrost & Truffle","description":"Security platform connectors that route external detections into TheHive workflows.","tags":["Integrations","Webhooks","SOAR"],"symbol":"⌘","tone":"amber","details":"Middleware connector work focused on reliable event ingestion, field normalization, and actionable security context."},
        {"title":"Threat Intelligence Toolkit","description":"Utilities for extracting, normalizing, and deduplicating historical threat data.","tags":["Python","Pandas","Automation"],"symbol":"⌬","tone":"green","details":"Practical data tools for date-range extraction, domain parsing, deduplication, and repeatable historical processing."}
    ],
    "skills": ["Python","Flask","Docker","TheHive","Elasticsearch","Kibana","Linux","Git","JavaScript","React","Bash","AWS"],
    "experience": [
        {"role":"Security Automation Developer","group":"SOC / Threat Intelligence","period":"2023 – Present","detail":"Building integrations, automations, and tools for security operations."},
        {"role":"TheHive Integrations & Middleware","group":"Mitch, Truffle, Bifrost, RF2TheHive","period":"2022 – 2023","detail":"Connecting security platforms through webhooks, APIs, and field mapping."},
        {"role":"Threat Intelligence Tools","group":"SOVA, Allyza, DNSTwist, Custom Scripts","period":"2021 – 2022","detail":"Developing workflows for alert management and threat enrichment."},
        {"role":"Security & Infrastructure","group":"ELK, Linux, Automation, Scripting","period":"2020 – 2021","detail":"Supporting systems and practical security tooling."}
    ],
    "contacts": [
        {"label":"Email","value":"huzker@example.com","url":"mailto:huzker@example.com"},
        {"label":"GitLab","value":"git.soc.rrsi.int/huzker","url":"https://git.soc.rrsi.int/huzker"},
        {"label":"LinkedIn","value":"linkedin.com/in/huzker","url":"https://www.linkedin.com/in/huzker"}
    ]
}

def connect_db():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection

def init_db():
    with connect_db() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS portfolio_content (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                content TEXT NOT NULL
            )
        """)
        row = connection.execute("SELECT content FROM portfolio_content WHERE id = 1").fetchone()
        if row is None:
            connection.execute(
                "INSERT INTO portfolio_content (id, content) VALUES (1, ?)",
                (json.dumps(DEFAULT_CONTENT),)
            )

def read_content():
    with connect_db() as connection:
        row = connection.execute("SELECT content FROM portfolio_content WHERE id = 1").fetchone()
    saved = json.loads(row["content"]) if row else {}
    merged = {**DEFAULT_CONTENT, **saved}
    merged["profile"] = {**DEFAULT_CONTENT["profile"], **saved.get("profile", {})}
    for key in ("aboutDetails", "quickFacts", "projects", "skills", "experience", "contacts"):
        if not isinstance(saved.get(key), list):
            merged[key] = DEFAULT_CONTENT[key]
    return merged

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if not session.get("admin_authenticated"):
            return jsonify({"error": "Unauthorized"}), 401
        return fn(*args, **kwargs)
    return wrapper

@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})

@app.get("/api/portfolio")
def portfolio():
    return jsonify({"content": read_content()})

@app.get("/api/admin/session")
def admin_session():
    return jsonify({"authenticated": bool(session.get("admin_authenticated"))})

@app.post("/api/admin/login")
def admin_login():
    payload = request.get_json(silent=True) or {}
    username = os.environ.get("ADMIN_USERNAME", "ACNAVIA")
    password = os.environ.get("ADMIN_PASSWORD")
    if not password:
        return jsonify({"error": "Set ADMIN_PASSWORD in the backend environment before signing in."}), 503
    if payload.get("username") != username or payload.get("password") != password:
        return jsonify({"error": "Invalid username or password."}), 401
    session["admin_authenticated"] = True
    return jsonify({"authenticated": True})

@app.post("/api/admin/logout")
def admin_logout():
    session.clear()
    return jsonify({"authenticated": False})

@app.get("/api/admin/content")
@admin_required
def get_admin_content():
    return jsonify({"content": read_content()})

@app.put("/api/admin/content")
@admin_required
def save_admin_content():
    payload = request.get_json(silent=True) or {}
    content = payload.get("content")
    if not isinstance(content, dict):
        return jsonify({"error": "Content must be a JSON object."}), 400
    serialized = json.dumps(content)
    if len(serialized) > 200_000:
        return jsonify({"error": "Content is too large."}), 413
    with connect_db() as connection:
        connection.execute(
            "INSERT INTO portfolio_content (id, content) VALUES (1, ?) "
            "ON CONFLICT(id) DO UPDATE SET content = excluded.content",
            (serialized,)
        )
    return jsonify({"saved": True, "content": content})

init_db()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
