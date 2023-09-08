import { Product } from '@/protocols'

export function TableRow({ product }: { product: Product }) {
    const { code, name, sales_price, new_price, problems } = product
    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="flex items-center">
                    <div>
                        <div className="text-sm leading-5 text-gray-800">
                            {code ? `${code}` : 'não informado'}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm leading-5 text-blue-900">{name}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                {sales_price && `R$ ${sales_price.toFixed(2)}`}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                {new_price ? `R$ ${new_price.toFixed(2)}` : 'não informado'}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                {problems && (
                    <>
                        {problems.length > 0 ? (
                            problems.map((problem) => (
                                <div
                                    key={problem}
                                    className="relative flex mb-1 px-3 py-1 font-semibold text-red-900 leading-tight"
                                >
                                    <span
                                        aria-hidden
                                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative text-xs">
                                        {problem}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="relative flex mb-1 px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span
                                    aria-hidden
                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                ></span>
                                <span className="relative text-xs">OK</span>
                            </div>
                        )}
                    </>
                )}
            </td>
        </tr>
    )
}
