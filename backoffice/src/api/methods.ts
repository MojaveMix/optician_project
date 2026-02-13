import api from "./api";

export const PostMethod = async (route: any, bodies: any) => {
  try {
    const { data } = await api.post(route, bodies);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const GetMethod = async (route: any) => {
  try {
    const { data } = await api.get(route);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const PutMethod = async (route: any, bodies: any) => {
  try {
    const { data } = await api.put(route, bodies);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
