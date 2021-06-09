async function getDataFromAPI({ url, type, body }) {
  console.log(url, type, body);
  try {
    if (type === "POST") {
      const res = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      });
      const data = await res.json();
      console.log(data);
      return [data, ""];
    }

    const res = await fetch(url);
    const data = await res.json();
    return [data, ""];
  } catch (e) {
    console.log(e);
    return ["", e.message];
  }
}

export default getDataFromAPI;
