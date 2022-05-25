export interface BasePage<T> {
    id: string;
    name: string;
    content: {
        value: T;
    }
}

export interface About {
    about: BasePage<string>;
}

export interface Address {
    address: BasePage<Array<string>>;
}

export interface PhoneNumber {
    phone: BasePage<Array<string>>;
}

export interface AllPage {
    page: About & Address & PhoneNumber;
}