export const convertToVND = (money: number) => {
    return money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const parseNumber = (number: unknown, defaultValue: number) => {
    if (typeof number !== 'string') {
        return defaultValue;
    }
    const _number = parseInt(number);
    return isNaN(_number) ? defaultValue : _number;
};

export const parseString = (value: unknown) => {
    if (typeof value !== 'string') {
        return '';
    }
    return value;
};

export const convertToVietnameseDate = (date: Date | number | string) => {
    return new Date(date).toLocaleString('vi-VN');
};