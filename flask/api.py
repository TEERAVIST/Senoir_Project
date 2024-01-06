from flask import Flask, request, render_template, jsonify, redirect, url_for
import pickle
import pandas as pd

app = Flask(__name__)

with open('../knn_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/', methods=['GET', 'POST'])
def home():
    prediction = None

    if request.method == 'POST':
        item = {
            'duration': int(request.form['duration']),
            'protocol_type': int(request.form['protocol_type']),
            'service': int(request.form['service']),
            'flag': int(request.form['flag']),
            'src_bytes': int(request.form['src_bytes']),
            'dst_bytes': int(request.form['dst_bytes']),
            'land': int(request.form['land']),
            'wrong_fragment': int(request.form['wrong_fragment']),
            'urgent': int(request.form['urgent']),
            'hot': int(request.form['hot']),
            'num_failed_logins': int(request.form['num_failed_logins']),
            'logged_in': int(request.form['logged_in']),
            'num_compromised': int(request.form['num_compromised']),
            'root_shell': int(request.form['root_shell']),
            'su_attempted': int(request.form['su_attempted']),
            'num_root': int(request.form['num_root']),
            'num_file_creations': int(request.form['num_file_creations']),
            'num_shells': int(request.form['num_shells']),
            'num_access_files': int(request.form['num_access_files']),
            'num_outbound_cmds': int(request.form['num_outbound_cmds']),
            'is_host_login': int(request.form['is_host_login']),
            'is_guest_login': int(request.form['is_guest_login']),
            'count': int(request.form['count']),
            'srv_count': int(request.form['srv_count']),
            'serror_rate': int(request.form['serror_rate']),
            'srv_serror_rate': int(request.form['srv_serror_rate']),
            'rerror_rate': int(request.form['rerror_rate']),
            'srv_rerror_rate': int(request.form['srv_rerror_rate']),
            'same_srv_rate': int(request.form['same_srv_rate']),
            'diff_srv_rate': int(request.form['diff_srv_rate']),
            'srv_diff_host_rate': int(request.form['srv_diff_host_rate']),
            'dst_host_count': int(request.form['dst_host_count']),
            'dst_host_srv_count': int(request.form['dst_host_srv_count']),
            'dst_host_same_srv_rate': int(request.form['dst_host_same_srv_rate']),
            'dst_host_diff_srv_rate': int(request.form['dst_host_diff_srv_rate']),
            'dst_host_same_src_port_rate': int(request.form['dst_host_same_src_port_rate']),
            'dst_host_srv_diff_host_rate': int(request.form['dst_host_srv_diff_host_rate']),
            'dst_host_serror_rate': int(request.form['dst_host_serror_rate']),
            'dst_host_srv_serror_rate': int(request.form['dst_host_srv_serror_rate']),
            'dst_host_rerror_rate': int(request.form['dst_host_rerror_rate']),
            'dst_host_srv_rerror_rate': int(request.form['dst_host_srv_rerror_rate']),
            # Add other feature values from the form
        }

        df = pd.DataFrame([item])
        prediction = int(model.predict(df)[0])

         # Redirect to the 'result' endpoint with the prediction as a parameter
        return redirect(url_for('result', prediction=prediction))

    return render_template('index.html', prediction=prediction)

@app.route('/result/<int:prediction>')
def result(prediction):
    return render_template('result.html', prediction=prediction)

if __name__ == '__main__':
    app.run(debug=True)

