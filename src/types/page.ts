export interface BasePage<T> {
    id: string;
    name: string;
    content: T;
}

export interface About {
    about?: BasePage<{
        value: string;
    }>;
}

export interface WebsiteInfo {
    websiteInfo?: BasePage<{
        address?: Array<string>;
        phone?: Array<string>;
        facebook?: string;
    }>
}

export interface AllPages {
    page: About & WebsiteInfo;
}