'use client'
import { ProductsTable } from '@/components'
import { Product } from '@/protocols'
import { useState } from 'react'

export default function UpdatePricesPage() {
    const [products, setProducts] = useState<Array<Product>>([])

    async function handleInput(event: React.FormEvent<HTMLInputElement>) {
        const file = event.currentTarget.files?.[0]
        if (!file) {
            setProducts([])
        } else {
            const reader = new FileReader()

            reader.onload = (e) => {
                const content = e.target?.result as string

                const rowsCSV = content.split('\n')

                rowsCSV.shift()

                const data = rowsCSV.map((row: string) => {
                    const content = row.split(',')
                    const product = {
                        code: Number(content[0]),
                        new_price: Number(content[1])
                    } as Product

                    if (content[0]) product.code = Number(content[0])
                    else product.problems = ['Código ou preço não informado']

                    if (content[1] !== '\r')
                        product.new_price = Number(content[1])
                    else product.problems = ['Código ou preço não informado']

                    return product
                })
                setProducts(data)
            }

            reader.readAsText(file)
        }
    }

    return (
        <>
            <div className="max-w-2xl">
                <label
                    className="block mb-2  font-medium dark:text-gray-300"
                    htmlFor="file_input"
                >
                    Inserir Arquivo
                </label>
                <input
                    className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    accept=".csv"
                    onChange={(event) => handleInput(event)}
                ></input>
            </div>
            <div>
                {products.length > 0 && <ProductsTable products={products} />}
            </div>
        </>
    )
}
