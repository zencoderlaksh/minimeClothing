import fs from "fs";

async function test() {
  try {
    // create a dummy image
    const dummyImage = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");
    fs.writeFileSync("dummy.png", dummyImage);

    const formData = new FormData();
    const blob = new Blob([dummyImage], { type: 'image/png' });
    formData.append("image", blob, "dummy.png");

    console.log("Sending POST to /api/v1/test-upload...");
    const res = await fetch("http://localhost:5000/api/v1/test-upload", {
      method: "POST",
      body: formData,
    });
    
    const data = await res.json();
    console.log("Response:", res.status, data);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
