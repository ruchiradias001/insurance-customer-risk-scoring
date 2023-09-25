import json
import joblib
import pandas as pd
from flask_cors import CORS
from flask import Flask, request, jsonify
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv('flask api/new_dataset.csv', low_memory=False)

# encoding the categorical columns
le1 = LabelEncoder()
df['INSUREDNATURE_encoded'] = le1.fit_transform(df['INSUREDNATURE'])
le2 = LabelEncoder()
df['SEX_encoded'] = le2.fit_transform(df['SEX'])
le3 = LabelEncoder()
df['MARITALSTATUS_encoded'] = le3.fit_transform(df['MARITALSTATUS'])
le4 = LabelEncoder()
df['BRANCHCODE_encoded'] = le4.fit_transform(df['BRANCHCODE'])
le5 = LabelEncoder()
df['DISTRINCTCODE_encoded'] = le5.fit_transform(df['DISTRINCTCODE'])
le6 = LabelEncoder()
df['PROVINCECODE_encoded'] = le6.fit_transform(df['PROVINCECODE'])
le7 = LabelEncoder()
df['ZONECODE_encoded'] = le7.fit_transform(df['ZONECODE'])
le8 = LabelEncoder()
df['YEAR_encoded'] = le8.fit_transform(df['YEAR'])
le9 = LabelEncoder()
df['VEHICLETYPE_encoded'] = le9.fit_transform(df['VEHICLETYPE'])
le10 = LabelEncoder()
df['MAKE_encoded'] = le10.fit_transform(df['MAKE'])
le11 = LabelEncoder()
df['MODEL_encoded'] = le11.fit_transform(df['MODEL'])
le12 = LabelEncoder()
df['TONNAGE_encoded'] = le12.fit_transform(df['TONNAGE'])
le13 = LabelEncoder()
df['SEATINGCAPACITY_encoded'] = le13.fit_transform(df['SEATINGCAPACITY'])
le14 = LabelEncoder()
df['FUELTYPE_encoded'] = le14.fit_transform(df['FUELTYPE'])
le15 = LabelEncoder()
df['MAINCLASS_encoded'] = le15.fit_transform(df['MAINCLASS'])
le16 = LabelEncoder()
df['SUBCLASS_encoded'] = le16.fit_transform(df['SUBCLASS'])

model = joblib.load('flask api/model.joblib')

app = Flask(__name__)
cors = CORS(app)

@app.route('/prediction', methods=["POST"])
def prediction():
    data = data = request.get_json()
    request_data = data.get("inputs")

    input1 = request_data['input1']
    input2 = request_data['input2']
    input3 = request_data['input3']
    input4 = request_data['input4']
    input5 = request_data['input5']
    input6 = request_data['input6']
    input7 = request_data['input7']
    input8 = request_data['input8'] + '.0'
    input9 = request_data['input9']
    input10 = request_data['input10']
    input11 = request_data['input11']
    input12 = request_data['input12'] + '.0'
    input13 = request_data['input13'] + '.0'
    input14 = request_data['input14']
    input15 = request_data['input15']
    input16 = request_data['input16']
    input17 = request_data['input17']
    input18 = request_data['input18']
    input19 = request_data['input19']
    input20 = request_data['input20']
    input21 = request_data['input21']
    input22 = request_data['input22']
    input23 = request_data['input23']

    prediction = model.predict([[
        le1.transform([input1])[0], 
        le2.transform([input2])[0], 
        le3.transform([input3])[0], 
        le4.transform([input4])[0], 
        le5.transform([input5])[0], 
        le6.transform([input6])[0], 
        le7.transform([input7])[0], 
        le8.transform([input8])[0], 
        le9.transform([input9])[0],
        le10.transform([input10])[0],
        le11.transform([input11])[0], 
        le12.transform([input12])[0], 
        le13.transform([input13])[0], 
        le14.transform([input14])[0], 
        le15.transform([input15])[0], 
        le16.transform([input16])[0], 
        input17, 
        input18, 
        input19,
        input20,
        input21,
        input22,
        input23
    ]])

    return jsonify({"result": prediction[0]})

if __name__ == "__main__":
    app.run(host='192.168.56.1', debug=True)