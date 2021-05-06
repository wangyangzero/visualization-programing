import axios from 'axios';
import { BASE_URL } from 'src/constants';
import { IComponent } from 'src/type/setting';

/**
 * 获取布局设置
 * @param pageKey 页面key值
 * @returns 
 */
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

/**
 * 更新布局设置
 * @param pageKey 页面key值
 * @param posList 新的页面布局设置
 * @param prePosList 旧的页面布局设置
 * @returns 
 */
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

  /**
   * 获取组件的样式
   * @param pageKey 页面的key值
   * @param componentKey 组件的key值
   * @returns 
   */
  export const getStyle = async (pageKey: string, componentKey: string): Promise<IComponent[] | []> => {
    try{
      console.log('this\n', pageKey, componentKey)
      const data: IComponent[] = (await axios.get(`${BASE_URL}/setting/select/style`, {
        params: {
          pageKey,
          componentKey
        }
      })).data;
      return data;
    } catch(e) {
      console.log('e', e);
      return [];
    }
  };

/**
 * 更新样式设置
 * @param props 样式的属性对象
 * @returns 更新是否成功
 */
export const updateStyle = async (props: any) : Promise<string> => {
  try{
    const data: string = (await axios.post(`${BASE_URL}/setting/update/style`, props)).data;
    return data;
  } catch(e) {
    return 'error';
  }
}
