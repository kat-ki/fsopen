import axios from "axios";
import {DiaryEntry, NewDiaryEntry} from "../types.ts";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getEntries = async () => {
    const res = await axios.get<DiaryEntry[]>(baseUrl);
    return res.data;
}

export const createNewEntry = async (entry: NewDiaryEntry) => {
    const res = await axios.post<NewDiaryEntry>(baseUrl, entry);
    return res.data;
}

