'use client'
import { ProductsTable } from '@/components'
import { Product } from '@/protocols'
import api from '@/services/api'
import { useState } from 'react'

export default function UpdatePricesPage() {
    const [products, setProducts] = useState<Array<Product>>([])
    const [canValidate, setCanValidate] = useState<boolean>(false)
    const [canUpdate, setCanUpdate] = useState<boolean>(false)

    async function handleInput(event: React.FormEvent<HTMLInputElement>) {
        const file = event.currentTarget.files?.[0]

        setCanValidate(false)
        setCanUpdate(false)

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

                const foundProblem = data.find((product) => {
                    return product.problems
                })
                if (!foundProblem) setCanValidate(true)
            }

            reader.readAsText(file)
        }
    }

    function handleValidate() {
        const body = products.map((product) => {
            return {
                code: product.code,
                sales_price: product.new_price
            }
        })
        api.post('/products/validation', { products: body })
            .then((response) => {
                setProducts(response.data)

                const foundProblem = response.data.find((product: Product) => {
                    if (product.problems && product.problems.length > 0)
                        return true
                })
                if (!foundProblem) setCanUpdate(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <label htmlFor="file_input" className="block text-lg font-bold">
                Selecione o arquivo CSV
            </label>
            <input
                className="block  border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                id="file_input"
                type="file"
                accept=".csv"
                onChange={(event) => handleInput(event)}
            />

            <div>
                {products.length > 0 && <ProductsTable products={products} />}
            </div>

            {canValidate && (
                <button
                    onClick={handleValidate}
                    className="group relative h-12 w-48 m-6 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white"
                >
                    VALIDAR
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                </button>
            )}
            {canUpdate && (
                <button className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white">
                    ATUALIZAR
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                </button>
            )}
        </>
    )
}
