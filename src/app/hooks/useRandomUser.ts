import {useState, useEffect} from "react";
import axios from "axios";
import {RandomUser} from "../types/peopleResponse";

export const useRandomUser = () => {
    const [user, setUser] = useState<RandomUser | null>(null);
    const [history, setHistory] = useState<RandomUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async() => {
        setLoading(true);
        setError(null);
        try{
            const response = await axios.get<RandomUser>("https://randomuser.me/api/");
            setUser(response.data);
            setHistory((prevHistory)=> [...prevHistory, response.data])
        } catch (err){
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return { user, loading, error, refetch: fetchUser};

    
};

export default useRandomUser;