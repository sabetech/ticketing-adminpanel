import * as api from './requests/API';
import { Station } from '../Types/Station';
import { AppError, RemoteResponse } from '../Types/Remote';

export const getStations = async (): Promise<RemoteResponse<Station[]> | AppError> => (await api.get(`/station/all`, {})).data
  
