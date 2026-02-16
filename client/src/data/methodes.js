import api from "./api";

export const PostMethod = async (route, bodies) => {
  try {
    const { data } = await api.post(route, bodies);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const PostMethodHead = async (route, bodies , headers ) => {
  try {
    const { data } = await api.post(route, bodies , headers);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const GetMethod = async (route) => {
  try {
    const { data } = await api.get(route);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const PutMethod = async (route, bodies) => {
  try {
    const { data } = await api.put(route, bodies);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
