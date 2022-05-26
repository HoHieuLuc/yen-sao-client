import GenericError from '../components/Utils/Errors/GenericError';

const NotFoundPage = () => {
    return (
        <GenericError
            statusCode={404}
            title='Trang này không tồn tại'
            description='Trang bạn đang truy cập không tồn tại, hãy kiểm tra lại đường dẫn.'
        />
    );
};

export default NotFoundPage;