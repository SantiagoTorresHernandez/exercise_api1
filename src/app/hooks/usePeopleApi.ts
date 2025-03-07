'use client';

import {useState, useEffect} from "react";
import axios from "axios";
import {Person} from "../types/person";
import {PeopleResponse} from "../types/http/people.response";

export const usePeopleApi = () => {
    const [currentPerson, setPerson] = useState<Person | null>(null);
    const [personHistory, setPersonHistory] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async() => {
        setLoading(true);
        setError(null);
        try{
            const response = await axios.get<PeopleResponse>("https://randomuser.me/api/");
            const data = response.data.results[0];
            const person: Person = {
                name: data.name.first + " " + data.name.last,
                email: data.email,
                birthday: data.dob.date,
                phone: data.phone,
                password: data.login.password
            }
            setPerson(person)
            setPersonHistory((personList)=> [...personList, person])
        } catch (err){
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { currentPerson, personHistory, loading, error, fetchData};

    
};

export default usePeopleApi;