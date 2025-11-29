export default function AdminBilling(){

  return(
    <div className="min-h-screen bg-[#191919] text-white p-10">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">
        💰 Billing & Revenue Department
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-400">
          <h2 className="text-xl font-bold">Total Bills</h2>
          <p className="text-4xl mt-3 font-bold text-yellow-300">₹ 3,24,500</p>
        </div>

        <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-400">
          <h2 className="text-xl font-bold">Pending Payments</h2>
          <p className="text-4xl mt-3 font-bold text-red-400">₹ 1,10,200</p>
        </div>

        <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-400">
          <h2 className="text-xl font-bold">Collected Revenue</h2>
          <p className="text-4xl mt-3 font-bold text-green-400">₹ 2,14,300</p>
        </div>

      </div>
    </div>
  );
}
