export interface RandomUser {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: string | number;
    };
    email: string;
    phone: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
}