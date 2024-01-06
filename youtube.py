from fastapi import FastAPI
import _pickle as cPickle
import joblib
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

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
      hot:int# 0,
      num_failed_logins:int# 0,
      logged_in:int# 0,
      num_compromised:int# 0,
      root_shell:int# 0,
      su_attempted:int# 0,
      num_root:int# 0,
      num_file_creations:int#0,
      num_shells:int#0,
      num_access_files:int#0,
      num_outbound_cmds:int#0,
      is_host_login:int#0,
      is_guest_login:int#0,
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

with open('logistic_regression_model.pkl','rb') as f:
   model = pickle.load(f)

# with open('random_forest_model1.pkl', 'rb') as f:
#    model = joblib.load(f)

#with open('random_forest_model1.pkl', 'rb') as f:
#    model = cPickle.load(f)



@app.post('/')
async def scoring_endpoint(item:ScoringItem):
    df = pd.DataFrame([item.dict().values()], columns=item.dict().keys())
    yhat = model.predict(df)
    return {"prediction":int(yhat)} 





