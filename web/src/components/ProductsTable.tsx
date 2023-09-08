import { TableRow } from '.'
import { Product } from '../protocols'
export function ProductsTable({ products }: { products: Array<Product> }) {
    return (
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                            Código
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                            Nome
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                            Preço Atual
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                            Novo Preço
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                            Validação
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {products.map((product, index) => (
                        <TableRow key={index} product={product} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
