import {useEffect, useState} from "react";
import {DiaryEntry} from "./types.ts";
import {getEntries} from "./services/entriesService.ts";

function App() {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await getEntries();
                setEntries(res);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, [])

    return (
        <>
            <h3>Diary Entries</h3>
            {entries.map(entry => (
                <div key={entry.id}>
                    <h4>{entry.date}</h4>
                    <p>Weather: {entry.weather}</p>
                    <p>Visibility: {entry.visibility}</p>
                    {entry.comment && <p>Comment: {entry.comment}</p>}
                    <hr/>
                </div>
            ))}
        </>
    )
}

export default App
