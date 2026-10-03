import { Link } from "react-router-dom";
import { useCartStore, useCartTotal } from "../store/cartStore";
import { useShallow } from "zustand/shallow";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const total = useCartTotal();
  const { currentUser } = useAuth();

  const items = useCartStore(
    useShallow((state) => state.items)
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f3eb] px-6 py-20 text-center md:px-12">
        <h1 className="text-4xl font-bold">Your cart is empty</h1>

        <p className="mt-4 text-gray-600">
          Add some products before checking out.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-black px-8 py-4 text-white"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3eb] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-widest">
          Secure Checkout
        </p>

        <h1 className="mt-3 text-4xl font-bold md:text-6xl">
          Checkout
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Customer Details</h2>

            <p className="mt-3 text-sm text-gray-500">
              Signed in as {currentUser?.email}
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium"
                >
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  rows="4"
                  placeholder="Enter your delivery address"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
              >
                Place Order
              </button>
            </form>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-300 pt-6">
              <span className="text-lg font-semibold">Total</span>

              <span className="text-2xl font-bold">
                ${total.toFixed(2)}
              </span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Checkout;