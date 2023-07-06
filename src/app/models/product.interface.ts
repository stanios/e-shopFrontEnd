import { FileHandle } from "./file-handle.interface"

export interface Product {
    productName: string,
    productDescription: string,
    productDiscountedPrice: number,
    productActualPrice: number
    productImages: FileHandle[]
}
