import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useWishlistStore } from "../../stores/useWishlistStore";

const Wishlist = () => {
  const { wishlist } = useWishlistStore();

  return (
    <div
      className="
        pt-32
        bg-[#faf8f5]
        min-h-screen
      "
    >
      <div className="max-w-7xl mx-auto px-4">

        <h1
          className="
            text-5xl
            font-light
            mb-12
          "
        >
          Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-2xl">
              Your wishlist is empty
            </h2>

            <Link
              to="/collection"
              className="
                inline-block
                mt-6
                px-8
                py-4
                border
              "
            >
              Explore Collection
            </Link>

          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-6
            "
          >
            {wishlist.map((product) => (
              <Card
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;