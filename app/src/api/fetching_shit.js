export const fetchClaims = async (category) => {
  try {
    console.log("entering request");
    const response = await fetch("/get-question", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: category }),
    });
    const res = await response.json();
    const combinedClaims = [
      ...res.right_claims.map((claim) => ({ claim, rating: "right" })),
      ...res.wrong_claims.map((claim) => ({ claim, rating: "wrong" })),
    ];
    return combinedClaims;
  } catch (err) {
    console.error("Error fetching claims:", err);
  }
};
