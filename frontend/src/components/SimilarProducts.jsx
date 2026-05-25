import { Link } from "react-router-dom";
import products from "../assets/data";
import Card from "../components/Card";

const categorySlugMap = {
  Tops: "tops",
  "White Dresses": "white-dresses",
  "Sequin Dresses": "sequin-dresses",
  "Long Sleeve Dresses":
    "long-sleeve-dresses",
};

const SimilarProducts = ({
  category,
  currentId,
}) => {
  const similarProducts = products
    .filter(
      (item) =>
        item.category === category &&
        item.id !== currentId
    )
    .slice(0, 4);

  return (
    <section className="mt-24">

      <div className="flex justify-between items-center mb-10">

        <h2 className="text-3xl font-light">
          You May Also Like
        </h2>

      </div>

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        {similarProducts.map((product) => (
          <Card
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <div className="flex justify-center mt-12">

        <Link
          to={`/collection/${categorySlugMap[category]}`}
          className="
            cursor-pointer
            px-8
            py-4
            border
            border-black
            hover:bg-black
            hover:text-white
            transition
          "
        >
          See All Products
        </Link>

      </div>

    </section>
  );
};

export default SimilarProducts;