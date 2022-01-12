export default interface Reimbursement {
    amount: number,
    comment: string,
    receipts: Array<string>,
    id?: string,
    submittalTime?: number,
    status?: string,
    resolutionTime?: number
}
