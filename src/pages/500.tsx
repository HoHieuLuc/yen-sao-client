import GenericError from '../components/Utils/Errors/GenericError';

const ServerError = () => {
    return (
        <GenericError 
            statusCode={500}
            title='Có lỗi xảy ra.'
            description='Máy chủ không thể xử lý yêu cầu của bạn. Vui lòng thử lại sau.'
        />
    );
};

export default ServerError;