
interface Identifier<T> {
    id?: T;
}

interface Student extends Identifier<number> {
    name: string;
    firstName: string;
    email: string;
    category: Identifier<number>;
}

interface Category extends Identifier<number> {
    name: string;
}

interface Survey extends Identifier<number> {
    name: string;
    questions?: Question[];
}

interface Question extends Identifier<number> {
    label: string;
    score?: number;
    response?: string;
    items?: Item[];
}

interface Item extends Identifier<number> {
    order: number;
    label: string;
    reference: string;
}

