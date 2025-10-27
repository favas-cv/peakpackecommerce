function Paymentmethod({ setPaymentMethod, selectedMethod }) {
  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      <h2 className="text-2xl font-bold mt-6">Payment Method</h2>
      <div className="space-y-2">
        {["Card", "UPI", "COD"].map((method) => (
          <label key={method} className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              className="accent-blue-500"
              value={method}
              checked={selectedMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {method === "Card" ? "Credit/Debit Card" : method === "UPI" ? "UPI/Wallet" : "Cash on Delivery"}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Paymentmethod;