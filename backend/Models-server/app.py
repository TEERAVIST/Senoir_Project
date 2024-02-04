from fastapi import FastAPI, HTTPException
from typing import Optional
import _pickle as cPickle
import joblib
from pydantic import BaseModel
import pickle
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


# Allow requests from your React app's domain
origins = [
    "http://localhost:3000",  # Replace with the actual URL of your React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScoringItem(BaseModel):
    
      duration: int # 0,
      protocol_type:float# "tcp",
      service:  float# "private",
      flag: float# "REJ",
      src_bytes:int# 0,
      dst_bytes:int# 0,
      land:int# 0,
      wrong_fragment:int# 0,
      urgent:int# 0,
    #   hot:int# 0,
    #   num_failed_logins:int# 0,
    #   logged_in:int# 0,
    #   num_compromised:int# 0,
    #   root_shell:int# 0,
    #   su_attempted:int# 0,
    #   num_root:int# 0,
    #   num_file_creations:int#0,
    #   num_shells:int#0,
    #   num_access_files:int#0,
    #   num_outbound_cmds:int#0,
    #   is_host_login:int#0,
    #   is_guest_login:int#0,
      count:int#229,
      srv_count: int#10,
      serror_rate: float#0.0,
      srv_serror_rate: float#0.0,
      rerror_rate: float#1.0,
      srv_rerror_rate: float#1.0,
      same_srv_rate: float#0.04,
      diff_srv_rate: float#0.06,
      srv_diff_host_rate: float#0.0,
      dst_host_count:int#255,
      dst_host_srv_count:int#10,
      dst_host_same_srv_rate: float#0.04,
      dst_host_diff_srv_rate: float#0.06,
      dst_host_same_src_port_rate: float#0.0,
      dst_host_srv_diff_host_rate: float#0.0,
      dst_host_serror_rate: float#0.0,
      dst_host_srv_serror_rate: float#0.0,
      dst_host_rerror_rate: float#1.0,
      dst_host_srv_rerror_rate: float#1.0,
      # attack: float#"neptune",
      # level: float#21


models = {
 'knn_model.pkl': None,
 'logistic_regression_model.pkl': None,
 'random_forest_model.pkl': None,
}

# Load models when the server starts
for model_file in models.keys():
    with open(f'../../models/{model_file}', 'rb') as f:
        models[model_file] = pickle.load(f)
# with open('../models/logistic_regression_model.pkl','rb') as f:
 #  model = pickle.load(f)

# with open('random_forest_model1.pkl', 'rb') as f:
#    model = joblib.load(f)

#with open('random_forest_model1.pkl', 'rb') as f:
#    model = cPickle.load(f)

# Assuming you have a mapping dictionary like this:
class_mapping = {
    0: 'Normal',
    1: 'Dos',
    2: 'R2L',
    3: 'Probe',
    4: 'U2R',
    # ... add more mappings as needed
}

#@app.post('/')
#async def scoring_endpoint(item:ScoringItem):
#    df = pd.DataFrame([item.dict().values()], columns=item.dict().keys())
#    yhat = model.predict(df)
#    return {"prediction":int(yhat)} 

class CommandResult(BaseModel):
    result: str

@app.post('/upload_result')
async def upload_result(result: CommandResult):
    # Process the result as needed, e.g., store it in a database
    processed_result = result.result
    return {"message": "Result received successfully"}

@app.post("/")
async def scoring_endpoint(item: ScoringItem, model: Optional[str] = 'logistic_regression_model.pkl'):
    print(f"Received model: {model}")
    if model not in models:
        raise HTTPException(status_code=400, detail="Invalid model selected")
    
    df = pd.DataFrame([item.dict()])
    selected_model = models[model]
    
    if selected_model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        yhat = selected_model.predict(df)
    # Assuming yhat[0] is the numerical prediction
        numerical_prediction = int(yhat[0])
    
    # Map numerical prediction to class label
        if numerical_prediction in class_mapping:
            predicted_class = class_mapping[numerical_prediction]
            return {"prediction": predicted_class}
        else:
            return {"prediction": "unknown_class"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")


