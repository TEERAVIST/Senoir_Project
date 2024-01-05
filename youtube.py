from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

class ScoringItem(BaseModel):
    
      duration: float # 0,
      protocol_type:float# "tcp",
      service:  float# "private",
      flag: float# "REJ",
      src_bytes:float # 0,
      dst_bytes:float # 0,
      land:float # 0,
      wrong_fragment:float # 0,
      urgent:float # 0,
      hot: float# 0,
      num_failed_logins:float # 0,
      logged_in:float # 0,
      num_compromised:float # 0,
      root_shell: float# 0,
      su_attempted: float# 0,
      num_root: float# 0,
      num_file_creations: float#0,
      num_shells: float#0,
      num_access_files: float#0,
      num_outbound_cmds: float#0,
      is_host_login: float#0,
      is_guest_login: float#0,
      count: float#229,
      srv_count: float#10,
      serror_rate: float#0.0,
      srv_serror_rate: float#0.0,
      rerror_rate: float#1.0,
      srv_rerror_rate: float#1.0,
      same_srv_rate: float#0.04,
      diff_srv_rate: float#0.06,
      srv_diff_host_rate: float#0.0,
      dst_host_count: float#255,
      dst_host_srv_count: float#10,
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

with open('knn_model.pkl','rb') as f:
    model = pickle.load(f)


@app.post('/')
async def scoring_endpoint(item:ScoringItem):
    df = pd.DataFrame([item.dict().values()], columns=item.dict().keys())
    yhat = model.predict(df)
    return {"prediction":int(yhat)} 





