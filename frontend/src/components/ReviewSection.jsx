import { useState } from "react";

const ReviewSection = () => {
  const [reviews] = useState([]);

  return (
    <section className="mt-24">

      <h2 className="text-3xl font-light mb-8">
        Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <div
          className="
            border
            border-[#e5ddd4]
            bg-white
            p-10
          "
        >
          <p className="text-gray-500">
            No reviews yet.
          </p>

          <button
            className="
              mt-5
              bg-black
              text-white
              px-6
              py-3
            "
          >
            Write a Review
          </button>
        </div>
      ) : (
        reviews.map((review) => (
          <div key={review.id}>
            {review.comment}
          </div>
        ))
      )}
    </section>
  );
};

export default ReviewSection;