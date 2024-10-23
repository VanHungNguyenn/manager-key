export const SESSION_TOKEN_KEY = 'token'

export const renderBankInfo = (username: string = '') => {
    return [
        {
            label: 'Account Number',
            value: '0356422823',
        },
        {
            label: 'Bank Name',
            value: 'CAKE by VPBANK',
        },
        {
            label: 'Bank Account Name',
            value: 'Huynh Cong Dac',
        },
        {
            label: "Transfer Content",
            value: `dacdev ${username}`,
        }
    ]
}



export const depositInstruction = [
    '1. Đăng nhập ứng dụng Mobile Banking, chọn chức năng Scan QR và quét mã QR hoặc nhập số tài khoản và ngân hàng tương ứng.',
    '2. Nhập số tiền muốn nạp, kiểm tra thông tin trùng khớp với thông tin ở phía trên.',
    '3. Nhập nội dung chuyển tiền, xác nhận chuyển tiền.',
]