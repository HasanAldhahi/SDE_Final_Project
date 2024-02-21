# app.py
from flask import Flask, request, redirect, flash, render_template
from flask import Flask
from flask_cors import CORS         # import flask
import json
from gradio_client import Client
app = Flask(__name__)             # create an app instance
CORS(app)


@app.route("/")                   # at the end point /
def hello():
    # client = Client(
    #     "https://felixrosberg-face-swap.hf.space/--replicas/cjapv/")
    # print(client.view_api(return_format="dict"))
    # result = client.predict(
    #     # filepath  in 'Target' Image component
    #     "https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png",
    #     # filepath  in 'Source' Image component
    #     "https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png",
    #     # float (numeric value between 0 and 100) in 'Anonymization ratio (%)' Slider component
    #     0,
    #     # float (numeric value between 0 and 100) in 'Adversarial defense ratio (%)' Slider component
    #     0,
    #     # List[Literal['Compare', 'Anonymize', 'Reconstruction Attack', 'Adversarial Defense']]  in 'Mode' Checkboxgroup component
    #     ["Compare"],
    #     api_name="/run_inference"
    # )
    # print(result)
    # call method hello
    return "Hello World!"         # which returns "hello world"
    # run the flask app


@app.route('/upload', methods=['POST'])
def upload():

    # get dataset_name
    temp = request.get_json()
    print(temp)
    print(temp["link_s"])
    print(temp["link_t"])
    client = Client(
        "https://felixrosberg-face-swap.hf.space/--replicas/cjapv/")
    # print(client.view_api(return_format="dict"))
    result = client.predict(
        # filepath  in 'Target' Image component
        temp["link_t"],
        # filepath  in 'Source' Image component
        temp["link_s"],
        # float (numeric value between 0 and 100) in 'Anonymization ratio (%)' Slider component
        0,
        # float (numeric value between 0 and 100) in 'Adversarial defense ratio (%)' Slider component
        0,
        # List[Literal['Compare', 'Anonymize', 'Reconstruction Attack', 'Adversarial Defense']]  in 'Mode' Checkboxgroup component
        ["Compare"],
        api_name="/run_inference")
    print(result)
    print("success")
    return json.dumps("Hello")

    # if 'file' not in request.files:
    #     flash('No file part', 'error')
    #     return redirect('/')

    # file = request.files['file']

    # if file.filename == '':
    #     flash('No selected file', 'error')
    #     return redirect('/')

    # if file:
    #     # Save the uploaded file to a folder
    #     file.save('uploads/' + file.filename)
    #     flash('File uploaded successfully', 'success')
    #     return redirect('/')
    # else:
    #     flash('File upload failed', 'error')
    #     return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
