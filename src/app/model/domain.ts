
interface Identifier<T> {
    id: T;
}

interface Student {
    name: string;
    firstName: string;
    email: string;
    category: Identifier<number>;
}

interface Category {
    id: number;
    name: string;
}


interface Survey {
    id: number;
    name: string;
}

