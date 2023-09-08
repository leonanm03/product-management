export function ProductsTable() {
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
                <tr>
                    <td>1</td>
                    <td>Produto 1</td>
                    <td>R$ 10,00</td>
                    <td>R$ 8,00</td>
                    <td>
                        <p>Validado</p>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Produto 2</td>
                    <td>R$ 10,00</td>
                    <td>R$ 8,00</td>
                    <td>
                        <p>diferença muito grande</p>
                        <p>Não Validado</p>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
