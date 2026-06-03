import { useState } from "react";
import { Package } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";

const statusColor = {
  Processing: "text-yellow-400 bg-yellow-400/10",
  Shipped: "text-blue-400 bg-blue-400/10",
  Delivered: "text-green-400 bg-green-400/10",
  Cancelled: "text-red-400 bg-red-400/10",
};

export default function Orders() {
  const { getUserOrders, cancelOrder } = useApp();

  const orders = getUserOrders();
  const [expanded, setExpanded] = useState(null);

  const handleCancelOrder = (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) return;

    cancelOrder(orderId);
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center min-h-screen">
        <Package size={48} className="mx-auto text-gray-700 mb-4" />

        <div className="font-display text-4xl text-gray-500 mb-4">
          NO ORDERS YET
        </div>

        <Link
          to="/catalog"
          className="btn-lime px-6 py-3 text-xs font-mono-custom uppercase tracking-widest inline-block"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <div className="mb-10">
        <div className="text-xs font-mono-custom text-[#C6F135] uppercase tracking-widest mb-1">
          Account
        </div>

        <h1 className="font-display text-5xl text-white">MY ORDERS</h1>

        <div className="text-gray-500 text-sm mt-1">
          {orders.length} orders placed
        </div>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#111] border border-[#222] overflow-hidden"
          >
            <button
              onClick={() =>
                setExpanded(expanded === order.id ? null : order.id)
              }
              className="w-full flex flex-wrap items-center gap-4 p-5 text-left hover:bg-[#1a1a1a] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="font-mono-custom text-xs text-[#C6F135]">
                  {order.id}
                </div>

                <div className="text-xs text-gray-500 mt-0.5">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <div
                className={`text-xs font-mono-custom px-3 py-1 rounded-sm uppercase tracking-widest ${
                  statusColor[order.status] || "text-gray-400 bg-gray-400/10"
                }`}
              >
                {order.status}
              </div>

              <div className="font-mono-custom font-bold text-white">
                ${order.total.toFixed(2)}
              </div>

              <div className="text-gray-500 text-lg">
                {expanded === order.id ? "−" : "+"}
              </div>
            </button>

            {expanded === order.id && (
              <div className="border-t border-[#222] p-5 animate-fade-in">
                {order.status === "Processing" && (
                  <div className="mb-5">
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-4 py-2 border border-red-500 text-red-400 text-xs font-mono-custom uppercase tracking-widest hover:bg-red-500 hover:text-white transition"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-xs font-mono-custom uppercase tracking-widest text-gray-500 mb-3">
                      Items Ordered
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-14 object-cover flex-shrink-0"
                          />

                          <div>
                            <div className="text-xs text-white">
                              {item.name}
                            </div>

                            <div className="text-xs text-gray-500">
                              × {item.qty}
                            </div>

                            <div className="text-xs text-[#C6F135] font-bold">
                              ${(item.price * item.qty).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono-custom uppercase tracking-widest text-gray-500 mb-3">
                      Shipping Address
                    </div>

                    <div className="text-sm text-gray-300 leading-relaxed">
                      <div>{order.address.name}</div>
                      <div>{order.address.street}</div>
                      <div>
                        {order.address.city}, {order.address.zip}
                      </div>
                      <div>{order.address.country}</div>
                      <div className="text-gray-500 mt-1">
                        {order.address.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#222] pt-4 flex justify-between">
                  <span className="font-mono-custom text-xs uppercase tracking-widest text-gray-400">
                    Order Total
                  </span>

                  <span className="font-mono-custom font-bold text-[#C6F135]">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
