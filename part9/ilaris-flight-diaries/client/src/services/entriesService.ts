import axios from "axios";
import {DiaryEntry} from "../types.ts";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getEntries = async () => {
    const res = await axios.get<DiaryEntry[]>(baseUrl);
    return res.data;
}