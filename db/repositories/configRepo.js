import { readJSON,writeJSON } from "../../utils/fileStorage.js";


const file="config.json"

export const get=(key)=>{
    const config=readJSON(file)
    return config[key]
}

export const set=(key,value)=>{
    const config=readJSON(file)
    config[key]=value;
    writeJSON(file,config)
    return config;
}

export const getAll = () => {
  return readJSON(file);
};