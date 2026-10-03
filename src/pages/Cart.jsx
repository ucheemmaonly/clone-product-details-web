import { Link } from "react-router-dom";
import { useCartStore, useCartTotal } from "../store/cartStore";
import { useShallow } from "zustand/shallow";

function Cart() {
  const total = useCartTotal();

  const { items, updateQuantity, removeFromCart } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      updateQuantity: state.updateQuantity,
      removeFromCart: state.removeFromCart,
    })),
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f3eb] px-6 py-20 text-center md:px-12">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <Link to="/shop" className="mt-6 inline-block underline">
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3eb] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-10 text-4xl font-bold md:text-6xl">Your Cart</h1>

        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 rounded-2xl bg-white p-4 shadow-sm"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-500">${item.price}</p>
              </div>

              <div className="flex items-center rounded-full border border-gray-300">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-2 text-lg"
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  −
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-2 text-lg"
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  +
                </button>
              </div>

              <p className="w-20 text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-gray-500 underline hover:text-black"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-300 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">Total</span>

            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block w-full rounded-full bg-black px-6 py-4 text-center font-medium text-white transition hover:bg-gray-800"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Cart;
