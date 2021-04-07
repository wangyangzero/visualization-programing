import axios from 'axios';
import { BASE_URL } from 'src/constants';
import { IComponent } from 'src/type/setting';

export const getSetting = async (pageKey: string): Promise<IComponent[] | []> => {
  try{
    const data: IComponent[] = (await axios.get(`${BASE_URL}/setting/select`, {
      params: {
        pageKey
      }
    })).data;
    return data;
  } catch(e) {
    console.log('e', e);
    return [];
  }
};

export const updateSetting = 
  async (pageKey: string, posList: number[], prePosList: number[]) : Promise<string> => {
    try{
      const data: string = (await axios.post(`${BASE_URL}/setting/update`,{
        pageKey,
        posList,
        prePosList
      })).data;
      return data;
    } catch(e) {
      console.log('e', e);
      return 'error';
    }
  }
