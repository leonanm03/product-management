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

                    console.log(content)

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
            <div>
                <label htmlFor="csv_input">Selecione o arquivo CSV: </label>
                <input
                    id="csv_input"
                    type="file"
                    onChange={(event) => handleInput(event)}
                    accept=".csv"
                />
            </div>
            <div>
                <h1>Atualizar Preços</h1>
                {products.length > 0 && <ProductsTable products={products} />}
            </div>
        </>
    )
}
