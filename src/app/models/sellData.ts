export interface SellData {
    id: any,
    operator: string,
    bookingNumber: string,
    sellAmount: number,
    rav: number,
    commission: number,
    overBonus: number,
    sellerBonus: number,
    managerBonus: number,
    date: Date,
    empName: string
}

export interface SellJoinedDataResponse {
    totalSells: number,
    totalRAV: number,
    sells: [SellData]
}

export interface AddSellRequest{
    emplId: number,
    sell: SellData
}