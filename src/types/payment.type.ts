export interface IPayment {
    amount: string;
    orderInfo: string;
    type: "MOMO" | "VNPAY"
}