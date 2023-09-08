import { Product } from '../protocols'
export function ProductsTable({ products }: { products: Array<Product> }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Preço Atual</th>
                    <th>Novo Preço</th>
                    <th>Validação</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.code}>
                        <td>{product.code}</td>
                        <td>{product.name}</td>
                        <td>{product.sales_price}</td>
                        <td>{product.new_price}</td>
                        <td>
                            {product.problems && (
                                <>
                                    {product.problems.length > 0 ? (
                                        product.problems.map((problem) => {
                                            return (
                                                <p key={problem}>{problem}</p>
                                            )
                                        })
                                    ) : (
                                        <p className=" red ">ok</p>
                                    )}
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
