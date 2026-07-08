import dodo from "./config/dodo.js";

async function testDodo() {
  try {
    console.log("Creating product...");
    const product = await dodo.products.create({
      name: "Test Product",
      description: "Test Description",
      image: "https://example.com/image.png",
      price: {
        currency: "INR",
        price: 10000,
        type: "one_time_price",
        discount: 0,
        purchasing_power_parity: false
      },
      tax_category: "digital_products"
    });
    console.log("Success:", product);
  } catch (error) {
    console.error("Error creating product:");
    console.error(error);
  }
}

testDodo();
