async function getDataFromAPI({ url, type, body }) {
  try {
    if (type === "POST") {
      const res = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      });
      const data = await res.json();
      return [data, ""];
    }

    const res = await fetch(url);
    const data = await res.json();
    return [data, ""];
  } catch (e) {
    return ["", e.message];
  }
}

export default getDataFromAPI;
