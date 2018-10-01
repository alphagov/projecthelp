from flask import Flask
from flask import request, url_for, redirect, render_template, jsonify, Response
from flask_wtf.csrf import CSRFProtect
from flask_httpauth import HTTPBasicAuth
import os

#CSRF_SECRET_KEY = os.environ.get("WTF_CSRF_SECRET_KEY", default=None)
#if not CSRF_SECRET_KEY:
#    raise ValueError("No CSRF secret key set for Flask application")

#USERNAME = os.environ.get("USERNAME", default=None)
#PASSWORD = os.environ.get("PASSWORD", default=None)
#if not USERNAME or PASSWORD:
#    raise ValueError("No authentication set for Flask application")

CSRF_SECRET_KEY = '3'

app = Flask(__name__)
csrf = CSRFProtect(app)
app.secret_key = CSRF_SECRET_KEY
csrf.init_app(app)

#@auth.get_password
#def get_pw(username):
#    if username in users:
#        return users.get(username)
#    return None

@app.route('/')
#@auth.login_required
def index():
        return render_template('index.html')
        
@app.route('/linkSent')
#@auth.login_required
def linksent():
        return render_template('linkSent.html')
        
@app.route('/NewPatient')
#@auth.login_required
def newpatient():
        return render_template('NewPatient.html')
        
@app.route('/patientPredictedEDD')
#@auth.login_required
def predictEDD():
        return render_template('patientPredictedEDD.html')
        
@app.route('/Patient1')
#@auth.login_required
def patient1():
        return render_template('Patient1.html')
        
@app.route('/Patient1u')
#@auth.login_required
def patient1u():
        return render_template('Patient1u.html')
        
@app.route('/patientDetails')
#@auth.login_required
def patientdetails():
        return render_template('patientDetails.html')
        
@app.route('/patientEmail')
#@auth.login_required
def patientemail():
        return render_template('patientEmail.html')
        
@app.route('/patientNOK')
#@auth.login_required
def patientnok():
        return render_template('patientNOK.html')
        
@app.route('/patientStart')
#@auth.login_required
def patientstart():
        return render_template('patientStart.html')
        
@app.route('/timeline')
#@auth.login_required
def timeline():
        return render_template('timeline.html')
        
@app.route('/WCChangeEDD')
#@auth.login_required
def wcchangeedd():
        return render_template('WCChangeEDD.html')
        
@app.route('/WClogin')
#@auth.login_required
def wclogin():
        return render_template('WClogin.html')

@app.route('/WCpatientlist')
#@auth.login_required
def wcpatientlist():
        return render_template('WCpatientlist.html')
        
@app.route('/WCpatientlistu')
#@auth.login_required
def wcpatientlistu():
        return render_template('WCpatientlistu.html')

@app.route('/WCpatientlistv')
#@auth.login_required
def wcpatientlistv():
        return render_template('WCpatientlistv.html')
        
@app.route('/WCstart')
#@auth.login_required
def wcstart():
        return render_template('WCstart.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)