export const CartSummary = ({ cart }: any) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <div className="p-3">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Total Items</th>
              <th className="px-4 py-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{cart?.totalItems}</td>
              <td className="border px-4 py-2">
                {cart?.grandTotal?.formatted}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
